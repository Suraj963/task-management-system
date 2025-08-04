const mysql = require('../../utils/db');

// put mysql connection to request Object
exports.startTransaction = async (req, res, next) => {
  req.conn = await mysql.getTransactionConnection();
  next();
};

// any error rollback to response.
exports.rollbackTransaction = key => async (err, req, res, next) => {
  if (req.conn) {
    await mysql.rollbackAndReleaseConnection(req.conn);
  }
  next(err);
};
