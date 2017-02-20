exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('location_criteria', function (table) {
      table.string('id', 20).primary()
      table.string('name', 10).notNullable()
      table.string('canonical_name', 50).notNullable()
      table.string('parent_id', 10).index().notNullable()
      table.string('country_code', 5).notNullable()
      table.string('type', 20).notNullable()
      table.string('status', 10).notNullable()
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('location_criteria')
}
