exports.up = function (knex, Promise) {
  return knex.schema
    .table('hidden_workspace', function (table) {
      table.unique(['user', 'workspace'])
    })
    .table('hidden_folder', function (table) {
      table.unique(['user', 'folder'])
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('hidden_workspace', function (table) {
      table.dropUnique(['user', 'workspace'])
    })
    .table('hidden_folder', function (table) {
      table.dropUnique(['user', 'folder'])
    })
}
