exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('location_criteria', function (table) {
      table.integer('id').unsigned().primary()

      table.string('name', 100).notNullable()
      table.string('canonical_name', 250).notNullable()

      table.integer('parent_id').unsigned().index()

      table.string('country_code', 2).notNullable()

      table.string('type', 50).notNullable()
      table.string('status', 50).notNullable()
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('location_criteria')
}
