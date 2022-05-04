var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();
var cors = require('cors')
const cookieSession = require('cookie-session');


var mongoDB = process.env.mongoDB_key
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
const passport = require('passport');
//const passportSetup = require('./auth/passport')
require('./auth/passport')
const authRouter = require('./routes/auth')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//below for google
app.use(cookieSession(
  {
    name: "session",
    keys: ['lama'],
    maxAge: 24 * 60 * 60 * 1000,
  }
))
app.use(passport.initialize())
app.use(passport.session())
let url = process.env.clientProductionURL || process.env.clientDevelopmentURL
app.use(cors({
  origin: url,
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}))

//above for google
//app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
