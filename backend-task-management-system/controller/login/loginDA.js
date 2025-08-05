const sql = require('./sql');
const mysql = require('../../utils/db');

exports.getUserDetails = async mobile => mysql.query(sql.GET_USER_DETAILS, [mobile]);

exports.signup = async (connection, data) => connection.query(sql.SIGN_UP, [data]);

exports.getProfile = id => mysql.query(sql.GET_PROFILE, [id]);
