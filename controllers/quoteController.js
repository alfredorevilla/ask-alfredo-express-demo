'use strict';

const express = require('express');
const { validationAttributes, validator } = require('../services/validator');
const handleAsyncError = require('./handleAsyncError')

const quoteItemSchema = {
    type: [validationAttributes.required],
    total: [validationAttributes.required, validationAttributes.minValue(0)]
}

const quoteSchema = {
    consumerId: [validationAttributes.required, validationAttributes.minValue(1)],
    contractorId: [validationAttributes.required, validationAttributes.minValue(1)],
    lines: [validationAttributes.required, validationAttributes.minLength(1), validationAttributes.element(quoteItemSchema)]
}

module.exports = (quoteService, validationService = validator) => {
    var controller = express.Router()
    controller.get('/', handleAsyncError(async (req, res, next) => {
        res.send(await quoteService.get());
    }));
    controller.get('/:id', handleAsyncError(async (req, res, next) => {
        var model = await quoteService.find(req.params.id);
        if (!model)
            res.status(404).end();
        else
            res.send(model);
    }));
    controller.post('/', handleAsyncError(async (req, res, next) => {
        const quoteProposalRequest = req.body;
        //  todo: validate
        if (!quoteProposalRequest || !validationService.isValid(quoteProposalRequest, quoteSchema))
            res.status(400).end();
        else {
            await quoteService.propose(Object.assign(quoteProposalRequest));
            res.status(202).end();
        }
    }));
    controller.put('/accept/:id', handleAsyncError(async (req, res, next) => {
        const id = req.params.id;
        if (!id || id <= 0)
            res.status(400).end();
        else {
            await quoteService.accept(id);
            res.status(200).end();
        }

    }));
    controller.put('/reject/:id', handleAsyncError(async (req, res, next) => {
        const id = req.params.id;
        if (!id || id <= 0)
            res.status(400).end();
        else {
            await quoteService.reject(id);
            res.status(200).end();
        }
    }));
    return controller;
};