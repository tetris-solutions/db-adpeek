exports.up = function (knex, Promise) {
  return knex.schema
    .table('workspace_role', function (table) {
      table.unique(['workspace', 'role'])
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
