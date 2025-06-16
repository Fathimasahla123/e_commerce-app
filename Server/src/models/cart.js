const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
  image:{type: String},
});

module.exports = mongoose.model('Cart', cartItemSchema);
