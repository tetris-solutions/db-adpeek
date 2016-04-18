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

if (operations[operation]) {
  operations[operation]()
}
