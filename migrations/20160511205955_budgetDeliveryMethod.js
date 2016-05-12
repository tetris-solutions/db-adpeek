exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('delivery_method', function (table) {
      table.string('id', 30).primary()
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .createTable('delivery_method_name', function (table) {
      table.uuid('id').primary()

      table.string('locale', 5)
        .references('id')
        .inTable('locale')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.string('platform', 30)
        .references('id')
        .inTable('platform')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()

      table.string('delivery_method', 30)
        .references('id')
        .inTable('delivery_method')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.string('name', 40).notNullable()
      table.string('description', 200).notNullable()

      table.unique(['locale', 'platform', 'delivery_method'])
      table.timestamp('creation').notNullable().defaultTo(knex.fn.now())
    })
    .table('budget', function (table) {
      table.string('delivery_method', 30)
        .references('id')
        .inTable('delivery_method')
        .onDelete('restrict')
        .onUpdate('restrict')
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}

