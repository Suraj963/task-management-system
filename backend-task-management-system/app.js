const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const controllers = require('./controller');
const { apiConfig } = require('./constants');
const { httpUtil } = require('./utils');

const app = express();

app.use(cors());
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.frameguard());
app.use(express.json());
app.use(helmet({ frameguard: false }));

// Settings the routes
app.use(apiConfig.ROOT_URL, controllers);

// To handle all the undefined Routes
app.all('*', (req, res) => {
  res.json(httpUtil.getBadRequest());
});

app.use((err, req, res, next) => {
  if (err instanceof Array) {
    console.error('App BadRequest', err);
    res.json(httpUtil.getBadRequest(err));
  }
  else if (err.name === 'ValidationError') {
    err.message = err.details[0].message;
    res.json(
      httpUtil.getBadRequest([err.code, err.message.replace(/['"]+/g, '')])
    );
  }
  else {
    console.error('App Exception', err);
    res.json(httpUtil.getException([err.code, err.message]));
  }
});

module.exports = app;
