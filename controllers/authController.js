const express = require('express');
const handleAsyncError = require('./handleAsyncError');

module.exports = (authService) => {
    const authController = express.Router();
    authController.post('/login', handleAsyncError(async (req, res, next) => {
        const { email, password } = req.body;
        res.status((await authService.login(email, password)) ? 200 : 403).end();

    }));
    return authController;
};
