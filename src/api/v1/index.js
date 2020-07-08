'use strict';

import { Router } from 'express';

let API = new Router();

API.get('/', (req, res, next) => {
  console.log('/v1 endpoint reached');
  res.status(200).json({ status: 'ok' });
});

module.exports = API;
