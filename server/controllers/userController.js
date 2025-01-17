const bcrypt = require("bcrypt");
const db = require("../models/index.js");
const saltrounds = process.env.SALTROUNDS;
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      return res
        .status(409)
        .send({ error: "409", message: "Email already exists" });
    }

    if (password === "") {
      return res.status(400).send({ error: "Password cannot be empty" });
    }

    const hash = await bcrypt.hash(password, parseInt(saltrounds));

    const newUser = await db.user.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: hash,
    });
    console.log("NewUser es:", newUser.dataValues.id);
    const token = jwt.sign(
      { user_id: newUser.dataValues.id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({ message: "Register successful", token });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ error: "Could not create user", message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });
    if (!user) {
      return res
        .status(401)
        .send({ error: "401", message: "Email or password is incorrect" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res
        .status(401)
        .send({ error: "401", message: "Email or password is incorrect" });
    }

    const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .send({ error: "Could not login", message: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy((error) => {
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
    return res.status(400).send({
      error: "400",
      message: "Could not log out, an error occurred",
    });
  }
};
