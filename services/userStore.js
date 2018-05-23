const db = require('../config/db');

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
    }
}