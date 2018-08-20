var Registry= require('../database-mongo').Registry
var winston = require('winston')
var request = require('request');

const { createLogger, format} = require('winston');


const logger = createLogger({
  level: 'info',
   format: format.combine(
    format.splat(),
    format.simple()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'logs/service_error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/service_access.log', level: 'info' })
  ]
});


logger.info('this is test');

module.exports = {

  register: function(serviceObj, cb) {
    Registry.create(serviceObj).then((res) => {
      logger.info('registered a new service ' + serviceObj.name)
      cb(null, res)
    }).catch((err) => {
      cb(err, null)
    })
      // tech-depth first check if it exost only then push
  },

  deregister: function(serviceObj, cb) {
    Registry.deleteOne({ name: serviceObj.name }, function (err) {
      logger.info('deregistered the service ' + serviceObj.name)
      if (err) cb(err, null)
      else cb(null, 'deleted')

    });
  },




  updateServiceIfNeeded: function(newServiceObj, cb) {

    var query = {name: newServiceObj.name}
    Registry.find(query)

    .then((res) => {
      if (res[0].address !== newServiceObj.address) {

        logger.info('updating serviceObject')
        Registry.findOneAndUpdate(query, { address: '192.168.19.11', port: newServiceObj.port }, (err, raw) => {
          if (err) {
            logger.error('failed to update service object')
            cb(err, null)
          }
          else {
            logger.info('updated service object')
            cb(null, raw)
          }
        })
      }
    })
    .catch((err) => cb(err, null))
  },


  getMicroservices: function(cb) {
    Registry.find({}).then((result) => {
      cb(null, result)
    })
    .catch((err) => {
      cb(err, null)
    })
  },


  updateLiveStatus: function(ip, port, serviceName, isLive) {

    var query = {address: ip, port: port, name: serviceName}
    Registry.findOneAndUpdate(query, {live: isLive}, (err, raw) => {
      console.log('raw is', raw)
    })
  },



  monitorHeartbeat: function() {

    module.exports.getMicroservices((err, result) => {

      if (!result || result.length === 0) {
        console.log('no service found in registry database');
        logger.info('no service found in registry database');
      }

      for (var i = 0; i < result.length; i++) {
        let [serviceIP, servicePort, serviceName] = [result[i].address, result[i].port, result[i].name];
        let addr = `http://${serviceIP}:${servicePort}/heartbeat`

        request(addr, function (error, response, body) {
          if (error) { // save 'live = false' in db for the record
            module.exports.updateLiveStatus(serviceIP, servicePort, serviceName, false)
            logger.error('service down ', serviceName)
          }
          else if (response.body === 'pulse') { // save 'live = true' for the record
            module.exports.updateLiveStatus(serviceIP, servicePort, serviceName, true)
          }
        });
      }
    })
}

}


///// Tests - can be deleted in end

// var obj1 = {
//     live: true,
//     name: 'crudService-2',
//     address: '127.0.0.1',
//     port: 5001,
//     protocol: 'http'
//   }


// module.exports.deregister(obj)

// module.exports.updateServiceIfNeeded(obj, (err, res) => console.log(res))

// module.exports.getMicroservices((err, res) => {
//   console.log(res)
// })


// module.exports.register(obj1, (err, res) => {
//   console.log(res)
// })


