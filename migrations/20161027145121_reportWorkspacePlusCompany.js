var curry = require('lodash/curry')

exports.up = function (knex, Promise) {
  var link = curry(function (entity, table) {
    table.uuid('id').primary()

    table.uuid('report')
      .references('id')
      .inTable('report')
      .onDelete('cascade')
      .onUpdate('restrict')
      .notNullable()

    var col = table.uuid(entity)

    if (entity !== 'company') {
      col.references('id')
        .inTable(entity)
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()
    }

    table.uuid('user').notNullable()

    table.unique([entity, 'user'])

    table.timestamp('creation')
      .notNullable()
      .defaultTo(knex.fn.now())
  })

  var filter = curry(function (entity, table) {
    table.uuid('id').primary()

    var col = table.uuid(entity)

    if (entity !== 'company') {
      col.references('id')
        .inTable(entity)
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()
    }

    table.uuid('module')
      .references('id')
      .inTable('module')
      .onDelete('cascade')
      .onUpdate('restrict')
      .notNullable()

    table.unique([entity, 'module'])

    table.jsonb('filters').notNullable()

    table.timestamp('creation')
      .notNullable()
      .defaultTo(knex.fn.now())
  })

  return knex.schema
    .createTable('report_workspace', link('workspace'))
    .createTable('module_workspace', filter('workspace'))
    .createTable('report_company', link('company'))
    .createTable('module_company', filter('company'))
}

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTable('report_workspace')
    .dropTable('module_workspace')
    .dropTable('report_company')
    .dropTable('module_company')
}
