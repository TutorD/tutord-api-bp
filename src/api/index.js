'use strict';

import { Router } from 'express';
import * as HTTPStatus from 'http-status-codes';

const v1 = require('./v1');

let API = new Router();

API.get('/status', (req, res, next) => {
  console.log('/status endpoint reached');
  res.status(HTTPStatus.OK).json({
    status: HTTPStatus.getStatusText(HTTPStatus.OK),
  });
});

API.post('/test', (req, res, next) => {
  console.log('/test endpoint reached, req.body: ', req.body);
  
  res.status(HTTPStatus.OK).json({
    message: `Received this ${req.body.field}`,
  });
});

API.use('/v1', v1);

module.exports = API;
