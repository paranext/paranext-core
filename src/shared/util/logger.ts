import { isClient } from './InternalUtil';

/**
 * Abstract the logger
 * For now just use the console logger
 */
const logger = isClient()
  ? console
  : new console.Console(process.stdout, process.stderr);
export default logger;
