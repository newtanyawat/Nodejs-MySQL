const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const utf8 = require('utf8')

module.exports = router


router.post('/register', async (req, res) => {
  try{  
  let db = req.db
  let hashpw = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10))
    let ids = await db('data-register').insert({
      email: req.body.userEmail,
      password: hashpw,
      fullname: req.body.Fullname
      })
         
    res.send({
      ok: "success",
      "Register number" : ids || {},
      "error" : ids.message,
      password : req.body.password,
      hashpw : hashpw
    })
  }catch (e) {res.send({ ok: false, error: e.message })}
    
  })

router.post('/login' , async (req,res) => {
  try {
    let db = req.db
    let ids = await db('data-register').where({
      email: req.body.email
    }).select()
      
    let check = req.body.password === ids[0].password
    let Qcheck = bcrypt.compareSync(req.body.password,ids[0].password)
    if(ids[0].email && Qcheck ) {res.json({ok: "success"})}
      else {res.json({ok: "fail"})}

  } catch (e) {res.send({ ok: false, error: e.message })}
})


router.all('/table-all' , async(req,res) => {
  let db = req.db
  let ids = await db('data-register').select()
  res.json({
    status : "ok",
    data : ids
  })
})

router.delete('/delete/:id', function (req, res) {
  req.db('data-register').where({id: req.params.id}).delete().then(() =>{
     res.send({status : "true"})
  }).catch(e => res.send({status: false, error: e.message}))
})


router.post('/update/:id', function (req, res) {
  console.log("==========> " + req.body.userEmail);
  console.log("==========> " + req.body.Fullname);
  console.log("==========> " + JSON.stringify(req.body));
  let db = req.db
  req.db('data-register').where({id: req.params.id}).update(
      { 
        email: req.body.userEmail,
        fullname: req.body.Fullname
      
      }).then(() =>{res.send({status: "true"})
  }).catch(e => res.send({status: false, error: e.message}))
})
