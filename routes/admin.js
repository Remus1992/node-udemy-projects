const path = require('path');

const express = require('express');

const productsController = require('../controllers/products');

const router = express.Router();

// the following two functions can have the same path 'url'
// since they are running different functions 'get' vs 'post'
// furthermore, both are implicitly reached at '/admin/add-product'
// because they receive that argument 'filter' from app.js
router.get('/add-product', productsController.getAddProduct);

router.post('/add-product', productsController.postAddProduct);

// module.exports = router;

module.exports = router;
