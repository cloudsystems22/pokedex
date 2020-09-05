const nodemailer = require('nodemailer');
const path = require('path');
const hbs = require('nodemailer-express-handlebars');
const { host, port, user, pass } = require('../config/mail.json');

let transport = nodemailer.createTransport({
    host: host,
    port: port,
    auth: {
      user: user,
      pass: pass
    }
});

// transport.use('compile', hbs({
//     viewEngine:'handlebars',
//     viewPath: path.resolve('src', 'resources', 'mail'),//path.resolve('./src/resources/mail/'),
//     extName:'.html'
// }))
module.exports = transport;