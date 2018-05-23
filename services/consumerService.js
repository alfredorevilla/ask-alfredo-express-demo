const users = [];

module.exports = {
    add(model) {
        if (!model || !model.name || !model.password || !model.email)
            throw Error('Invalid user');
        users.push(model);
    },
    get() {
        return users;
    }
};