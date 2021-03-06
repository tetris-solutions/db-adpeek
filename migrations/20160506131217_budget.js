exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('order', function (table) {
      table.uuid('id').primary()
      table.string('name', 50)

      table.date('start').notNullable()
      table.date('end').notNullable()

      table.uuid('folder')
        .references('id')
        .inTable('folder')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()

      table.decimal('amount', 12, 2).unsigned().notNullable()
      table.bool('auto_budget').notNullable()

      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('budget', function (table) {
      table.uuid('id').primary()

      table.string('name', 50)
      table.decimal('percentage', 5, 2).unsigned()
      table.decimal('amount', 12, 2).unsigned()

      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .table('campaign', function (table) {
      table.uuid('budget')
        .references('id')
        .inTable('budget')
        .onDelete('set null')
        .onUpdate('restrict')
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
