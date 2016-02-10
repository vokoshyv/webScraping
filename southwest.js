var Horseman = require('node-horseman');
var horseman = new Horseman();

horseman
.open('https://www.southwest.com/')
.type('input[name="originAirport"]', 'SFO')
.type('input[name="destinationAirport"]', 'MDW')
.click("button:contains('Search')")
.waitForNextPage()
// .select('span.bookingOptionsHeader--heading')
.count("div.bsModalExp1")
.log()
.close();

// horseman
//   .userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0")
//   .open('http://www.google.com')
//   .type('input[name="q"]', 'github')
//   .click("button:contains('Google Search')")
//   .keyboardEvent("keypress",16777221)
//   .waitForSelector("div.g")
//   .count("div.g")
//   .log() // prints out the number of results
//   .close();