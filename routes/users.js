const express = require('express');
const db = require('../models');


var router = express.Router();


router.get('/', (req, res) => {
  db.User.findAll()
  .then( data => {
    res.render('users', {title: 'users page',data_users : data})
  })
})





module.exports = router;
