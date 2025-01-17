"use strict";

require("dotenv").config();
const express = require("express");
const router = require("./router.js");
const cors = require("cors");
const db = require("./models/index.js");
const session = require("express-session");
const app = express();
const port = process.env.PORT;
const SECRET = process.env.SECRET;

app.use(cors());
app.use(express.json());
app.use(
  session({
    name: "sid",
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: true,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);
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
