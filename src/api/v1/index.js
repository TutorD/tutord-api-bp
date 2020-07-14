'use strict';

import { Router } from 'express';
import * as HTTPStatus from 'http-status-codes';
import logger from '../../utils/logger';

const API = new Router();

API.get('/', (req, res, next) => {
  logger.info('/api/v1 endpoint reached');
  res.status(HTTPStatus.OK).json({
    status: HTTPStatus.getStatusText(HTTPStatus.OK),
  });
});

module.exports = API;
