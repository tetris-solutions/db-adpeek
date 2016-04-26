exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('midia', function (table) {
      table.string('id', 20).primary()
      table.string('name', 30).notNullable()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .table('folder', function (table) {
      table.string('midia', 20)
        .references('id')
        .inTable('midia')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()

      table.string('tag', 30)
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('folder', function (table) {
    table.dropColumn('tag')
    table.dropColumn('midia')
  })
}
