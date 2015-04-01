var express = require('express');
var hbs = require('express-handlebars');
var router = express.Router();

router.get('*', function(req, res, next) {
  res.render('home');
});

router.get('/', function(req, res, next) {
  res.render('home');
});

module.exports = router;
