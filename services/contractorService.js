'use strict';

module.exports = (userService = require('./userService')()) => ({
    add: async (user = { name, email, password }) => {
        user = Object.assign(user, { type: 'contractor' });
        await userService.add(user);
    },
    get: async () => {
        throw Error('Not implemented');
    }
});