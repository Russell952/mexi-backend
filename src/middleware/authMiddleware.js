const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json("No token provided");
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();

  } catch (err) {
    return res.status(401).json("Invalid token");
  }

};


exports.adminOnly = (req, res, next) => {

  if (req.user.role !== "admin") {
    return res.status(403).json("Access denied (Admin only)");
  }

  next();

};