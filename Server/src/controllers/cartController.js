const Cart = require("../models/cart");

exports.addToCart = async (req, res) => {
  console.log("Incoming cart request body:", req.body);
  const { productId, name, price, quantity, image, description } = req.body;

  try {
    if (!productId || !name || !price || !image|| !quantity|| !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    let existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    const newItem = new Cart({ productId, name, price, quantity, image, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error in addToCart:", err.message);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

 exports.deleteCart = async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Item removed from cart" });
    } catch (err) {
      res.status(500).json({ error: "Failed to remove item" });
    }
  };