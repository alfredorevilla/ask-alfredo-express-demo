const express = require('express');

module.exports = (quoteService) => {
    var controller = express.Router()
    controller.post('/', async (req, res, next) => {
        const quoteProposal = req.body;
        //  todo: validate
        if (!quoteProposal)
            res.status(400).end();
        else {
            await quoteService.propose(Object.assign(quoteProposal));
            res.status(202).end();
        }
    });
    return controller;
};