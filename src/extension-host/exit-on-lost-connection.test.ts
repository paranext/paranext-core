import { describe, expect, it, vi } from 'vitest';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE } from '@node/models/interprocess-messages.model';
import { exitExtensionHostOnLostConnection } from './exit-on-lost-connection';

vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

function setUp() {
  const lostConnection = new PlatformEventEmitter<void>();
  const exitProcess = vi.fn<(code: number) => void>();
  // Runs its exit callback at once, like the real one does in its `finally`
  const runGracefulShutdown = vi.fn(async (exit: () => void) => {
    exit();
  });
  const unsubscribe = exitExtensionHostOnLostConnection({
    onDidLoseConnection: lostConnection.event,
    runGracefulShutdown,
    exitProcess,
  });
  return { lostConnection, exitProcess, runGracefulShutdown, unsubscribe };
}

describe('exitExtensionHostOnLostConnection', () => {
  it('runs the graceful shutdown and exits with the lost-connection code when the link dies', async () => {
    const { lostConnection, exitProcess, runGracefulShutdown } = setUp();

    lostConnection.emit();
    await vi.waitFor(() => expect(exitProcess).toHaveBeenCalledTimes(1));

    expect(runGracefulShutdown).toHaveBeenCalledTimes(1);
    expect(exitProcess).toHaveBeenCalledWith(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE);
  });

  it('does nothing before the link dies', () => {
    const { exitProcess, runGracefulShutdown } = setUp();
    expect(runGracefulShutdown).not.toHaveBeenCalled();
    expect(exitProcess).not.toHaveBeenCalled();
  });

  it('reacts to the first loss only', async () => {
    const { lostConnection, exitProcess } = setUp();

    lostConnection.emit();
    lostConnection.emit();
    await vi.waitFor(() => expect(exitProcess).toHaveBeenCalled());

    expect(exitProcess).toHaveBeenCalledTimes(1);
  });

  it('stops reacting once unsubscribed', () => {
    const { lostConnection, exitProcess, unsubscribe } = setUp();

    unsubscribe();
    lostConnection.emit();

    expect(exitProcess).not.toHaveBeenCalled();
  });
});
