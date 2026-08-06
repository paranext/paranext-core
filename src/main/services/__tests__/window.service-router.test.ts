import { beforeEach, describe, expect, test, vi } from 'vitest';
import { getAllObjectFunctionNames } from 'platform-bible-utils';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import {
  startWindowServiceRouter,
  testingWindowServiceRouter,
} from '@main/services/window.service-router';
import { windowServiceProviderName } from '@shared/services/window.service-model';
import { settle } from '@main/services/__tests__/service-router-test.util';
import { dataProviderService } from '@shared/services/data-provider.service';

/** Handler the engine registers against the routing-target-change event, so tests can fire it */
type RoutingTargetChangeHandler = (windowId: number | undefined) => void;

const mocks = vi.hoisted(() => ({
  getTargetWindowId: vi.fn(),
  routingTargetChangeHandlers: new Set<(windowId: number | undefined) => void>(),
}));

vi.mock('@main/services/window-state.service', () => ({
  getTargetWindowId: mocks.getTargetWindowId,
  onDidChangeRoutingTarget: (handler: RoutingTargetChangeHandler) => {
    mocks.routingTargetChangeHandlers.add(handler);
    return () => mocks.routingTargetChangeHandlers.delete(handler);
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
// below implement just those. Asserting them to the full IWindowService is what lets the tests stay
// that small; widening the stubs to the real interface would add surface no test exercises.
/* eslint-disable no-type-assertion/no-type-assertion */

const { FocusedWindowDataProviderEngine } = testingWindowServiceRouter;

/** Stands in for the placeholder a fresh data provider subscription compares its first update to */
const SUBSCRIBER_HAS_NO_PREVIOUS_VALUE = Symbol('no previous value');

/**
 * A scoped per-window window service whose `subscribeFocus` is faithful to a real data provider
 * subscription: on every update it re-fetches the focus value, and unless the subscriber asked for
 * all updates it drops the ones whose value matches what it saw last (see
 * `createDataProviderSubscriber`). `emitUpdate` makes the window report an update, so a test can
 * see what reaches subscribers rather than how the relay is wired.
 */
function windowShard(focusSubject: unknown) {
  const unsubscribe = vi.fn(async () => true);
  let notifyOfUpdate: (() => Promise<void>) | undefined;
  const service = {
    getFocus: vi.fn(async () => focusSubject),
    // Widened past `true` because the engine forwards whatever the scoped provider answers, and
    // `DataProviderUpdateInstructions` includes the data-type-name array form
    setFocus: vi.fn(async (): Promise<boolean | string[]> => true),
    subscribeFocus: vi.fn(
      async (
        _: undefined,
        callback: (focusSubject: unknown) => void,
        options?: { retrieveDataImmediately?: boolean; whichUpdates?: 'deeply-equal' | '*' },
      ) => {
        let previousFocusSubject: unknown = SUBSCRIBER_HAS_NO_PREVIOUS_VALUE;
        notifyOfUpdate = async () => {
          const currentFocusSubject = await service.getFocus();
          const isUnchanged = previousFocusSubject === currentFocusSubject;
          previousFocusSubject = currentFocusSubject;
          if (isUnchanged && options?.whichUpdates !== '*') return;
          callback(currentFocusSubject);
        };
        return unsubscribe;
      },
    ),
    unsubscribe,
    /** Simulate this window reporting that its focus data changed */
    emitUpdate: async () => notifyOfUpdate?.(),
  };
  return service;
}

/** Fire the routing-target-change event the way window-state.service would */
function moveRoutingTargetTo(windowId: number | undefined) {
  mocks.getTargetWindowId.mockReturnValue(windowId);
  mocks.routingTargetChangeHandlers.forEach((handler) => handler(windowId));
}

describe('window service router', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.routingTargetChangeHandlers.clear();
    mocks.getTargetWindowId.mockReturnValue(1);
  });

  test('claims the generic provider name so callers of it reach a live provider', async () => {
    const resolve = async () => undefined;

    await startWindowServiceRouter(resolve);

    expect(dataProviderService.registerEngine).toHaveBeenCalledTimes(1);
    expect(vi.mocked(dataProviderService.registerEngine).mock.calls[0][0]).toBe(
      windowServiceProviderName,
    );
  });

  test('reads focus from the focused window', async () => {
    const first = windowShard('focus-in-window-1');
    const second = windowShard('focus-in-window-2');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );
    mocks.getTargetWindowId.mockReturnValue(2);

    expect(await engine.getFocus()).toBe('focus-in-window-2');
  });

  test('follows focus rather than pinning the first window it resolved', async () => {
    const first = windowShard('focus-in-window-1');
    const second = windowShard('focus-in-window-2');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );

    const beforeMove = await engine.getFocus();
    moveRoutingTargetTo(2);
    const afterMove = await engine.getFocus();

    expect(beforeMove).toBe('focus-in-window-1');
    expect(afterMove).toBe('focus-in-window-2');
  });

  test('writes focus to the focused window and not to the others', async () => {
    const first = windowShard('a');
    const second = windowShard('b');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );
    mocks.getTargetWindowId.mockReturnValue(2);

    await engine.setFocus(undefined, 'detect');

    expect(second.setFocus).toHaveBeenCalledWith(undefined, 'detect');
    expect(first.setFocus).not.toHaveBeenCalled();
  });

  test('writes focus through the single-argument form callers actually use', async () => {
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await engine.setFocus('detect');

    expect(only.setFocus).toHaveBeenCalledWith(undefined, 'detect');
  });

  test('deselects with one argument, the only form that survives the trip to the renderer', async () => {
    // A trailing argument the caller left off arrives at the renderer as `null`, which its
    // "deselect" check (`=== undefined`) does not match — it then reads the id off that `null`
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await engine.setFocus(undefined, undefined);

    expect(only.setFocus.mock.calls[0]).toEqual([undefined]);
  });

  test('deselects the same way when the caller passes no specifier at all', async () => {
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await engine.setFocus(undefined);

    expect(only.setFocus.mock.calls[0]).toEqual([undefined]);
  });

  test('reports the scoped provider’s real result rather than a blanket failure', async () => {
    // Callers use this to tell "focus moved" from "no such tab"; flattening it to a constant would
    // make every caller take the failure path
    const only = windowShard('a');
    only.setFocus.mockResolvedValue(['Focus']);
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    expect(await engine.setFocus('detect')).toEqual(['Focus']);

    only.setFocus.mockResolvedValue(false);
    expect(await engine.setFocus('detect')).toBe(false);
  });

  test('tells subscribers the answer changed when focus moves between windows', async () => {
    // Nothing about either window's own focus changed, but what this provider answers did
    const engine = new FocusedWindowDataProviderEngine(async () => windowShard('a') as never);
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');

    moveRoutingTargetTo(2);

    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
  });

  test('relays the focused window’s own focus updates', async () => {
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);
    await engine.getFocus();
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');

    // Fire the callback the engine handed to the window's update event
    await only.emitUpdate();
    await settle();

    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
  });

  test('does not replay the relayed window’s current value as an update', async () => {
    // A subscriber gets its initial value from its own retrieval, so replaying it here would emit a
    // duplicate for every subscriber on every re-point
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');

    await engine.getFocus();

    expect(notifyUpdate).not.toHaveBeenCalled();
  });

  test('tells subscribers about every update the window reports, not only value changes', async () => {
    // The relay's own view of the value is not what subscribers of the generic name compare
    // against: they each hold their own last value, and one of them re-pointed from another window
    // has a different one. Deciding here that an update is not worth forwarding strands them.
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);
    await engine.getFocus();
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');

    await only.emitUpdate();
    await only.emitUpdate();
    await settle();

    expect(notifyUpdate).toHaveBeenCalledTimes(2);
  });

  test('stops relaying from a window once focus has left it', async () => {
    const first = windowShard('a');
    const second = windowShard('b');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );
    await engine.getFocus();

    moveRoutingTargetTo(2);
    await engine.getFocus();

    expect(first.unsubscribe).toHaveBeenCalled();
  });

  test('re-subscribes when focus leaves a window and comes back to it', async () => {
    const first = windowShard('a');
    const second = windowShard('b');
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );

    await engine.getFocus();
    moveRoutingTargetTo(2);
    await engine.getFocus();
    moveRoutingTargetTo(1);
    await engine.getFocus();

    expect(first.subscribeFocus).toHaveBeenCalledTimes(2);
  });

  test('does not re-subscribe while focus stays on the window it is already relaying', async () => {
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await engine.getFocus();
    await engine.getFocus();

    expect(only.subscribeFocus).toHaveBeenCalledTimes(1);
  });

  test('re-subscribes when a reloaded renderer replaces the provider for the same window', async () => {
    // A renderer reload registers a brand new provider under the same window ID. Keying the relay on
    // the ID alone would leave it bound to the dead provider, which can never emit again.
    const original = windowShard('a');
    const replacement = windowShard('b');
    let current = original;
    const engine = new FocusedWindowDataProviderEngine(async () => current as never);
    await engine.getFocus();

    current = replacement;
    await engine.getFocus();

    expect(replacement.subscribeFocus).toHaveBeenCalledTimes(1);
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');
    await replacement.emitUpdate();
    await settle();
    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
  });

  test('holds exactly one subscription when reads race each other', async () => {
    // Every subscriber's initial retrieval lands as its own concurrent getFocus at startup. Two
    // re-points in flight together would each subscribe, and only the last would be remembered —
    // orphaning a live subscription that disposal can never reach.
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await Promise.all([engine.getFocus(), engine.getFocus(), engine.getFocus()]);

    expect(only.subscribeFocus).toHaveBeenCalledTimes(1);
    await engine.dispose();
    expect(only.unsubscribe).toHaveBeenCalledTimes(1);
  });

  test('fails the call that triggered a relay setup it could not complete', async () => {
    // A read that answers from a window it never managed to subscribe to hands back a value that
    // then silently stops updating. The caller is the only one positioned to retry or degrade, so
    // the failure travels to it rather than being logged and dropped.
    const only = windowShard('a');
    let failNext = true;
    const attachToUpdates = only.subscribeFocus.getMockImplementation();
    only.subscribeFocus.mockImplementation(async (...args) => {
      if (failNext) {
        failNext = false;
        throw new Error('transient subscribe failure');
      }
      return attachToUpdates?.(...args) ?? only.unsubscribe;
    });
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await expect(engine.getFocus()).rejects.toThrow('transient subscribe failure');

    // Committing the bookkeeping before the subscribe resolved would leave the engine believing it
    // relays a window it holds no subscription to, and the short-circuit would block every retry
    expect(await engine.getFocus()).toBe('a');
    expect(only.subscribeFocus).toHaveBeenCalledTimes(2);
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');
    await only.emitUpdate();
    await settle();
    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
  });

  test('re-points on the next routing target change after a failed relay setup', async () => {
    // Failing the triggering call is not the whole recovery: the routing target change that follows
    // re-points the relay on its own, so the window that ends up targeted is relayed without another
    // read having to ask for it.
    const first = windowShard('focus-in-window-1');
    const second = windowShard('focus-in-window-2');
    first.subscribeFocus.mockRejectedValue(new Error('transient subscribe failure'));
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );

    await expect(engine.getFocus()).rejects.toThrow('transient subscribe failure');

    moveRoutingTargetTo(2);
    await settle();

    expect(second.subscribeFocus).toHaveBeenCalledTimes(1);
    // Spied only now, so what it sees is the relay working rather than the notify the routing
    // target change itself fires
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');
    await second.emitUpdate();
    await settle();
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
    const engine = new FocusedWindowDataProviderEngine(async () => windowShard('a') as never);
    vi.spyOn(engine, 'notifyUpdate').mockImplementation(() => {
      throw new Error('Emitter is disposed');
    });

    expect(() => moveRoutingTargetTo(2)).not.toThrow();
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
    const only = windowShard('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);
    await engine.getFocus();

    await engine.dispose();

    expect(only.unsubscribe).toHaveBeenCalled();
    expect(mocks.routingTargetChangeHandlers.size).toBe(0);
  });

  test('finishes the re-point when the previous window refuses to unsubscribe', async () => {
    // A window that has just closed rejects the unsubscribe rather than answering it, which is the
    // common case for the re-point the close itself triggers. That failure belongs to the window
    // that is already gone; the relay has to hold on to the subscription it just made rather than
    // abandoning the rest of the handover
    const first = windowShard('a');
    const second = windowShard('b');
    first.unsubscribe.mockRejectedValue(new Error('previous window socket is gone'));
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );
    await engine.getFocus();

    moveRoutingTargetTo(2);
    await settle();

    // Still relaying window 2, and it knows it — a second read must not subscribe all over again
    await engine.getFocus();
    expect(second.subscribeFocus).toHaveBeenCalledTimes(1);
    const notifyUpdate = vi.spyOn(engine, 'notifyUpdate');
    await second.emitUpdate();
    await settle();
    expect(notifyUpdate).toHaveBeenCalledWith('Focus');

    // And disposal still reaches the subscription the failed handover left behind
    await engine.dispose();
    expect(second.unsubscribe).toHaveBeenCalledTimes(1);
  });

  test('tears down the new subscription when disposal races a rejecting unsubscribe', async () => {
    // The re-point commits its bookkeeping, then unsubscribes the previous window. A rejection there
    // must not skip the disposal compensation below it and strand a live subscription on an engine
    // that is already disposed
    const first = windowShard('a');
    const second = windowShard('b');
    first.unsubscribe.mockRejectedValue(new Error('previous window socket is gone'));
    let releaseSubscribe: (() => void) | undefined;
    const attachToUpdates = second.subscribeFocus.getMockImplementation();
    second.subscribeFocus.mockImplementation(async (...args) => {
      await new Promise<void>((resolve) => {
        releaseSubscribe = resolve;
      });
      return attachToUpdates?.(...args) ?? second.unsubscribe;
    });
    const engine = new FocusedWindowDataProviderEngine(
      async (id) => (id === 1 ? first : second) as never,
    );
    await engine.getFocus();

    moveRoutingTargetTo(2);
    await settle();
    const disposal = engine.dispose();
    releaseSubscribe?.();
    await disposal;

    expect(second.unsubscribe).toHaveBeenCalledTimes(1);
    await settle();
    expect(second.unsubscribe).toHaveBeenCalledTimes(1);
  });

  test('leaves nothing subscribed when disposal races an in-flight relay', async () => {
    // Without a fence, the re-point completes after disposal, subscribes to a window nothing will
    // ever unsubscribe, and its callback notifies an engine whose emitter is already disposed
    const only = windowShard('a');
    let releaseLookup: (() => void) | undefined;
    const engine = new FocusedWindowDataProviderEngine(async () => {
      await new Promise<void>((resolve) => {
        releaseLookup = resolve;
      });
      return only as never;
    });

    moveRoutingTargetTo(2);
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
