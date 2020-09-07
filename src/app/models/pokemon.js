const mongoose = require('../../database');

const PokemonSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        require: true
    },
    name: {
        type: String,
        unique: true,
        required: true,
    },
    generation:{
        type: String,
        required: true,
    },
    types:[{
        type:String
    }],
    baseAttack:{
       type:String
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);
module.exports = Pokemon;