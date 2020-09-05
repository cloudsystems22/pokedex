const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const User = require('../models/user');
const Pokemon = require('../models/pokemon');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try{
        const pokemons = await Pokemon.find().populate('user');
        return res.send({ pokemons });
    } catch(err) {
        res.status(400).send({ error: "Erro ao exibir lista dos meus pokemons!"});
    }
});

router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const pokemon = await Pokemon.findById(id).populate('user');
        return res.send({ pokemon });
    } catch(err) {
        res.status(400).send({ error: "Erro ao exibir esse pokemon!"});
    }
});

router.post('/create', async (req, res) => {
    try{
        const pokemon = await Pokemon.create({...req.body, user: req.userId });

        return res.send({ pokemon });
    } catch (err){
        console.log(err)
        return res.status(400).send({ error: "Erro ao criar o cadastro desse pokemon"})
    }
});

router.put('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const pokemon = await Pokemon.findByIdAndUpdate(id, req.body, {new: true})
        return res.send({ pokemon });
    } catch(err) {
        res.status(400).send({ error: "Erro ao atualizar esse pokemon!"});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let id = req.params.id
        const pokemon = await Pokemon.findByIdAndRemove(id);
        return res.send({ Ok: 'Removido com sucesso!' });
    } catch(err) {
        res.status(400).send({ error: "Erro ao excluir esse pokemon!"});
    }
});

module.exports = app => app.use('/pokemons', router);