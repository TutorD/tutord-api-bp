'use strict';

import app from './config/express';

console.log('server.js');

let server = app.listen(process.env.TUTORD_HTTP_PORT, () => {
  console.log(
    `TutorD API BP server started on ${process.env.TUTORD_HTTP_PORT}`,
  );
  server.setTimeout(300000);
});
