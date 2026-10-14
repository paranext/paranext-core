import { EventEmitter } from 'events';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE,
  gracefulShutdownMessage,
} from '@node/models/interprocess-messages.model';

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

describe('extensionHostService stop reporting', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.isAppShuttingDown.mockReturnValue(false);
    globalThis.resourcesPath = '/repo';
    globalThis.logLevel = 'info';
  });

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
  // while its lifetime is unresolved. When it finally exits, that exit belongs to a stop main asked
  // for, however late it arrives.
  test('the late exit of a child main already gave up on announces nothing', async () => {
    const stuck = new FakeExtensionHost(false);
    willFork(stuck);
    const { extensionHostService, onStop } = await loadService();
    await extensionHostService.start(MAX_WAIT_MS);
    await expect(extensionHostService.restart(MAX_WAIT_MS)).rejects.toThrow(
      'Previous instance of the extension host process was not cleaned up',
    );
    expect(stuck.kill).toHaveBeenCalledWith('SIGKILL');

    // A signal ends it, so Node reports no exit code: null, as `exit` documents.
    // eslint-disable-next-line no-null/no-null
    stuck.exit(null, 'SIGKILL');

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
