"use strict";

module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define("favorite", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,      
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

  // favorites.associate = (models) => {
  //   favorites.belongsTo(models.user, { foreignKey: 'user_id' });
  // };

  return favorites;
};
