const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')
// const {store_data} = require('./sensor_iot/store_data_DB')
// const store_pic = require('./sensor_iot/store_data_DB')

var app = express()

module.exports = router

app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: true}));

app.options('*', cors())
app.use(cors())

app.use((req, res, next) => {
  req.db = require('./lib/db')
  next()
})

app.use('/api', require('./api'))

// store_data
// store_pic



app.listen(3000 , () => {
console.log('server start on Port 3000');
});