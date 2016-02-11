var rp = require('request-promise');
var cheerio = require('cheerio');

var createCraigURL = function(car){
  return 'http://sfbay.craigslist.org/search/cta?is_paid=all&search_distance_type=mi&query=' + car;
}

var carURL = createCraigURL('mercedes');

var options = {
    uri: carURL,
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(function ($) {
        // Process html like you would with jQuery...
        var cars = $('p.row');

        for (var i = 0; i < cars.length; i++) {
          var titleofThisCar = cheerio(cars[i]).find('a.hdrlnk').text();
          console.log("TITLE: ", titleofThisCar);

          var priceOfCar = cheerio(cars[i]).find('span.l2').find('span.price').text();

          if (priceOfCar.length === 0){
            console.log("PRICE: Not supplied\n");
          } else {
            console.log("PRICE: ", priceOfCar + "\n");
          }

        };

        var titleOfOneCar = cheerio(cars[0]).find('a.hdrlnk').text();
        // val is what you input, text exists.
        console.log(titleOfOneCar);
    })
    .catch(function (err) {
        // Crawling failed or Cheerio choked...
    });