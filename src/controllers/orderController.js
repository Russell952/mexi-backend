const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  try {

    const order = await Order.create(req.body);

    res.status(201).json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
};


exports.getOrders = async (req, res) => {

  const orders = await Order.find().sort({
    createdAt: -1
  });

  res.json(orders);

};


exports.updateOrderStatus = async (req, res) => {

  const order = await Order.findByIdAndUpdate(

    req.params.id,

    {
      status: req.body.status
    },

    {
      new: true
    }

  );

  res.json(order);

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