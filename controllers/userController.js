var express = require('express');

var userController = express.Router();

userController.get('/', (req, res) => res.send('users'));

module.exports = userController;


