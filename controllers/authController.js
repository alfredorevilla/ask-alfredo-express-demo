const express = require('express');

const authController = express.Router();

authController.post('/login', async (req, res) => { });

module.exports = authController;