'use strict';

const db = require('../config/db');

module.exports = {
    async find(id) {
        return await db.quote.where({ id }).fetch({ withRelated: ['items'] });
    },
    async get() {
        return await db.quote.fetchAll();
    },
    async add({ consumerId, contractorId, items = [] }) {
        var model = new db.quote({
            consumerId,
            contractorId
        });
        model.set('state', 'proposed');
        /*
            todo: research a simpler/easier/cleaner way to do this. maybe a wrapper?
        */
        model = await new Promise((resolve, reject) => {
            model.save().then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
        /*
            note: seems bookshel is not that smart when inserting related entities so we have to manually assign fk value for them and re-save. 
            although we could simplify the code/process this would still mean 2 calls/queries from code being done instead of just 1. we should look for more performing solutions.
        */
        if (items) {
            items.forEach((item) => model.items().create(Object.assign(item, { quoteId: model.quoteId })));
            await model.save();
        }
    },
    async updateAsAccepted(quoteId) {
        var model = await db.quote.where({ id: quoteId });
        model.set('state', 'accepted');
        model.save();
    },
    async updatedAsRejected(quoteId) {
        var model = await db.quote.where({ id: quoteId });
        model.set('state', 'rejected');
        model.save();
    }
}