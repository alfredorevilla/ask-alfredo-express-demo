//  todo: enforce auth
module.exports = (quoteStore) => {
    return {
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