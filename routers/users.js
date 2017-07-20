const express = require('express');
const db = require('../models');
const userauth = require('../helpers/userauth')


var router = express.Router();

router.use((req,res,next)=> {
  if(req.session.user.role == 'admin' || req.session.user.role == 'customer'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/', (req, res) => {
  let userSession = req.session.user
  let getUserAuth = userauth.userRole(userSession.role)
  if (userSession.role == 'admin') {
    let username = userSession.username
    db.User.findOne({
      where: {
        username: username
      }
    })
    .then(dataperlogin => {
      db.User.findAll({
        order: [['nama', 'ASC']]
      })
      .then( data => {
        res.render('users', {title: 'users page',data_users : data, dataperlogin: dataperlogin})
      })
    })
  } else {
    let username = userSession.username
    db.User.findOne({
      where: {
        username: username
      }
    })
    .then( data => {
      res.render('users', {title: 'users page', dataperlogin: data})
    })
  }
})

router.get('/add', (req, res) => {
  db.User.findAll()
  .then( data => {
    res.render('user_add', {title: 'user add page', data_users: data})
  })
})

router.post('/add', (req, res) =>{
  db.User.create(req.body)
  .then( () => {
    res.redirect('/users') 
  })
})

router.get('/delete/:id', (req, res) => {
  db.User.destroy({
    where: {id: req.params.id}
  })
  .then( () => {
    res.redirect('/users')
  })
})


router.get('/edit/:id', (req, res) => {
  let userSession = req.session.user
  let getUserAuth = userauth.userRole(userSession.role)
  if (userSession.role == 'admin') {
    let username = userSession.username
    db.User.findOne({
      where: {
        username: username
      }
    })
    .then(dataperlogin => {
      db.User.findById(req.params.id)
      .then( data => {
        res.render('edit_user', { edit_user: data, dataperlogin: dataperlogin})
      })
    })
  } else {
    let username = userSession.username
    db.User.findOne({
      where: {
        username: username
      }
    })
    .then( data => {
      res.render('edit_user', {title: 'users page', dataperlogin: data})
    })
  }

})

router.post('/edit/:id', (req, res) => {
  db.User.update(
    req.body
  ,{
    where:{id:req.params.id}
  })
  .then( ()=>{
    res.redirect('/users')
  })
})




module.exports = router;
