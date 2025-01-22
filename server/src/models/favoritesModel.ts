"use strict";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const favorites = sequelize.define("favorite", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idDrink: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    strDrinkThumb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strDrink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return favorites;
};
