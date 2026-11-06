import { logger } from '@shared/services/logger.service';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { RendererStartupSteps, startRendererServices } from './renderer-startup.util';

afterEach(() => {
  vi.restoreAllMocks();
});

/** Startup steps that record the order they run in */
function recordingSteps(overrides: Partial<RendererStartupSteps> = {}) {
  const calls: string[] = [];
  const steps: RendererStartupSteps = {
    networkService: {
      initialize: vi.fn(async () => {
        calls.push('initialize network');
      }),
    },
    initConnectionLostService: vi.fn(() => calls.push('subscribe connection lost')),
    initExtensionHostStoppedService: vi.fn(() => calls.push('subscribe extension host stopped')),
    startServices: vi.fn(async () => {
      calls.push('start services');
    }),
    ...overrides,
  };
  return { calls, steps };
}

describe('startRendererServices', () => {
  it('subscribes to lost connections and extension host events before initializing the network', async () => {
    const { calls, steps } = recordingSteps();

    await startRendererServices(steps);

    expect(calls).toEqual([
      'subscribe connection lost',
      'subscribe extension host stopped',
      'initialize network',
      'start services',
    ]);
  });

  it('sees a connection lost while the network service is still initializing', async () => {
    // `onDidLoseConnection` exists before `initialize()` and does not replay to a late subscriber
    const lostConnection = new PlatformEventEmitter<void>();
    const onLoss = vi.fn();
    const { steps } = recordingSteps({
      networkService: {
        initialize: async () => {
          lostConnection.emit();
          throw new Error('connection lost');
        },
      },
      initConnectionLostService: () => lostConnection.subscribe(onLoss),
    });
    vi.spyOn(logger, 'error').mockImplementation(() => {});

    await startRendererServices(steps);

    expect(onLoss).toHaveBeenCalledTimes(1);
  });

  it('starts the other services only once the network service has initialized', async () => {
    let finishInitializing = () => {};
    const { steps } = recordingSteps({
      networkService: {
        initialize: () =>
          new Promise<void>((resolve) => {
            finishInitializing = resolve;
          }),
      },
    });

    const started = startRendererServices(steps);
    await Promise.resolve();
    expect(steps.startServices).not.toHaveBeenCalled();

    finishInitializing();
    await started;
    expect(steps.startServices).toHaveBeenCalledTimes(1);
  });

  it('logs a service that fails to start instead of rejecting', async () => {
    const error = vi.spyOn(logger, 'error').mockImplementation(() => {});
    const { steps } = recordingSteps({
      startServices: async () => {
        throw new Error('theme service failed');
      },
    });

    await expect(startRendererServices(steps)).resolves.toBeUndefined();
    expect(error).toHaveBeenCalledWith(expect.stringContaining('theme service failed'));
  });
});
