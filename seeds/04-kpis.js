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
          /* disabled
           'click',
           'reach',
           'conversion',
           'engagement',
           'view',
           'fan', */

          // enabled
          'roas',
          'cpa',
          'view_rate',

          'ctr',
          'cpc',
          'cpv',
          'cpv100',
          'cpf',
          'cpe',
          'cpr'
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
    /*
     click: ['Clicks', 'Cliques'],
     reach: ['Reach', 'Alcance'],
     conversion: ['Conversions', 'Conversões'],
     engagement: ['Engagement', 'Engajamento'],
     view: ['Views', 'Visualizações'],
     fan: ['Fans', 'Fãs'],*/

    ctr: ['Click Through Rate', 'Click Through Rate'],
    cpc: ['Cost Per Click', 'Custo Por Clique'],
    cpv: ['Cost Per Video View', 'Custo Por Video View'],
    cpv100: ['Cost Per Full Video View', 'Custo por 100% Video View'],
    cpf: ['Cost Per Fan', 'Custo Por Fã'],
    cpe: ['Cost Per Engagement', 'Custo Por Engajamento'],
    cpr: ['Cost Per Reach', 'Custo Por Alcance'],
    view_rate: ['View rate', 'Taxa de visualização'],
    cpa: ['Cost Per Acquisition', 'Custo Por Conversão'],
    roas: ['Return Over Average Spent', 'Return Over Average Spent']
  }

  var mediaKpis = {
    display: [
      'ctr',
      'cpc',
      // 'reach',
      // 'click',
      // 'conversion'
    ],
    search: [
      'ctr',
      'cpc',
      'cpa'
      // 'click',
      // 'conversion',
      // 'view_rate'
    ],
    video: [
      'cpv',
      'cpv100',
      'view_rate',
      'cpe',
      'cpc'
      // 'engagement',
      // 'view',
      // 'click',
      // 'reach',
      // 'conversion'
    ],
    social: [
      'cpf',
      'cpc',
      'cpe',
      'cpr'
      // 'reach',
      // 'view',
      // 'engagement',
      // 'fan',
      // 'click',
      // 'conversion'
    ],
    performance: [
      'roas',
      'cpa',
      'cpc'
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
