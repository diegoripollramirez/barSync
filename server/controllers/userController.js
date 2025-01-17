const bcrypt = require("bcrypt");
const db = require("../models/index.js");
const saltrounds = process.env.SALTROUNDS;

exports.createUser = async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    const user = await db.user.findOne({ where: { email: email } });
    if (user) {
      return res.status(409).send({ error: "409", message: "Email already exists" });
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

    req.session.uid = newUser.id;

    return res.status(201).send(newUser);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: "Could not create user", message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.user.findOne({ where: { email: email } });

    if (!user) {
      return res.status(401).send({ error: "401", message: "Email or password is incorrect" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).send({ error: "401", message: "Email or password is incorrect" });
    }

    req.session.uid = user.id;

    return res.status(200).send(user);
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: "Could not login", message: error.message });
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: "Could not log out, please try again" });
    } else {
      res.clearCookie("sid");
      res.status(200).send({ message: "Logout successful" });
    }
  });
};
