exports.up = function (knex, Promise) {
  return knex.schema
    .table('campaign', function (table) {
      table.string('platform', 30)
        .references('id')
        .inTable('platform')
        .onDelete('restrict')
        .onUpdate('restrict')
        .notNullable()

      table.string('external_name', 100).notNullable()
      table.string('external_status', 30).notNullable()
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
