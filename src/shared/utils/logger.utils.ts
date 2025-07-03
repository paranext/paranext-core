import { ProcessType } from '@shared/global-this.model';
import { includes, split } from 'platform-bible-utils';
import { getProcessType, isRenderer } from '@shared/utils/internal-util';
import chalk from 'chalk';
import { MainLogger, RendererLogger } from 'electron-log';

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
  // Renderer doesn't have access to `process`, so we're just gonna go with it
  const filePath =
    isRenderer() || process.platform === 'win32' ? details.fileName : `file://${details.fileName}`;
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
    return `${openTag}\n${messageTrimmed}\n${closeTag}`;
  }
  return `${openTag} ${messageTrimmed}`;
}

/** Does shared setup on the logger in any process */
export function setUpLogger(log: MainLogger | RendererLogger) {
  // Make sure processType is loaded
  if (!Object.values(ProcessType).includes(getProcessType()))
    // eslint-disable-next-line no-console
    console.warn(chalk.yellow(`Unexpected process type: ${globalThis.processType}`));

  // insert formatting before logging
  log.transports.console.level = globalThis.logLevel;
  // Match console format to default file format but without the date
  log.transports.console.format = '[{h}:{i}:{s}.{ms}] [{level}] {text}';
  // Don't show main console logs in the renderer DevTools
  if (log.transports.ipc) log.transports.ipc.level = false;
  log.hooks.push((message) => {
    // If we're piping through a log message from another process, don't add another file path
    // Messages from other processes all start with "[process name]"
    if (message.data.some((logLine) => /^\s*\[[\w\d:. ]+\]/.test(logLine)))
      if (message.variables?.processType === 'renderer')
        // And skip formatting if it comes from the renderer because it already has formatting
        return {
          ...message,
          variables: {
            ...message.variables,
            // Not sure when variables would not be defined, so dunno when this could happen
            processType: message.variables?.processType ?? 'unknown',
            skipFormatting: true,
          },
        };
      else return message;

    const caller = identifyCaller();

    let processName = 'unkn';
    switch (
      // Renderer's logs come in through main with `message.variables.processType` set to 'renderer'
      message.variables?.processType === 'renderer' ? ProcessType.Renderer : getProcessType()
    ) {
      case ProcessType.Main:
        processName = 'main';
        break;
      case ProcessType.ExtensionHost:
        processName = 'exth';
        break;
      case ProcessType.Renderer:
        processName = 'rend';
        break;
      default:
        // Not expecting unknown. dotnet is already handled in `dotnet-data-provider.service.ts`
        break;
    }

    return {
      ...message,
      data: message.data.map((logLine) =>
        formatLog(caller ? `${logLine} ${caller}` : `${logLine}`, processName),
      ),
    };
  });
}
