//  todo: remove

const sendEmailMessage = require('./sendEmailMessage');
const dbModel = require('../config/db')


//  todo: make methods async
module.exports = {
    async add(model) {
        //  todo: replace with validation lib
        if (!model || !model.name || !model.password || !model.email)
            throw Error('Invalid user');
        var saved = await new dbModel.consumer(Object.assign(model))
            .save();
        sendEmailMessage(model.email, 'Created', `Your account has been created: ${JSON.stringify(saved)}`);
    },
    get() {
        throw Error('Not implemented');
    }
};