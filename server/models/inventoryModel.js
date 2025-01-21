"use strict";

module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define("inventory", {
    id: {
      type:  DataTypes.INTEGER,
      allowNull: false,      
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
