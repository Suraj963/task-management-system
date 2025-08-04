const express = require('express');

// const { preAuthorize } = require('../../common/security/preAuthorize');
const {
  asyncMiddleware: _async
} = require('../../common/security/asyncMiddleware');

const handler = require('./handler');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.post('/signup', [
  _async(handler.signup)
]);
router.post('/', [
  _async(handler.login)
]);

router.get('/getProfile', [
  _async(handler.getProfile)
]);

module.exports = router;
