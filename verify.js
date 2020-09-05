const speakeasy = require('speakeasy');

let verified = speakeasy.totp.verify({
    secret: 'FFQUU5LOOEXV22CLF5QU2TB3KAUEIJK3FRFHOKDRGJSVUQ2CNZTQ',
    encoding:'base32',
    token: '729133'
});

console.log(verified);
