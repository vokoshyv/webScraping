var Horseman = require('node-horseman');
var horseman = new Horseman();

horseman
  .open('https://www.southwest.com/')
  .type('input[name="originAirport"]', 'SFO')
  .type('input[name="destinationAirport"]', 'MDW')
  .click('button#jb-booking-form-submit-button')
  .waitForNextPage()
  .text('#outbound_results')
  .log()
  .close();