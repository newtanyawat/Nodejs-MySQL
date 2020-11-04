const time_0 = require('node-cron')
const getdata = require('superagent')

let checkSame = [""]

const store_pic = time_0.schedule('*/30 * * * * *', async() => { // (*second) (*minute) (*hour) (*day of month) (*month) (*day of week)
  try {
    let data_sensor = await getdata.get('http://192.168.1.124:8000/pic') 
    let array_data = data_sensor.text
    checkSame.push(array_data)
    if(checkSame[0]===checkSame[1]) {
              // ค่าซ่ำไม่เก็บค่า
              // console.log("same");
            }
    else if (checkSame[1] === "None") {
              console.log("text is => None");
    }
    else {
        // เก็บค่าลง db
        const knex = require('../lib/db')
        await knex('picture').insert({picture :array_data})
        // console.log("don't same")
      }
        checkSame.shift()
        // await getdata.get('http://192.168.1.124:8000/del')
  } catch (error) {
    console.log("Camera sensor part errror ======> " + error.message);
  }
})

exports.store_data = store_pic