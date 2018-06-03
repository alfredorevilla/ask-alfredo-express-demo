'use strict';

const express = require('express');
const handleAsyncError = require('./handleAsyncError');

/*
    note: here we're declaring the service schema which allows to avoid depending on a service implementation file
*/
module.exports = (userService = { add: async ({ name, email, password, type }) => { } }) => {
    var controller = express.Router();
    controller.post('/', handleAsyncError(async (req, res, next) => {
        await userService.add(req.body);
        res.status(200).end();
    }));
    return controller;
};