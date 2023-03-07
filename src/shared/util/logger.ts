// We want to be able to use console in this logger file as desired.
// Other things should call this logger, but this logger can use console if we want
/* eslint-disable no-console */
import { isClient } from './InternalUtil';

/**
 * Abstract the logger
 * For now just use the console logger
 */
const logger = isClient()
  ? console
  : new console.Console(process.stdout, process.stderr);
export default logger;
