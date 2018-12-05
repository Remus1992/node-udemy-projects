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
    res.render('shop', { 
        prods : products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
     });
    
    // pug can do logic on the html page but handlebars can't, so we are doing that logic above and passing it along 
    // res.render('shop', { prods : products, pageTitle: 'Shop', path: '/'});
});

module.exports = router;