const sendEmailMessage = require('./sendEmailMessage');

const users = [];

//  todo: make methods async
module.exports = {
    add(model) {
        //  todo: replace with validation lib
        if (!model || !model.name || !model.password || !model.email)
            throw Error('Invalid user');
        users.push(model);
        sendEmailMessage(model.email, 'Created', 'Your account has been created');
    },
    get() {
        return users;
    }
};