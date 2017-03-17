exports.seed = function (knex, Promise) {
  return Promise.join(
    knex('locale').del(),
    knex('locale').insert([
      {
        id: 'pt-BR',
        name: 'Português'
      },
      {
        id: 'en',
        name: 'English'
      }
    ])
  )
}
