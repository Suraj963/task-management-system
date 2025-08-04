
// https://strongloop.com/strongblog/async-error-handling-expressjs-es7-promises-generators/
exports.asyncMiddleware = fn => (req, res, next) => fn(req, res, next).catch(next);
