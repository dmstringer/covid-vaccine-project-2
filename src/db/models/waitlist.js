"use strict";

module.exports = (sequelize, DataTypes) => {
  const Waitlist = sequelize.define(
    "Waitlist",
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      day: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      locationId: {
        type: DataTypes.STRING,
        allowNull: false,
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
  Waitlist.associate = function (models) {
    // associations can be defined here
  };
  return Waitlist;
};
