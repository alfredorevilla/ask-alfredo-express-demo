'use strict';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { ValidationError } = require('./services/validator');
const contractorController = require('./controllers/contractorController');
const authController = require('./controllers/authController');
const userStore = require('./models/userStore')(require('./services/weakPasswordHasher'));
const authService = new (require('./services/authService'))(userStore, (require('./services/weakPasswordHasher')));

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  controllers
app.use('/consumers', require('./controllers/consumerController')());
app.use('/contractors', contractorController);
app.use('/auth', authController(authService));
app.use('/quote', require('./controllers/quoteController')(require('./services/quoteService')(require('./models/quoteStore'))));
app.use('/user', require('./controllers/userController')
  (require('./services/userService')(userStore)));
app.use('/geo', require('./controllers/geoController')(require('./services/geoService')));

// catch 404 and forward to error handler
app.use((req, res, next) => res.status(404).end());

// error handler
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err instanceof ValidationError)
    res.status(400);
  else
    res.status(err.status || 500);
  if (err.message)
    res.send(err.message);
  res.end();
});


module.exports = app;

