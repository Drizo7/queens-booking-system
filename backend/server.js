// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./models'); // Adjust the path as necessary
const authRoutes = require('./routes/auth');
const registerRoutes = require('./routes/register');
const userProfileRoutes = require('./routes/profile');
const patientRoutes = require('./routes/patient');
const clinicRoutes = require('./routes/clinic');
const { errorHandler } = require('./utils/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes);
app.use('/api', registerRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', patientRoutes);
app.use('/api', clinicRoutes);

// Error Handling
app.use(errorHandler);

// Function to create a user
/* const createUser = async () => {
  try {
    const existingUser = await db.User.findOne({ where: { email: 'receptionist@example.com' } });
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('yourpassword', 10); // Hash the password
      const newUser = await db.User.create({
        email: 'receptionist@example.com', // Replace with desired email
        password: hashedPassword, // Use hashed password
        role: 'receptionist', // Set the role to 'receptionist'
      });
      console.log('New user created:', newUser.toJSON());
    } else {
      console.log('User already exists:', existingUser.toJSON());
    }
  } catch (error) {
    console.error('Error creating user:', error);
  }
}; */

// Sync the database and start the server
db.sequelize.sync()
  .then(() => {
    //createUser(); // Create user after syncing
    app.get('/', (req, res) => {
      res.send('Welcome to the Hospital Booking System API');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to sync the database:', err);
  });
