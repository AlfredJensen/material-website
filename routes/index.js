var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/resume', function(req, res, next) {
  var resumePath = '/public/Resume.pdf';
  fs.readFile(resumePath, function(err, pdf) {
    res.contentType('application/pdf');
    res.end(pdf);
  });
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
