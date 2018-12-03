const path = require('path');

const express = require('express');

const router = express.Router();


// the following two functions can have the same path 'url'
// since they are running different functions 'get' vs 'post'
// furthermore, both are implicitly reached at '/admin/add-product'
// because they receive that argument 'filter' from app.js
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'))
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;