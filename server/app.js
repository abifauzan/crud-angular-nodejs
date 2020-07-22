var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
var session = require('express-session');
var bodyParser = require('body-parser');
var passport = require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/products');


//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost/agripermata-mean', {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Connection successful'))
  .catch((err) => console.error(err));

var app = express();
app.use(express.static('public'))

require('./models/User');
require('./configs/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
// app.use(express.urlencoded({ extended: false }));
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(cookieParser());
app.use(cors());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// app.use('/images/uploads', express.static(__dirname + '/public'));
// Virtual Path Prefix '/static'

// app.use(express.static('public'));
// app.use('/images', express.static(__dirname+'/images/uploads/'));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization, Content-Length');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if ('OPTIONS' === req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

// app.use(multer({
//   dest: DIR,
//   rename: function (fieldname, filename) {
//     return filename + Date.now();
//   },
//   onFileUploadStart: function (file) {
//     console.log(file.originalname + ' is starting ...');
//   },
//   onFileUploadComplete: function (file) {
//     console.log(file.fieldname + ' uploaded to  ' + file.path);
//   }
// }));

app.use('/api', indexRouter);
app.use('/api/products', productRouter);
app.use('/api/users', usersRouter);
// app.use('/users', usersRouter);

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
