const mongoose = require('mongoose')
const connection = mongoose.connection;

const MONGODB_URI = process.env.MONGODB_URI  || 'mongodb://localhost/service_registry'
mongoose.connect(MONGODB_URI);

// connection.once('open', function() {
//   console.log('connected to service_registry database')
// })


let serviceRegistrySchema = mongoose.Schema({
  id: Number,
  live: Boolean,
  name: {type: String, unique: true},
  address: String,
  port: Number,
  protocol: String
});

// Creating  Model
let Registry = mongoose.model('microservices', serviceRegistrySchema);


module.exports.connection  = connection
module.exports.Registry = Registry


