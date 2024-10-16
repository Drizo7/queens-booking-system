module.exports = (sequelize, DataTypes) => {
  const Clinic = sequelize.define('Clinic', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operating_hours: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });

  Clinic.associate = (models) => {
    Clinic.hasMany(models.Appointment, { foreignKey: 'clinic_id' });
  };

return Clinic;
};
