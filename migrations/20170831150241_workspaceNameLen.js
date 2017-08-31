exports.up = function (knex, Promise) {
  return knex.schema
    .raw(`
      ALTER TABLE "workspace"
      ALTER "name" TYPE character varying(250);
    `)
}

exports.down = function (knex, Promise) {
  return knex.schema
    .raw(`
      ALTER TABLE "workspace"
      ALTER "name" TYPE character varying(40);
    `)
}
