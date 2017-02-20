const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')

exports.seed = function (knex, Promise) {
  function insert (row) {
    return knex('location_criteria').insert({
      id: row['Criteria ID'],
      name: row['Name'],
      canonical_name: row['Canonical Name'],
      parent_id: row['Parent ID'] || null,
      country_code: row['Country Code'],
      type: row['Target Type'],
      status: row['Status']
    })
  }

  function parseCSVChunk (filename) {
    const insertions = []

    return new Promise((resolve, reject) => {
      fs.createReadStream(path.resolve(__dirname, 'locations', filename))
        .pipe(csv())
        .on('data', row => insertions.push(insert(row)))
        .on('end', () => resolve(Promise.all(insertions)))
    })
  }

  let promise = knex('location_criteria').del()

  const ns = ['xaa', 'xab', 'xac', 'xad', 'xae', 'xaf', 'xag', 'xah', 'xai', 'xaj', 'xak', 'xal', 'xam', 'xan', 'xao', 'xap', 'xaq', 'xar', 'xas']

  ns.forEach(n => {
    promise = promise.then(() => parseCSVChunk(n))
  })

  return promise
}
