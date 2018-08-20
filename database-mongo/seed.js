var Registry= require('./index.js').Registry
var service = require('../server/utils.js')

var obj2a = {
    live: true,
    name: 'crudService-1',
    address: '127.0.0.1',
    port: 5001,
    protocol: 'http'
  }


var obj2b = {
    live: true,
    name: 'crudService-2',
    address: '127.0.0.1',
    port: 5001,
    protocol: 'http'
  }


var obj1a = {
    live: true,
    name: 'searchService-1',
    address: '127.0.0.1',
    port: 5002,
    protocol: 'http'
  }


var obj1b = {
    live: true,
    name: 'searchService-2',
    address: '127.0.0.1',
    port: 5002,
    protocol: 'http'
  }




var obj3a = {
    live: true,
    name: 'emailService-1',
    address: '127.0.0.1',
    port: 5003,
    protocol: 'http'
  }


var obj3b = {
    live: true,
    name: 'emailService-2',
    address: '127.0.0.1',
    port: 5003,
    protocol: 'http'
  }


var obj4a = {
    live: true,
    name: 'timelineService-1',
    address: '127.0.0.1',
    port: 5004,
    protocol: 'http'
  }


var obj4b = {
    live: true,
    name: 'timelineService-2',
    address: '127.0.0.1',
    port: 5004,
    protocol: 'http'
  }

service.register(obj1a, (err, res) => console.log('good'))
service.register(obj1b, (err, res) => console.log('good'))
service.register(obj2a, (err, res) => console.log('good'))
service.register(obj2b, (err, res) => console.log('good'))
service.register(obj3a, (err, res) => console.log('good'))
service.register(obj3b, (err, res) => console.log('good'))
service.register(obj4a, (err, res) => console.log('good'))
service.register(obj4b, (err, res) => console.log('good'))
