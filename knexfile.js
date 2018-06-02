/*
  todo: move this to or under model folder, otherwise how will the dev know its related?
*/
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
