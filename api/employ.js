const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
const utf8 = require('utf8')
const bcrypt = require('bcrypt') // เข้ารหัส password และ compared
const {base64_encode,hashPassword,comparedHashPassword} = require('../function/function_index')

module.exports = router

router.post('/uploadphoto/:id', function (req, res) { //http://localhost:3000/api/employ/uploadphoto/24
  req.db('data-employ').where({id: req.params.id}).update(
      { 
          picture : req.body.images
      }).then(() =>{
     res.send({ok: true})
  }).catch(e => res.send({status: false, error: e.message}))
})


router.post('/insert', async (req, res) => {
  try{    
  let db = req.db
    let ids = await db('data-employ').insert({
      email: req.body.userEmail,
      tel: req.body.tel,
      name: req.body.name,
      surname: req.body.surname,
      id_emp: req.body.id_emp
      }).select()
         
    res.send({
      ok: "success",
      "Register number" : ids || {},
    })
  }catch (e) {
    console.log(e.sqlMessage);
    res.send({ ok: false, error: e.message })}
    
  })
  //------------------------------------------------//


  // #  ลบข้อมูล  //

  // test by http://localhost:3000/api/employ/delete/7 //

  router.delete('/delete/:id', function (req, res) {
    req.db('data-employ').where({id: req.params.id}).delete().then(() =>{
       res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
  })

   //------------------------------------------------//


   router.post('/update/:id', function (req, res) {
    req.db('data-employ').where({id: req.params.id}).update(
        { 
            email: req.body.userEmail,
            tel: req.body.tel,
            name: req.body.name,
            surname: req.body.surname
        
        }).then(() =>{
       res.send({status: true})
    }).catch(e => res.send({status: false, error: e.message}))
  })

// check emtry photo
  router.post('/insert3', async (req, res) => {
    try{
    console.log(req.body);
    if(JSON.stringify(req.body) === "[]"){
      console.log("-------------- UPLOAD Fail emtry Photo ------------------")
      res.send({ok: "upload - EMTRY"})
    }
    else{
      console.log(req.body);
      console.log("---------------------- UPLOAD SECCESS  ------------------")
      res.send({ok: "upload - SECCESS"})
    } 
    }catch (e) {res.send({ ok: false, error: e.message })}
    })