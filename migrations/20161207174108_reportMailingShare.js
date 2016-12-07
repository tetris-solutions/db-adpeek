exports.up = function (knex, Promise) {
  return knex.schema
    .table('report_mailing', function (table) {
      table.dropUnique(['user', 'report'])
      table.dropColumn('report')
      table.string('report_share', 14)
        .references('id')
        .inTable('report_share')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.unique(['report_share', 'user'])
    })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('report_mailing', function (table) {
    table.uuid('report')
      .references('id')
      .inTable('report')
      .onDelete('cascade')
      .onUpdate('restrict')
      .notNullable()
    table.unique(['user', 'report'])
    table.dropUnique(['report_share', 'user'])
    table.dropColumn('report_share')
  })
}
