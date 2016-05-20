var uuid = require('uuid').v4
var map = require('lodash/map')
var omit = require('lodash/omit')
var assign = require('lodash/assign')

var statuses = [
  {
    id: uuid(),
    name: 'UNKNOWN',
    platform: 'adwords',
    description: {
      en: 'Unknown status',
      'pt-BR': 'Status desconhecido'
    }
  },
  {
    id: uuid(),
    name: 'ENABLED',
    is_active: true,
    platform: 'adwords',
    description: {
      en: 'Campaign is currently serving ads depending on budget information',
      'pt-BR': 'Campanha está habilitada'
    }
  },
  {
    id: uuid(),
    name: 'PAUSED',
    platform: 'adwords',
    description: {
      en: 'Campaign has been paused by the user',
      'pt-BR': 'Campanha foi pausada'
    }
  },
  {
    id: uuid(),
    name: 'REMOVED',
    platform: 'adwords',
    description: {
      en: 'Campaign has been removed',
      'pt-BR': 'A campanha foi removida'
    }
  },
  {
    id: uuid(),
    name: 'SERVING',
    is_active: true,
    platform: 'adwords',
    description: {
      en: 'The campaign is currently serving ads',
      'pt-BR': 'A campanha está sendo exibida'
    }
  },
  {
    id: uuid(),
    name: 'NONE',
    platform: 'adwords',
    description: {
      en: 'This is the catch-all if none of the other statuses make sense. Such a campaign is not serving, but none of the other statuses are sensible options',
      'pt-BR': 'Status não identificado'
    }
  },
  {
    id: uuid(),
    name: 'ENDED',
    platform: 'adwords',
    description: {
      en: 'The campaign end date has been past',
      'pt-BR': 'A campanha passou da data limite'
    }
  },
  {
    id: uuid(),
    name: 'PENDING',
    platform: 'adwords',
    is_active: true,
    description: {
      en: 'The campaign start date has not yet been reached',
      'pt-BR': 'A data de ínicio da campanha ainda não foi atingida'
    }
  },
  {
    id: uuid(),
    name: 'SUSPENDED',
    platform: 'adwords',
    description: {
      en: 'The campaign has been suspended probably from lack of allocated funds',
      'pt-BR': 'A campanha foi suspensa, provavelmente por falta de fundos'
    }
  },
  {
    id: uuid(),
    name: 'ACTIVE',
    is_active: true,
    platform: 'facebook',
    description: {
      en: 'The campaign is active and showing ads',
      'pt-BR': 'A campanha está sendo exibida'
    }
  },
  {
    id: uuid(),
    name: 'PAUSED',
    platform: 'facebook',
    description: {
      en: 'The campaign is paused',
      'pt-BR': 'A campanha está parada'
    }
  },
  {
    id: uuid(),
    name: 'ARCHIVED',
    platform: 'facebook',
    description: {
      en: 'The campaign has been archived',
      'pt-BR': 'A campanha foi arquivada'
    }
  },
  {
    id: uuid(),
    name: 'DELETED',
    platform: 'facebook',
    description: {
      en: 'The campaign has been deleted',
      'pt-BR': 'A campanha foi apagada'
    }
  },
  {
    id: uuid(),
    name: 'PENDING_REVIEW',
    platform: 'facebook',
    description: {
      en: 'The campaigns is waiting review',
      'pt-BR': 'A campanha está aguardando review'
    }
  },
  {
    id: uuid(),
    name: 'DISAPPROVED',
    platform: 'facebook',
    description: {
      en: 'The campaign was not approved',
      'pt-BR': 'A campanha não foi aprovada'
    }
  },
  {
    id: uuid(),
    name: 'PREAPPROVED',
    platform: 'facebook',
    description: {
      en: 'The campaign has been pre-approved',
      'pt-BR': 'A campanha foi pré-aprovada'
    }
  },
  {
    id: uuid(),
    name: 'PENDING_BILLING_INFO',
    platform: 'facebook',
    description: {
      en: 'This campaign has pending billing information',
      'pt-BR': 'Faltam dados de pagamento da campanha'
    }
  },
  {
    id: uuid(),
    name: 'CAMPAIGN_PAUSED',
    platform: 'facebook',
    description: {
      en: 'The campaign has been paused',
      'pt-BR': 'A campanha foi pausada'
    }
  },
  {
    id: uuid(),
    name: 'ADSET_PAUSED',
    platform: 'facebook',
    description: {
      en: 'This ADSet has been paused',
      'pt-BR': 'Esse conjunto de ads foi pausado'
    }
  }
]

exports.seed = function (knex, Promise) {
  function insertDescription (status) {
    if (!status.description) return Promise.resolve()

    return Promise.all(map(status.description, function (description, locale) {
      return knex('status_description').insert({
        id: uuid(),
        status: status.id,
        locale: locale,
        description: description
      })
    }))
  }

  function insertStatus (status) {
    return knex('status').insert(
      assign({is_active: false}, omit(status, 'description'))
    )
  }

  return Promise.all([
    knex('status').del(),
    knex('status_description').del(),
    knex('platform').del(),
    knex('platform').insert({id: 'facebook', name: 'Facebook'}),
    knex('platform').insert({id: 'adwords', name: 'Google AdWords'})
  ]).then(function () {
    return Promise.all(map(statuses, insertStatus))
      .then(function () {
        return Promise.all(map(statuses, insertDescription))
      })
  })
}
