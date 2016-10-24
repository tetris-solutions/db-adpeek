exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('access_history', function (table) {
      table.uuid('company').notNullable()

      table.string('level', 20).notNullable()
      table.uuid('target').notNullable()

      table.timestamp('timestamp')
        .notNullable()
        .defaultTo(knex.fn.now())

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())

      table.primary(['level', 'target'])
      table.index('timestamp')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('access_history')
}
