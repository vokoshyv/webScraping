var rp = require('request-promise');
var cheerio = require('cheerio');

var stopWords = require('./stopWords.js');


var options = {
    uri: 'https://www.reddit.com/',
    transform: function (body) {
        return cheerio.load(body);
    }
};


rp(options)
.then(function($){
  var work = $('div.thing').find('a.title').text();
  
  work = work.split(' ');

  var lib = {};

  work.forEach(function(word){
    if (!stopWords[word]){
      if (lib[word] !== undefined){
        lib[word]++;
      } else {
        lib[word] = 1;
      }
    }
  })

  console.log(lib);

})

