exports.up = function (knex, Promise) {
  return knex.schema.table('campaign', function (table) {
    table.unique(['external_id', 'platform'])
  })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
