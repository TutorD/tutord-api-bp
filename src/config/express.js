'use strict';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

import env from './env';
import logger from '../utils/logger';
import { internal, notFound } from '../lib/errors';

import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../../swagger';

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

// Logger
app.use(morgan('combined', { stream: logger.stream }));

// Body Parser for for parsing application/json <= 5MB
app.use(bodyParser.json({ limit: '5mb' }));

// Body Parser for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// OpenAPI Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Router
app.use('/api', API);

// Not Found Handler
app.use((req, res, next) => {
  next(notFound(req));
});

app.use((err, req, res, next) => {
  let error = err;
  const host = req.headers.host || '';
  
  if (error.status >= 400 && error.status <= 499) {
    logger.error(`4XX Error, ${err.message}`);
    logger.error('Error Stack Trace: ', err.stack.toString());;
  } else {
    logger.error(`Unknown Error, ${err.message}`);
    logger.error('Error Stack Trace: ', err.stack.toString());;
  }
  
  return res.status(error.status).json({
    code: error.code,
    status: error.status,
    title: error.title,
    detail: error.detail,
    path: error.path
  });
});

export default app;
