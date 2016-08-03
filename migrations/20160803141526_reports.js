exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('report',
      function (table) {
        table.uuid('id').primary()
        table.string('name', 50)
          .notNullable()

        table.string('level', 20)
          .notNullable()

        table.uuid('company')
        table.string('platform', 30)
          .references('id')
          .inTable('platform')
          .onDelete('restrict')
          .onUpdate('restrict')

        table.timestamp('creation')
          .notNullable()
          .defaultTo(knex.fn.now())
      })
    .createTable('module', function (table) {
      table.uuid('id').primary()

      table.string('name', 50)

      table.string('type', 20)
        .notNullable()

      table.jsonb('dimensions').notNullable()
      table.jsonb('filters').notNullable()
      table.jsonb('metrics').notNullable()

      table.smallint('rows')
        .unsigned()
        .notNullable()

      table.smallint('cols')
        .unsigned()
        .notNullable()

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .createTable('report_module', function (table) {
      table.uuid('id').primary()

      table.uuid('report')
        .references('id')
        .inTable('report')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('module')
        .references('id')
        .inTable('module')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .createTable('report_folder', function (table) {
      table.uuid('id').primary()

      table.uuid('report')
        .references('id')
        .inTable('report')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('folder')
        .references('id')
        .inTable('folder')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('user')

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('report_module')
    .dropTable('report_folder')
    .dropTable('module')
    .dropTable('report')
}
