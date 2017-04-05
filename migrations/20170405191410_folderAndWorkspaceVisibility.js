exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('hidden_folder', function (table) {
      table.uuid('id').primary()
      table.uuid('user').notNullable()
      table.uuid('folder')
        .references('id')
        .inTable('folder')
        .onDelete('cascade')
        .onUpdate('cascade')
        .notNullable()
      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .createTable('hidden_workspace', function (table) {
      table.uuid('id').primary()
      table.uuid('user').notNullable()
      table.uuid('workspace')
        .references('id')
        .inTable('workspace')
        .onDelete('cascade')
        .onUpdate('cascade')
        .notNullable()
      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('hidden_folder')
    .dropTable('hidden_workspace')
}
