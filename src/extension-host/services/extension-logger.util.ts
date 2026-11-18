import type { MainLogger } from 'electron-log';

/** The logger extensions get as `papi.logger`: only electron-log's logging methods */
export type ExtensionLogger = Readonly<
  Pick<MainLogger, 'error' | 'warn' | 'info' | 'verbose' | 'debug' | 'silly' | 'log'>
>;

/**
 * Wraps `logger` so extensions can log through it but cannot reach its settings. electron-log's
 * `transports.file` can point the log file, and `readAllLogs`, at any path, and freezing the logger
 * does not freeze its nested settings.
 *
 * The methods are bound rather than wrapped in functions, because a bound function adds no stack
 * frame: the logger finds the caller it shows on each line by counting frames from its own.
 *
 * @param logger The logger to forward to
 * @returns A frozen object with only the logging methods
 */
export function createExtensionLogger(logger: MainLogger): ExtensionLogger {
  return Object.freeze({
    error: logger.error.bind(logger),
    warn: logger.warn.bind(logger),
    info: logger.info.bind(logger),
    verbose: logger.verbose.bind(logger),
    debug: logger.debug.bind(logger),
    silly: logger.silly.bind(logger),
    log: logger.log.bind(logger),
  });
}
