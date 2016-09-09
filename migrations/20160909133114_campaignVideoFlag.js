exports.up = function (knex, Promise) {
  return knex.schema
    .table('campaign', function (table) {
      table.bool('is_adwords_video')
        .notNullable()
        .defaultTo(false)
    })
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('campaign', function (table) {
      table.dropColumn('is_adwords_video')
    })
}
