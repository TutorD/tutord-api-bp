'use strict';

import { Router } from 'express';
const v1 = require('./v1');

let API = new Router();

API.get('/status', (req, res, next) => {
  console.log('/status endpoint reached');
  res.status(200).json({ status: 'ok' });
});

API.use('/v1', v1);

module.exports = API;
