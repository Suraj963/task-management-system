const config = require('config');
const jwt = require('jsonwebtoken');

const SECRET_KEY = config.get('SECRET_KEY');

function decryptToken(token) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded.id;
  }
  catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}

module.exports = { decryptToken };
