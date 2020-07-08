'use strict';

console.log('server.js');

import app from './config/express';

let server = app.listen(process.env.TUTORD_HTTP_PORT, () => {
  console.log(
    `TutorD API BP server started on ${process.env.TUTORD_HTTP_PORT}`,
  );
  server.setTimeout(300000);
});
