const dayjs = require('dayjs');
const taskDA = require('./tasksDA');
const { generateUUIDV4 } = require('../../utils/uuidGenerator');

exports.create = async (connection, data, userId) => {
  const {
    id, title, description, status
  } = data;

  const checkExists = await taskDA.checkExists(
    id
  );

  if (checkExists.length > 0) {
    const error = new Error('Duplicate Record');
    error.name = 'RequestError';
    throw error;
  }

  const details = {
    id: generateUUIDV4(),
    userId,
    title,
    description,
    status,
    createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  };

  const result = await taskDA.create(connection, details);
  return result;
};

exports.update = async (connection, data) => {
  const {
    id, title, description, status
  } = data;

  const details = {
    title,
    description,
    status,
    updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss')
  };

  const result = await taskDA.update(
    connection,
    details,
    id
  );
  return result;
};

exports.getAllDetails = async (search, status, userId) => {
  const getAllDetails = await taskDA.getAllDetails(search, status, userId);
  return getAllDetails;
};


exports.getById = async taskId => {
  const result = await taskDA.getById(taskId);
  return result;
};

exports.deleteById = async taskId => {
  const result = await taskDA.deleteById(taskId);
  return result;
};

exports.updateTaskStatus = async (connection, status, taskId) => {
  const result = await taskDA.updateTaskStatus(
    connection,
    status,
    taskId
  );

  return result;
};

exports.getTasksCount = async userId => {
  const [getPendingCount] = await taskDA.getPendingCount(userId);
  const [getCompletedCount] = await taskDA.getCompletedCount(userId);

  const { pendingCount } = getPendingCount;
  const { completedCount } = getCompletedCount;
  const totalCount = pendingCount + completedCount;

  return { pendingCount, completedCount, totalCount };
};
