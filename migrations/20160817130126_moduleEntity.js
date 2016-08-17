exports.up = function (knex, Promise) {
  return knex.schema
    .table('module', function (table) {
      table.string('entity', 30)
        .notNullable()
        .defaultTo('Campaign')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('module', function (table) {
      table.dropColumn('entity')
    })
}
