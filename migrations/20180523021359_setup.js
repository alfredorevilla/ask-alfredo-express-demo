exports.up = async (knex, Promise) => {
    await knex.schema.createTable('consumer', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('password');
        table.string('email').unique();
    });
};

exports.down = async (knex, Promise) => {
    await knex.schema.dropTable('consumer');
};
