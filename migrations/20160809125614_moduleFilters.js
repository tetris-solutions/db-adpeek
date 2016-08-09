exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('module_folder', function (table) {
      table.uuid('id').primary()

      table.uuid('folder')
        .references('id')
        .inTable('folder')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('module')
        .references('id')
        .inTable('module')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.unique(['folder', 'module'])

      table.jsonb('filters').notNullable()

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .table('module', function (table) {
      table.dropColumn('filters')
    })
}

exports.down = function (knex, Promise) {

}
