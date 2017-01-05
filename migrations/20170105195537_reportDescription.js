exports.up = function (knex, Promise) {
  return knex.schema
    .table('report', function (table) {
      table.text('description')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('report', function (table) {
      table.dropColumn('description')
    })
}
