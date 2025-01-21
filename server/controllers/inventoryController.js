"use strict";
const db = require("../models/index.js");
const jwt = require("jsonwebtoken");

exports.getInventory = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.user_id;

    const inventory = await db.inventory.findAll({
      where: {
        user_id: userID,
      },
    });  

    res.status(201);
    res.send(inventory);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.addIngredient = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userID = decoded.user_id;
    
    const ingredient = req.body.strIngredient1;
    await db.inventory.create({ strIngredient1: ingredient, user_id: userID });
    res.status(201);
    res.send("added to inventory");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

exports.removeIngredient = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userID = decoded.user_id;
    const ingredient = req.body.strIngredient1;
    await db.inventory.destroy({
      where: {
        strIngredient1: ingredient,
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
 