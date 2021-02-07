const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/404');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');  //  which rendering engine we use
app.set('views', 'views');      //  where ejs can find our views...

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

// Looks at all sequelize.define for your models
sequelize.sync().
    then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });