var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const consumerController = require('./controllers/consumerController');
const contractorController = require('./controllers/contractorController');
const authController = require('./controllers/authController');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/consumers', consumerController);
app.use('/contractors', contractorController);
app.use('/auth', authController);

// catch 404 and forward to error handler
app.use((req, res, next) => res.status(404).end());

// error handler
app.use(function (err, req, res, next) {

  console.warn('app error');
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.message)
    res.send(err.message);
  res.end();
});


module.exports = app;

