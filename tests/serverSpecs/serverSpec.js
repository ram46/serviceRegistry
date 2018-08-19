var expect = require('chai').expect;
var request = require('request');
var mongoose = require('mongoose');
var request = require('request');


// try {
//   var config = require('../config.js')
// }

// catch(e) {
//   var config = {
//     DBHOST: process.env.DBHOST,
//     DBUSER: process.env.DBUSER,
//     DBPASS: process.env.DBPASS,
//     DBPORT: process.env.DBPORT,
//     DBNAME: process.env.DBNAME
//   }
// }


// describe('Connection to DB', function(){
//   var uri = `mongodb://${config.DBUSER}:${config.DBPASS}@${config.DBHOST}:${config.DBPORT}/${config.DBNAME}`

//   it('Connects to db successfully', function() {
//     mongoose.connect(uri).then(() => {
//       var status = 'OK';
//       expect(status).to.equal('OK')
//     },
//     err => { console.log(err) });
//   });
// });



describe('Route check', function() {

  var mockObj = {
    live: true,
    name: 'service-2',
    address: '127.3.0.1',
    port: 4003,
    protocol: 'http'
  }

  xit('registerService route works', function() {
    request.post({url:'http://localhost:9001/registerService', form: mockObj}, function(err, httpResponse, body) {
      expect(httpResponse.statusCode).to.equal(200);
    });
  });


  it('registerService route works', function() {
    request.post({url:'http://localhost:9001/registerService', form: {service: mockObj}}, function(err, httpResponse, body) {
      expect(httpResponse.statusCode).to.equal(200);
    });
  });

});

describe('server runs fine', function() {
  xit('express running at port 9001' , function() {
    request('http://localhost:9001/', function(error, response, body) {
      expect(Number(response.body)).to.equal(9001);
    });
  });
});






