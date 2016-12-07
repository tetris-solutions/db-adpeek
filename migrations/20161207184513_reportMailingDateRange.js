exports.up = function (knex, Promise) {
  return knex.schema.table('report_mailing', function (table) {
    table.string('date_range', 20)
      .notNullable()
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('report_mailing', function (table) {
    table.dropColumn('date_range')
  })
}
