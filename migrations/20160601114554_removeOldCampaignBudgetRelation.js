exports.up = function (knex, Promise) {
  return knex.schema.table('campaign', function (table) {
    table.dropColumn('budget')
  })
}

exports.down = function (knex, Promise) {
  return Promise.reject('Not a thing')
}
