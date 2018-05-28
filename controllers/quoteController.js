'use strict';

const express = require('express');
const { validationAttributes, validator } = require('../services/validator');


const quoteSchema = {
    consumerId: [validationAttributes.required, validationAttributes.minValue(1)],
    contractorId: [validationAttributes.required, validationAttributes.minValue(1)],
    lines: [validationAttributes.required, validationAttributes.minLength(1), validationAttributes.element(quoteItemSchema)]
}

const quoteItemSchema = {
    type: [validationAttributes.required],
    total: [validationAttributes.required, validationAttributes.minValue(0)]
}

module.exports = (quoteService, validationService = validator) => {
    var controller = express.Router()
    controller.post('/', async (req, res, next) => {
        try {
            const quoteProposalRequest = req.body;
            //  todo: validate
            if (!quoteProposalRequest || !validationService.isValid(quoteProposalRequest, quoteSchema))
                res.status(400).end();
            else {
                await quoteService.propose(Object.assign(quoteProposalRequest));
                res.status(202).end();
            }
        } catch (error) {
            next(error);
        }
    });
    controller.put('/accept/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            if (!id || id <= 0)
                res.status(400).end();
            else {
                await quoteService.accept(id);
                res.status(200).end();
            }
        } catch (error) {
            next(error);
        }
    });
    controller.put('/reject/:id', async (req, res, next) => {
        try {
            const id = req.params.id;
            if (!id || id <= 0)
                res.status(400).end();
            else {
                await quoteService.reject(id);
                res.status(200).end();
            }
        } catch (error) {
            next(error);
        }
    });
    return controller;
};