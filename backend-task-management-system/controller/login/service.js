const config = require('config');

const SECRET_KEY = config.get('SECRET_KEY');
const jwt = require('jsonwebtoken');
const { decryptPassword, encryptPassword } = require('../../utils/encryption');
const loginDA = require('./loginDA');
const { generateUUIDV4 } = require('../../utils/uuidGenerator');


const ACCESS_TOKEN_EXPIRATION = '1d';

exports.signup = async (connection, data) => {
  const {
    name, mobile, email, password
  } = data;

  const [checkUserExists] = await loginDA.getUserDetails(mobile);

  const encryptedPassword = encryptPassword(password);

  if (!checkUserExists) {
    const userData = {
      id: generateUUIDV4(),
      name,
      mobile,
      email,
      password: encryptedPassword.encryptedData
    };

    const result = await loginDA.signup(connection, userData);
    return result;
  }
  throw new Error('User already Exists');
};

exports.login = async data => {
  const { mobile, password: reqPassword } = data;
  const decodedPassword = Buffer.from(reqPassword, 'base64').toString('utf8');
  const [userDetails] = await loginDA.getUserDetails(mobile);
  if (!userDetails) {
    throw new Error('User not registered');
  }
  const { password, id } = userDetails;

  const decryptedPassword = decryptPassword(password);

  if (decryptedPassword === decodedPassword) {
    const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: ACCESS_TOKEN_EXPIRATION });
    return { success: true, token };
  }
  if (decryptedPassword !== decodedPassword) {
    return false;
  }

  throw new Error('Error in Login');
};

exports.getProfile = async id => {
  const result = await loginDA.getProfile(id);
  return result;
};
