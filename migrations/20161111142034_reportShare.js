exports.up = function (knex, Promise) {
  return knex.schema.createTable('report_share', function (table) {
    table.string('id', 14)
      .primary()

    table.uuid('report')
      .references('id')
      .inTable('report')
      .onDelete('cascade')
      .onUpdate('restrict')
      .notNullable()

    table.uuid('company').notNullable()

    table.uuid('workspace')
      .references('id')
      .inTable('workspace')
      .onDelete('cascade')
      .onUpdate('restrict')

    table.uuid('folder')
      .references('id')
      .inTable('folder')
      .onDelete('cascade')
      .onUpdate('restrict')

    table.timestamp('creation')
      .notNullable()
      .defaultTo(knex.fn.now())

    table.unique(['report', 'company', 'workspace', 'folder'])
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('report_share')
}
