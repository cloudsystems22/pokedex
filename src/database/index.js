const mongoose = require('mongoose');
let uri = 'mongodb://localhost:27017/';
mongoose.connect(uri + 'pokedex', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;