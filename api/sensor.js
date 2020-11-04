const express = require('express')
const router = express.Router()
const getdata = require('superagent')

module.exports = router

// api/sensor/table_all
router.get('/table_all' , async(req,res) =>{
    // console.log(req.body);
    let db = req.db
    let ids = await db('sensor').where({}).select()
    res.json({
        data : ids
    })
})

router.post('/table_select' , async(req,res) =>{
    try {
    // console.log(req.body)
    let db = req.db
    let ids = await db('sensor').where({
        TEMP : req.body.temp,
        HUMI : req.body.humi
      }).select()

    res.json({
        data : ids
    })
        
    } catch (error) {
        console.log("Error from table_select");
        res.json({
            status : "Error from table_select",
            error : error.message
        })
    }
    
})

// api/senser/cap
router.post('/cap', async(req,res) =>{
    try {
    let data_sensor = await getdata.get('http://192.168.1.124:8000/cap')
    // console.log("cap path");
    let db = req.db
    let ids = await db('Capture_photo').insert({
        picture : data_sensor.text
    })
    res.json({
        ok : "success",
        id : ids,
        data : data_sensor.text
        // data : data_sensor.text
    })
    } catch (error) {
        console.log("Error from path cap ==> " + error);
        res.send(error)   
    }
})

router.get('/Qcap', async(req,res) =>{
    try {
    let db = req.db
    let ids = await db('Capture_photo').max('id')
    // console.log(ids[0]['max(`id`)']);
    let data = await db('Capture_photo').where({ id :ids[0]['max(`id`)']})
    res.json({
        ok : "success",
        data : data
    })
    } catch (error) {
        console.log("Error from path cap ==> " + error);
        res.send(error)   
    }
})


router.get('/last_photo_2' , async(req,res) =>{
    try {
    let db = req.db
    let ids = await db('picture').max('id')
    let value = (ids[0]['max(`id`)']);
    let picture = await db('picture').where({id : value})

    res.json({data : picture})      
    } catch (error) {
        console.log("Error from last_photo");
        res.json({
            status : "Error from last_photo",
            error : error.message
        })
    }
    
})










