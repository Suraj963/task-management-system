module.exports = {
  GET_USER_DETAILS: 'SELECT * FROM user WHERE mobile = ?',

  SIGN_UP: 'INSERT INTO user SET ?',

  GET_PROFILE: 'SELECT * FROM user WHERE id = ?'
};
