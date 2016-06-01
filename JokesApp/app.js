var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var jokesApi = require('./routes/jokesApi');
//Session
var session = require("express-session");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Session
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'secret_mysecret12344321', saveUninitialized: true, resave: true}));

app.use('/', jokesApi);
//Start using only the users routes, whihc contains only the login page
app.use('/', users);

//Checks if the user has logged in with his username
//and if he does redirect to the index page and routes
//otherwise redirect to the login page again
app.use(function (req, res, next) {
    var session = req.session;
    if (session.userName) {
        return next();
    } else {
        if (req.body.userName) {
            session.userName = req.body.userName;
            return res.redirect('/index');
        } else {
            res.redirect("/");
            return next();
        }
    }
});

//When the login check is done, get access to the index routes
app.use('/', routes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
