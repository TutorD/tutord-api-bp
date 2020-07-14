'use strict';

import app from './config/express';
import logger from './utils/logger';

const server = app.listen(process.env.TUTORD_HTTP_PORT, () => {
  logger.info(
    `TutorD API BP server started on ${process.env.TUTORD_HTTP_PORT}`,
  );
  server.setTimeout(300000);
});
