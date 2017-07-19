const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

let app = express();

var index = require ('./routers/index')
const user = require('./routers/users')
var packets = require ('./routers/packets')

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', index);
app.use('/users', user);
app.use('/packets', packets);

app.listen(3000, function() {
  console.log('I am listening at port 3000')
})
