exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('locale', function (table) {
      table.string('id', 5).primary()
      table.string('name', 30).notNullable().index()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('status', function (table) {
      table.uuid('id').primary()

      table.string('name', 40)
      table.string('platform', 30)
        .references('id')
        .inTable('platform')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()

      table.unique(['name', 'platform'])

      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('status_description', function (table) {
      table.uuid('id').primary()

      table.string('locale', 5)
        .references('id')
        .inTable('locale')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('status')
        .references('id')
        .inTable('status')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.string('description', 200).notNullable().index()

      table.unique(['locale', 'status'])
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .table('campaign', function (table) {
      table.renameColumn('external_campaign', 'external_id')
      table.renameColumn('external_name', 'name')
      table.dropColumn('external_status')


      table.string('status', 40).notNullable()
      table.string('sub_status', 40)
    })
    .table('workspace_account', function (table) {
      table.renameColumn('tetris_account', 'tetris_id')
      table.renameColumn('external_account', 'external_id')
      table.renameColumn('external_name', 'name')
      table.renameColumn('external_company_name', 'company_name')
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
