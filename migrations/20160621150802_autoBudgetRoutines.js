exports.up = function (knex, Promise) {
  return knex.schema
    .table('workspace', function (table) {
      table.string('timezone', 200)
        .defaultTo('America/Sao_Paulo')
        .notNullable()
    })
    .createTable('auto_budget_schedule',
      function (table) {
        table.uuid('id').primary()

        table.uuid('company')
          .notNullable()

        table.uuid('workspace')
          .references('id')
          .inTable('workspace')
          .onDelete('cascade')
          .onUpdate('restrict')

        table.string('platform', 30)
          .references('id')
          .inTable('platform')
          .onDelete('restrict')
          .onUpdate('restrict')
          .notNullable()

        table.unique(['company', 'workspace', 'platform'])

        table.string('schedule', 20)
          .notNullable()

        table.string('timezone', 200)
          .notNullable()

        table.timestamp('creation')
          .notNullable()
          .defaultTo(knex.fn.now())
      })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('auto_budget_schedule')
}
