const express = require('express');
const bodyparser = require('body-parser');
const app = express();

// Middlewares are executed in sequence, provided the filter is allowing it or they are linked via next() commands

app.use(bodyparser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></input>');
})

app.use('/product', (req, res, _) => {
    console.log(req.body);
    res.redirect('/');
})

//! This path means any paths starting with '/'!
app.use('/', (req, res, next) => {
    res.send('<h1>Hello from Express!</h1>');
})

app.listen(3000);

// const server = http.createServer(app);
// server.listen(3000);