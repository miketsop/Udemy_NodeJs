const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/users');

app.use(bodyParser.urlencoded({extended: false}));

app.use(mainRoutes);
app.use(userRoutes);

app.use(express.static(path.join(__dirname,'public')));

app.listen(3000);