var express = require('express')
var router = express.Router()

const Index = require('../models');

router.get('/', function(req, res, next) {
  res.render('index', {pageTitle: 'Index Page'})
})

module.exports = router
