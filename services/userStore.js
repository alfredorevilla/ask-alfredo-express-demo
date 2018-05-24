//  todo: move to models folder

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
        async add(user, password) {
            if (!user)
                throw Error('user cannot be null');
            if (!password)
                throw Error('password cannot be null or empty');
            var model = {};
            Object.assign(model, user, { hashedPassword: passwordHasher.hashPassword(password) });
            try {
                await (new db.user(model)).save();
            } catch (error) {
                if (error.code == 23505)
                    throw Error('email already registered');
                else
                    throw Error('pg error');
            }
        }
    }
};