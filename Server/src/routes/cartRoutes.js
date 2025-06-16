const express = require('express');
const {addToCart, getCartItems  } = require('../controllers/cartController');
const router = express.Router();

router.get('/getCart', getCartItems);
router.post('/addToCart', addToCart);

module.exports = router;