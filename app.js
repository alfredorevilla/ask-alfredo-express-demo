'use strict';

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const { ValidationError } = require('./services/validator');

//  app
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//  controllers
/*
  these controllers use default services defined in their code files for no othe reason than keeping its declaracion here small and also to provide them internally of some extra intellisense.
*/
app.use('/consumers', require('./controllers/consumerController')());
app.use('/contractors', require('./controllers/contractorController')());
app.use('/auth', require('./controllers/authController')());
/*
  these controllers require their services to be injected manually (or manually injected?) for no other reason than keeping their code files decoupled from their required service implementation code files.
*/
app.use('/quote', require('./controllers/quoteController')(require('./services/quoteService')(require('./models/quoteStore'))));
app.use('/user', require('./controllers/userController')
  (require('./services/userService')));
app.use('/geo', require('./controllers/geoController')(require('./services/geoService')));

// catch 404 and forward to error handler
app.use((req, res, next) => res.status(404).end());

// error handling
app.use(function (err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // if validation failed then send 400 bad request status
  if (err instanceof ValidationError)
    res.status(400);
  //  other errors should be threated as usual with status 500
  else
    res.status(err.status || 500)
  if (err.message)
    res.send(err.message);
    res.end();
});

module.exports = app;

