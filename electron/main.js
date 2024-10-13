const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const { spawn } = require('child_process');
const net = require('net');

let mainWindow;
let reactProcess;

function createWindow(preloadUrl, reactUrl) { 
  console.log('Creating window...');
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: "frontend/public/favicon.ico",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  console.log('Loading preload URL:', preloadUrl);
  mainWindow.loadFile(preloadUrl);

  // Only listen for did-finish-load once
  mainWindow.webContents.on('did-finish-load', () => {
    console.log('Preload page loaded. Now loading React app...');
    
    // Remove the previous listener to prevent multiple loads
    mainWindow.webContents.removeAllListeners('did-finish-load');
    
    // Load the React app immediately without delay
    mainWindow.loadURL(reactUrl);
    console.log('React app loaded...');
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorCode, errorDescription);
  });

  mainWindow.webContents.openDevTools();
}

function startReactApp(port) {
  return new Promise((resolve, reject) => {
    console.log(`Starting React app on port ${port}...`);
    reactProcess = spawn('npm', ['run', 'start:react', '--', `--port=${port}`], { stdio: 'pipe', shell: true });

    reactProcess.stdout.on('data', (data) => {
      process.stdout.write(data);
      if (data.toString().includes('Compiled successfully!') || data.toString().includes('Compiled with warnings.')) {
        console.log('React app started successfully on port', port);
        resolve(`http://localhost:${port}`);
      } else if (data.toString().includes('Something is already running on port')) {
        reject(new Error(`Port ${port} is already in use`));
      }
    });

    reactProcess.stderr.on('data', (data) => {
      process.stderr.write(data);
    });

    reactProcess.on('error', (err) => {
      console.error('Failed to start React app:', err);
      reject(err);
    });

    reactProcess.on('close', (code) => {
      console.log(`React process exited with code ${code}`);
      if (code !== 0) {
        reject(new Error(`React process exited with code ${code}`));
      }
    });
  });
}

function getAvailablePort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(null); // Port is in use, return null
      }
    });
    server.once('listening', () => {
      server.close(() => resolve(port)); // Port is available, return it
    });
    server.listen(port);
  });
}

function cleanup() {
  return new Promise((resolve) => {
    console.log('Cleaning up processes...');
    if (reactProcess) {
      reactProcess.kill('SIGTERM'); // Gracefully terminate the React process
    }

    // Kill any process running on port 3000
    const killPortProcess = spawn('npx', ['kill-port', '3000'], { stdio: 'inherit', shell: true });

    killPortProcess.on('close', (code) => {
      if (code === 0) {
        console.log('Successfully killed any process on port 3000');
      } else {
        console.error(`Failed to kill process on port 3000 with exit code ${code}`);
      }
      resolve(); // Resolve the promise once the process finishes
    });
  });
}

async function startApp() {
  console.log('Electron app is starting...');
  await app.whenReady();

  let port = 3000;
  let reactUrl = null;

  const preloadUrl = path.join(__dirname, 'preload.html'); // Load the preload file

  try {
    let availablePort = await getAvailablePort(port);
    if (!availablePort) {
      console.log(`Port ${port} is unavailable, switching to port 8080`);
      port = 8080;
    }
    reactUrl = await startReactApp(port);
  } catch (error) {
    console.error('Failed to start React app:', error);
    await cleanup(); // Ensure cleanup happens if React app fails to start
    app.quit();
    return;
  }

  createWindow(preloadUrl, reactUrl);
}

startApp();

app.on('window-all-closed', async () => {
  console.log('All windows closed');
  await cleanup(); // Ensure cleanup happens before quitting the app
  if (process.platform !== 'darwin') {
    app.quit();
  }
  process.exit(0);
});

app.on('activate', () => {
  console.log('App activated');
  if (BrowserWindow.getAllWindows().length === 0) {
    startApp();
  }
});

process.on('uncaughtException', async (error) => {
  console.error('Uncaught exception:', error);
  await cleanup(); // Ensure cleanup happens on uncaught exceptions
  process.exit(1);
});

process.on('SIGINT', async () => {
  await cleanup(); // Ensure cleanup happens on SIGINT (Ctrl+C)
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await cleanup(); // Ensure cleanup happens on SIGTERM
  process.exit(0);
});
