var express = require('express');
var bodyParser = require('body-parser');
var service = require('./utils.js')

var app = express();

// app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var port = process.env.PORT || 9001

/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  CORS
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/* + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
  API Routes
 + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +*/

app.get('/', (req, res) => {
  res.send(200, port) // For test
})

app.post('/registerService', registerService);
app.post('/deRegisterService', deRegisterService);
app.get('/getMicroservices', getMicroservices);
app.get('/checkHearbeat', checkHearbeat);

function registerService(req, res) {
  var serviceObj = req.body.service
  service.register(serviceObj, (err, result) => {
    if (err) res.send('unable to register the service, for more details check service_error.log');
    if (result) res.send('service is regitererd!');
  })

}


function deRegisterService(req, res) {
  var serviceObj = req.body.service

  service.deregister(serviceObj, (err, result) => {
    if (err) res.send('unable to de-register the service, for more details check service_error.log');
    if (result) res.send('service is de-regitererd!');
  })
}



function heartBeat(req, res) {
  res.send('pulse')
}

function getMicroservices(res, res) {
  service.getMicroservices((err, result) => {
    if (err) res.send('unable to find services, for more details check service_error.log');
    if (result) res.send(result);
  })
}



app.listen(port, function() {
  console.log(`listening on port  ${port}`);
});

// ref - https://developers.google.com/identity/sign-in/web/backend-auth
