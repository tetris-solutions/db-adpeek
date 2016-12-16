exports.up = function (knex, Promise) {
  return knex.schema
    .table('module', function (table) {
      table.text('description')
    })
    .createTable('module_comment', function (table) {
      table.uuid('id').primary()
      table.uuid('module_relation').notNullable()
      table.uuid('module')
        .references('id')
        .inTable('module')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.text('body').notNullable()
      table.uuid('user').notNullable()
      table.date('date').notNullable()

      table.boolean('private')
        .notNullable()
        .defaultTo(false)

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('module', function (table) {
      table.dropColumn('description')
    })
    .dropTable('module_comment')
}
