'use strict';

import { Router } from 'express';
import * as HTTPStatus from 'http-status-codes';

let API = new Router();

API.get('/', (req, res, next) => {
  console.log('/api/v1 endpoint reached');
  res.status(HTTPStatus.OK).json({
    status: HTTPStatus.getStatusText(HTTPStatus.OK),
  });
});

module.exports = API;
