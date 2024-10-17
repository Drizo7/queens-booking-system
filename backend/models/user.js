// backend/models/user.js
module.exports = (sequelize, DataTypes) => {
  // Define the User model
  const User = sequelize.define('User', {
  first_name: {
      type: DataTypes.STRING,
      allowNull: false, // First name is required
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false, // Last name is required
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure each email is unique
      validate: {
        isEmail: true, // Validate that the input is a valid email address
      },
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false, // Phone number is required
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // Password cannot be empty
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false, // Role cannot be empty
      defaultValue: 'patient', // Default role is 'patient' (can be 'doctor', 'receptionist', etc.)
    },
  }, {
    paranoid: true,
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  });

  User.associate = (models) => {
    // Define the association after all models are available
    User.hasOne(models.Receptionist, { as: 'receptionistDetails', foreignKey: 'user_id' });
  };
  
  return User;
};
