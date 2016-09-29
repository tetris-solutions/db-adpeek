var fs = require('fs')
exports.up = function (knex, Promise) {
  function readSql (name) {
    return fs.readFileSync(__dirname + '/sql/' + name + '.sql', {encoding: 'utf8'})
  }
  return knex.schema
    .raw('DROP TRIGGER IF EXISTS on_order_insertion ON "order";')
    .raw('DROP TRIGGER IF EXISTS on_order_update ON "order";')
    .raw(readSql('check_order_overlapping'))
    .raw(readSql('on_order_insertion'))
    .raw(readSql('on_order_update'))
}

exports.down = function (knex, Promise) {
  return knex.schema
    .raw('DROP TRIGGER IF EXISTS on_order_insertion ON "order";')
    .raw('DROP TRIGGER IF EXISTS on_order_update ON "order";')
    .raw('drop function check_order_overlapping();')
}
