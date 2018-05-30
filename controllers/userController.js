const express = require('express');
const handleAsyncError = require('./handleAsyncError');

module.exports = (userService) => {
    var controller = express.Router();
    controller.post('/', handleAsyncError(async (req, res, next) => {
        debugger
        var model = req.body;
        await userService.add(model);
    }));
    return controller;
};