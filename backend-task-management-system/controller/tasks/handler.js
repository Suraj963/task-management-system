const { httpUtil } = require('../../utils');
const mysql = require('../../utils/db');
const validator = require('./validator');
const service = require('./service');
const { decryptToken } = require('../../utils/decryptToken');

exports.create = async (req, res) => {
  const { body } = req;
  const id = req.headers.authorization;
  const token = decryptToken(id);

  const connection = await mysql.getTransactionConnection();
  try {
    await validator.createValidation(body);
    const result = await service.create(
      connection,
      body,
      token
    );

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

exports.update = async (req, res) => {
  const { body } = req;

  const connection = await mysql.getTransactionConnection();
  try {
    await validator.createValidation(body);
    const result = await service.update(connection, body);

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

exports.getAllDetails = async (req, res) => {
  const { search, status } = req.query;
  const id = req.headers.authorization;
  const token = decryptToken(id);
  try {
    const result = await service.getAllDetails(search, status, (token || null));
    return res.json(httpUtil.getSuccess(result));
  }
  catch (error) {
    return httpUtil.HandleError(error, res);
  }
};

exports.getById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const result = await service.getById(taskId);
    return res.json(httpUtil.getSuccess(result));
  }
  catch (error) {
    return httpUtil.HandleError(error, res);
  }
};

exports.deleteById = async (req, res) => {
  const { taskId } = req.params;
  try {
    const result = await service.deleteById(taskId);
    return res.json(httpUtil.getSuccess(result));
  }
  catch (error) {
    return httpUtil.HandleError(error, res);
  }
};


exports.updateTaskStatus = async (req, res) => {
  const { status, taskId } = req.body;

  const connection = await mysql.getTransactionConnection();
  try {
    const result = await service.updateTaskStatus(connection, status, taskId);

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

exports.getTasksCount = async (req, res) => {
  const id = req.headers.authorization;
  const token = decryptToken(id);
  try {
    const result = await service.getTasksCount(token || null);
    return res.json(httpUtil.getSuccess(result));
  }
  catch (error) {
    return httpUtil.HandleError(error, res);
  }
};
