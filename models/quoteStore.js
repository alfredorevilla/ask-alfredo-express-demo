'use strict';

const db = require('../config/db');

module.exports = {
    async find(id) {
        return await db.quote.where({ id }).fetch({ withRelated: ['items'] });
    },
    async get() {
        return await db.quote.fetchAll();
    },
    async add(quote) {
        const values = {
            consumerId: quote.consumerId,
            contractorId: quote.contractorId
        }
        var model = new db.quote(values);
        if (quote.items)
            quote.items.forEach(item => model.items().create(item));
        model.set('state', 'proposed');
        await model.save();
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