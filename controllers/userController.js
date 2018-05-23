var express = require('express');

var userController = express.Router();

userController.get('/', (req, res) => res.send('users'));

userController.post('/', (req, res) => {
    res.status(200).end();
});

module.exports = userController;


