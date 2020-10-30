const express = require('express')
const router = express.Router()

module.exports = router

router.use('/authen', require('./authen'))
router.use('/employ', require('./employ'))
router.use('/sensor', require('./sensor'))