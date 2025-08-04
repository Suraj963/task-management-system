const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = '12345678901234567890123456789012';
const iv = '1234567890123456';

const encryptPassword = password => {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(password, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return {
    iv,
    encryptedData: encrypted
  };
};

const decryptPassword = encryptedPassword => {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'utf8'), Buffer.from(iv, 'utf8'));
  let decrypted = decipher.update(encryptedPassword, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

module.exports = { decryptPassword, encryptPassword };
