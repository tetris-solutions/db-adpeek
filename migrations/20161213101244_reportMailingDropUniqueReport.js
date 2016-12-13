exports.up = function (knex, Promise) {
  return knex.schema.table('report_mailing', function (table) {
    table.dropUnique(['report_share', 'user'])
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('report_mailing', function (table) {
    table.unique(['report_share', 'user'])
  })
}
