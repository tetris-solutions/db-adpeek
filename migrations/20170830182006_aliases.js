exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('alias', function (table) {
      table.string('id', 10).primary()
      table.uuid('target').index()
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('alias')
}
