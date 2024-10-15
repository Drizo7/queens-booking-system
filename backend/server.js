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
const receptionistRoutes = require('./routes/receptionist');
const clinicRoutes = require('./routes/clinic');
const doctorRoutes = require('./routes/doctor');
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
app.use('/api', receptionistRoutes);
app.use('/api', doctorRoutes);
app.use('/api', clinicRoutes);

// Error Handling
app.use(errorHandler);

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
