const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

let app = express();

var index = require ('./routers/index')
var user = require('./routers/users')
var login = require ('./routers/login')
var dashboard = require ('./routers/dashboard')
var packets = require ('./routers/packets')
var transaction = require('./routers/transactions')

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(session({
  secret: '&*^*&#$^7sdfjgsdj78^&*usdfsgf',
  resave: false,
  saveUnitialized: true,
  cookie: {}
}))

app.use('/login', login);
app.use('/dashboard', dashboard);
app.use('/', index);
app.use('/users', user);
app.use('/packets', packets);
app.use('/transactions', transaction);


app.listen(3000, function() {
  console.log('I am listening at port 3000')
})
