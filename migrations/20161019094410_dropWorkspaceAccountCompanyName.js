exports.up = function (knex, Promise) {
  return knex.schema
    .table('workspace_account', function (table) {
      table.dropColumn('company_name')
    })
}

exports.down = function (knex, Promise) {
  return Promise.reject('Cant')
}
