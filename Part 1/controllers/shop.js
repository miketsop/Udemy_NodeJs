const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/index',
      });
    })
    .catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id == product.id);
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your cart',
        path: '/cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId, (product) => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/orders', {
      pageTitle: 'Your orders',
      path: '/orders'
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All products',
        path: '/products',
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;

  //! Query approach
  // Product.findAll({ where: { id: productId } })
  //   .then((products) => {
  //     res.render('shop/product-detail', {
  //       pageTitle: products[0].title,
  //       path: '/products',
  //       product: products[0]
  //     });
  //   })
  //   .catch(err => console.log(err));

  //! Find by ID approach
  Product.findByPk(productId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        path: '/products',
        product: product
      });
    })
    .catch((err) => console.log(err));
};

exports.getChechout = (req, res, next) => {
  res.render('/checkout', {
    pageTitle: 'Checkout',
    path: '/shop/checkout'
  });
}