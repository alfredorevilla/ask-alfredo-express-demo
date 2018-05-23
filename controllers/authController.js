const express = require('express');

module.exports = (authService) => {
    const authController = express.Router();
    authController.post('/login', async (req, res, next) => {
        try {
            const { email, password } = req.body;
            res.status((await authService.login(email, password)) ? 200 : 403).end();
        } catch (error) {
            next(error);
        }
    });
    return authController;
};
