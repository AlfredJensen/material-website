var express = require('express');
var router = express.Router();
var http = require('http');
var cheerio = require('cheerio'),
  request = require('request');

// Will scrape motherfuckers.
router.get('/scrape', function(req, res, next) {
  url = 'https://pulllist.comixology.com/dc_comics/2015/05/06'; // Date needs to be a param

  request(url, function(err, resp, html) {
    if (err) {
      console.log('[ERROR] Could not scrape, ' + JSON.stringify(err));
    }

    var $ = cheerio.load(html);

    if ($('#listings').text() === "There are no items for this week.") {
      res.send([]);
      return;
    }

    var $rows = $('tr');
    $rows.filter(function(index, element) {
      return ($(this).find('#synopsis').length);
    });
  });
});

// Route that will function and get all of my relevant titles
// and save to something at the end
router.get('52', function(req, res, next) {

});

module.exports = router;