const users = [];

module.exports = {
    add(model) {
        users.push(model);
    },
    get() {
        return users;
    }
};