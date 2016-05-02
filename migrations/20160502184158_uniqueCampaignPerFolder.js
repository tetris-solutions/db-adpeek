exports.up = function (knex, Promise) {
  return knex.schema
    .table('campaign', function (table) {
      table.unique(['external_campaign', 'folder'])
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
