const bcrypt = require('bcrypt');
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
      defaultValue: 'receptionist', // Default role is 'patient' (can be 'doctor', 'receptionist', etc.)
    },
   // Security questions and answers
    security_question_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    security_answer_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    security_question_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    security_answer_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    security_question_3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    security_answer_3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    paranoid: true,
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields
  });

  // Hook to hash answers before saving
  User.beforeCreate(async (user) => {
    user.security_answer_1 = await bcrypt.hash(user.security_answer_1, 10);
    user.security_answer_2 = await bcrypt.hash(user.security_answer_2, 10);
    user.security_answer_3 = await bcrypt.hash(user.security_answer_3, 10);
  });

  User.associate = (models) => {
    // Define the association after all models are available
    User.hasOne(models.Receptionist, { as: 'receptionistDetails', foreignKey: 'user_id' });
  };
  
  return User;
};
