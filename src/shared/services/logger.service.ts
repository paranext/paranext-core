import chalk from 'chalk';
import log from 'electron-log';
import { getProcessType, isServer } from '@shared/utils/internal-util';
import { includes, split } from 'platform-bible-utils';
import { ProcessType } from '@shared/global-this.model';

export const WARN_TAG = '<WARN>';

/** Represents details that can be parsed from a single line of an Error object */
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
 *
 * @param errorLine Single line from an Error object string
 * @returns Object containing the function name, file name, line number, and column number from the
 *   line of the Error object string. If the line couldn't be parsed, then undefined.
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    const [_, functionName, fileName, lineNumber, columnNumber] = matches;
    return {
      functionName,
      fileName,
      lineNumber: parseInt(lineNumber, 10),
      columnNumber: parseInt(columnNumber, 10),
    };
  }
  if (matches && matches.length === 4) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
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
 * Examine the call stack and return a parsed string containing the function name, file name, line
 * number, and column number where the call to the logger was made.
 *
 * @returns String that is suitable to attach to log output to indicate who what code wants to log
 */
function identifyCaller(): string | undefined {
  const { stack } = new Error();
  if (!stack) return undefined;
  let details: parsedErrorLine;
  const lines = split(stack, '\n');
  // Start at 3 to skip the "Error" line, this function's stack frame, and this function's caller
  for (let lineNumber = 3; lineNumber < lines.length; lineNumber += 1) {
    // Skip over all logging library frames to get to the real call
    if (!includes(lines[lineNumber], 'node_modules') && !includes(lines[lineNumber], 'node:')) {
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
 *
 * @param message Message from the service
 * @param serviceName Name of the service to show in the log
 * @returns Formatted string of a service message
 */
export function formatLog(message: string, serviceName: string) {
  // Remove the new line at the end of every message coming from stdout from other processes
  const messageTrimmed = message.trimEnd();
  const openTag = `[${serviceName}]`;
  if (includes(messageTrimmed, '\n')) {
    const closeTag = `[/${serviceName}]`;
    // Multi-line
    return `\n${openTag}\n${messageTrimmed}\n${closeTag}`;
  }
  return `${openTag} ${messageTrimmed}`;
}

/** Abstract and shim the logger */

// Make sure processType is loaded
if (!Object.values(ProcessType).includes(getProcessType()))
  // eslint-disable-next-line no-console
  console.warn(chalk.yellow(`Unexpected process type: ${globalThis.processType}`));

// insert formatting before logging
log.transports.console.level = globalThis.logLevel;
// Match console format to default file format but without the date
log.transports.console.format = '[{h}:{i}:{s}.{ms}] [{level}] {text}';
if (log.transports.file) log.transports.file.level = globalThis.logLevel;
log.hooks.push((message) => {
  // If we're piping through a log message from another process, don't add another file path
  // Messages from other processes all start with "[process name]"
  if (message.data.some((logLine) => /^\s*\[[\w ]+\]/.test(logLine))) return message;

  const caller = identifyCaller();
  return {
    ...message,
    data: message.data.map((logLine) =>
      formatLog(caller ? `${logLine} ${caller}` : `${logLine}`, getProcessType()),
    ),
  };
});
log.transports.console.writeFn = ({ message: msg }) => {
  const message = msg.data.join('\n');

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
    case 'debug':
      console.log(chalk.gray(message));
      break;
    default:
      console.log(message);
      break;
  }
  /* eslint-enable */
};

if (isServer()) {
  log.initialize();

  log.info('Done with editing logger');
}

/**
 * JSDOC SOURCE logger
 *
 * All extensions and services should use this logger to provide a unified output of logs
 */
export const logger = log;
export default logger;
