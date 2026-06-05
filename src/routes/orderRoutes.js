const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
  getAllOrders
} = require("../controllers/orderController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// USER
router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);

// ADMIN
router.get("/", protect, adminOnly, getAllOrders);

module.exports = router;