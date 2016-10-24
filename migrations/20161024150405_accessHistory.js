exports.up = function (knex, Promise) {
  return knex.schema.createTable('access_history', function (table) {
      table.uuid('company').notNullable()
      table.uuid('user').notNullable()

      table.uuid('workspace')
        .references('id')
        .inTable('workspace')
        .onDelete('cascade')
        .onUpdate('restrict')

      table.uuid('folder')
        .references('id')
        .inTable('folder')
        .onDelete('cascade')
        .onUpdate('restrict')

      table.uuid('order')
        .references('id')
        .inTable('order')
        .onDelete('cascade')
        .onUpdate('restrict')

      table.uuid('campaign')
        .references('id')
        .inTable('campaign')
        .onDelete('cascade')
        .onUpdate('restrict')

      table.uuid('report')
        .references('id')
        .inTable('report')
        .onDelete('cascade')
        .onUpdate('restrict')

      table.string('level', 20).notNullable()
      table.uuid('target').notNullable()

      table.timestamp('timestamp')
        .notNullable()
        .defaultTo(knex.fn.now())

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())

      table.primary(['target', 'user'])
      table.index('timestamp')
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('access_history')
}
