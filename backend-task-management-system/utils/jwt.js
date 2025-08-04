const jwt = require('jsonwebtoken');

const secretKey = 'r4nD0mS3cr3tK3y12345';

function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(decoded);
      }
    });
  });
}

module.exports = { generateToken, verifyToken };
