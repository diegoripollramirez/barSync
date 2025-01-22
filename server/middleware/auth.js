/* const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    console.log("header es: ",req.headers.authorization)
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.newUser = decoded;
    console.log("el decoded es: ",decoded)

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = authMiddleware; */