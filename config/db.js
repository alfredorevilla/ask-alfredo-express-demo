const config = require('../knexfile').development;

const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);


const consumer = bookshelf.Model.extend({
    tableName: 'consumer'
});

//  todo: complete
const createDatabaseIfNotExists = async () => {
    var pg = require('pg');
    var config = Object.assign(config);
    const { database } = config;
    config.database = 'postgres';
    const client = new pg.Client(config);
    await client.connect();
    await client.query(`if not exists (select 1 from pg_database where datname = ${database}) then create database ${database}; end if`)
    throw Error('Work in progress');
};

module.exports = {
    bookshelf,
    consumer
};

