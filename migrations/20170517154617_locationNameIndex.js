exports.up = function (knex, Promise) {
  return knex.schema
    .table('location_criteria', function (table) {
      table.index('name')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('location_criteria', function (table) {
      table.dropIndex('name')
    })
}
