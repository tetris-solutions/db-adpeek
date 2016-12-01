exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('update_stats_schedule',
      function (table) {
        table.uuid('id').primary()

        table.uuid('company')
          .notNullable()
          .unique()

        table.string('schedule', 20)
          .notNullable()

        table.timestamp('creation')
          .notNullable()
          .defaultTo(knex.fn.now())
      })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('update_stats_schedule')
}
