let Airtable = require('Airtable');

let secrets = require('./secrets/secrets.js');

let queue = require('queue');

var base = new Airtable({apiKey: secrets.apiKey}).base('appIus4tTKe2pO1xJ');




let animals = [];


function getAnimalNames(resolve) {
  // return new Promise((resolve, reject) => {
    base('Animals').select({
      maxRecords: 3,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {

      records.forEach(function(record) {
        // console.log('Retrieved', record.get('Name'));
        animals.push(record.get('Name'));
      });
      fetchNextPage();

    }, function done(err) {

      if (err) {
        reject(err);
        return;
      }

      resolve(animals);

    });

  // })
}

function writeNames(animalNames) {
  let q = queue({
    'concurrency': 1
  })

  return new Promise((resolve, reject) => {
    for (let i = 0; i < animalNames.length; i++) {
      q.push(function() {
        return new Promise((resolve, reject) => {
            base('Animal Names').create({
              "Names": animalNames[i]
            }, function(err, record) {
                if (err) { console.error(err); return; }
                setTimeout(function() {
                  resolve();
                }, 1500);
                console.log(record.getId());
            });
        })
      })
    }

    resolve(q);
  })
}


// getAnimalNames().then((result, err) => {
//   console.log(result);
//   return writeNames(result);
// }).then((q) => {
//   q.start();
// })



async function f() {

  let promise = new Promise((resolve, reject) => {
    getAnimalNames(resolve)
  });

  let result = await promise; // wait till the promise resolves (*)

  console.log(result); // "done!"
}

f();
