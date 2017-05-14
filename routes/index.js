var express = require('express');
var router = express.Router();
var models = require('../models');
var middlewares = require('./middlewares');

router.get('/', function (req, res) {
    res.render('home.html', {title: 'Главная страница', session: req.session});
});
router.get('/admin', middlewares.hasRole('pageAdmin'), function (req, res) {
    res.render('admin.html', {title: 'Административная панель', session: req.session});
});

router.get('/minerals', function (req, res) {
    res.render('minerals.html', {title: 'Рудные минералы', session: req.session});
});

router.get('/permission', function (req, res) {
    res.render('permission.html', {title: 'Ошибка доступа', session: req.session});
});

module.exports = router;
