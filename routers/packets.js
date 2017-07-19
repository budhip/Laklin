var express = require('express')
var router = express.Router()

const Models = require('../models');

router.get('/', function(req, res, next) {
  Models.Packets.findAll({
    order: [['nama_paket', 'ASC']]
  })
  .then(data => {
    res.render('packets', {data: data, pageTitle: 'Halaman Paket'})
  })
})

router.get('/add', function(req,res,next) {
  res.render('packets-add', {pageTitle: 'Tambah Paket Laundry'})
})

router.post('/add', function(req,res,next) {
  Models.Packets.create(req.body)
  .then(function() {
    res.redirect('/packets')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/edit/:id', function(req, res, next) {
  Models.Packets.findById(req.params.id)
  .then(dataById => {
    res.render('packets-edit', {data: dataById, pageTitle: 'Edit Paket Laundry'})
  })
})

router.post('/edit/:id', function(req, res, next) {
  Models.Packets.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(function() {
    res.redirect('/packets')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id', function(req, res, next) {
  Models.Packets.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(data => {
    res.redirect('/packets')
  })
})

module.exports = router
