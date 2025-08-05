const { httpUtil } = require('../../utils');
const mysql = require('../../utils/db');
const { decryptToken } = require('../../utils/decryptToken');
const validator = require('./Validator');
const service = require('./service');

exports.signup = async (req, res) => {
  const { body } = req;

  const connection = await mysql.getTransactionConnection();
  try {
    await validator.signUpValidation(body);
    const result = await service.signup(connection, body);

    await mysql.commitAndReleaseConnection(connection);
    return res.json(httpUtil.getSuccess(result));
  }
  catch (error) {
    return httpUtil.HandleError(
      error,
      res,
      connection,
      mysql.rollbackAndReleaseConnection
    );
  }
};


exports.login = async (req, res) => {

  const error = {};
  try {
    const { body } = req;
    const result = await service.login(body);
    if (result.success === true) {
      return res.json(httpUtil.getSuccess(result));
    }
    if (result === false) {
      error.name = 'ValidationError';
      error.message = 'Invalid password';
      throw error;
    }
    if (result === 1) {
      error.name = 'ValidationError';
      error.message = 'User does not exists';
      throw error;
    }
  }
  catch (e) {
    return httpUtil.HandleError(e, res);
  }
};


exports.getProfile = async (req, res) => {
  try {
    const id = req.headers.authorization;
    const token = decryptToken(id);
    const result = await service.getProfile(token || null);
    return res.json(httpUtil.getSuccess(result));
  }
  catch (e) {
    return httpUtil.HandleError(e, res);
  }
};
