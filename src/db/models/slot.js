"use strict";

module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define(
    "Slot",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      day: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      locationId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isReserved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {}
  );
  Slot.associate = function (models) {
    // associations can be defined here
  };
  return Slot;
};
