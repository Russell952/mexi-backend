const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// REGISTER
console.log("authController loaded"); // Debugging line
exports.register = async (req, res) => {
  try {

    console.log("Incoming body:", req.body)

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password
    });

    res.json({
      token: generateToken(user._id, user.role)
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};


// LOGIN
exports.login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("User not found");

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(400).json("Wrong password");

    res.json({
      token: generateToken(user._id, user.role),
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};