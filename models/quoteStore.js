'use strict';

const db = require('../config/db');

module.exports = {
    async add(quote) {
        var model = new db.quote(quote);
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