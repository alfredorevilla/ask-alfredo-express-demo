const users = [];

//  todo: make methods async
module.exports = {
    add(model) {
        //  todo: replace with validation lib
        if (!model || !model.name || !model.password || !model.email)
            throw Error('Invalid user');
        users.push(model);
    },
    get() {
        return users;
    }
};