//  todo: enforce auth
module.exports = (quoteStore) => {
    return {
        async find(id) {
            return await quoteStore.find(id);
        },
        async get() {
            return await quoteStore.get();
        },
        async propose(quoteProposal) {
            await quoteStore.add(Object.assign(quoteProposal));
        },
        async accept(quoteId) {
            //  todo: add some logic? eg. if already accepted or rejected throw 
            await quoteStore.updateAsAccepted(quoteId);
        },
        async reject(quoteId) {
            //  todo: add some logic? eg. if already accepted or rejected throw 
            await quoteStore.updatedAsRejected(item);
        }
    }
};