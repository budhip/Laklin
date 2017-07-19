const express = require('express');
const db = require('../models');


var router = express.Router();


router.get('/', (req, res) => {
  db.User.findAll()
  .then( data => {
    res.render('users', {title: 'users page',data_users : data})
  })
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
  db.User.findById(req.params.id)
  .then( data => {
    res.render('edit_user', { edit_user: data})
  })
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
