const express = require('express');
const handleAsyncError = require('./handleAsyncError');

module.exports = (contractorService = require('../services/contractorService')()) => {
    var controller = express.Router();
    controller.post('/', handleAsyncError(async (req, res) => {
        var model = req.body;
        await contractorService.add(model);
        res.status(200).end();
    }));
    return controller;
}


