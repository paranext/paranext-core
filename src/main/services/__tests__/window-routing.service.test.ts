import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getAllObjectFunctionNames } from 'platform-bible-utils';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  startWindowRoutingService,
  testingWindowRoutingService,
} from '@main/services/window-routing.service';
import { windowServiceProviderName } from '@shared/services/window.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';

/** Handler the engine registers against the focus-change event, so tests can fire it */
type FocusChangeHandler = (windowId: number | undefined) => void;

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  focusChangeHandlers: new Set<(windowId: number | undefined) => void>(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  onDidChangeFocusedWindowId: (handler: FocusChangeHandler) => {
    mocks.focusChangeHandlers.add(handler);
    return () => mocks.focusChangeHandlers.delete(handler);
  },
}));
vi.mock('@shared/services/data-provider.service', () => ({
  dataProviderService: {
    registerEngine: vi.fn(),
    // The engine decorates `setFocus` with this at class-definition time, so it has to exist on the
    // mock before the module under test is imported
    decorators: { doNotNotify: () => {} },
  },
}));

// The engine only ever calls getFocus / setFocus / subscribeFocus on what it resolves, so the stubs
// above implement just those. Asserting them to the full IWindowService is what lets the tests stay
// that small; widening the stubs to the real interface would add surface no test exercises.
/* eslint-disable no-type-assertion/no-type-assertion */

const { FocusedWindowDataProviderEngine } = testingWindowRoutingService;

/** A scoped per-window window service that records the relay callback the engine hands it */
function windowService(focusSubject: unknown) {
  const unsubscribe = vi.fn(async () => true);
  const relay: {
    fire?: (focusSubject: unknown) => void;
    options?: { retrieveDataImmediately?: boolean };
  } = {};
  return {
    getFocus: vi.fn(async () => focusSubject),
    // Widened past `true` because the engine forwards whatever the scoped provider answers, and
    // `DataProviderUpdateInstructions` includes the data-type-name array form
    setFocus: vi.fn(async (): Promise<boolean | string[]> => true),
    subscribeFocus: vi.fn(
      async (
        _: undefined,
        callback: (focusSubject: unknown) => void,
        options?: { retrieveDataImmediately?: boolean },
      ) => {
        relay.fire = callback;
        relay.options = options;
        return unsubscribe;
      },
    ),
    unsubscribe,
    /** Simulate this window reporting its own focus change */
    relay,
  };
}

/** Fire the focus-change event the way window-state.service would */
function moveFocusTo(windowId: number | undefined) {
  mocks.getTargetWindowId.mockReturnValue(windowId);
  mocks.focusChangeHandlers.forEach((handler) => handler(windowId));
}

/** Let queued relay work settle — re-points are serialized, so they land a microtask or two later */
async function settle() {
  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('window service routing proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.focusChangeHandlers.clear();
    mocks.getTargetWindowId.mockReturnValue(1);
  });

  test('claims the generic provider name so callers of it reach a live provider', async () => {
    const resolve = async () => undefined;

    await startWindowRoutingService(resolve);

    expect(dataProviderService.registerEngine).toHaveBeenCalledTimes(1);
    expect(vi.mocked(dataProviderService.registerEngine).mock.calls[0][0]).toBe(
      windowServiceProviderName,
    );
  });

  test('reads focus from the focused window', async () => {
    const first = windowService('focus-in-window-1');
    const second = windowService('focus-in-window-2');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );
    mocks.getTargetWindowId.mockReturnValue(2);

    expect(await engine.getFocus()).toBe('focus-in-window-2');
  });

  test('follows focus rather than pinning the first window it resolved', async () => {
    const first = windowService('focus-in-window-1');
    const second = windowService('focus-in-window-2');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );

    const beforeMove = await engine.getFocus();
    moveFocusTo(2);
    const afterMove = await engine.getFocus();

    expect(beforeMove).toBe('focus-in-window-1');
    expect(afterMove).toBe('focus-in-window-2');
  });

  test('writes focus to the focused window and not to the others', async () => {
    const first = windowService('a');
    const second = windowService('b');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );
    mocks.getTargetWindowId.mockReturnValue(2);

    await engine.setFocus(undefined, 'detect');

    expect(second.setFocus).toHaveBeenCalledWith(undefined, 'detect');
    expect(first.setFocus).not.toHaveBeenCalled();
  });

  test('writes focus through the single-argument form callers actually use', async () => {
    const only = windowService('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await engine.setFocus('detect');

    expect(only.setFocus).toHaveBeenCalledWith(undefined, 'detect');
  });

  test('reports the scoped provider’s real result rather than a blanket failure', async () => {
    // Callers use this to tell "focus moved" from "no such tab"; flattening it to a constant would
    // make every caller take the failure path
    const only = windowService('a');
    only.setFocus.mockResolvedValue(['Focus']);
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    expect(await engine.setFocus('detect')).toEqual(['Focus']);

    only.setFocus.mockResolvedValue(false);
    expect(await engine.setFocus('detect')).toBe(false);
  });

  test('tells subscribers the answer changed when focus moves between windows', async () => {
    // Nothing about either window's own focus changed, but what this provider answers did
    const engine = new FocusedWindowDataProviderEngine(async () => windowService('a') as never);
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');

    moveFocusTo(2);

    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
  });

  test('relays the focused window’s own focus updates', async () => {
    const only = windowService('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);
    await engine.getFocus();
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');

    expect(only.relay.fire).toBeDefined();
    // Fire the callback the engine handed to the window's subscribeFocus
    only.relay.fire?.(undefined);

    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
  });

  test('does not replay the relayed window’s current value as an update', async () => {
    // A subscriber gets its initial value from its own retrieval, so replaying it here would emit a
    // duplicate for every subscriber on every re-point
    const only = windowService('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await engine.getFocus();

    expect(only.relay.options).toEqual({ retrieveDataImmediately: false });
  });

  test('stops relaying from a window once focus has left it', async () => {
    const first = windowService('a');
    const second = windowService('b');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );
    await engine.getFocus();

    moveFocusTo(2);
    await engine.getFocus();

    expect(first.unsubscribe).toHaveBeenCalled();
  });

  test('re-subscribes when focus leaves a window and comes back to it', async () => {
    const first = windowService('a');
    const second = windowService('b');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );

    await engine.getFocus();
    moveFocusTo(2);
    await engine.getFocus();
    moveFocusTo(1);
    await engine.getFocus();

    expect(first.subscribeFocus).toHaveBeenCalledTimes(2);
  });

  test('does not re-subscribe while focus stays on the window it is already relaying', async () => {
    const only = windowService('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await engine.getFocus();
    await engine.getFocus();

    expect(only.subscribeFocus).toHaveBeenCalledTimes(1);
  });

  test('re-subscribes when a reloaded renderer replaces the provider for the same window', async () => {
    // A renderer reload registers a brand new provider under the same window ID. Keying the relay on
    // the ID alone would leave it bound to the dead provider, which can never emit again.
    const original = windowService('a');
    const replacement = windowService('b');
    let current = original;
    const engine = new FocusedWindowDataProviderEngine(async () => current as never);
    await engine.getFocus();

    current = replacement;
    await engine.getFocus();

    expect(replacement.subscribeFocus).toHaveBeenCalledTimes(1);
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');
    replacement.relay.fire?.(undefined);
    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
  });

  test('holds exactly one subscription when reads race each other', async () => {
    // Every subscriber's initial retrieval lands as its own concurrent getFocus at startup. Two
    // re-points in flight together would each subscribe, and only the last would be remembered —
    // orphaning a live subscription that disposal can never reach.
    const only = windowService('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await Promise.all([engine.getFocus(), engine.getFocus(), engine.getFocus()]);

    expect(only.subscribeFocus).toHaveBeenCalledTimes(1);
    await engine.dispose();
    expect(only.unsubscribe).toHaveBeenCalledTimes(1);
  });

  test('retries the relay after a failed subscribe instead of wedging', async () => {
    // Committing the bookkeeping before the subscribe resolved would leave the engine believing it
    // relays a window it holds no subscription to, and the short-circuit would block every retry
    const only = windowService('a');
    let failNext = true;
    only.subscribeFocus.mockImplementation(
      async (_: undefined, callback: (focusSubject: unknown) => void) => {
        if (failNext) {
          failNext = false;
          throw new Error('transient subscribe failure');
        }
        only.relay.fire = callback;
        return only.unsubscribe;
      },
    );
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    // The read still succeeds — the window answered; only the relay setup failed
    expect(await engine.getFocus()).toBe('a');
    expect(await engine.getFocus()).toBe('a');

    expect(only.subscribeFocus).toHaveBeenCalledTimes(2);
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');
    only.relay.fire?.(undefined);
    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
  });

  test('refuses to route rather than guessing when no window is available', async () => {
    mocks.getTargetWindowId.mockReturnValue(undefined);
    const engine = new FocusedWindowDataProviderEngine(async () => undefined);

    await expect(engine.getFocus()).rejects.toThrow('No windows available');
  });

  test('reports a window whose renderer has not registered yet', async () => {
    const engine = new FocusedWindowDataProviderEngine(async () => undefined);

    await expect(engine.getFocus()).rejects.toThrow('is not available');
  });

  test('keeps a failing notify from breaking the window teardown it runs inside', async () => {
    // The focus-change handler runs inside a synchronous emit on the window `closed` path, where the
    // emitter does not isolate subscribers — a throw escaping here would skip the rest of teardown
    const engine = new FocusedWindowDataProviderEngine(async () => windowService('a') as never);
    vi.spyOn(engine, 'notifyUpdate').mockImplementation(() => {
      throw new Error('Emitter is disposed');
    });

    expect(() => moveFocusTo(2)).not.toThrow();
  });

  test('exposes exactly one matched get/set pair, which is what registration validates', () => {
    // `buildDataProvider` classifies every visible function on an engine by prefix and rejects the
    // engine if the get and set data types do not match. An injected dependency named `getX`, or a
    // stray helper named `setX`, silently breaks registration at app startup rather than in a unit
    // test. Classified with the same helper `buildDataProvider` uses, so this cannot drift from it.
    const engine = new FocusedWindowDataProviderEngine(async () => undefined);

    const visibleFunctionNames = getAllObjectFunctionNames(
      engine as unknown as { [property: string]: unknown },
    );

    expect([...visibleFunctionNames].filter((name) => name.startsWith('get'))).toEqual([
      'getFocus',
    ]);
    expect([...visibleFunctionNames].filter((name) => name.startsWith('set'))).toEqual([
      'setFocus',
    ]);
  });

  test('drops both subscriptions when disposed', async () => {
    const only = windowService('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);
    await engine.getFocus();

    await engine.dispose();

    expect(only.unsubscribe).toHaveBeenCalled();
    expect(mocks.focusChangeHandlers.size).toBe(0);
  });

  test('leaves nothing subscribed when disposal races an in-flight relay', async () => {
    // Without a fence, the re-point completes after disposal, subscribes to a window nothing will
    // ever unsubscribe, and its callback notifies an engine whose emitter is already disposed
    const only = windowService('a');
    let releaseLookup: (() => void) | undefined;
    const engine = new FocusedWindowDataProviderEngine(async () => {
      await new Promise<void>((resolve) => {
        releaseLookup = resolve;
      });
      return only as never;
    });

    moveFocusTo(2);
    await settle();
    const disposal = engine.dispose();
    releaseLookup?.();
    await disposal;

    // Asserted the instant disposal resolves, with nothing settled afterwards: `dispose` has to
    // wait out the attach that was already in flight and undo it, rather than returning while that
    // work is still pending and leaving the cleanup to luck
    expect(only.subscribeFocus).toHaveBeenCalledTimes(1);
    expect(only.unsubscribe).toHaveBeenCalledTimes(1);

    // And nothing attaches late
    await settle();
    expect(only.subscribeFocus).toHaveBeenCalledTimes(1);
  });
});
/* eslint-enable no-type-assertion/no-type-assertion */
