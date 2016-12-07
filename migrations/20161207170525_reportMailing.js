exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('report_mailing', function (table) {
      table.uuid('id').primary()
      table.uuid('user').notNullable()

      table.uuid('report')
        .references('id')
        .inTable('report')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.string('schedule', 20)
        .notNullable()
        .unique()

      table.jsonb('emails')
        .notNullable()

      table.bool('disabled')
        .notNullable()
        .defaultTo(false)

      table.unique(['user', 'report'])

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .createTable('report_mailing_unsubscription', function (table) {
      table.uuid('id').primary()
      table.string('email', 100).notNullable()

      table.uuid('report_mailing')
        .references('id')
        .inTable('report_mailing')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.unique(['email', 'report_mailing'])

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('report_mailing_unsubscription')
    .dropTable('report_mailing')
}
