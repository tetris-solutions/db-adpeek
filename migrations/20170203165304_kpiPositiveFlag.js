exports.up = function (knex, Promise) {
  return knex.schema
    .table('kpi', function (table) {
      table.bool('positive')
        .defaultTo(true)
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('kpi', function (table) {
      table.dropColumn('positive')
    })
}
