var uuid = require('uuid').v4
var map = require('lodash/map')
var flatten = require('lodash/flatten')

exports.seed = function (knex, Promise) {
  function insertKpis () {
    function kpi (id) {
      return {id: id}
    }

    return Promise.join(
      knex('kpi').del(),
      knex('kpi')
        .insert([
          'click',
          'reach',
          'conversion',
          'view_rate',
          'engagement',
          'view',
          'fan',
          'cpa',
          'roas'
        ].map(kpi)),
      knex('kpi_name').del(),
      knex('media_kpi').del()
    )
  }

  function mediaKpi (media, kpis) {
    return kpis.map(function (kpi) {
      return {
        id: uuid(),
        media: media,
        kpi: kpi
      }
    })
  }

  var locales = ['en', 'pt-BR']
  var kpiNames = {
    click: ['Clicks', 'Cliques'],
    reach: ['Reach', 'Alcance'],
    conversion: ['Conversions', 'Conversões'],
    view_rate: ['View rate', 'Taxa de visualização'],
    engagement: ['Engagement', 'Engajamento'],
    view: ['Views', 'Visualizações'],
    fan: ['Fans', 'Fãs'],
    cpa: ['Cost Per Acquisition', 'Custo Por Aquisição'],
    roas: ['Return Over Average Spent', 'ROAS']
  }

  var mediaKpis = {
    display: [
      'reach',
      'click',
      'conversion'
    ],
    search: [
      'click',
      'conversion',
      'view_rate'
    ],
    video: [
      'engagement',
      'view',
      'click',
      'reach',
      'conversion'
    ],
    social: [
      'reach',
      'view',
      'engagement',
      'fan',
      'click',
      'conversion'
    ],
    performance: [
      'roas',
      'cpa'
    ]
  }

  function insertKpiNames () {
    return knex('kpi_name').insert(flatten(map(kpiNames, function (names, kpi) {
      return names.map(function (name, index) {
        return {
          id: uuid(),
          locale: locales[index],
          name: name,
          kpi: kpi
        }
      })
    })))
  }


  function insertMediaKpis () {
    return knex('media_kpi').insert(flatten(map(mediaKpis, function (kpis, media) {
      return kpis.map(function (kpi) {
        return {
          id: uuid(),
          kpi: kpi,
          media: media
        }
      })
    })))
  }

  return insertKpis()
    .then(insertKpiNames)
    .then(insertMediaKpis)
};
