'use strict';

import util from 'util';
import HTTPStatus, { getStatusText } from 'http-status-codes';

function AppError(status, code, title, detail, path, error) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);

  this.name = this.constructor.name;
  this.message = detail;

  this.status = status;
  this.code = code;
  this.title = title;
  this.detail = detail;
  this.path = path;
  this.error = error;
}

util.inherits(AppError, Error);

function unauthorized(detail) {
  return new AppError(
    HTTPStatus.UNAUTHORIZED,
    getStatusText(HTTPStatus.UNAUTHORIZED),
    'Unauthorized',
    detail || 'Unauthorized',
  );
}

function forbidden(intended) {
  return new AppError(
    HTTPStatus.FORBIDDEN,
    getStatusText(HTTPStatus.FORBIDDEN),
    'Forbidden',
    intended ? 'Forbidden: ' + intended : 'Forbidden',
  );
}

function path(path, msg) {
  return new AppError(400, 'PATH', 'Path', msg, path);
}

function badRequest(error) {
  return new AppError(
    HTTPStatus.BAD_REQUEST,
    getStatusText(HTTPStatus.BAD_REQUEST),
    'Bad Request',
    error.message,
  );
}

function alreadyExists(resource) {
  return new AppError(
    HTTPStatus.CONFLICT,
    getStatusText(HTTPStatus.CONFLICT),
    'Already Exists',
    'Resource already exists: ' + resource,
  );
}

function internal(error) {
  return new AppError(
    HTTPStatus.INTERNAL_SERVER_ERROR,
    getStatusText(HTTPStatus.INTERNAL_SERVER_ERROR),
    'Internal Server Error',
    'An internal server error occurred',
    undefined,
    error,
  );
}

function serviceUnavailable(error) {
  return new AppError(
    HTTPStatus.SERVICE_UNAVAILABLE,
    getStatusText(HTTPStatus.SERVICE_UNAVAILABLE),
    'Service Unavailable',
    'The server is currently unable to handle the request due to a temporary overload or scheduled maintenance, which will likely be alleviated after some delay',
    undefined,
    error,
  );
}
// function AppError(status, code, title, detail, path, error) {
function notFound(resource) {
  return new AppError(
    HTTPStatus.NOT_FOUND,
    getStatusText(HTTPStatus.NOT_FOUND),
    'Not Found',
    `Resource not found: ${resource.path}`,
    resource.path,
  );
}

module.exports = {
  AppError,
  alreadyExists,
  badRequest,
  forbidden,
  internal,
  path,
  notFound,
  serviceUnavailable,
  unauthorized,
};