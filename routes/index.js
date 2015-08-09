var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/old', function(req, res, next) {
  res.sendFile('/public/old/index.html');
});

router.get('/mean', function(req, res, next) {
  res.sendFile('/public/mean/index.html');
});

router.get('*', function(req, res, next) {
  res.render('index');
});

module.exports = router;
