const moment = require('moment');

//jan 1st 1970 00:00:00 am

/*var date = new Date();
console.log(date.getMonth());*/

// var date = moment();
// date.add(1, 'year').subtract(3,'months');
// console.log(date.format('MMM Do, YYYY'));

// 10:35 am
var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
