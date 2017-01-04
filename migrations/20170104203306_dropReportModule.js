exports.up = function (knex, Promise) {
  return knex.schema.dropTable('report_module')
}

exports.down = function (knex, Promise) {
  return knex.schema.createTable('report_module', require('./20160803141526_reports').report_module)
}
