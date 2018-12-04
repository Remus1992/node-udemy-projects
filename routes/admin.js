const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

// the following two functions can have the same path 'url'
// since they are running different functions 'get' vs 'post'
// furthermore, both are implicitly reached at '/admin/add-product'
// because they receive that argument 'filter' from app.js
router.get('/add-product', (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

    // this allows us to add dynamic content via pug (NOTE: 'add-product.pug' is shortened)
    res.render('add-product', {pageTitle: 'Add Product'});
});

router.post('/add-product', (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});

// module.exports = router;

exports.routes = router;
exports.products = products;