var express = require('express');
var userService = require('../services/userService')

var userController = express.Router();

userController.get('/', (req, res) => res.send('users'));

userController.post('/', (req, res) => {
    var model = req.body;
    userService.add(model);
    res.status(201).send(userService.get());
});

module.exports = userController;


