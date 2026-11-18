import type { MainLogger } from 'electron-log';
import { createExtensionLogger } from './extension-logger.util';

describe('createExtensionLogger', () => {
  const LOG_METHODS = ['debug', 'error', 'info', 'log', 'silly', 'verbose', 'warn'];

  /** Stands in for electron-log: records each call and the stack it was made with */
  function createRecordingLogger() {
    const calls: { method: string; args: unknown[]; self: unknown; stack: string }[] = [];
    const logger: Record<string, unknown> = { transports: { file: {} }, scope: () => {} };
    LOG_METHODS.forEach((method) => {
      logger[method] = function record(this: unknown, ...args: unknown[]) {
        calls.push({ method, args, self: this, stack: new Error().stack ?? '' });
      };
    });
    // The test only needs the members it records; the rest of `MainLogger` is not used
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return { logger: logger as unknown as MainLogger, calls };
  }

  it('exposes only the logging methods, frozen', () => {
    const extensionLogger = createExtensionLogger(createRecordingLogger().logger);

    expect(Object.keys(extensionLogger).sort()).toEqual(LOG_METHODS);
    expect(Object.isFrozen(extensionLogger)).toBe(true);
    expect('transports' in extensionLogger).toBe(false);
  });

  it('forwards each call to the logger it wraps', () => {
    const { logger, calls } = createRecordingLogger();
    const extensionLogger = createExtensionLogger(logger);

    LOG_METHODS.forEach((method) => {
      // Each method is called through the object an extension sees
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (extensionLogger as unknown as Record<string, (...args: unknown[]) => void>)[method](
        method,
        1,
      );
    });

    expect(calls.map(({ method, args, self }) => ({ method, args, self }))).toEqual(
      LOG_METHODS.map((method) => ({ method, args: [method, 1], self: logger })),
    );
  });

  it('adds no stack frame, so the log shows the extension as the caller', () => {
    const { logger, calls } = createRecordingLogger();
    const extensionLogger = createExtensionLogger(logger);

    (function callerInExtension() {
      extensionLogger.info('message');
    })();

    // Line 0 is "Error", line 1 the logger method itself, line 2 whoever called it
    expect(calls[0].stack.split('\n')[2]).toContain('callerInExtension');
  });
});
