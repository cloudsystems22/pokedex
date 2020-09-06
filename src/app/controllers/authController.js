const express = require('express');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');
const User = require('../models/user');
const router = express.Router();

const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const mailer = require('../../modules/mailer');


function generationToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

router.post('/register', async (req, res) => {
    const { email } = req.body
    try{
        if(await User.findOne({email}))
            return res.status(400).send({error: 'Usuário já existe!'});

        const user = await User.create(req.body);
        user.password = undefined;
        return res.send({ user });
    } catch (err){
        return res.status(400).send({ error: 'Registro de usuário falhou!'})
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({error: 'Usuário não encontrado!'});

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Usuário ou senha invalidas!'});

    user.password = undefined;  

    res.send({ user, token: generationToken({ id: user.id }) });
    
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user)
            return res.status(400).send({ error: 'Usuário não encontrado '});

        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });
        mailer.sendMail({
            to: email,
            from:'davidfico22@gmail.com',
            subject: 'Recuperação de password',
            //text: req.body.msg,
            html: `<h1>Recuperação de password</h1><p>Use esse token para recuperação da senha! Token: ${token} </p>`
        }, (err) => {
            if(err)
                return res.status(400).send({ error: 'Token não enviado!'});
            
            return res.send();
        })
    } catch (err) {
        res.status(400).send({ error: 'Erro ao recuperar senha, tente novamente'});

    }

})

router.post('/reset_password', async (req, res) =>{
    const { email, token, password } = req.body;
    try{
        const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires');
        if(!user)
            return res.status(400).send({ error: 'Usuário não encontrado!'});

        if(token !== user.passwordResetToken)
            return res.status(400).send({error: 'Token inválido!'});

        const now = new Date();
        if(now > user.passwordResetExpires)
            return res.status(400).send({ error: 'Token expirou, gere um token novo!'});

        user.password = password;

        await user.save()
        
        res.send();
        
    } catch (err) {
        res.status(400).send({ error: 'Sua senha não foi alterada, tente novamente!'});

    }
});

// Autenticação em dois fatores;
router.post('/qrcode', async (req, res) => {
    const { email } = req.body
    try{
        const user = await User.findOne({ email });
        let secret = speakeasy.generateSecret({
            name: "Pokedex",
            length: 20
        });
        await User.findByIdAndUpdate(user.id, {
            '$set': {
                secret: secret.base32,
            }
        });
        qrcode.toDataURL(secret.otpauth_url, (err, data) =>{
            res.send({ secret:secret.base32, qrcode: data });
        });
    } catch (err){
        res.status(400).send({ error: "Falha ao gerar qrcode!"})
    }
});

router.post('/gerar-token', (req, res) => {
    let { secret } = req.body;
    try{
        let token = speakeasy.totp({
            secret: secret,
            encoding: 'base32'
        });
        let remaning = (30 - Math.floor((new Date().getTime() / 1000.0 % 30)));
        res.send({ token: token, time: remaning })
    } catch (err){
        res.status(400).send({ error: "Falha ao gerar token!"})
    }
})
router.post('/verify', async (req, res) => {
    const { secret, token } = req.body;
    try{
        let verificado = speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token,
            window: 0
        })
        if(verificado){
            let user = await User.findOne({ secret });
        }

        res.send({ auth: verificado, user, token: generationToken({ id: user.id }) })
    } catch (err) {
        res.status(400).send({error: "Erro de verificação!"})
    }

})

module.exports = app => app.use('/auth', router);