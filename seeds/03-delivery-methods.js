var uuid = require('uuid').v4

exports.seed = function (knex, Promise) {
  function insertDescriptions () {
    return Promise.join(
      knex('delivery_method_name').del(),
      knex('delivery_method_name').insert([
        {
          id: uuid(),
          delivery_method: 'UNKNOWN',
          name: 'Unknown',
          platform: 'adwords',
          locale: 'en',
          description: 'Unknown delivery method'
        },
        {
          id: uuid(),
          delivery_method: 'STANDARD',
          name: 'Standard',
          platform: 'adwords',
          locale: 'en',
          description: 'The budget server will throttle serving evenly across the entire time period.'
        },
        {
          id: uuid(),
          delivery_method: 'ACCELERATED',
          platform: 'adwords',
          name: 'Accelerated',
          locale: 'en',
          description: 'The budget server will not throttle serving, and ads will serve as fast as possible.'
        },
        {
          id: uuid(),
          delivery_method: 'UNKNOWN',
          name: 'Desconhecido',
          platform: 'adwords',
          locale: 'pt-BR',
          description: 'Modo de entrega desconhecido'
        },
        {
          id: uuid(),
          delivery_method: 'STANDARD',
          platform: 'adwords',
          locale: 'pt-BR',
          name: 'Padrão',
          description: 'O orçamento será distribuído pela duração do período.'
        },
        {
          id: uuid(),
          delivery_method: 'ACCELERATED',
          locale: 'pt-BR',
          name: 'Acelerado',
          platform: 'adwords',
          description: 'O orçamento será entregue tão rápido quanto possível.'
        }
      ])
    )
  }

  return Promise.join(
    knex('delivery_method').del(),
    knex('delivery_method').insert({id: 'UNKNOWN'}),
    knex('delivery_method').insert({id: 'STANDARD'}),
    knex('delivery_method').insert({id: 'ACCELERATED'})).then(insertDescriptions);
};
