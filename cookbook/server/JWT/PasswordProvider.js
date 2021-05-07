const fs = require('fs');
const path = require('path');

const pathToKey = path.join(__dirname, '..', 'Keys', 'id_rsa_priv.pem');
exports.PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');