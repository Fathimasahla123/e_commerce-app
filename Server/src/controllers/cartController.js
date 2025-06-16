
const Cart = require('../models/cart');

// POST /api/cart - Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, name, price, quantity ,image} = req.body;

  try {
    // Check if product is already in cart
    let existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      // If already exists, update quantity
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    // If not, add new item
    const newItem = new Cart({ productId, name, price, quantity, image });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
};

// GET /api/cart - Get all cart items
exports.getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
};


