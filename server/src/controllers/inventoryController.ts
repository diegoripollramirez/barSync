"use strict";
import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { db } from "../models/index";

export const getInventory = async (req:Request, res:Response): Promise<void> => {
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

export const addIngredient = async (req:Request, res:Response): Promise<void> => {
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

    const ingredient = req.body.strIngredient1;
    await db.inventory.create({ strIngredient1: ingredient, user_id: userID });
    res.status(201);
    res.send("added to inventory");
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

export const removeIngredient = async (req:Request, res:Response): Promise<void> => {
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
