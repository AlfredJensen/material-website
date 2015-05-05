var express = require('express');
var router = express.Router();
var http = require('http');
var cheerio = require('cheerio'),
  request = require('request');

/**
  Get date, parse into url params
  Check and save total number of items
  New variable issuesSeen counter
  New variable pullList

  [START LOOP]
  Get TRs
  Filter by those who have #synopsis child
  Push JSON {title, imageUrl}
  Save image to DB
  Add 20 to issuesSeen
  Change param in url
  [STOP LOOP when issuesSeen >= totalNumber]

  send pullList to front end
  */
router.get('/scrape', function(req, res, next) {
  url = 'https://pulllist.comixology.com/dc_comics/2015/05/06?start=0'; // Date needs to be a param

  request(url, function(err, resp, html) {
    if (err) {
      console.log('[ERROR] Could not scrape, ' + JSON.stringify(err));
    }

    var $ = cheerio.load(html);

    if ($('#listings').text() === "There are no items for this week.") {

    }
    var totalIssues = Integer.parseInt($('#results > div > div:nth-child(2) > strong:nth-child(2)').text());
    var 
    var $rows = $('tr');
    $rows.filter(function(index, element) {
      $(this).find('#synopsis');
    });
  });
});

// Route that will function and get all of my relevant titles
// and save to something at the end
router.get('52', function(req, res, next) {

});

module.exports = router;