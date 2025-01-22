"use strict";

require("dotenv").config();
import express, { Express } from "express";
import router from "./router";
import cors from "cors";
import { db } from "./models/index";
const app: Express = express();
const port = process.env.PORT || 0;


app.use(cors());
app.use(express.json());
app.use(router);

(async () => {
  try {
    app.listen(port, () => {
      console.log(`[SERVER]: server running at http://localhost:${port}`);
    });
    await db.sequelize.sync();
    console.log(`[DATABASE]: connection established`);
  } catch (error) {
    console.log(error);
  }
})();
