const mongoose = require('../../database');

const PokemonSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
        ref:'User',
        require: true
    },
    number:{
        type:String,
        required: true,
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
    about:{
        type: String,
        required: true,
    },
    types:[{
        type:String
    }],
    resistant:[{
        type:String
    }],
    weaknesses:[{
        type:String,
    }],
    fastAttacks:[{
        name:{ type:String},
        type:{ type:String},
        damage:{ type:Number},
    }],
    specialAttacks:[{
        name:{ type:String},
        type:{ type:String},
        damage:{ type:Number},
    }],
    weight:{
        type:Object({
            minimun:String,
            maximun:String,
        })
    },
    height:{
        type:Object({
            minimun:String,
            maximun:String,
        })
    },
    buddyDistance:{
        type:String,
    },
    baseStamina:{
        type:String,
    },
    baseAttack:{
        type:String,
    },
    baseDefense:{
        type:String,
    },
    baseFlatRate:{
        type:String,
    },
    nextEvolutionRequirements:{
        type:Object({
            amount:{type:String},
            name:{type:String},
        })
    },
    nextEvolutions:[{
        number:{ type:String},
        name:{ type:String},  
    }],
    maxCP:{
        type:Number,
    },
    minCP:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default: Date.now,
    },
});

const Pokemon = mongoose.model('Pokemon', PokemonSchema);
module.exports = Pokemon;