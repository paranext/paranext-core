import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE } from '@node/models/interprocess-messages.model';
import {
  exitExtensionHostOnLostConnection,
  LOST_CONNECTION_JOINED_SHUTDOWN_TIMEOUT_MS,
  LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS,
} from './exit-on-lost-connection';

const mocks = vi.hoisted(() => ({
  analyticsShutdown: vi.fn(),
  extensionShutdown: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
// Only the tests that run the real graceful shutdown reach these.
vi.mock('@extension-host/services/analytics.service', () => ({
  shutdown: mocks.analyticsShutdown,
}));
vi.mock('@extension-host/services/extension.service', () => ({
  shutdown: mocks.extensionShutdown,
}));

function setUp(
  runGracefulShutdown: (exit: () => void) => Promise<void> = vi.fn(async (exit: () => void) => {
    // Runs its exit callback at once, like the real one does in its `finally`
    exit();
  }),
  hasGracefulShutdownStarted: () => boolean = () => false,
) {
  const lostConnection = new PlatformEventEmitter<void>();
  const exitProcess = vi.fn<(code: number) => void>();
  const unsubscribe = exitExtensionHostOnLostConnection({
    onDidLoseConnection: lostConnection.event,
    runGracefulShutdown,
    hasGracefulShutdownStarted,
    exitProcess,
  });
  return { lostConnection, exitProcess, runGracefulShutdown, unsubscribe };
}

describe('exitExtensionHostOnLostConnection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs the graceful shutdown and exits with the lost-connection code when the link dies', () => {
    const { lostConnection, exitProcess, runGracefulShutdown } = setUp();

    lostConnection.emit();

    expect(runGracefulShutdown).toHaveBeenCalledTimes(1);
    expect(exitProcess).toHaveBeenCalledTimes(1);
    expect(exitProcess).toHaveBeenCalledWith(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE);
  });

  it('does nothing before the link dies', () => {
    const { exitProcess, runGracefulShutdown } = setUp();
    expect(runGracefulShutdown).not.toHaveBeenCalled();
    expect(exitProcess).not.toHaveBeenCalled();
  });

  it('reacts to the first loss only', () => {
    const { lostConnection, exitProcess, runGracefulShutdown } = setUp();

    lostConnection.emit();
    lostConnection.emit();

    expect(runGracefulShutdown).toHaveBeenCalledTimes(1);
    expect(exitProcess).toHaveBeenCalledTimes(1);
  });

  it('stops reacting once unsubscribed', () => {
    const { lostConnection, exitProcess, unsubscribe } = setUp();

    unsubscribe();
    lostConnection.emit();

    expect(exitProcess).not.toHaveBeenCalled();
  });

  // Nothing else bounds this shutdown: main is not waiting for it, so an extension whose
  // `deactivate` never settles would otherwise leave a process no window is told about.
  it('exits with the lost-connection code anyway when the graceful shutdown hangs', () => {
    const { lostConnection, exitProcess } = setUp(() => new Promise<void>(() => {}));

    lostConnection.emit();
    vi.advanceTimersByTime(LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS - 1);
    expect(exitProcess).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(exitProcess).toHaveBeenCalledTimes(1);
    expect(exitProcess).toHaveBeenCalledWith(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE);
  });

  // A real `process.exit` never returns, but whatever ends the process here, a shutdown that has
  // finished leaves the watchdog nothing to do.
  it('disarms the watchdog once the graceful shutdown has finished', async () => {
    const { lostConnection, exitProcess } = setUp();

    lostConnection.emit();
    await vi.advanceTimersByTimeAsync(LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS);

    expect(exitProcess).toHaveBeenCalledTimes(1);
  });

  // An unreferenced timer would let Node exit with code 0 when a hung shutdown leaves nothing else
  // pending, and main would report a crash instead of a lost connection.
  it('keeps the event loop alive with its watchdog', () => {
    vi.useRealTimers();
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');
    const { lostConnection } = setUp(() => new Promise<void>(() => {}));

    lostConnection.emit();

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    const handle = setTimeoutSpy.mock.results[0].value;
    try {
      expect(handle.hasRef()).toBe(true);
    } finally {
      clearTimeout(handle);
      setTimeoutSpy.mockRestore();
    }
  });

  describe('with the real graceful shutdown', () => {
    beforeEach(() => {
      vi.resetModules();
      mocks.analyticsShutdown.mockReset().mockResolvedValue(undefined);
      mocks.extensionShutdown.mockReset();
    });

    // Main's graceful-shutdown message and the socket closing can both arrive during an app quit or
    // a restart. That shutdown is main's to bound: neither a second shutdown run nor a watchdog may
    // end the process with the lost-connection code while it is still deactivating extensions,
    // however long that takes.
    it('a loss during a shutdown already under way does not start a second one or exit with the lost-connection code', async () => {
      const { runGracefulShutdown, hasGracefulShutdownStarted } = await import(
        './graceful-shutdown'
      );
      let finishDeactivating: () => void = () => {};
      mocks.extensionShutdown.mockReturnValue(
        new Promise<void>((resolve) => {
          finishDeactivating = resolve;
        }),
      );
      const exitAfterRequestedShutdown = vi.fn();
      const requestedShutdown = runGracefulShutdown(exitAfterRequestedShutdown);
      const { lostConnection, exitProcess } = setUp(
        runGracefulShutdown,
        hasGracefulShutdownStarted,
      );
      await vi.waitFor(() => expect(mocks.extensionShutdown).toHaveBeenCalledTimes(1));

      lostConnection.emit();
      vi.advanceTimersByTime(LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS);
      expect(exitProcess).not.toHaveBeenCalled();
      finishDeactivating();
      await requestedShutdown;

      expect(mocks.extensionShutdown).toHaveBeenCalledTimes(1);
      expect(exitAfterRequestedShutdown).toHaveBeenCalledTimes(1);
      expect(exitProcess).not.toHaveBeenCalled();
    });

    // The backstop for a joined shutdown fires only when main, which normally hard-kills a
    // requested stop long before, is gone and an extension's `deactivate` hangs.
    it('ends a joined shutdown that hangs after the longer backstop, not the lost-connection timeout', async () => {
      const { runGracefulShutdown, hasGracefulShutdownStarted } = await import(
        './graceful-shutdown'
      );
      mocks.extensionShutdown.mockReturnValue(new Promise<void>(() => {}));
      const exitAfterRequestedShutdown = vi.fn();
      runGracefulShutdown(exitAfterRequestedShutdown);
      const { lostConnection, exitProcess } = setUp(
        runGracefulShutdown,
        hasGracefulShutdownStarted,
      );
      await vi.waitFor(() => expect(mocks.extensionShutdown).toHaveBeenCalledTimes(1));

      lostConnection.emit();
      vi.advanceTimersByTime(LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS);
      expect(exitProcess).not.toHaveBeenCalled();

      vi.advanceTimersByTime(
        LOST_CONNECTION_JOINED_SHUTDOWN_TIMEOUT_MS - LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS,
      );
      expect(exitProcess).toHaveBeenCalledTimes(1);
      expect(exitProcess).toHaveBeenCalledWith(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE);
      expect(exitAfterRequestedShutdown).not.toHaveBeenCalled();
    });

    // With the real module the started flag turns true as soon as the shutdown is called, so this
    // pins that the loss reads it before starting the shutdown itself.
    it('bounds a shutdown the loss itself starts with the lost-connection timeout', async () => {
      const { runGracefulShutdown, hasGracefulShutdownStarted } = await import(
        './graceful-shutdown'
      );
      mocks.extensionShutdown.mockReturnValue(new Promise<void>(() => {}));
      const { lostConnection, exitProcess } = setUp(
        runGracefulShutdown,
        hasGracefulShutdownStarted,
      );

      lostConnection.emit();
      await vi.waitFor(() => expect(mocks.extensionShutdown).toHaveBeenCalledTimes(1));
      vi.advanceTimersByTime(LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS);

      expect(exitProcess).toHaveBeenCalledTimes(1);
      expect(exitProcess).toHaveBeenCalledWith(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE);
    });
  });
});
