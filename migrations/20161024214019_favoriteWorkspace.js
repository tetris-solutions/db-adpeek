exports.up = function (knex, Promise) {
  return knex.schema.createTable('favorite_workspace', function (table) {
    table.uuid('id').primary()

    table.uuid('workspace')
      .references('id')
      .inTable('workspace')
      .onDelete('cascade')
      .onUpdate('restrict')
      .notNullable()

    table.uuid('user').notNullable()

    table.unique(['user', 'workspace'])

    table.timestamp('creation')
      .notNullable()
      .defaultTo(knex.fn.now())
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('favorite_workspace')
}
