const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//! Middlewares are executed in sequence, provided the filter is allowing it or they are linked via next() commands
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);  //* '/admin' is a filter for the urls!
app.use(shopRoutes);

app.use('/', (req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);

// const server = http.createServer(app);
// server.listen(3000);