var rp = require('request-promise');
var cheerio = require('cheerio');

var createCraigURL = function(car){
  return 'http://sfbay.craigslist.org/search/cta?is_paid=all&search_distance_type=mi&query=' + car;
}

var carURL = createCraigURL('mercedes');

rp(carURL)
.then(function(htmlString){
  console.log(htmlString);
})