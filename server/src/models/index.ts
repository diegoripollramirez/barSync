"use strict";
import { Sequelize, Options } from "sequelize";
import inventoryModel from "./inventoryModel";
import userModel from "./userModel";
import favoritesModel from "./favoritesModel";

const config:Options = {
  host: "localhost",
  dialect: "postgres",
};
export const sequelize = new Sequelize(
  process.env.DATABASE_NAME || "",
  process.env.DATABASE_USER || "",
  process.env.DATABASE_PASS || "",
  config
);
export const db: any = {};
db.sequelize = sequelize;
db.user = userModel(sequelize);
db.inventory = inventoryModel(sequelize);
db.favoritesModel = favoritesModel(sequelize);

