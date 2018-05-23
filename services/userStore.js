const db = require('../config/db');

module.exports = {
    async getByEmail(email) {
        return await new db.user({ email }).fetch();
    }
}