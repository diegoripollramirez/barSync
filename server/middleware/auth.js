const User = require("./../models/userModel.js");

const authMiddleware = async (req, res, next) => {
  try {
    const { uid } = req.session;
    if (!uid) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const user = await User.findOne({ where: { id: uid } });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = authMiddleware;
