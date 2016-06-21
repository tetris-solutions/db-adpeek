exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('auto_budget_schedule',
      function (table) {
        table.uuid('id').primary()

        table.string('company', 40)
          .notNullable()

        table.string('schedule', 20)
          .notNullable()

        table.string('platform', 30)
          .references('id')
          .inTable('platform')
          .onDelete('restrict')
          .onUpdate('restrict')
          .notNullable()

        table.unique(['company', 'platform'])

        table.timestamp('creation')
          .notNullable()
          .defaultTo(knex.fn.now())
      })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('auto_budget_schedule')
}
