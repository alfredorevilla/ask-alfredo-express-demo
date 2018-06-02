'use strict';

const express = require('express');
const handleAsyncError = require('./handleAsyncError');

module.exports = (consumerService = require('../services/consumerService')()) => {
    var controller = express.Router();
    controller.post('/', handleAsyncError(async (req, res) => {
        var model = req.body;
        await consumerService.add(model);
        res.status(200).end();
    }));
    return controller;
}


