module.exports = (userService = require('./userService')()) => ({
    add: async (user = { name, email, password }) => {
        user = Object.apply(user, { type='consumer' });
        await userService.add(user);
    },
    get: async () => {        
        throw Error('Not implemented');
    }
});