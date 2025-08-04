const express = require('express');
const { apiConfig } = require('../constants');

const loginRouter = require('./login');
const tasksRouter = require('./tasks');


const {
  LOGIN, TASKS
} = apiConfig;

const router = express.Router();

router.use(LOGIN.LOGIN_API, loginRouter);
router.use(TASKS.TASKS_API, tasksRouter);


module.exports = router;
