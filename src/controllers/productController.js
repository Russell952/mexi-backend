const Product = require("../models/product");

// CREATE product (already done)
exports.createProduct = async (req, res) => {

  try {

    console.log(req.file);

    console.log(req.body);

    console.log(req.file);

    const product = await Product.create({

      name: req.body.name,

      price: req.body.price,

      description: req.body.description,

      category: req.body.category,

      image: req.file.secure_url

    });

    res.status(201).json(product);

  } catch (err) {

    console.log(err);

    res.status(500).json({

      message: err.message,

      stack: err.stack

    });

  }

};

// ✅ GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};


// ✅ GET SINGLE PRODUCT
exports.getSingleProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// ✅ DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};