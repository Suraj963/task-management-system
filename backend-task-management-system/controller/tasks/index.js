const express = require('express');

const {
  asyncMiddleware: _async
} = require('../../common/security/asyncMiddleware');

const handler = require('./handler');

const router = express.Router();

router.use((req, res, next) => {
  next();
});

router.post('/', [_async(handler.create)]);

router.put('/update', [_async(handler.update)]);

router.get('/getAllDetails', [
  _async(handler.getAllDetails)
]);

router.get('/getById/:taskId', [
  _async(handler.getById)
]);

router.delete('/deleteById/:taskId', [
  _async(handler.deleteById)
]);

router.put('/updateTaskStatus', [_async(handler.updateTaskStatus)]);

router.get('/getTasksCount', [
  _async(handler.getTasksCount)
]);

module.exports = router;
