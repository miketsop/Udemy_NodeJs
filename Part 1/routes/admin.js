const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

//! app.get ensures the middleware runs only for GET requests
// Implicitly we are looking for this url path /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views','add-product.html'));
});

//! app.post ensures the middleware runs only for POST requests
// /admin/add-product => POST
router.post('/add-product', (req, res, _) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;