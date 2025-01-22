"use strict";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const inventory = sequelize.define("inventory", {
    id: {
      type:  DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    strIngredient1: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return inventory;
};
