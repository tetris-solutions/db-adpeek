exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('workspace', function (table) {
      table.uuid('id').primary()
      table.uuid('company').notNullable().index()
      table.string('name', 40).notNullable()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('workspace_role', function (table) {
      table.uuid('id').primary()

      table.uuid('workspace')
        .references('id')
        .inTable('workspace')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('role').notNullable().index()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('platform', function (table) {
      table.string('id', 30).primary()
      table.string('name', 30).notNullable()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('workspace_account', function (table) {
      table.uuid('id').primary()

      table.uuid('tetris_account').notNullable()
      table.string('external_account', 40).notNullable()

      table.uuid('workspace')
        .references('id')
        .inTable('workspace')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.string('external_name', 100).notNullable()
      table.string('external_company_name', 100)

      table.string('platform', 30)
        .references('id')
        .inTable('platform')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()

      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('folder', function (table) {
      table.uuid('id').primary()
      table.string('name', 50).notNullable()

      table.uuid('workspace')
        .references('id')
        .inTable('workspace')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('workspace_account')
        .references('id')
        .inTable('workspace_account')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('campaign', function (table) {
      table.uuid('id').primary()
      table.string('external_campaign', 40).notNullable()

      table.uuid('folder')
        .references('id')
        .inTable('folder')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('campaign')
    .dropTable('folder')
    .dropTable('workspace_account')
    .dropTable('platform')
    .dropTable('workspace_role')
    .dropTable('workspace')
}
