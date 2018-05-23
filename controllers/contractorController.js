var express = require('express');
var contractorService = require('../services/contractorService')

var contractorController = express.Router();

contractorController.post('/', (req, res) => {
    var model = req.body;
    try {
        contractorService.add(model);
        res.status(201).send(contractorService.get());
    } catch (error) {
        if (error.message === 'Invalid contractor')
            res.status(400).send('Invalid body');
        else
            res.send(error.message || 'Error');
    }
});

module.exports = contractorController;


