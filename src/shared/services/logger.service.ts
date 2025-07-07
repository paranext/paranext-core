import log from 'electron-log';
import { isRenderer, isServer } from '@shared/utils/internal-util';
import { setUpLogger } from '@shared/utils/logger.utils';
import chalk from 'chalk';

// Abstract and shim the logger
setUpLogger(log);

// Adjust some log settings that should not be set up in the renderer process
if (!isRenderer()) {
  // Renderer doesn't log to file. Sends to main to log in file
  if (log.transports.file) {
    // This must be a `require`! Do not change to `import`. Importing outside `src` messes up papi.d.ts
    // eslint-disable-next-line global-require
    const packageInfo = require('../../../release/app/package.json');
    /** Same as {@link AppInfo.name} from `app.service-host.ts */
    const APP_NAME: string = packageInfo.name;

    log.transports.file.level = globalThis.logLevel;
    // Point electron-log to the folder to put its logs in. This is default functionality; it just
    // doesn't get set properly on the extension host without this
    log.transports.file.setAppName(globalThis.isPackaged ? APP_NAME : 'Electron');
  }

  // Chalk messes up the renderer logs a bit for some reason. Adds extra newlines
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
}

// spyRendererConsole sends logs from the renderer to the main process
if (isServer()) log.initialize({ spyRendererConsole: true });

/**
 * JSDOC SOURCE logger
 *
 * All extensions and services should use this logger to provide a unified output of logs
 */
export const logger = log;
export default logger;
