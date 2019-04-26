// https://javascript.info/promise-basics


// *******************
// test remains undefined
// *******************

// let test;

// function giveHello() {
//   setTimeout(function() {
//     test = 'hello';
//     console.log("INSIDE: ", test);
//   }, 500)
// }
//
//
// giveHello();


// console.log("OUTSIDE: ", test);




// *******************
// make use of promises
// *******************

// let test;
//
// function giveHello() {
//   return new Promise(function(resolve, reject) {
//     setTimeout(function() {
//       test = 'hello';
//       resolve();
//     }, 2000)
//   })
// }
//
//
// let promise = giveHello;
//
//
// promise().then(function() {
//   console.log(test);
// })
