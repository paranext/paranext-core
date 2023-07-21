import chalk from 'chalk';
import log, { LogLevel } from 'electron-log';
import { getProcessType, isClient, isExtensionHost, isRenderer } from '@shared/utils/internal-util';

export const WARN_TAG = '<WARN>';

/**
 * Represents details that can be parsed from a single line of an Error object
 */
type parsedErrorLine =
  | {
      functionName: string;
      fileName: string;
      lineNumber: number;
      columnNumber: number;
    }
  | undefined;

/**
 * Destructure a line from an Error object
 * @param errorLine Single line from an Error object string
 * @returns Object containing the function name, file name, line number, and column number from the
 * line of the Error object string. If the line couldn't be parsed, then undefined.
 */
function parseErrorLine(errorLine: string): parsedErrorLine {
  // A few example lines to parse:
  // "    at functionName (filename.js:15:27)"
  // "at /home/username/paranext-core/src/shared/services/logger.service.ts:119:22"
  // "     at Timeout.i [as _onTimeout] (/home/username/paranext-core/extensions/dist/evil/evil.js:1:591)"
  const regex = /at[\s+]?([\w .[\]<>]+)?\s+\(?(.*?):(\d+):(\d+)\)?$/;
  const matches = errorLine.match(regex);

  // This console log is helpful if you need to see why some Error line isn't parsing as expected
  // eslint-disable-next-line no-console
  // console.log(`**** LINE: ${errorLine}\nResulting filename: ${matches?.at(2)}`);

  if (matches && matches.length === 5) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, functionName, fileName, lineNumber, columnNumber] = matches;
    return {
      functionName,
      fileName,
      lineNumber: parseInt(lineNumber, 10),
      columnNumber: parseInt(columnNumber, 10),
    };
  }
  if (matches && matches.length === 4) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, fileName, lineNumber, columnNumber] = matches;
    return {
      functionName: '',
      fileName,
      lineNumber: parseInt(lineNumber, 10),
      columnNumber: parseInt(columnNumber, 10),
    };
  }
  return undefined;
}

/**
 * Examine the call stack and return a parsed string containing the function name, file name,
 * line number, and column number where the call to the logger was made.
 * @returns string that is suitable to attach to log output to indicate who what code wants to log
 */
function identifyCaller(): string | undefined {
  const { stack } = new Error();
  if (!stack) return undefined;
  let details: parsedErrorLine;
  const lines = stack.split('\n');
  // Start at 3 to skip the "Error" line, this function's stack frame, and this function's caller
  for (let lineNumber = 3; lineNumber < lines.length; lineNumber += 1) {
    // Skip over all logging library frames to get to the real call
    if (!lines[lineNumber].includes('node_modules') && !lines[lineNumber].includes('node:')) {
      details = parseErrorLine(lines[lineNumber]);
      if (details) break;
    }
  }
  if (!details) return '';
  const functionName = details.functionName ? `${details.functionName} ` : '';
  const filePath = process.platform === 'win32' ? details.fileName : `file://${details.fileName}`;
  return `[at ${functionName}${filePath}:${details.lineNumber}:${details.columnNumber}]`;
}

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
      const caller = identifyCaller();
      return {
        ...message,
        data: message.data.map((logLine) =>
          formatLog(
            caller ? `${logLine} ${caller}` : `${logLine}`,
            getProcessType(),
            // Renderer sends back with log level of log. Not sure why it's not in the type
            (message.level as LogLevel | 'log') === 'log' ? undefined : message.level,
          ),
        ),
      };
    });
  if (isExtensionHost())
    // Add a tag for warnings so we can recognize them outside the process.
    log.hooks.push((message) => {
      const caller = identifyCaller();
      const lineEnd = caller ? ` ${caller}` : '';
      return {
        ...message,
        data: message.data.map((logLine) =>
          message.level === 'warn' ? `${WARN_TAG}${logLine}${lineEnd}` : `${logLine}${lineEnd}`,
        ),
      };
    });
} else {
  log.initialize();
  log.transports.console.level = level;
  log.transports.console.format = '{h}:{i}:{s} {text}';
  log.transports.console.writeFn = ({ message: msg }) => {
    let message = `${msg.data}`;
    // If we're piping through a log message from another service, don't add another file path
    // Messages from other services all start with "[service name]"
    if (!/\[[\w ]+\]/.test(message)) {
      const caller = identifyCaller();
      message = caller ? `${message} ${caller}` : `${message}`;
    }

    /* eslint-disable no-console */
    switch (msg.level) {
      case 'info':
        console.log(message);
        break;
      case 'warn':
        console.log(chalk.yellow(message));
        break;
      case 'error':
        console.log(chalk.red(message));
        break;
      default:
        console.log(message);
        break;
    }
    /* eslint-enable */
  };
  log.transports.file.level = level;
}

/** JSDOC SOURCE logger
 * All extensions and services should use this logger to provide a unified output of logs
 */
const logger = log;
export default logger;
