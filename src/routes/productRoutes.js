const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

const {
  createProduct,
  getProducts,
  getSingleProduct
} = require("../controllers/productController");

const { protect, adminOnly } = require("../middleware/authMiddleware");


// PUBLIC
router.get("/", getProducts);
router.get("/:id", getSingleProduct);

// ADMIN
const upload = require("../middleware/upload");

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"), // 🔥 THIS IS THE MAGIC
  createProduct
);

router.delete("/:id", protect, adminOnly, async (req, res) => {

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
});

module.exports = router; // ✅ THIS LINE IS CRITICAL