/*
    todo: move to integration tests folder
*/

var chai = require("chai");
chai.use(require("chai-as-promised"));
const expect = chai.expect;

const quoteStore = require('../models/quoteStore');

describe('quoteStore', () => {

    describe('add', () => {

        it('fails on null or undefined model', () => expect(quoteStore.add()).to.be.rejected);

        it('fails on invalid model', () => expect(quoteStore.add({})).to.be.rejected);

        it('success', () => expect(quoteStore.add({ consumerId: 0, contractorId: 0 })).to.not.be.rejected);

        // it('success', () => expect(quoteStore.add({ consumerId: 0, contractorId: 0, items: [] })).to.not.be.rejected);

        //  todo: fix failure to auto set quoteItem.quoteId fk
        it('success', () => expect(quoteStore.add({ consumerId: 0, contractorId: 0, items: [{ total: 0 }] })).to.not.be.rejected);

    });

});