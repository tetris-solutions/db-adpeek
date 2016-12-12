exports.up = function (knex, Promise) {
  return knex.schema
    .raw('ALTER TABLE report_mailing ALTER COLUMN "schedule" DROP NOT NULL')
}

exports.down = function (knex, Promise) {
  return knex.schema
    .raw('ALTER TABLE report_mailing ALTER COLUMN "schedule" SET NOT NULL')
}
