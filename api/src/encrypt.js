const crypto = require('crypto');
const { SECRET_KEY = "super-secret-key" } = process.env;

function encrypt(password) {
  let hash = crypto.createHmac('sha1', SECRET_KEY).update(password).digest('hex');
  return hash;
}

module.exports = encrypt;
