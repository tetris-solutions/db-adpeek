var knex = require('knex')
var assign = require('lodash/assign')
var config = require('../knexfile')
var path = require('path')
var logger = require('./logger').logger
var serializeError = require('@tetris/serialize-error').serializeError

const env = process.env.NODE_ENV || 'development'
const database = config[env].connection.database
const knexConf = assign({}, config[env])

knexConf.connection.database = knexConf.connection.user

const db = knex(knexConf)

logger.notice('creating database', {
  category: 'event',
  event: 'database-creation-init',
  instance: knexConf.connection.host,
  database: database
})

db.raw('CREATE DATABASE ' + database)
  .then(function onDbCreated () {
    db.destroy()

    logger.notice('database creation complete', {
      category: 'event',
      event: 'database-creation-complete',
      instance: knexConf.connection.host,
      database: database
    })

    process.exit()
  })
  .catch(function (error) {
    logger.emerg('database creation failure', assign(serializeError(error), {
      category: 'event',
      event: 'database-creation-failure',
      instance: knexConf.connection.host,
      database: database
    }))

    process.exit()
  })
