exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('platform', function (table) {
      table.string('id', 30).primary()
      table.string('name', 30).notNullable()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .table('workspace_account', function (table) {
      table.string('external_name', 100).notNullable()
      table.string('external_company_name', 100)

      table.string('platform', 30)
        .references('id')
        .inTable('platform')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
