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
  var date = new Date();
  var month = date.getMonth() + 1, day = date.getDate(), year = date.getFullYear();
  var url = 'https://pulllist.comixology.com/dc_comics/';
  var issuesSeen = 0;
  var queryString = String(year) + '/' + String(month) + '/30' + String(day) + '?start=' + issuesSeen;
  var totalIssues = 0, pullList = [];

  console.log('About to make the request');
  request.get(url, function(err, resp, html) {
    if (err) {
      console.error('[ERROR] Could not scrape, ' + JSON.stringify(err));
    }
    var $ = cheerio.load(html);

    if ($('#listings').text() === "There are no items for this week.") {
      totalIssues = -1;
      console.log('[INFO] No listings on this page, exiting loop with: ' + issuesSeen + ' issues this week.');
    }
    var totalIssues = parseInt($('#results > div > div:nth-child(2) > strong:nth-child(2)').text());
    var $rows = $('tr');
    $rows.each(function(index , element) {
      title = $(this).find('#synopsis').find('#title').find('a').text();
      process.stdout.write(title + '\n');
      imageUrl = $(this).find('#image').find('a > img').attr('src');
      process.stdout.write(imageUrl + '\n');

      if (title && validateImageURL(imageUrl, year)) {
        pullList.push({
          'title' : title,
          'imageUrl' : imageUrl
        });
      }
    });
    issuesSeen += 20;
      // End the request down here right
    res.send(pullList);
  });
  
});

// Route that will function and get all of my relevant titles
// and save to something at the end
router.get('52', function(req, res, next) {

});

function validateImageURL(url, year) {
  return url.indexOf('/' + year + '/') !== 1;
};
module.exports = router;