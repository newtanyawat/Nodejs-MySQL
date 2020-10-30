const express = require('express')
const router = express.Router()

module.exports = router

router.post('/table' , async(req,res) =>{
    console.log(req.body);
    console.log("11saas2312321")
    let db = req.db
    let ids = await db('sensor').where({
        TEMP : req.body.temp
      }).select()

    res.json({
        data : ids
    })
})





