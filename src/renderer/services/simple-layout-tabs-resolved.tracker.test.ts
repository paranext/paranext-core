import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  trackSimpleLayoutTabsResolved,
  DEFAULT_SIMPLE_LAYOUT_TABS_RESOLVED_TIMEOUT_MS,
  TabEventSubscriber,
} from './simple-layout-tabs-resolved.tracker';

type Handler = (event: { webView: { id: string } }) => void;

/** Builds a mock subscriber that captures the registered handler and exposes a fire helper. */
function makeSubscriber(): {
  subscriber: TabEventSubscriber;
  fire: (id: string) => void;
  unsubscribe: ReturnType<typeof vi.fn>;
  getHandler: () => Handler | undefined;
} {
  let registered: Handler | undefined;
  const unsubscribe = vi.fn();
  const subscriber: TabEventSubscriber = vi.fn((handler: Handler) => {
    registered = handler;
    return unsubscribe;
  });
  return {
    subscriber,
    fire: (id: string) => registered?.({ webView: { id } }),
    unsubscribe,
    getHandler: () => registered,
  };
}

/** Wraps a promise with a synchronous `resolved` flag for ordering assertions. */
function trackResolution(promise: Promise<void>): { isResolved: () => boolean } {
  let resolved = false;
  promise
    .then(() => {
      resolved = true;
      return undefined;
    })
    .catch(() => {
      // Test promises should never reject — keep the catch to satisfy promise/catch-or-return.
    });
  return { isResolved: () => resolved };
}

describe('trackSimpleLayoutTabsResolved', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('resolves once all configured tab IDs have fired open events', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: ['a', 'b', 'c'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    const tracker = trackResolution(promise);

    open.fire('a');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(false);

    open.fire('b');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(false);

    open.fire('c');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(true);
  });

  it('resolves with mixed open/update events (one via open, others via update)', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: ['a', 'b', 'c'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    const tracker = trackResolution(promise);

    open.fire('a');
    update.fire('b');
    update.fire('c');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(true);
  });

  it('ignores events for tab IDs not in the configured list', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: ['a', 'b'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    const tracker = trackResolution(promise);

    open.fire('not-in-list');
    open.fire('something-else');
    open.fire('a');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(false);

    open.fire('b');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(true);
  });

  it('resolves after timeoutMs even if no events fire', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: ['a', 'b'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
      timeoutMs: 1000,
    });

    const tracker = trackResolution(promise);

    vi.advanceTimersByTime(500);
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(false);

    vi.advanceTimersByTime(500);
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(true);
  });

  it('uses DEFAULT_SIMPLE_LAYOUT_TABS_RESOLVED_TIMEOUT_MS when timeoutMs is omitted', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: ['a'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    const tracker = trackResolution(promise);

    vi.advanceTimersByTime(DEFAULT_SIMPLE_LAYOUT_TABS_RESOLVED_TIMEOUT_MS - 1);
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(false);

    vi.advanceTimersByTime(1);
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(true);
  });

  it('idempotent: receiving the same id twice does not trigger early-resolve while others are pending', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: ['a', 'b', 'c'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    const tracker = trackResolution(promise);

    // Fire 'a' once via open, then again via update — should be ignored the second time.
    open.fire('a');
    update.fire('a');
    open.fire('a');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(false);

    open.fire('b');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(false);

    open.fire('c');
    await Promise.resolve();
    expect(tracker.isResolved()).toBe(true);
  });

  it('does not throw when the same id fires twice', () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    trackSimpleLayoutTabsResolved({
      tabIds: ['a'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    expect(() => {
      open.fire('a');
      open.fire('a');
      update.fire('a');
    }).not.toThrow();
  });

  it('dispose() unsubscribes from both event sources', () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { dispose } = trackSimpleLayoutTabsResolved({
      tabIds: ['a', 'b'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    expect(open.unsubscribe).not.toHaveBeenCalled();
    expect(update.unsubscribe).not.toHaveBeenCalled();

    dispose();

    expect(open.unsubscribe).toHaveBeenCalledTimes(1);
    expect(update.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('subscription cleanup happens automatically when resolved by events', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: ['a'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    open.fire('a');
    await promise;

    expect(open.unsubscribe).toHaveBeenCalledTimes(1);
    expect(update.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('subscription cleanup happens automatically when resolved by timeout', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: ['a'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
      timeoutMs: 100,
    });

    vi.advanceTimersByTime(100);
    await promise;

    expect(open.unsubscribe).toHaveBeenCalledTimes(1);
    expect(update.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('dispose() is idempotent — calling it twice does not double-unsubscribe', () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { dispose } = trackSimpleLayoutTabsResolved({
      tabIds: ['a'],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
    });

    dispose();
    dispose();

    expect(open.unsubscribe).toHaveBeenCalledTimes(1);
    expect(update.unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('with empty tabIds, resolves immediately (no waiting for timeout)', async () => {
    const open = makeSubscriber();
    const update = makeSubscriber();
    const { promise } = trackSimpleLayoutTabsResolved({
      tabIds: [],
      onDidOpenWebView: open.subscriber,
      onDidUpdateWebView: update.subscriber,
      timeoutMs: 10_000,
    });

    // The promise should resolve without advancing the fake timer — nothing to wait for.
    await expect(promise).resolves.toBeUndefined();
    // Subscriptions should have been torn down as part of the immediate resolve.
    expect(open.unsubscribe).toHaveBeenCalledTimes(1);
    expect(update.unsubscribe).toHaveBeenCalledTimes(1);
  });
});
