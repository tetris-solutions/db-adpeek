var campaignView = exports.campaignView = `
CREATE VIEW "v_campaign" AS
select 
  campaign.*,
  campaign_budget.budget
from campaign
left join (
  select budget_campaign.budget, budget_campaign.campaign
  from budget_campaign
  join budget on budget.id = budget_campaign.budget
  join "order" on "order"."id" = "budget"."order"
where 
  "order"."start" <= current_date
  AND "order"."end" >= current_date
) campaign_budget on campaign_budget.campaign = campaign.id`

exports.up = function (knex, Promise) {
  return knex.schema
    .raw(campaignView)
}

exports.down = function (knex, Promise) {
  return Promise.resolve()
}
