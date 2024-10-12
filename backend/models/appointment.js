module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Scheduled', // e.g., Scheduled/Confirmed/Completed/Cancelled/No-show
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reason_for_visit: {
      type: DataTypes.TEXT,
    },
  }, {
    timestamps: true,
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Patient, { foreignKey: 'patient_id' });
    Appointment.belongsTo(models.Doctor, { foreignKey: 'doctor_id' });
  };

  return Appointment;
};
