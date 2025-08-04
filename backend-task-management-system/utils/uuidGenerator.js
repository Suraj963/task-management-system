'user strict';

const uuidv4 = require('uuid/v4');

exports.generateUUID = async ({ body, id }) => {
  try {
    if (Array.isArray(body) && id) {
      body.forEach(ele => {
        ele[id] = uuidv4();
      });
      return body;
    }
    if (typeof body === 'object' && id) {
      body[id] = uuidv4();
      return body;
    }
    const error = {
      name: 'INVALID_ARG',
      code: 'INVALID_ARG',
      message: 'Invalid payload or Id'
    };
    throw error;
  }
  catch (error) {
    console.error('UUID GENERATOR ERROR..', error);
    throw error;
  }
};

exports.generateUUIDV4 = () => uuidv4();
