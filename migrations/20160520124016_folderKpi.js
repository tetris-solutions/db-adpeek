exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('kpi', function (table) {
      table.string('id', 30).primary()
      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .createTable('media_kpi', function (table) {
      table.uuid('id').primary()

      table.string('kpi', 30)
        .references('id')
        .inTable('kpi')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.string('media', 20)
        .references('id')
        .inTable('media')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()

      table.unique(['kpi', 'media'])

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .createTable('kpi_name', function (table) {
      table.uuid('id').primary()

      table.string('kpi', 30)
        .references('id')
        .inTable('kpi')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.string('locale', 5)
        .references('id')
        .inTable('locale')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.string('name', 150).notNullable()

      table.unique(['kpi', 'locale'])

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .table('folder', function (table) {
      table.string('kpi', 30)
        .references('id')
        .inTable('kpi')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
