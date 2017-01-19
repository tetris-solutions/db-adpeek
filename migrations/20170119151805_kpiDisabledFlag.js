exports.up = function (knex, Promise) {
  return knex.schema
    .table('kpi', function (table) {
      table.bool('disabled')
        .notNullable()
        .defaultTo(false)
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('kpi', function (table) {
      table.dropColumn('disabled')
    })
}
