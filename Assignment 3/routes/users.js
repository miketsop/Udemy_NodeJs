const path = require('path');
const express = require('express');

const router = express.Router();
const rootDir = require('../util/path');

const userData = require('./addUser');

router.get('/users', (req, res, next) => {
    const users = userData.users;
    console.log(users);
    res.render('users', {
        pageTitle: 'Users!',
        users: users,
    })
});

exports.routes = router;