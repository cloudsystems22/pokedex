const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const User = require('../models/user');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({Ok: 'Olá mundo!', User: req.userId});
});

module.exports = app => app.use('/pokemons', router);