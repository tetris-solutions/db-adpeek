exports.up = function (knex, Promise) {
  return knex.schema
    .table('report', function (table) {
      table.timestamp('last_update')
      table.uuid('author')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('report', function (table) {
      table.dropColumn('last_update')
      table.dropColumn('author')
    })
}
