const express = require('express');

module.exports = (authService) => {
    const authController = express.Router();
    authController.post('/login', async (req, res, next) => {
        try {
            await authService.login(1, 1);
        } catch (error) {
            next(error);
        }
    });
    return authController;
};
