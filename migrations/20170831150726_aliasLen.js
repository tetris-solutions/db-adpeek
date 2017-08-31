exports.up = function (knex, Promise) {
  return knex.schema
    .raw(`
      ALTER TABLE "alias"
      ALTER "id" TYPE character varying(20);
    `)
}

exports.down = function (knex, Promise) {
  return knex.schema
    .raw(`
      ALTER TABLE "alias"
      ALTER "id" TYPE character varying(10);
    `)
}
