'use strict';

import { Router } from 'express';
import * as HTTPStatus from 'http-status-codes';
import logger from '../utils/logger';

const v1 = require('./v1');

const API = new Router();

API.get('/status', (req, res, next) => {
  logger.info('/status health check endpoint reached');
  res.status(HTTPStatus.OK).json({
    status: HTTPStatus.getStatusText(HTTPStatus.OK),
  });
});

API.use('/v1', v1);

module.exports = API;
