"use strict";
const db = require("../models/index.js");
const jwt = require("jsonwebtoken");

exports.getFavorites = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userID = decoded.user_id;
  try {
    const favorites = await db.favoritesModel.findAll({
      where: {
        user_id: userID,
      },
    });
    res.status(201);
    res.send(favorites);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userID = decoded.user_id;
    const favoriteId = req.body.idDrink;
    const favoriteThumb = req.body.strDrinkThumb;
    const favoriteTitle = req.body.strDrink;
    await db.favoritesModel.create({
      idDrink: favoriteId,
      strDrinkThumb: favoriteThumb,
      strDrink: favoriteTitle,
      user_id: userID,
    });
    res.status(201);
    res.send("added to favorites");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userID = decoded.user_id;
    const favorite = req.body.idDrink;
    await db.favoritesModel.destroy({
      where: {
        idDrink: favorite,
        user_id: userID,
      },
    });
    res.status(201);
    res.send("removed from db");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};
