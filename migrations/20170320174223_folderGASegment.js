exports.up = function (knex, Promise) {
  return knex.schema.table('folder', function (table) {
    table.jsonb('ga_segment')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('folder', function (table) {
    table.dropColumn('ga_segment')
  })
}
