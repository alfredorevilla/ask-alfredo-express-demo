const express = require('express');
const handleAsyncError = require('./handleAsyncError')

module.exports = (geoService) => {
    const controller = express.Router();
    controller.get('/distance', handleAsyncError(async (req, res, next) => {
        const { from, to } = req.query;
        if (!from || !to)
            res.status(400).end();
        else
            res.send(await geoService.getDistance(from, to)).end();
    }));
    return controller;
}