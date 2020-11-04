const express = require('express')
const router = express.Router()

module.exports = router

router.use('/authen', require('./authen'))
router.use('/employ', require('./employ'))
router.use('/sensor', require('./sensor'))

const store_data = require('../sensor_iot/store_data_DB')
const store_pic = require('../sensor_iot/camera')