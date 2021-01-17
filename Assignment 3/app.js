const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

app.set('views','views');
app.set('view engine', 'ejs');

const addUserRoutes = require('./routes/addUser');
const userRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(addUserRoutes.routes);
app.use(userRoutes.routes);

app.listen(3000);