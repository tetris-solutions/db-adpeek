exports.up = function (knex, Promise) {
  return knex.schema
    .table('workspace_account', function (table) {
      table.unique(['workspace', 'platform'])
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
