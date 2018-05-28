const express = require('express');

module.exports = (userService) => {
    var controller = express.Router();
    controller.post('/', async (req, res, next) => {
        var model = req.body;
        await userService.add(model);
    });
    return controller;
};