var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

var models = require('./models');
models.sequelize.sync().then(function () {
    console.log('Sequelize sync success');
});

var app = express();

//app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.engine('.html', require('ejs').renderFile);

app.use(session({
    secret: 'Ore minerals reference',
    resave: false,
    saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/api/minerals', require('./routes/minerals'));
app.use('/api/mineralClasses', require('./routes/mineralClasses'));
app.use('/api/users', require('./routes/users'));
app.use('/api/roles', require('./routes/roles'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error.html', {title: 'Ошибка!', session: req.session});
});

module.exports = app;
