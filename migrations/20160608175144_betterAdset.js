var campaignView = require('./20160601122225_vCampaign').campaignView
var adsetView = `
CREATE VIEW "v_adset" AS
select 
  adset.*,
  adset_budget.budget
from adset
left join (
  select budget_adset.budget, budget_adset.adset
  from budget_adset
  join budget on budget.id = budget_adset.budget
  join "order" on "order"."id" = "budget"."order"
where 
  "order"."start" <= current_date
  AND "order"."end" >= current_date
) adset_budget on adset_budget.adset = adset.id`

exports.up = function (knex, Promise) {
  return knex.schema
    .raw('DROP VIEW v_campaign;')
    .raw(`
      ALTER TABLE "adset"
      ALTER "name" TYPE character varying(250);
    `)
    .raw(`
      ALTER TABLE "campaign"
      ALTER "name" TYPE character varying(250);
    `)
    .raw(`
      ALTER TABLE "budget"
      ALTER "name" TYPE character varying(250);
    `)
    .raw(campaignView)
    .raw(adsetView)
    .table('adset', function (table) {
      table.string('status', 40).notNullable()
      table.string('sub_status', 40)

      table.uuid('campaign')
        .references('id')
        .inTable('campaign')
        .onDelete('cascade')
        .onUpdate('restrict')
        .notNullable()
    })
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
