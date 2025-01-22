"use strict";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../models/index";

export const getFavorites = async (req:Request, res:Response): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "JWT_secret is not defined" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!decoded.user_id) {
      res.status(400).json({ message: "Token has not user_id" });
      return;
    }
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

export const addFavorite = async (req:Request, res:Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "JWT_secret is not defined" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!decoded.user_id) {
      res.status(400).json({ message: "Token has not user_id" });
      return;
    }
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

export const removeFavorite = async (req:Request, res:Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "JWT_secret is not defined" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!decoded.user_id) {
      res.status(400).json({ message: "Token has not user_id" });
      return;
    }
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
