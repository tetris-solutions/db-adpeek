exports.up = function (knex, Promise) {
  return knex.schema
    .table('budget', function (table) {
      table.uuid('order')
        .references('id')
        .inTable('order')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
