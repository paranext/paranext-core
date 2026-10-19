import { EventEmitter } from 'events';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE,
  extensionHostStartedMessage,
  gracefulShutdownMessage,
} from '@node/models/interprocess-messages.model';
import { EXTENSION_HOST_RESTART_READY_TIMEOUT_MS } from '@shared/models/extension-host-lifecycle.model';

const mocks = vi.hoisted(() => ({
  fork: vi.fn(),
  isAppShuttingDown: vi.fn(() => false),
}));

// Both a named and a default export: the service imports `fork` by name, but esModuleInterop means
// the transpiled require still reaches for `default` on the module record.
vi.mock('child_process', () => ({ fork: mocks.fork, default: { fork: mocks.fork } }));
// Packaged, so `start` forks and returns without setting up the dev-mode file watcher.
vi.mock('electron', () => ({ app: { isPackaged: true }, default: { app: { isPackaged: true } } }));
vi.mock('@main/services/shutdown-latch.service', () => ({
  isAppShuttingDown: mocks.isAppShuttingDown,
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

/** Short, so the requested-stop budget runs out quickly in the hard-kill case. */
const MAX_WAIT_MS = 40;

/**
 * A stand-in for the forked extension host: an event emitter with the members the service uses.
 * `exitOnShutdownMessage` makes it exit with code 0 when main sends the graceful-shutdown message,
 * as the real process does; otherwise it ignores the message, like one stuck deactivating.
 */
class FakeExtensionHost extends EventEmitter {
  stdout = new EventEmitter();

  stderr = new EventEmitter();

  pid = 1234;

  kill = vi.fn(() => true);

  send = vi.fn((message: unknown) => {
    if (message === gracefulShutdownMessage && this.exitOnShutdownMessage)
      setTimeout(() => this.exit(0));
    return true;
  });

  constructor(private readonly exitOnShutdownMessage: boolean) {
    super();
  }

  /** How many graceful-shutdown messages main has sent this child. */
  get shutdownRequestCount() {
    return this.send.mock.calls.filter(([message]) => message === gracefulShutdownMessage).length;
  }

  /**
   * Ends the process the way Node reports it: one `exit` event with a code or a signal, the other
   * one `null`.
   */
  // Node's `exit` event reports the absent one of code and signal as null, and the service checks
  // for exactly that.
  // eslint-disable-next-line no-null/no-null
  exit(code: number | null, signal: string | null = null) {
    this.emit('exit', code, signal);
  }

  /** Tells main it has finished starting, over the IPC channel, as the real process does. */
  announceStarted() {
    this.emit('message', extensionHostStartedMessage);
  }
}

/** Queue the children `fork` returns, in order. */
function willFork(...children: FakeExtensionHost[]) {
  children.forEach((child) => mocks.fork.mockReturnValueOnce(child));
}

/** A fresh copy of the service per test: it keeps the current child and its flags in module state. */
async function loadService() {
  vi.resetModules();
  const { extensionHostService } = await import('@main/services/extension-host.service');
  const onStop = vi.fn();
  extensionHostService.onDidStopUnexpectedly(onStop);
  return { extensionHostService, onStop };
}

function resetMocksAndGlobals() {
  vi.clearAllMocks();
  // Also drops children a test queued but never forked, so they cannot leak into the next test.
  mocks.fork.mockReset();
  mocks.isAppShuttingDown.mockReturnValue(false);
  globalThis.resourcesPath = '/repo';
  globalThis.logLevel = 'info';
}

describe('extensionHostService stop reporting', () => {
  beforeEach(resetMocksAndGlobals);

  test('a requested restart announces nothing', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    willFork(first, second);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);

    await extensionHostService.restart(MAX_WAIT_MS);

    expect(mocks.fork).toHaveBeenCalledTimes(2);
    expect(onStop).not.toHaveBeenCalled();
    expect(extensionHostService.getLastUnexpectedStop()).toBeUndefined();
  });

  test('an exit nobody asked for after a restart is announced as a crash and remembered', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    willFork(first, second);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    await extensionHostService.restart(MAX_WAIT_MS);

    second.exit(1);

    expect(onStop).toHaveBeenCalledTimes(1);
    expect(onStop).toHaveBeenCalledWith({ reason: 'crashed' });
    expect(extensionHostService.getLastUnexpectedStop()).toEqual({ reason: 'crashed' });
  });

  test('an exit with the lost-connection code is announced as a lost connection', async () => {
    const child = new FakeExtensionHost(true);
    willFork(child);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);

    child.exit(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE);

    expect(onStop).toHaveBeenCalledWith({ reason: 'lost-connection' });
    expect(extensionHostService.getLastUnexpectedStop()).toEqual({ reason: 'lost-connection' });
  });

  test('a fork forgets the remembered stop', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    willFork(first, second);
    const { extensionHostService } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    first.exit(1);
    expect(extensionHostService.getLastUnexpectedStop()).toEqual({ reason: 'crashed' });

    await extensionHostService.restart(MAX_WAIT_MS);

    expect(extensionHostService.getLastUnexpectedStop()).toBeUndefined();
  });

  // A child that ignored the shutdown message is hard-killed, and a restart then refuses to fork
  // while its lifetime is unresolved. Nothing is running any more, so that refusal is announced as a
  // stop. When the child finally exits, that exit belongs to a stop main asked for, however late it
  // arrives, so it announces nothing more.
  test('a restart that cannot fork is announced as a crash, and the late exit announces nothing more', async () => {
    const stuck = new FakeExtensionHost(false);
    willFork(stuck);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    await expect(extensionHostService.restart(MAX_WAIT_MS)).rejects.toThrow(
      'Previous instance of the extension host process was not cleaned up',
    );
    expect(stuck.kill).toHaveBeenCalledWith('SIGKILL');
    expect(onStop).toHaveBeenCalledTimes(1);
    expect(onStop).toHaveBeenCalledWith({ reason: 'crashed' });
    expect(extensionHostService.getLastUnexpectedStop()).toEqual({ reason: 'crashed' });

    // A signal ends it, so Node reports no exit code: null, as `exit` documents.
    // eslint-disable-next-line no-null/no-null
    stuck.exit(null, 'SIGKILL');

    expect(onStop).toHaveBeenCalledTimes(1);
    expect(extensionHostService.getLastUnexpectedStop()).toEqual({ reason: 'crashed' });
  });

  test('a restart that could not fork can be retried once the old child has exited', async () => {
    const stuck = new FakeExtensionHost(false);
    const replacement = new FakeExtensionHost(true);
    willFork(stuck, replacement);
    const { extensionHostService } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    await expect(extensionHostService.restart(MAX_WAIT_MS)).rejects.toThrow(
      'Previous instance of the extension host process was not cleaned up',
    );
    // A signal ends it, so Node reports no exit code: null, as `exit` documents.
    // eslint-disable-next-line no-null/no-null
    stuck.exit(null, 'SIGKILL');

    await extensionHostService.restart(MAX_WAIT_MS);

    expect(mocks.fork).toHaveBeenCalledTimes(2);
    expect(extensionHostService.getLastUnexpectedStop()).toBeUndefined();
  });

  test('a restart that cannot fork while the app is shutting down announces nothing', async () => {
    const stuck = new FakeExtensionHost(false);
    willFork(stuck);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    mocks.isAppShuttingDown.mockReturnValue(true);

    await expect(extensionHostService.restart(MAX_WAIT_MS)).rejects.toThrow(
      'Previous instance of the extension host process was not cleaned up',
    );

    expect(onStop).not.toHaveBeenCalled();
    expect(extensionHostService.getLastUnexpectedStop()).toBeUndefined();
  });

  // `kill` hard-kills without setting the requested-stop flag, so only the check that the exiting
  // child is still the current one keeps this exit quiet.
  test('the exit of a child main hard-killed directly announces nothing', async () => {
    const child = new FakeExtensionHost(true);
    willFork(child);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);

    extensionHostService.kill();
    // A signal ends it, so Node reports no exit code: null, as `exit` documents.
    // eslint-disable-next-line no-null/no-null
    child.exit(null, 'SIGKILL');

    expect(child.kill).toHaveBeenCalledWith('SIGKILL');
    expect(onStop).not.toHaveBeenCalled();
    expect(extensionHostService.getLastUnexpectedStop()).toBeUndefined();
  });

  test('announces nothing while the app is shutting down', async () => {
    const child = new FakeExtensionHost(true);
    willFork(child);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    mocks.isAppShuttingDown.mockReturnValue(true);

    child.exit(1);

    expect(onStop).not.toHaveBeenCalled();
  });
});

// A restart counts as in flight from the moment it begins until the new extension host says it has
// started, so a second caller (another window's Restart button) joins it instead of killing the host
// that is still booting.
describe('extensionHostService restart in flight', () => {
  beforeEach(resetMocksAndGlobals);

  afterEach(() => {
    vi.useRealTimers();
  });

  test('two restarts at once stop the running host once and fork once', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    const third = new FakeExtensionHost(true);
    willFork(first, second, third);
    const { extensionHostService } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);

    await Promise.all([
      extensionHostService.restart(MAX_WAIT_MS),
      extensionHostService.restart(MAX_WAIT_MS),
    ]);

    expect(first.shutdownRequestCount).toBe(1);
    expect(mocks.fork).toHaveBeenCalledTimes(2);
  });

  test('a restart after the fork but before the new host has started joins the first', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    const third = new FakeExtensionHost(true);
    willFork(first, second, third);
    const { extensionHostService } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    await extensionHostService.restart(MAX_WAIT_MS);

    await extensionHostService.restart(MAX_WAIT_MS);

    expect(second.shutdownRequestCount).toBe(0);
    expect(mocks.fork).toHaveBeenCalledTimes(2);
  });

  test('a restart after the new host has started forks again', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    const third = new FakeExtensionHost(true);
    willFork(first, second, third);
    const { extensionHostService } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    await extensionHostService.restart(MAX_WAIT_MS);
    second.announceStarted();

    await extensionHostService.restart(MAX_WAIT_MS);

    expect(second.shutdownRequestCount).toBe(1);
    expect(mocks.fork).toHaveBeenCalledTimes(3);
  });

  test('a start announced by a host that is no longer the current one does not end the restart', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    const third = new FakeExtensionHost(true);
    willFork(first, second, third);
    const { extensionHostService } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    await extensionHostService.restart(MAX_WAIT_MS);
    first.announceStarted();

    await extensionHostService.restart(MAX_WAIT_MS);

    expect(second.shutdownRequestCount).toBe(0);
    expect(mocks.fork).toHaveBeenCalledTimes(2);
  });

  // The old host can finish booting after it was told to shut down; that says nothing about the host
  // the restart is about to fork.
  test('a start announced by the host being stopped does not end the restart', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    const third = new FakeExtensionHost(true);
    willFork(first, second, third);
    const { extensionHostService } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    const restarting = extensionHostService.restart(MAX_WAIT_MS);
    expect(first.shutdownRequestCount).toBe(1);

    first.announceStarted();
    const joining = extensionHostService.restart(MAX_WAIT_MS);
    await Promise.all([restarting, joining]);

    expect(first.shutdownRequestCount).toBe(1);
    expect(mocks.fork).toHaveBeenCalledTimes(2);
  });

  test('a restart after the new host stopped unexpectedly forks again', async () => {
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    const third = new FakeExtensionHost(true);
    willFork(first, second, third);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    await extensionHostService.restart(MAX_WAIT_MS);
    second.exit(1);
    expect(onStop).toHaveBeenCalledWith({ reason: 'crashed' });

    await extensionHostService.restart(MAX_WAIT_MS);

    expect(mocks.fork).toHaveBeenCalledTimes(3);
  });

  test('a restart once the ready timeout has passed without a start announcement forks again', async () => {
    vi.useFakeTimers();
    const first = new FakeExtensionHost(true);
    const second = new FakeExtensionHost(true);
    const third = new FakeExtensionHost(true);
    willFork(first, second, third);
    const { extensionHostService } = await loadService();
    /** Restart, moving the fake clock along so the graceful shutdown can complete. */
    async function restart() {
      const restarting = extensionHostService.restart(MAX_WAIT_MS);
      await vi.advanceTimersByTimeAsync(MAX_WAIT_MS);
      await restarting;
    }
    await extensionHostService.start(MAX_WAIT_MS);
    await restart();

    // Just short of the timeout (measured from when the restart began) a restart still joins.
    await vi.advanceTimersByTimeAsync(EXTENSION_HOST_RESTART_READY_TIMEOUT_MS - 2 * MAX_WAIT_MS);
    await restart();
    expect(mocks.fork).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(MAX_WAIT_MS);
    await restart();

    expect(second.shutdownRequestCount).toBe(1);
    expect(mocks.fork).toHaveBeenCalledTimes(3);
  });
});
