var uuid = require('uuid').v4
var oneToMany = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; 
INSERT INTO budget_campaign ("id", "campaign", "budget") 
SELECT 
 uuid_generate_v4() AS "id",
  c.id AS campaign,
  c.budget
FROM campaign c
WHERE budget IS NOT NULL;`

exports.up = function (knex, Promise) {
  return knex.schema
    .createTable('budget_campaign', function (table) {
      table.uuid('id').primary()

      table.uuid('campaign')
        .references('id')
        .inTable('campaign')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.uuid('budget')
        .references('id')
        .inTable('budget')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()

      table.timestamp('creation')
        .notNullable()
        .defaultTo(knex.fn.now())
    })
    .raw(oneToMany)
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('budget_campaign')
}
