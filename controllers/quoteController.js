'use strict';

const express = require('express');
const validationAttributes = require('../services/validator').validationAttributes;

const quoteProposalRequestSchema = {
    consumerId: [validationAttributes.required, validationAttributes.minValue(1)],
    contractorId: [validationAttributes.required, validationAttributes.minValue(1)],
    lines: [validationAttributes.required, validationAttributes.minLength(1)]
}

module.exports = (quoteService, validationService) => {
    var controller = express.Router()
    controller.post('/', async (req, res, next) => {
        try {
            const quoteProposalRequest = req.body;
            //  todo: validate
            if (!quoteProposalRequest || !validationService.isValid(quoteProposalRequest, quoteProposalRequestSchema))
                res.status(400).end();
            else {
                await quoteService.propose(Object.assign(quoteProposalRequest));
                res.status(202).end();
            }
        } catch (error) {
            next(error);
        }
    });
    return controller;
};