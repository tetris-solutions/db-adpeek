exports.seed = function (knex, Promise) {
  return Promise.join(
    knex('midia').del(),
    knex('midia').insert({id: 'display', name: 'Display'}),
    knex('midia').insert({id: 'performance', name: 'Performance'}),
    knex('midia').insert({id: 'search', name: 'Search'}),
    knex('midia').insert({id: 'social', name: 'Social'}),
    knex('midia').insert({id: 'video', name: 'Video'})
  )
}
