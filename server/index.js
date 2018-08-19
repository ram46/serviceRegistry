var express = require('express');
var bodyParser = require('body-parser');

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
app.post('/heartBeat', heartBeat);


function registerService(req, res) {
  console.log('in registerService')
  res.send('done')
}


function deRegisterService(req, res) {
  res.send('done')
}


function heartBeat(req, res) {
  res.send('pulse')
}

app.listen(port, function() {
  console.log(`listening on port  ${port}`);
});

// ref - https://developers.google.com/identity/sign-in/web/backend-auth
