exports.up = function (knex, Promise) {
  return knex.schema
    .table('alias', function (table) {
      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
        .index()
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('alias', function (table) {
      table.dropColumn('creation')
    })
}
