const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin'); 

const router = express.Router();


router.get('/', (req, res, next) => {
    // console.log('shop.js', adminData.products);
    // rootDir & its function replaces '__dirname'
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    
    // this is the start of creating dynamic content
    const products = adminData.products;

    // render() is provided by express and will use default 
    // templating engine
    res.render('shop', { prods : products, docTitle: 'Shop' });
});

module.exports = router;