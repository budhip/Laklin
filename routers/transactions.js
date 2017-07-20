const express = require('express');
const db = require('../models');


var router = express.Router();


router.get('/', (req, res) => {
  db.Transaction.findAll({
    attributes: {include: ['id']}, 
    include: [{all:true}]
  })
  .then( data => {
    let dataJumlah = data
    res.render('transactions', {header: 'Transactions Page',data_transactions: data})
  })
})

router.get('/delete/:id', (req, res) => {
  db.Transaction.destroy({
    where: {id:req.params.id}
  })
  .then( () => {
    res.redirect('/transactions')
  })
})

router.get('/add', (req, res)=> {
  db.Transaction.findAll({
    attributes: {include:['id']},
    include: [{all:true}]
  })
  .then( data1 => {
    db.User.findAll()
    .then( data2 => {
      db.Packets.findAll()
      .then(data3 => {
        res.render('add_transaction', {add_transactions: data1, data_user: data2, data_paket: data3})
      })
    })
  })
})

router.post('/add', (req, res) => {
  let data = req.body
  data_packet_arr = data.PacketId.split(',')
    db.Transaction.create({
      UserId: data.UserId,
      PacketId: data_packet_arr[0],
      tgl_pesan: data.tgl_pesan,
      tgl_selesai: data.tgl_selesai,
      berat: data.berat,
      harga: data_packet_arr[1]*data.berat,
      petugas_laundry: data.petugas_laundry,
      status: 'belum selesai',
      no_invoice: `laklin-${data.tgl_pesan}-${data.UserId}`
    })
    .then( () => {
      res.redirect('/transactions')
  })
})

router.get('/edit/:id', (req, res)=> {
  db.Transaction.findAll({
    attributes: { include:['id'] },
    where: {id:req.params.id},
    include: [{all:true}]
  })
  .then( data1 =>{
    db.User.findAll()
    .then( data2 => {
      db.Packets.findAll()
      .then( data3 => {
        let dateToStringPesan = data1[0].tgl_pesan.toISOString().split('T')[0];
        let dateToStringSelesai = data1[0].tgl_selesai.toISOString().split('T')[0];
        res.render('edit_transaction', {data_transaction: data1, data_users: data2, data_packets: data3, tgl_pesan: dateToStringPesan, tgl_selesai: dateToStringSelesai})
      })
    })
  })
})

router.post('/edit/:id', (req, res) => {
  let data = req.body
  let data_packet_arr = data.PacketId.split(',')
  db.Transaction.update({
    UserId: data.UserId,
    PacketId: data_packet_arr[0],
    tgl_pesan: data.tgl_pesan,
    tgl_selesai: data.tgl_selesai,
    berat: data.berat,
    harga: data_packet_arr[1]*data.berat,
    petugas_laundry: data.petugas_laundry,
    status: 'belum selesai',
    no_invoice: `laklin-${data.tgl_pesan}-${data.UserId}`
  },{
    where: {id:req.params.id}
  })
  .then( ()=> {
    res.redirect('/transactions')
  })
})

router.get('/editstatus/:id', (req,res)=> {
  db.Transaction.findAll(
  {
    attributes: {include: ['id']},
    where: {id:req.params.id}
  })
  .then( data => {
    res.render('editstatus', {data_status: data})
  })
})

router.post('/editstatus/:id', (req,res)=> {
  db.Transaction.update({
    status:req.body.PacketId
  },
  {
    where: {id:req.params.id}
  })
  .then( () => {
    res.redirect('/transactions')
  })
})

module.exports = router;
