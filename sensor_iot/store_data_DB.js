const time_1 = require('node-cron')
const getdata = require('superagent')


const store_data = time_1.schedule('*/2 * * * * *', async() => { // (*second) (*minute) (*hour) (*day of month) (*month) (*day of week)
  try {
    let data_sensor = await getdata.get('http://192.168.1.120/getscale') // รับค่าจาก NODEMCU SENSOR DHT (TEMP,HUMI)
    //console.log("--------------------------------");
    let array_data = data_sensor.text
    if(array_data === "") {}
    else if (array_data === undefined) {console.log("undefined");}
    else{
      const knex = require('../lib/db')
      let ids = await knex('sensor').insert({
      TEMP: array_data.substring(8,13),
      HUMI: array_data.substring(23,28)
      })
    }
    
  } catch (error) {
    console.log("DHT sensor part  ======>" + error);
  }

});

exports.store_data = store_data;

