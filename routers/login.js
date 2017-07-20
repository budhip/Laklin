var express = require('express')
var router = express.Router()

const Models = require('../models')
const encryptMyPwd = require('../helpers/encryptMyPwd')

router.get('/', function(req,res,next) {
  res.render('login', {pageTitle: 'Halaman Login'})
})

router.post('/', function(req,res,next) {
  let username = req.body.username
  let password = req.body.password
  Models.User.find({
    where: {
      username: username
    }
  })
  .then(user => {
    var saltUserLogin = user.salt
    var passwordUserLogin = req.body.password

    var getPasswordUser = encryptMyPwd.createHash(passwordUserLogin, saltUserLogin)
    if(user.password == getPasswordUser) {
      req.session.user = {
        username : username,
        role: user.role
      }
      res.redirect('/dashboard')
    } else {
      res.send('Maaf password salah')
    }
  })
  .catch(err => {
    res.redirect('/login')
  })
})

module.exports = router
