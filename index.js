var rp = require('request-promise');
var cheerio = require('cheerio');

var createCraigURL = function(car){
  return 'http://sfbay.craigslist.org/search/cta?is_paid=all&search_distance_type=mi&query=' + car;
}

var carURL = createCraigURL('mercedes');

var options = {
    uri: carURL,
    transform: function (body) {
        // console.log(body);
        return cheerio.load(body);
    }
};


rp(options)
.then(function($){

  // array of all the cars
  var cars = $('p.row');
  
  for (var i = 0; i < cars.length; i++){
    var titleOfThisCar = cheerio(cars[i]).find('a.hdrlnk').text();
    console.log("TITLE: ", titleOfThisCar);

    var priceOfCar = cheerio(cars[i]).find('span.l2').find('span.price').text();

    if (priceOfCar.length === 0){
      console.log("PRICE: Not supplied\n");
    } else {
      console.log("PRICE: ", priceOfCar + '\n');
    }


  }

  // var titleOfOneCar = cheerio(cars[0]).find('a.hdrlnk').text();

  // console.log(titleOfOneCar);
})

















