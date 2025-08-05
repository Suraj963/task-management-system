const config = require('config');
const bcrypt = require('bcrypt');

const SECRET_KEY = config.get('SECRET_KEY');
const jwt = require('jsonwebtoken');
const loginDA = require('./loginDA');
const { generateUUIDV4 } = require('../../utils/uuidGenerator');


const ACCESS_TOKEN_EXPIRATION = '1d';
const SALT_ROUNDS = 12;


exports.signup = async (connection, data) => {
  const {
    name, mobile, email, password
  } = data;

  const [checkUserExists] = await loginDA.getUserDetails(mobile);

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  if (!checkUserExists) {
    const userData = {
      id: generateUUIDV4(),
      name,
      mobile,
      email,
      password: hashedPassword
    };

    const result = await loginDA.signup(connection, userData);
    return result;
  }
  throw new Error('User already Exists');
};

exports.login = async data => {
  const { mobile, password: reqPassword } = data;

  const [userDetails] = await loginDA.getUserDetails(mobile);
  if (!userDetails) {
    throw new Error('User not registered');
  }

  const isMatch = await bcrypt.compare(
    reqPassword,
    userDetails.password
  );

  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: userDetails.id },
    SECRET_KEY,
    { expiresIn: ACCESS_TOKEN_EXPIRATION }
  );

  return { success: true, token };
};

exports.getProfile = async id => {
  const result = await loginDA.getProfile(id);
  return result;
};
