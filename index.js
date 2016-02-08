var rp = require('request-promise');
var cheerio = require('cheerio');

var createCraigURL = function(car){
  return 'http://sfbay.craigslist.org/search/cta?is_paid=all&search_distance_type=mi&query=' + car;
}

var carURL = createCraigURL('jeep');

var options = {
  uri: carURL, 
  transform: function(body){
    return cheerio.load(body);
  }
}

rp(options)
.then(function($){

  var cars = $('p.row');

  for (var i = 0; i < cars.length; i++){

    // car title
    console.log("TITLE: ", cheerio(cars[i]).find('a.hdrlnk').text());

    // car price
    var price = cheerio(cars[i]).find('span.l2').find('span.price').text();
    if (price.length !== 0){
      console.log("PRICE: ", price);
    } else {
      console.log('PRICE:  NOT LISTED');
    }

    // car data posted
    console.log("DATE: ", cheerio(cars[i]).find('time').attr('datetime'))

    console.log('\n');

  }

})