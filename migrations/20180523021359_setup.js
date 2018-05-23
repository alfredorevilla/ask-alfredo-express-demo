exports.up = async (knex) => {
    await Promise.all([
        knex.schema.createTable('consumer', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('password');
            table.string('email').unique();
        }),
        knex.schema.createTable('user', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('hashedPassword');
            table.string('email').unique();
        })]);
};

exports.down = async (knex) => {
    await Promise.all([knex.schema.dropTable('user'),
    knex.schema.dropTable('consumer')]);
};
