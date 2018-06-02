'use strict';

const express = require('express');
const handleAsyncError = require('./handleAsyncError');
const { validator, required } = require('../services/validator')

module.exports = (authService = require('../services/authService')()) => {
    const authController = express.Router();
    authController.post('/login', handleAsyncError(async (req, res, next) => {
        /*
            note: maybe create a request validator ???
        */
        validator.validate(req.body, { email: [required()], password: [required()] });
        const { email, password } = req.body;
        res.status((await authService.login(email, password)) ? 200 : 403).end();

    }));
    return authController;
};
