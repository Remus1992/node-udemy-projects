const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  // exports.getProducts = async (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    })

  // try {
  //   const results = await Product.fetchAll()
  //   console.log(results)

  //   res.render('shop/product-list', {
  //     prods: results['rows'],
  //     pageTitle: 'All Products',
  //     path: '/products',
  //   });

  // } catch (err) {
  //   console.log(err)
  // }
};

exports.getProduct = (req, res, next) => {
  // exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));

  // also Sequelize but a different method
  // Product.findAll({
  //   where: {
  //     id: prodId
  //   }
  // })
  //   .then(products => {
  //     res.render('shop/product-detail', {
  //       product: products[0],
  //       pageTitle: products[0].title,
  //       path: '/products'
  //     });
  //   })
  //   .catch(err => console.log(err));

  // Old postgreSQL method
  // try {
  //   const prodId = req.params.productId;
  //   const singleProduct = await Product.findById(prodId)
  //   // console.log(singleProduct)

  //   res.render('shop/product-detail', {
  //     product: singleProduct['rows'][0],
  //     pageTitle: singleProduct['rows'][0].title,
  //     path: '/products'
  //   });

  // } catch (err) {
  //   console.log(err)
  // }


};

exports.getIndex = (req, res, next) => {
  // exports.getIndex = async (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
    })
  // Old postgreSQL code
  // try {
  //   const results = await Product.fetchAll()
  //   // console.log(results)

  //   res.render('shop/index', {
  //     prods: results['rows'],
  //     pageTitle: 'Shop',
  //     path: '/',
  //   });

  // } catch (err) {
  //   console.log(err)
  // }
};

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if (cartProductData) {
  //         cartProducts.push({ productData: product, qty: cartProductData.qty });
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     })
  //   });
  // });
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  })
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders'
  });
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
}