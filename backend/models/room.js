"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Room.belongsToMany(models.Client, {
        through: models.RoomUsage,
        foreignKey: "roomId",
      });

      Room.hasMany(models.RoomUsage, {
        foreignKey: "roomId",
      });
    }
  }
  Room.init(
    {
      roomName: DataTypes.STRING,
      costPerHour: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
