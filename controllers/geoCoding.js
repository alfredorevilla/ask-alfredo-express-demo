const express = require('express');
const handleAsyncError = require('./handleAsyncError')
const controller = express.Router();
controller.get('/', handleAsyncError((req, res, next) => {

}));

const api_key = 'AIzaSyBgdK9PuAMXVqy4kqeNtqCXIeRUSxvoNDQ';

module.exports = (geoCodingService) => {
    return {

    }
}