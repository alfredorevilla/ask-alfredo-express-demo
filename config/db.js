const config = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'sasasa',
        database: 'quote-db',
        charset: 'utf8'
    }
};

const knex = require('knex')(config);
const bookshelf = require('bookshelf')(knex);


const consumer = bookshelf.Model.extend({
    tableName: 'consumer'
});

module.exports = {
    bookshelf,
    consumer
};