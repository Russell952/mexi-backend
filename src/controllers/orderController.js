const Order = require("../models/order");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {

    const order = await Order.create({
      user: req.user.id, // 🔥 link to logged-in user
      items: req.body.items,
      total: req.body.total,
      deliveryAddress: req.body.address,
      status: "pending"
    });

    res.status(201).json(order);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET USER ORDERS
exports.getMyOrders = async (req, res) => {

  const orders = await Order.find({ user: req.user.id });

  res.json(orders);

};


// ADMIN — GET ALL ORDERS
exports.getAllOrders = async (req, res) => {

  const orders = await Order.find().populate("user");

  res.json(orders);

};