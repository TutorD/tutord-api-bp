'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as HTTPStatus from 'http-status-codes';
import env from './env';
import logger from '../utils/logger';

const API = require('../api');

const app = express();

app.disable('x-powered-by');

const originWhiteList = env.TUTORD_CORS.split(',');
const corsHandler = cors({
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'X-Requested-With',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials',
    'Authorization',
    'Content-Type',
    'dry-run',
    'withCredentials',
  ],
  credentials: true,
  origin: (origin, cb) => {
    cb(null, originWhiteList.indexOf(origin) !== -1);
  },
});

// CORS
app.use(corsHandler);

// Cookie Parser
app.use(cookieParser());

app.use(morgan('combined', { stream: logger.stream }));
// Body Parser for for parsing application/json <= 5MB
app.use(bodyParser.json({ limit: '5mb' }));

// Body Parser for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.use('/api', API);

export default app;
