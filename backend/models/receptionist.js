module.exports = (sequelize, DataTypes) => {
  const Receptionist = sequelize.define('Receptionist', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

  Receptionist.associate = (models) => {
    // Define the association after all models are available
    Receptionist.belongsTo(models.User, { as: 'user', foreignKey: 'user_id' });
  };

  return Receptionist;
};
