'use strict';

const db = require('../config/db');

module.exports = (passwordHasher) => {
    return {
        //  todo: move out and injec it (kinda anti-oop)
        db: db,
        async getByEmail(email) {
            var model = await new db.user({ email }).fetch();
            return model ?
                {
                    name: model.get('name'),
                    email: model.get('email'),
                } : null;
        },
        async getHashedPassword(user) {
            const { email } = user;
            return (await new db.user({ email }).fetch()).get('hashedPassword');
        },
        async add({ name, email, password, type, address }) {
            try {
                await (new db.user({ name, email, type, hashedPassword: passwordHasher.hashPassword(password) })).save();
            } catch (error) {
                console.error({ error });
                if (error.code == 23505)
                    throw Error('email already registered');
                else if (error.code == 42703)
                    throw Error('pg schema error');
                else
                    throw Error('pg error');
            }
        }
    }
};
