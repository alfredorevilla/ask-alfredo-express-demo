exports.up = async (knex) => {
    await Promise.all([
        knex.schema.createTable('user', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('hashedPassword').notNullable();
            table.string('email').notNullable().unique();
            table.string('role').notNullable();
        })]);
};

exports.down = async (knex) => {
    await Promise.all([knex.schema.dropTable('user')]);
};
