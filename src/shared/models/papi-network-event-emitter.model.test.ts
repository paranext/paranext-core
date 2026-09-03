import { beforeEach, describe, expect, it, vi } from 'vitest';
// `vi.mock` is hoisted above these imports, so the model resolves against the stub below
import { PapiNetworkEventEmitter } from '@shared/models/papi-network-event-emitter.model';
import { logger } from '@shared/services/logger.service';

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('emitIsolated', () => {
  it('tells the local subscribers even when sending to the network throws', () => {
    const networkFailure = new Error('could not reach the network');
    const emitter = new PapiNetworkEventEmitter<string>(
      () => {
        throw networkFailure;
      },
      () => {},
    );
    const subscribersRun: number[] = [];
    emitter.subscribe(() => subscribersRun.push(0));
    emitter.subscribe(() => subscribersRun.push(1));
    const reportedErrors: [unknown, number][] = [];

    expect(() =>
      emitter.emitIsolated('the news', (error, subscriberIndex) => {
        reportedErrors.push([error, subscriberIndex]);
      }),
    ).not.toThrow();

    expect(subscribersRun).toEqual([0, 1]);
    // The network callback reports its own failures; a throw out of it is that callback's bug, not
    // news about a subscriber, so it is logged rather than routed to `handleSubscriberError`
    expect(reportedErrors).toEqual([]);
    expect(logger.error).toHaveBeenCalledTimes(1);
  });

  it('keeps isolating the local subscribers from each other when the network throws', () => {
    const emitter = new PapiNetworkEventEmitter<string>(
      () => {
        throw new Error('could not reach the network');
      },
      () => {},
    );
    const subscribersRun: number[] = [];
    const thrown = new Error('subscriber blew up');
    emitter.subscribe(() => subscribersRun.push(0));
    emitter.subscribe(() => {
      throw thrown;
    });
    emitter.subscribe(() => subscribersRun.push(2));
    const reportedErrors: [unknown, number][] = [];

    emitter.emitIsolated('the news', (error, subscriberIndex) => {
      reportedErrors.push([error, subscriberIndex]);
    });

    expect(subscribersRun).toEqual([0, 2]);
    expect(reportedErrors).toEqual([[thrown, 1]]);
  });

  it('refuses to emit once disposed, without sending to the network', () => {
    const networkSubscriber = vi.fn();
    const emitter = new PapiNetworkEventEmitter<string>(networkSubscriber, () => {});
    emitter.dispose();

    // Emitting on a disposed emitter is the caller's bug, and there are no local subscribers left
    // to isolate — `dispose` dropped them — so this must keep throwing like every other emit path
    expect(() => emitter.emitIsolated('the news', () => {})).toThrow('Emitter is disposed');
    expect(networkSubscriber).not.toHaveBeenCalled();
  });
});
