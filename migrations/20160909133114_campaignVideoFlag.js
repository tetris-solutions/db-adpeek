var campaignView = require('./20160601122225_vCampaign').campaignView

exports.up = function (knex, Promise) {
  return knex.schema
    .table('campaign', function (table) {
      table.bool('is_adwords_video')
        .notNullable()
        .defaultTo(false)
    })
    .raw('DROP VIEW v_campaign;')
    .raw(campaignView)
}

exports.down = function (knex, Promise) {
  return knex.schema
    .table('campaign', function (table) {
      table.dropColumn('is_adwords_video')
    })
}
