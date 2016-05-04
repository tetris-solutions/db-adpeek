exports.up = function (knex, Promise) {
  return knex.schema.table('status', function (table) {
    table.bool('is_active').notNullable()
  })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
