const path = require('path');
const express = require('express');

const router = express.Router();
const rootDir = require('../util/path');

router.get('/', (req, res, next) => {
    res.render('addUser', {
        pageTitle: 'Add user!',
    });
});

const users = [];

router.post('/', (req, res, next) => {
    users.push({name: req.body.title});
    console.log(users);
    res.redirect('/users');
});

exports.routes = router;
exports.users = users;
