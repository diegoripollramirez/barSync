"use strict";
import { Sequelize, DataTypes } from "sequelize";

export default (sequelize: Sequelize) => {
  const user = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return user;
};
