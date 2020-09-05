const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

let secret = speakeasy.generateSecret({
    google_auth_qr: true // Avisa o speakeasy que queremos um QRCode também
});
console.log(secret);
console.log('Acesse este link e escaneie o QRCode com o Google Authenticator:\n%s', secret.google_auth_qr);