const mongoose = require('mongoose');
//let uriaws = 'mongodb://davidfico22:davidfico22@docdb-2020-09-05-19-11-22.cluster-crla75xmhn1w.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false'
let uri = 'mongodb://localhost:27017/';
mongoose.connect(uri + 'pokedex', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;