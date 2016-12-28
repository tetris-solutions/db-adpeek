exports.up = function (knex, Promise) {
  return knex.schema
    .table('folder', function (table) {
      table.decimal('kpi_goal', 12, 2)
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('folder', function (table) {
      table.dropColumn('kpi_goal')
    })
}
