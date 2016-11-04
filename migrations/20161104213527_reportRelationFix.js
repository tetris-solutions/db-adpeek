exports.up = function (knex, Promise) {
  return knex.schema
    .raw('ALTER TABLE report_workspace ALTER COLUMN "user" DROP NOT NULL')
    .raw('ALTER TABLE report_company ALTER COLUMN "user" DROP NOT NULL')
    .raw('ALTER TABLE report_company ALTER COLUMN "company" SET NOT NULL')
}

exports.down = function (knex, Promise) {
  return knex.schema
    .raw('ALTER TABLE report_workspace ALTER COLUMN "user" SET NOT NULL')
    .raw('ALTER TABLE report_company ALTER COLUMN "user" SET NOT NULL')
}
