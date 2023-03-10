"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomUsage.belongsTo(models.Room, {
        foreignKey: "roomId",
      });
      RoomUsage.belongsTo(models.Client, {
        foreignKey: "clientId",
      });
    }
  }
  RoomUsage.init(
    {
      clientId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
      bookingDate: DataTypes.DATE,
      quotaUsed: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RoomUsage",
    }
  );
  return RoomUsage;
};
