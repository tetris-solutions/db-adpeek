exports.up = function (knex, Promise) {
  return knex.schema
    .table('module', function (table) {
      table.integer('limit')
      table.jsonb('sort')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('module', function (table) {
      table.dropColumn('limit')
      table.dropColumn('sort')
    })
}
