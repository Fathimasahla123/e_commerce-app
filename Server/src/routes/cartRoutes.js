const express = require('express');
const {addToCart, getCartItems , deleteCart } = require('../controllers/cartController');
const router = express.Router();

router.get('/getCart', getCartItems);
router.post('/addToCart', addToCart);
router.delete("/deleteCart/:id", deleteCart);

module.exports = router;