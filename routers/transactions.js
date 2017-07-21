const express = require('express');
const db = require('../models');
const nodemailer = require('nodemailer');
const Nexmo = require('nexmo');

var router = express.Router();

const nexmo = new Nexmo ({
  apiKey: 'f3fd377e',
  apiSecret: 'c5f941db19e7f7b2'
})

var smtpTransport = nodemailer.createTransport({
  service: "smtp2go",
  host: "mail.smtp2go.com",
  port: 2525,
  auth: {
    user: "theryoto07@gmail.com",
    pass: "2ZktCgak1TB4"
  }
});

router.use((req,res,next)=> {
  if(req.session.user.role == 'admin'){
     next();
  } else {
    res.send('Maaf anda tidak diizinkan mengakses halaman ini');
  }
})

router.get('/', (req, res) => {
  db.Transaction.findAll({
    attributes: {include: ['id']},
    include: [{all:true}],
    order: [['tgl_pesan', 'ASC']]
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
    include: [{all:true}],
    where: {id:req.params.id}
  })
  .then( data => {
    res.render('editstatus', {data_status: data})
  })
})

router.post('/editstatus/:id', (req,res)=> {
  if (req.body.PacketId == 'selesai') {
    nexmo.message.sendSms(
    '+6285219476208',req.body.no_telp, req.body.content,(err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    })
    var mailOptions={
      from: 'no-reply@laklin.com',
      to : req.body.email,
      subject : 'Notifikasi LaKlin',
      text : req.body.content
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
      if(error){
        console.log(error);
        res.end("error");
      }else{
        console.log("Message sent: " + response.message);
        res.end("sent");
      }
    })
    db.Transaction.update({
      status:req.body.PacketId
    },
    {
      where: {id:req.params.id}
    })
    .then( () => {
      res.redirect('/transactions')
    })
  } else {
    db.Transaction.update({
      status:req.body.PacketId
    },
    {
      where: {id:req.params.id}
    })
    .then( () => {
      res.redirect('/transactions')
    })
  }
})

module.exports = router;
