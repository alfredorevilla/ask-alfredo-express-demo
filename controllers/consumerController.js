var express = require('express');
var consumerService = require('../services/consumerService')

var consumerController = express.Router();

consumerController.get('/', (req, res) => res.send('users'));

consumerController.post('/', async (req, res) => {
    var model = req.body;
    try {
        await consumerService.add(model);
        res.status(201).send(consumerService.get());
    } catch (error) {
        if (error.message === 'Invalid user')
            res.status(400).send('Invalid body');
        else
            res.send(error.message || 'Error');
    }
});

module.exports = consumerController;


