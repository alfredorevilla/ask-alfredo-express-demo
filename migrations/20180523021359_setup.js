exports.up = async (knex) => {
    await knex.schema.createTable('consumer', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('password');
        table.string('email').unique();
    });
};

exports.down = async (knex) => {
    await knex.schema.dropTable('consumer');
};
