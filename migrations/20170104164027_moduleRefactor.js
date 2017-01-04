exports.up = function (knex, Promise) {
  return knex.schema.table('module', function (table) {
    table.uuid('report')
      .references('id')
      .inTable('report')
      .onDelete('cascade')
      .onUpdate('restrict')

    table.smallint('x').unsigned()
    table.smallint('y').unsigned()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('module', function (table) {
    table.dropColumn('report')
    table.dropColumn('x')
    table.dropColumn('y')
  })
}
