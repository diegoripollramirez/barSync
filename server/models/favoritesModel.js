"use strict";

module.exports = (sequelize, DataTypes) => {
  const favorites = sequelize.define("favorite", {
    idDrink: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    strDrinkThumb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    strDrink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // id: {
    //   type: DataTypes.UUID,
    //   allowNull: false,
    // },
  });

  // favorites.associate = (models) => {
  //   favorites.belongsTo(models.user, { foreignKey: 'user_id' });
  // };

  return favorites;
};
