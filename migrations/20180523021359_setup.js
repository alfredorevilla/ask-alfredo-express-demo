'use strict';

exports.up = async (knex) => {
    await Promise.all([
        knex.schema.createTable('user', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('hashedPassword').notNullable();
            table.string('email').notNullable().unique();
            table.string('role').notNullable();
        }),
        knex.schema.createTable('quote', (table) => {
            table.increments('id').primary();
            table.integer('consumerId').notNullable();
            table.integer('contractorId').notNullable();
            table.string('state').notNullable().unique();
        }),
        knex.schema.createTable('quote_item', (table) => {
            table.increments('id').primary();
            table.integer('quoteId').notNullable();
            table.foreign('quoteId').references('quote.id');
            table.decimal('total').notNullable().unique();
        })
    ]);

};

exports.down = async (knex) => {
    await Promise.all([
        knex.schema.dropTable('quote_item'),
        knex.schema.dropTable('quote'),
        knex.schema.dropTable('user')]);
};
