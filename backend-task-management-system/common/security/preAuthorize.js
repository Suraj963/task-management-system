const { HttpUtil } = require('../../utils');
const { messages } = require('../../constants');

const { COMMON } = messages;

exports.preAuthorize = (allowedGrants = []) => (req, res, next) => {
  const { locals = {} } = res;
  if (!locals || !locals.grants) {
    return res.json(HttpUtil.getAccessDenined(COMMON.FORBIDDEN));
  }
  else {
    const { grants = [] } = locals;
    const found = allowedGrants.some(o => grants.indexOf(o) !== -1);
    if (found) {
      next();
    }
    else {
      return res.json(HttpUtil.getAccessDenined(COMMON.FORBIDDEN));
    }
  }
};
