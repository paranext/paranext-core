import log from 'electron-log';
import { isClient } from './InternalUtil';

/**
 * Abstract and shim the logger
 */

const isProduction = process.env.NODE_ENV === 'production';
const level = isProduction ? 'error' : 'info';
if (isClient()) {
  log.transports.console.level = level;
} else {
  log.initialize();
  log.transports.console.level = level;
  log.transports.file.level = level;
}

const logger = log;
export default logger;
