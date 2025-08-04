const sql = require('./sql');
const mysql = require('../../utils/db');

exports.checkExists = async id => mysql.query(sql.CHECK_EXISTS, [id]);

exports.create = async (connection, data) => connection.query(sql.CREATE, [data]);

exports.update = async (connection, data, taskId) => connection.query(sql.UPDATE, [data, taskId]);

exports.getAllDetails = async (search, status, userId) => mysql.query(sql.GET_ALL_DETAILS(search, status, userId));

exports.checkTaskNameExistsById = async (
  productId,
  ProductName,
  subcategoryId
) => mysql.query(sql.GET_TASK_BY_Id, [productId, ProductName, subcategoryId]);

exports.getById = async taskId => mysql.query(sql.GET_BY_ID, [taskId]);

exports.deleteById = taskId => mysql.query(sql.DELETE_BY_ID, [taskId]);

exports.updateTaskStatus = async (connection, status, taskId) => connection.query(sql.UPDATE_TASK_STATUS, [status, taskId]);

exports.getPendingCount = async userId => mysql.query(sql.GET_PENDING_COUNT, [userId]);

exports.getCompletedCount = async userId => mysql.query(sql.GET_COMPLETED_COUNT, [userId]);
