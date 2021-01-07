const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

//! This path means any paths starting with '/'!
//! GET does an exact match!
router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;