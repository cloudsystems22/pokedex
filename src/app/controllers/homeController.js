const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        return res.send('<h1>Bem vindo!</h1><p>API Pokedex</p>');
    } catch(err) {
        res.status(400).send({ error: "Erro ao exibir lista dos meus pokemons!"});
    }
});

module.exports = app => app.use('/', router);