import log, { LogLevel } from 'electron-log';
import {
  getProcessType,
  isClient,
  isRenderer,
} from '@shared/util/InternalUtil';

/**
 * Format a string of a service message
 * @param message message from the service
 * @param serviceName name of the service to show in the log
 * @param tag optional tag at the end of the service name
 * @returns formatted string of a service message
 */
// We can assume we will have more utility functions at some point. This is not the only thing this module will do
// eslint-disable-next-line import/prefer-default-export
export function formatLog(message: string, serviceName: string, tag = '') {
  // Remove the new line at the end of every message coming from stdout from other processes
  const messageTrimmed = message.trimEnd();
  const openTag = `[${serviceName}${tag ? ' ' : ''}${tag}]`;
  if (messageTrimmed.includes('\n')) {
    const closeTag = `[/${serviceName}${tag ? ' ' : ''}${tag}]`;
    // Multi-line
    return `\n${openTag}\n${messageTrimmed}\n${closeTag}`;
  }
  return `${openTag} ${messageTrimmed}`;
}

/**
 * Abstract and shim the logger
 */

const isProduction = process.env.NODE_ENV === 'production';
const level = isProduction ? 'error' : 'info';
if (isClient()) {
  log.transports.console.level = level;
  if (isRenderer())
    // On the renderer, insert formatting before sending
    log.hooks.push((message) => {
      return {
        ...message,
        data: message.data.map((logLine) =>
          // We just checked above if message.variables is null
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          formatLog(
            logLine,
            getProcessType(),
            // Renderer sends back with log level of log. Not sure why it's not in the type
            (message.level as LogLevel | 'log') === 'log'
              ? undefined
              : message.level,
          ),
        ),
      };
    });
} else {
  log.initialize();
  log.transports.console.level = level;
  log.transports.file.level = level;
}

const logger = log;
export default logger;
