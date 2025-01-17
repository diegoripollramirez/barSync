"use strict";
const db = require("../models/index.js");

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await db.favoritesModel.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(favorites);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching favorites", error: error.message });
  }
};

exports.addFavorite = async (req, res) => {
  try {
    const { idDrink, strDrinkThumb, strDrink } = req.body;

    const existingFavorite = await db.favoritesModel.findOne({
      where: { idDrink: idDrink, userId: req.user.id },
    });

    if (existingFavorite) {
      return res.status(409).json({ message: "This cocktail is already in your favorites" });
    }

    await db.favoritesModel.create({
      idDrink: idDrink,
      strDrinkThumb: strDrinkThumb,
      strDrink: strDrink,
      userId: req.user.id,
    });

    res.status(201).json({ message: "Cocktail added to favorites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding to favorites", error: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const { idDrink } = req.body;

    const favorite = await db.favoritesModel.findOne({
      where: { idDrink: idDrink, userId: req.user.id },
    });

    if (!favorite) {
      return res.status(404).json({ message: "This cocktail is not in your favorites" });
    }

    await db.favoritesModel.destroy({
      where: { idDrink: idDrink, userId: req.user.id },
    });

    res.status(200).json({ message: "Cocktail removed from favorites" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error removing from favorites", error: error.message });
  }
};
