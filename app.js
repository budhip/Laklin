const express = require('express');
const user = require('./routes/users')

var app = express();
var bodyParser = require('body-parser');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/users', user);

app.listen(3000);
