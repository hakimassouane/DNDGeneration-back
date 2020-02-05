var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var backgroundsRouter = require('./routes/backgrounds');
var charactersRouter = require('./routes/characters');
var classesRouter = require('./routes/classes');
var featsRouter = require('./routes/feats');
var itemsRouter = require('./routes/items');
var racesRouter = require('./routes/races');
var spellsRouter = require('./routes/spells');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/backgrounds', backgroundsRouter);
app.use('/characters', charactersRouter);
app.use('/classes', classesRouter);
app.use('/feats', featsRouter);
app.use('/items', itemsRouter);
app.use('/races', racesRouter);
app.use('/spells', spellsRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
