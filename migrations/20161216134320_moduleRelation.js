exports.up = function (knex, Promise) {
  return knex.schema.table('module_comment', function (table) {
    table.dropColumn('module_relation')

    table.uuid('module_folder')
      .references('id')
      .inTable('module_folder')
      .onDelete('cascade')
      .onUpdate('restrict')

    table.uuid('module_workspace')
      .references('id')
      .inTable('module_workspace')
      .onDelete('cascade')
      .onUpdate('restrict')

    table.uuid('module_company')
      .references('id')
      .inTable('module_company')
      .onDelete('cascade')
      .onUpdate('restrict')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('module_comment', function (table) {
      table.uuid('module_relation').notNullable()
      table.dropColumn('module_folder')
      table.dropColumn('module_workspace')
      table.dropColumn('module_company')
    })
}
