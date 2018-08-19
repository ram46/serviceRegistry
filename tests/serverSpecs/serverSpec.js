var expect = require('chai').expect;
var request = require('request');
var mongoose = require('mongoose');
var connection = mongoose.connection;
var request = require('request');




describe('Connection to DB', function() {
  it('Connects to db successfully', function() {
    const MONGODB_URI = process.env.DB_URI  || 'mongodb://localhost/service_registry';
    connection.once('open', function() {
      expect(status).to.equal('OK');
    })
    mongoose.connection.close()
  })
})


describe('Route check', function() {

  var mockObj = {
    live: true,
    name: 'service-2',
    address: '127.3.0.1',
    port: 4003,
    protocol: 'http'
  }

  var mockObj2 = {
    live: true,
    name: 'service-3',
    address: '127.3.0.1',
    port: 4003,
    protocol: 'http'
  }


  it('registerService route works', function() {
    request.post({url:'http://localhost:9001/registerService', form: {service: mockObj}}, function(err, httpResponse, body) {
      expect(httpResponse.statusCode).to.equal(200);
    });
  });



  it('de-registerService route works', function() {
    request.post({url:'http://localhost:9001/deRegisterService', form: {service: mockObj}}, function(err, httpResponse, body) {
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






