import { beforeEach, describe, expect, test, vi } from 'vitest';
// `vi.mock` calls are hoisted above these imports, so the service resolves against the stubs below
import { testingWindowRoutingService } from '@main/services/window-routing.service';

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
  dataProviderService: { registerEngine: vi.fn() },
}));

// The engine only ever calls getFocus / setFocus / subscribeFocus on what it resolves, so the stubs
// above implement just those. Asserting them to the full IWindowService is what lets the tests stay
// that small; widening the stubs to the real interface would add surface no test exercises.
/* eslint-disable no-type-assertion/no-type-assertion */

const { FocusedWindowDataProviderEngine } = testingWindowRoutingService;

/** A scoped per-window window service that records the relay callback the engine hands it */
function windowService(focusSubject: unknown) {
  const unsubscribe = vi.fn(async () => true);
  const relay: { fire?: (focusSubject: unknown) => void } = {};
  return {
    getFocus: vi.fn(async () => focusSubject),
    setFocus: vi.fn(async () => true),
    subscribeFocus: vi.fn(async (_: undefined, callback: (focusSubject: unknown) => void) => {
      relay.fire = callback;
      return unsubscribe;
    }),
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

describe('window service routing proxy', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.focusChangeHandlers.clear();
    mocks.getTargetWindowId.mockReturnValue(1);
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

    // Fire the callback the engine handed to the window's subscribeFocus
    only.relay.fire?.(undefined);

    expect(notifyUpdate).toHaveBeenCalledWith('Focus');
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

  test('does not re-subscribe when focus returns to the window it is already relaying', async () => {
    const only = windowService('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);

    await engine.getFocus();
    await engine.getFocus();

    expect(only.subscribeFocus).toHaveBeenCalledTimes(1);
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

  test('drops both subscriptions when disposed', async () => {
    const only = windowService('a');
    const engine = new FocusedWindowDataProviderEngine(async () => only as never);
    await engine.getFocus();

    await engine.dispose();

    expect(only.unsubscribe).toHaveBeenCalled();
    expect(mocks.focusChangeHandlers.size).toBe(0);
  });
});
/* eslint-enable no-type-assertion/no-type-assertion */
