//  todo: move file to config ?
module.exports = {

  development: {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'sasasa',
        database: 'quote-db',
        charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
