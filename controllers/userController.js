'use strict';

const express = require('express');
const handleAsyncError = require('./handleAsyncError');

module.exports = (userService) => {
    var controller = express.Router();
    controller.post('/', handleAsyncError(async (req, res, next) => {
        await userService.add(req.body);
        res.status(200).end();
    }));
    return controller;
};