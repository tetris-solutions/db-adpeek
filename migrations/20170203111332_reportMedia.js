exports.up = function (knex, Promise) {
  return knex.schema
    .table('report', function (table) {
      table.string('media', 20)
        .references('id')
        .inTable('media')
        .onDelete('cascade')
        .onUpdate('restrict')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('media', function (table) {
      table.dropColumn('media')
    })
}
