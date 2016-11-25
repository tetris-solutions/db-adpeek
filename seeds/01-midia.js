exports.seed = function (knex, Promise) {
  return Promise.join(
    knex('media').del(),
    knex('media').insert({id: 'display', name: 'Display'}),
    knex('media').insert({id: 'search', name: 'Search'}),
    knex('media').insert({id: 'social', name: 'Social'}),
    knex('media').insert({id: 'video', name: 'Video'}),
    knex('media').insert({id: 'performance', name: 'Performance'})
  )
}
