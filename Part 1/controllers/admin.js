const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const updatedProduct = new Product(prodId, title, imageUrl, price, description);
    updatedProduct.save();
    res.redirect('/admin/products');
}

exports.getEditProduct = (req, res, next) => {
    //  Use query parameters
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    else {
        const prodId = req.params.productId;
        Product.findById(prodId, product => {
            if (!product) {
                res.redirect('/');
            }
            else {
                res.render('admin/edit-product', {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: product
                });
            }
        });
    }
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    // console.log(prodId);
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin products',
            path: '/admin/products',
        });
    });
}