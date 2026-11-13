import { EventEmitter } from 'events';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { EXTENSION_HOST_STARTUP_FAILURE_EXIT_CODE } from '@node/models/interprocess-messages.model';
import { logger } from '@shared/services/logger.service';
import { receiveLaunchSecrets } from './receive-launch-secrets';

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

const SECRETS = { clientSecret: 'fake-client-secret', serverSecret: 'fake-server-secret' };

/** Stands in for `process`: an emitter with or without the `send` an IPC channel adds */
function createProcess(hasIpcChannel: boolean) {
  const fakeProcess = new EventEmitter();
  return Object.assign(fakeProcess, hasIpcChannel ? { send: vi.fn() } : {});
}

describe('receiveLaunchSecrets', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('hands the secrets over once main sends them, and stops listening', async () => {
    const fakeProcess = createProcess(true);
    const setLaunchCredentials = vi.fn();
    const exitProcess = vi.fn();

    const received = receiveLaunchSecrets({
      process: fakeProcess,
      setLaunchCredentials,
      exitProcess,
    });
    fakeProcess.emit('message', 'heartbeat');
    fakeProcess.emit('message', { type: 'papiLaunchSecrets', ...SECRETS });
    await received;

    expect(setLaunchCredentials).toHaveBeenCalledExactlyOnceWith(SECRETS);
    expect(fakeProcess.listenerCount('message')).toBe(0);
    vi.advanceTimersByTime(60_000);
    expect(exitProcess).not.toHaveBeenCalled();
  });

  it('exits when no secrets arrive', async () => {
    const fakeProcess = createProcess(true);
    const setLaunchCredentials = vi.fn();
    const exitProcess = vi.fn();

    receiveLaunchSecrets({ process: fakeProcess, setLaunchCredentials, exitProcess });
    vi.advanceTimersByTime(10_000);

    expect(exitProcess).toHaveBeenCalledExactlyOnceWith(EXTENSION_HOST_STARTUP_FAILURE_EXIT_CODE);
    expect(logger.error).toHaveBeenCalled();
    expect(setLaunchCredentials).not.toHaveBeenCalled();
  });

  it('ignores a malformed secrets message', async () => {
    const fakeProcess = createProcess(true);
    const setLaunchCredentials = vi.fn();
    const exitProcess = vi.fn();

    receiveLaunchSecrets({ process: fakeProcess, setLaunchCredentials, exitProcess });
    fakeProcess.emit('message', { type: 'papiLaunchSecrets', clientSecret: 42 });
    vi.advanceTimersByTime(10_000);

    expect(setLaunchCredentials).not.toHaveBeenCalled();
    expect(exitProcess).toHaveBeenCalled();
  });

  it('does not wait without an IPC channel', async () => {
    const fakeProcess = createProcess(false);
    const setLaunchCredentials = vi.fn();
    const exitProcess = vi.fn();

    await receiveLaunchSecrets({ process: fakeProcess, setLaunchCredentials, exitProcess });

    expect(setLaunchCredentials).not.toHaveBeenCalled();
    expect(fakeProcess.listenerCount('message')).toBe(0);
    vi.advanceTimersByTime(60_000);
    expect(exitProcess).not.toHaveBeenCalled();
  });
});
