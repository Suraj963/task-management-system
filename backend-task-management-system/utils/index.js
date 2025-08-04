const httpUtil = require('./httpUtil');


/**
 * Page Count for pagination
 * @param {int} pageNo
 * @param {int} pageSize
 */
const getPage = (pageNo, pageSize) => ({
  pageNo: pageNo * pageSize,
  pageSize: Number(pageSize)
});

module.exports = {
  httpUtil,
  getPage
};
