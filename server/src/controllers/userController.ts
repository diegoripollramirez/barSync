"use strict";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
import jwt from "jsonwebtoken";
const saltrounds = process.env.SALTROUNDS || "10";
import { db } from "../models/index";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      res
        .status(409)
        .send({ error: "409", message: "Email already exists" });
      return;
    }

    if (password === "") {
      res.status(400).send({ error: "Password cannot be empty" });
      return;
    }

    const hash = await bcrypt.hash(password, parseInt(saltrounds));

    const newUser = await db.user.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hash,
    });
    console.log("NewUser es:", newUser.dataValues.id);
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "JWT secret is not defined" });
      return;
    }
    const token = jwt.sign(
      { user_id: newUser.dataValues.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ message: "Register successful", token });
    return;
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .send({ error: "Could not create user", message: error.message });
  }
  return;
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (!user) {
      res
        .status(401)
        .send({ error: "401", message: "Email or password is incorrect" });
      return;
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      res
        .status(401)
        .send({ error: "401", message: "Email or password is incorrect" });
      return;
    }
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "JWT secret is not defined" });
      return;
    }
    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error: any) {
    console.error(error);
    res
      .status(400)
      .send({ error: "Could not login", message: error.message });
    return;
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    req.session.destroy((error: any) => {
      if (error) {
        return res.status(500).send({
          error: "500",
          message: "Could not log out, please try again",
        });
      } else {
        res.clearCookie("sid");
        return res.status(200).send({
          message: "Logout successful",
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({
      error: "400",
      message: "Could not log out, an error occurred",
    });
    return;
  }
};
