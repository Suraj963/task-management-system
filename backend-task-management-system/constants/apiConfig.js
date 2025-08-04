const config = require('config');

const gateway = config.get('gateway');

exports.ROOT_URL = gateway.rooturl;

exports.LOGIN = {
  LOGIN_API: '/user'
};


exports.TASKS = {
  TASKS_API: '/tasks'
};
