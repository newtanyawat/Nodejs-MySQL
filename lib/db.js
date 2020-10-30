const config = require('../config')

const knex = require('knex')({
  client: 'mysql',
  connection: config.db,
  debug: false
})

module.exports = knex
