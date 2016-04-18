var uniqueConfig = {
  client: 'pg',
  connection: {
    database: 'adpeek',
    host: process.env.ADPEEK_DB_HOST,
    user: process.env.ADPEEK_DB_USER,
    password: process.env.ADPEEK_DB_PWD
  }
}

module.exports = {
  development: uniqueConfig,
  production: uniqueConfig
}
