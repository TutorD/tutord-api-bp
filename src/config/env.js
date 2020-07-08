'use strict';

import 'dotenv/config';
const env = (module.exports = process.env);

const checkEnvVar = name => {
  if (!env[name]) {
    throw new Error(`ERROR: Environment variable not specified ${name}`);
  }
};

checkEnvVar('TUTORD_HTTP_PORT');
checkEnvVar('TUTORD_CORS');
checkEnvVar('TUTORD_MONGODB_URI');
