exports.up = function (knex, Promise) {
  return knex.schema.table('report_mailing', function (table) {
    table.string('locale', 5)
      .references('id')
      .inTable('locale')
      .onDelete('cascade')
      .onUpdate('restrict')
      .notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('report_mailing', function (table) {
    table.dropColumn('locale')
  })
}
