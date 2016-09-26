exports.up = function (knex, Promise) {
  return knex.schema.table('workspace', function (table) {
    table.string('dash_campaign', 40)
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('workspace', function (table) {
    table.dropColumn('dash_campaign')
  })
}
