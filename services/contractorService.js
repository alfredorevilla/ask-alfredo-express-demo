//  todo: remove

const contractors = [];

//  todo: make methods async
module.exports = {
    add(model) {
        //  todo: replace with validation lib
        if (!model || !model.name || !model.password || !model.email)
            throw Error('Invalid contractor');
        contractors.push(model);
    },
    get() {
        return contractors;
    }
};