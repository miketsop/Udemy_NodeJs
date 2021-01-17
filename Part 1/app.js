const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/404');

const app = express();

// const expressHbs = require('express-handlebars');
// app.engine('handlebars', expressHbs({ layoutsDir: 'views/layouts', defaultLayout: 'main-layout' })); // the 1st argument must match the ending of the respective files
app.set('view engine', 'ejs');  //  which rendering engine we use
app.set('views', 'views');      //  where ejs can find our views...

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

app.listen(3000);
