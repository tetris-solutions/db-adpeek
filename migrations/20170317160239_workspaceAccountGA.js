exports.up = function (knex, Promise) {
  return knex.schema
    .table('workspace_account',
      function (table) {
        table.string('ga_property_id', 20)
        table.string('ga_property_name', 200)
        table.string('ga_view_id', 20)
        table.string('ga_view_name', 200)
      })
}

exports.down = function (knex, Promise) {
  return knex.schema.table('workspace_account',
    function (table) {
      table.dropColumn('ga_property_id')
      table.dropColumn('ga_property_name')
      table.dropColumn('ga_view_id')
      table.dropColumn('ga_view_name')
    })
}
