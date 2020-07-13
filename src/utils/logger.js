import winston from 'winston';
import env from '../config/env';

const DEFAULT_LEVEL = 'info';

// const getLevel = () => {
//   let level = DEFAULT_LEVEL;
//
//   if (env.LOG_LEVEL) {
//     if (!Logger.levels[env.LOG_LEVEL]) {
//       level = DEFAULT_LEVEL;
//     } else {
//       level = env.LOG_LEVEL;
//     }
//   }
//
//   return Logger.levels[level]
// }

// Create a logger based on the log level in config.json
const logger = winston.createLogger({
  level: DEFAULT_LEVEL,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
      ),
    }),
  ],
});

logger.stream = {
  // Write the text in 'message' to the log.
  write: message => {
    // Removes double newline issue with piping morgan server request
    // log through winston logger.
    logger.info(
      message.length > 0 ? message.substring(0, message.length - 1) : message,
    );
  },
};

module.exports = logger;
