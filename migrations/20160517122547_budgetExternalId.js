exports.up = function (knex, Promise) {
  return knex.schema.table('budget', function (table) {
    table.string('external_id', 40)
  })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
