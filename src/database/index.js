const mongoose = require('mongoose');
//let uri = 'mongodb://localhost:27017/';
//mongoose.connect(uriaws + 'pokedex', { useNewUrlParser: true });
let uriaws = 'mongodb+srv://davidfico22:davidfico22@cluster0.mrtwa.mongodb.net/pokedex?retryWrites=true&w=majority'

mongoose.connect(uriaws, { useNewUrlParser: true })
mongoose.Promise = global.Promise;

module.exports = mongoose;