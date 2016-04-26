exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('media', function (table) {
      table.string('id', 20).primary()
      table.string('name', 30).notNullable()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .table('folder', function (table) {
      table.string('media', 20)
        .references('id')
        .inTable('media')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()

      table.string('tag', 30)
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('folder', function (table) {
      table.dropColumn('tag')
      table.dropColumn('media')
    })
    .dropTable('media')
}
