const db = require('../config/db');

const passwordHasher = require('./weakPasswordHasher');

module.exports = {
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
        var model = Object.assign([user, hashedPassword = passwordHasher.hashPassword(password)]);
        await new db.user(model).save();
    }
}