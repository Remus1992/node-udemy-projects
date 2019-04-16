const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const image_url = req.body.image_url;
  const price = req.body.price;
  const description = req.body.description;
  Product.create({
    title: title,
    price: price,
    image_url: image_url,
    description: description
  })
    .then(result => {
      console.log('Created Product');
    })
    .catch(err => {
      console.log(err)
    });
  // old code with postgreSQL code
  // try {
  //   const product = await new Product(null, title, image_url, price, description);
  //   await product.save();
  //   res.redirect('/');
  // } catch (err) {
  //   console.log(err)
  // }
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.image_url;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.image_url = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDesc;
      return product.save();
    })
    .then(result => {
      console.log("updated product")
    })
    .catch(err => console.log(err))
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedPrice,
  //   updatedDesc
  // );
  // updatedProduct.save();
  res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err);
    })
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId);
  res.redirect('/admin/products');
};

