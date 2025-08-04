
/**
 * @file HttpUtil is util function, It will provide the support functions to create respones objects.
 * @copyright www.neviton.com
 */

/**
 * If request is sucess
 *
 * @param {any} payLoad
 * @param {string} errorMessage
 * @return {object}
 */
exports.getSuccess = (payLoad = null, message = 'OK') => ({
  status: 200,
  errorCode: null,
  message,
  payLoad
});

/**
 * If resource is created.
 *
 * @param {any} payLoad
 * @param {string} errorMessage
 * @return {object}
 */
exports.getCreated = (payLoad = null, message = 'Created') => ({
  status: 201,
  errorCode: null,
  message,
  payLoad
});

/**
 * If any invalid request or request data.
 *
 * @param {array} error
 * @return {object}
 */
exports.getBadRequest = (error = [null, 'Bad Request']) => ({
  status: 400,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

/**
 * If any server side Exception.
 *
 * @param {array} error
 * @return {object}
 */
exports.getException = (error = [null, 'Internal Server Error']) => ({
  status: 500,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

/**
 * If any Unauthorized request.
 *
 * @param {array} error
 * @return {object}
 */
// UNAUTHORIZED(401, "Unauthorized"),
exports.getUnauthorized = (error = [null, 'Unauthorized']) => ({
  status: 401,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

/**
 * If Access denined.
 *
 * @param {array} error
 * @return {object}
 */
exports.getAccessDenined = (error = [null, 'Forbidden']) => ({
  status: 403,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

/**
 * If Requested data or record is not found.
 *
 * @param {array} error
 * @return {object}
 */
exports.getBadRequest = (error = [null, 'Not Found']) => ({
  status: 404,
  errorCode: error[0],
  errorMessage: error[1],
  payLoad: null
});

exports.HandleError = (error, res, connection, releaseConncetion) => {
  if (
    ['ValidationError', 'DuplicateError', 'RequestError'].includes(error.name)
  ) {
    return res.json(this.getBadRequest([error.name, error.message]));
  }
  if (['ER_NO_REFERENCED_ROW'].includes(error.code)) {
    return res.json(this.getBadRequest([error.code, error.sqlMessage]));
  }
  if (connection && connection.threadId) releaseConncetion(connection);
  console.log('error', error);
  return res.json(this.getException());
};
