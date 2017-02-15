#!/usr/bin/env node

var operation = process.argv[2]
var operations = {
  'db:create': function () {
    require('../lib/db-create')
  },
  'db:migrate': function () {
    var conn = require('../')

    conn.migrate().then(function () {
      conn.db.destroy()
      process.exit()
    })
  },
  'db:seed': function () {
    var conn = require('../')

    conn.seed().then(function () {
      conn.db.destroy()
      process.exit()
    })
  }
}


require('dotenv').config({
  path: require('path').resolve(__dirname, '..', '.env'),
  silent: true
})

if (operations[operation]) {
  operations[operation]()
}
