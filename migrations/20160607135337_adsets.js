exports.up = function (knex, Promise) {
  return knex.schema
    .table('budget_campaign', function (table) {
      table.unique(['campaign', 'budget'])
    })
    .createTable('adset', function (table) {
      table.uuid('id').primary()
      table.string('name', 100).notNullable()
      table.string('external_id', 40).notNullable().unique()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('budget_adset', function (table) {
      table.uuid('id').primary()

      table.uuid('adset')
        .references('id')
        .inTable('adset')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('budget')
        .references('id')
        .inTable('budget')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.unique(['adset', 'budget'])

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
}

exports.down = function (knex, Promise) {
  return Promise.reject('Not even wrong')
}
