// The hook under test does its subscribing through `useEventAsync`, which it imports by package
// name from `platform-bible-react`. No path alias maps that package name to the library's source,
// so the import resolves through the workspace symlink to `lib/platform-bible-react/dist` — the
// CHECKED-IN BUILD OUTPUT. The subscribe/teardown race behavior these tests pin therefore comes
// from the built bundle, not from `lib/platform-bible-react/src/hooks/use-event-async.hook.ts`:
// editing that source leaves these tests green until the library is rebuilt
// (`npm run build:basic --workspace=lib/platform-bible-react`) and the refreshed `dist` is
// committed. Nothing in CI enforces that freshness, so keep this in mind when editing the library.
import { act, renderHook } from '@testing-library/react';
import {
  isPlatformError,
  newPlatformError,
  PlatformError,
  RESOURCE_EXHAUSTED,
  UnsubscriberAsync,
} from 'platform-bible-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { DataProviderDataType } from '@shared/models/data-provider.model';
import { IDataProvider } from '@shared/models/data-provider.interface';
import { logger } from '@shared/services/logger.service';
import { createUseDataHook } from '@renderer/hooks/hook-generators/create-use-data-hook.util';

vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn(), debug: vi.fn(), error: vi.fn(), info: vi.fn() },
}));

type TestSelector = { book: string; chapterNum: number };
type TestDataTypes = { Stuff: DataProviderDataType<TestSelector, string, string> };
type TestDataProvider = IDataProvider<TestDataTypes>;

/**
 * One `subscribeStuff` registration made by the hook. The subscribe promise resolves only when the
 * test calls `resolveSubscribe`, and the delivery callback is retained even after teardown, so
 * tests control the async ordering of subscription establishment, delivery, and teardown —
 * simulating the PDP's real over-the-network behavior.
 */
interface StuffSubscription {
  selector: TestSelector;
  resolveSubscribe: () => void;
  deliver: (data: string | PlatformError) => void;
  getUnsubscribeCallCount: () => number;
}

function createTestDataProviderHarness() {
  const subscriptions: StuffSubscription[] = [];
  const setStuff = vi.fn(async () => true);

  // The hook only touches `subscribeStuff`/`setStuff`; the getter/dispose members complete the
  // shape. The cast avoids re-implementing the full network-object surface in a test double
  // (structural typing rejects the narrower subscribe-callback parameter). Typed as the loose
  // base `IDataProvider` the generator's factory expects; the typed surface for tests is the
  // `useTestData<TestDataProvider>()` proxy call.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const provider = {
    getStuff: vi.fn(async () => 'unused'),
    setStuff,
    subscribeStuff: vi.fn(
      (selector: TestSelector, callback: (data: string | PlatformError) => void) =>
        new Promise<UnsubscriberAsync>((resolve) => {
          let unsubscribeCallCount = 0;
          subscriptions.push({
            selector,
            resolveSubscribe: () =>
              resolve(async () => {
                unsubscribeCallCount += 1;
                return true;
              }),
            deliver: callback,
            getUnsubscribeCallCount: () => unsubscribeCallCount,
          });
        }),
    ),
    onDidDispose: () => () => true,
  } as unknown as IDataProvider;

  return { provider, setStuff, subscriptions };
}

/** Mirrors the guard's own threshold in the hook under test */
const RUNAWAY_THRESHOLD = 100;

const selectorGen1: TestSelector = { book: 'GEN', chapterNum: 1 };
const selectorExo1: TestSelector = { book: 'EXO', chapterNum: 1 };
const selectorLev1: TestSelector = { book: 'LEV', chapterNum: 1 };

let harness: ReturnType<typeof createTestDataProviderHarness>;
let useTestData: ReturnType<typeof createUseDataHook<[]>>;

/**
 * Clock the runaway guard's rolling window reads through `performance.now()`. Only the guard tests
 * install it — React's scheduler reads the same clock, so freezing it for the subscribe/teardown
 * race tests below would quietly change their scheduling.
 */
let currentTimeMs: number;

beforeEach(() => {
  // The `vi.mock` factory builds its `vi.fn()`s once at module scope, so warn counts would
  // otherwise accumulate across tests and pollute the `not.toHaveBeenCalled` assertions below.
  vi.mocked(logger.warn).mockClear();

  harness = createTestDataProviderHarness();
  useTestData = createUseDataHook<[]>(() => harness.provider);
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderUseStuff(initialSelector: TestSelector) {
  return renderHook(
    ({ selector }: { selector: TestSelector }) =>
      useTestData<TestDataProvider>().Stuff(selector, 'default'),
    { initialProps: { selector: initialSelector } },
  );
}

/**
 * Drives `count` deliveries into `subscription`, each in its own `act`, advancing the clock by
 * `gapMs` after each.
 *
 * Two details keep these deliveries observable, and getting either wrong hides a guard bug behind a
 * green test: each delivery gets its own `act` (deliveries batched into one `act` collapse into a
 * single render), and each carries a distinct value (React bails out of re-rendering when state is
 * set to an `Object.is`-equal value).
 */
function deliverTimes(subscription: StuffSubscription, count: number, gapMs: number = 0) {
  for (let i = 0; i < count; i += 1) {
    act(() => subscription.deliver(`value ${i}`));
    currentTimeMs += gapMs;
  }
}

/**
 * Delivers `count` times inside a SINGLE `act`, the way a provider bursting within one tick does.
 *
 * This is what reaches the guard's already-tripped branch: with one `act` per delivery, React
 * re-renders between them, the subscription is dropped, and `useEventAsync` mutes everything after
 * the trip — so a per-delivery loop can never exercise post-trip behavior.
 */
function deliverBurstInOneAct(subscription: StuffSubscription, count: number) {
  act(() => {
    for (let i = 0; i < count; i += 1) subscription.deliver(`burst ${i}`);
  });
}

describe('createUseDataHook', () => {
  it('returns the default value and isLoading=true before the first delivery', async () => {
    const { result } = renderUseStuff(selectorGen1);

    expect(result.current[0]).toBe('default');
    expect(result.current[2]).toBe(true);
  });

  it('delivers data for the current selector and clears isLoading', async () => {
    const { result } = renderUseStuff(selectorGen1);

    await act(async () => harness.subscriptions[0].resolveSubscribe());
    act(() => harness.subscriptions[0].deliver('genesis 1'));

    expect(result.current[0]).toBe('genesis 1');
    expect(result.current[2]).toBe(false);
  });

  it('delivers repeated emissions for the same selector (no deduplication)', async () => {
    const { result } = renderUseStuff(selectorGen1);

    await act(async () => harness.subscriptions[0].resolveSubscribe());
    act(() => harness.subscriptions[0].deliver('first'));
    act(() => harness.subscriptions[0].deliver('second'));

    expect(result.current[0]).toBe('second');
  });

  it('marks isLoading=true when the selector changes', async () => {
    const { result, rerender } = renderUseStuff(selectorGen1);

    await act(async () => harness.subscriptions[0].resolveSubscribe());
    act(() => harness.subscriptions[0].deliver('genesis 1'));
    expect(result.current[2]).toBe(false);

    rerender({ selector: selectorExo1 });

    expect(result.current[2]).toBe(true);
  });

  it('ignores a late emission from the previous selector after the selector changes', async () => {
    const { result, rerender } = renderUseStuff(selectorGen1);

    await act(async () => harness.subscriptions[0].resolveSubscribe());
    act(() => harness.subscriptions[0].deliver('genesis 1'));
    rerender({ selector: selectorExo1 });

    // A late echo from the torn-down GEN subscription must not reach the hook's state: the
    // retained value stays, and isLoading stays true because EXO has not delivered yet.
    act(() => harness.subscriptions[0].deliver('stale genesis echo'));

    expect(result.current[0]).toBe('genesis 1');
    expect(result.current[2]).toBe(true);
  });

  it('ignores a subscription that finishes subscribing only after the selector changed', async () => {
    const { result, rerender } = renderUseStuff(selectorGen1);

    // GEN's subscribe is still in flight when the user navigates to EXO
    rerender({ selector: selectorExo1 });
    await act(async () => harness.subscriptions[0].resolveSubscribe());
    act(() => harness.subscriptions[0].deliver('ghost genesis'));

    expect(result.current[0]).toBe('default');
    expect(result.current[2]).toBe(true);

    // The current selector's subscription still works normally
    await act(async () => harness.subscriptions[1].resolveSubscribe());
    act(() => harness.subscriptions[1].deliver('exodus 1'));

    expect(result.current[0]).toBe('exodus 1');
    expect(result.current[2]).toBe(false);
  });

  it('settles correctly after rapid selector churn with out-of-order async completions', async () => {
    const { result, rerender } = renderUseStuff(selectorGen1);

    // GEN -> EXO -> LEV before any subscription finishes establishing
    rerender({ selector: selectorExo1 });
    rerender({ selector: selectorLev1 });

    // Only the current (LEV) subscription establishes and delivers first
    await act(async () => harness.subscriptions[2].resolveSubscribe());
    act(() => harness.subscriptions[2].deliver('leviticus 1'));
    expect(result.current[0]).toBe('leviticus 1');
    expect(result.current[2]).toBe(false);

    // The superseded subscriptions then finish establishing late and even emit — none of it may
    // disturb the settled state, and both must be torn down (no leak).
    await act(async () => {
      harness.subscriptions[0].resolveSubscribe();
      harness.subscriptions[1].resolveSubscribe();
    });
    act(() => harness.subscriptions[0].deliver('zombie genesis'));
    act(() => harness.subscriptions[1].deliver('zombie exodus'));

    expect(result.current[0]).toBe('leviticus 1');
    expect(result.current[2]).toBe(false);
    expect(harness.subscriptions[0].getUnsubscribeCallCount()).toBe(1);
    expect(harness.subscriptions[1].getUnsubscribeCallCount()).toBe(1);
  });

  it('stays loading and subscribes nothing until the data provider resolves', async () => {
    // The generator's factory is itself a hook, so the provider starts undefined the way a real
    // `useDataProvider` does before its lookup resolves
    let currentProvider: IDataProvider | undefined;
    const useLateProvider = createUseDataHook<[]>(() => currentProvider);
    const { result, rerender } = renderHook(() =>
      useLateProvider<TestDataProvider>().Stuff(selectorGen1, 'default'),
    );

    expect(result.current[0]).toBe('default');
    expect(result.current[1]).toBeUndefined();
    expect(result.current[2]).toBe(true);
    expect(harness.subscriptions).toHaveLength(0);

    currentProvider = harness.provider;
    rerender();
    await act(async () => harness.subscriptions[0].resolveSubscribe());
    act(() => harness.subscriptions[0].deliver('genesis 1'));

    expect(result.current[0]).toBe('genesis 1');
    expect(result.current[2]).toBe(false);
  });

  it('passes a delivered PlatformError through as the data and clears isLoading', async () => {
    const { result } = renderUseStuff(selectorGen1);
    await act(async () => harness.subscriptions[0].resolveSubscribe());

    // The PDP reports failures by delivering a PlatformError in place of the data, so it must ride
    // the same guarded path rather than being swallowed or leaving the hook stuck loading
    const error = newPlatformError('provider could not read the chapter');
    act(() => harness.subscriptions[0].deliver(error));

    expect(result.current[0]).toBe(error);
    expect(result.current[2]).toBe(false);
  });

  it('calls the setter with the current selector', async () => {
    const { result } = renderUseStuff(selectorGen1);

    await act(async () => harness.subscriptions[0].resolveSubscribe());
    await act(async () => {
      await result.current[1]?.('new text');
    });

    expect(harness.setStuff).toHaveBeenCalledExactlyOnceWith(selectorGen1, 'new text');
  });
});

// The guard exists to break a runaway loop of delivery -> re-render -> delivery. It must degrade
// the hook rather than change how many hooks the hook calls: skipping hooks on the tripped path
// makes React throw mid-render, which unmounts the whole web view root and leaves a blank pane.
describe('createUseDataHook runaway-loop guard', () => {
  beforeEach(() => {
    currentTimeMs = 1000;
    vi.spyOn(performance, 'now').mockImplementation(() => currentTimeMs);
  });

  it('trips on a resubscribe storm even though it never delivers anything', async () => {
    // An unstable selector rebuilds the subscription every render. Over a network each
    // subscription is superseded before it resolves, so nothing is ever delivered — counting
    // deliveries alone would never see this loop, which is the one the warning's "memoize your
    // parameters" advice describes.
    const { result, rerender } = renderHook(() =>
      // A fresh selector object every render is the unmemoized-parameter mistake itself
      useTestData<TestDataProvider>().Stuff({ book: 'GEN', chapterNum: 1 }, 'default'),
    );

    // No `resolveSubscribe` anywhere: every subscribe stays in flight, exactly as it would over
    // the network, so not one delivery ever lands
    for (let i = 0; i < RUNAWAY_THRESHOLD + 1; i += 1) rerender();

    // Capped rather than one subscription per render: the storm is stopped, not just reported
    expect(harness.subscriptions.length).toBeLessThan(RUNAWAY_THRESHOLD);
    expect(logger.warn).toHaveBeenCalledExactlyOnceWith(
      expect.stringContaining('was subscribed to'),
    );
    expect(isPlatformError(result.current[0])).toBe(true);
  });

  it('keeps delivering data below the threshold', async () => {
    const { result } = renderUseStuff(selectorGen1);
    await act(async () => harness.subscriptions[0].resolveSubscribe());

    deliverTimes(harness.subscriptions[0], RUNAWAY_THRESHOLD - 1);

    expect(result.current[0]).toBe('value 98');
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('degrades to an error rather than crashing once deliveries exceed the threshold', async () => {
    const { result } = renderUseStuff(selectorGen1);
    await act(async () => harness.subscriptions[0].resolveSubscribe());

    deliverTimes(harness.subscriptions[0], RUNAWAY_THRESHOLD + 1);

    const [data, setData, isLoading] = result.current;
    // A type guard rather than an assertion so the failure message shows the unexpected value
    if (!isPlatformError(data)) throw new Error(`Expected a PlatformError but got ${data}`);
    // Names the data type so the log points at the offending hook, and carries a machine-readable
    // code so consumers can recognize a rate-limited hook without matching on message text
    expect(data.message).toContain('Stuff');
    expect(data.code).toBe(RESOURCE_EXHAUSTED);
    expect(setData).toBeUndefined();
    // Not "resolved to an error": the guard re-arms and retries, and consumers that gate on
    // loading must keep waiting rather than treat the default value as the real answer
    expect(isLoading).toBe(true);
    expect(logger.warn).toHaveBeenCalledOnce();

    // Tripping drops the subscription, so the loop stops at its source instead of merely having
    // its output hidden
    await act(async () => {});
    expect(harness.subscriptions[0].getUnsubscribeCallCount()).toBe(1);
  });

  it('does not trip on renders alone, however many the consumer does', async () => {
    const { result, rerender } = renderUseStuff(selectorGen1);
    await act(async () => harness.subscriptions[0].resolveSubscribe());

    // A busy consumer re-rendering hard is not a data-update loop. Reusing the same selector keeps
    // the subscription in place, so nothing here is a delivery.
    for (let i = 0; i < RUNAWAY_THRESHOLD + 1; i += 1) rerender({ selector: selectorGen1 });

    act(() => harness.subscriptions[0].deliver('genesis 1'));

    expect(result.current[0]).toBe('genesis 1');
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('warns once, not once per delivery, when a burst keeps arriving after tripping', async () => {
    const { result } = renderUseStuff(selectorGen1);
    await act(async () => harness.subscriptions[0].resolveSubscribe());

    // One `act`, so React cannot re-render and drop the subscription part-way: every delivery
    // past the threshold reaches the guard's already-tripped branch, which is the only thing that
    // can warn more than once
    deliverBurstInOneAct(harness.subscriptions[0], RUNAWAY_THRESHOLD + 30);

    expect(logger.warn).toHaveBeenCalledExactlyOnceWith(expect.stringContaining('was updated'));
    expect(isPlatformError(result.current[0])).toBe(true);
  });

  it('does not trip on resubscribes spread beyond the rolling window', async () => {
    const { result, rerender } = renderHook(() =>
      useTestData<TestDataProvider>().Stuff({ book: 'GEN', chapterNum: 1 }, 'default'),
    );

    // Well past the count threshold, but paced out — churn this slow is a busy consumer, not a loop
    for (let i = 0; i < RUNAWAY_THRESHOLD + 50; i += 1) {
      rerender();
      currentTimeMs += 20;
    }

    expect(isPlatformError(result.current[0])).toBe(false);
    expect(logger.warn).not.toHaveBeenCalled();
  });

  it('clears its pending re-arm timer when unmounted mid-cooldown', async () => {
    vi.useFakeTimers();
    try {
      const { result, unmount } = renderUseStuff(selectorGen1);
      await act(async () => harness.subscriptions[0].resolveSubscribe());
      deliverTimes(harness.subscriptions[0], RUNAWAY_THRESHOLD + 1);
      expect(isPlatformError(result.current[0])).toBe(true);
      expect(vi.getTimerCount()).toBe(1);

      // Without the cleanup the timer survives and fires `setMessage` on an unmounted hook
      unmount();

      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.useRealTimers();
    }
  });

  it('re-arms and resubscribes after the cooldown, so a transient burst heals itself', async () => {
    vi.useFakeTimers();
    try {
      const { result } = renderUseStuff(selectorGen1);
      await act(async () => harness.subscriptions[0].resolveSubscribe());
      deliverTimes(harness.subscriptions[0], RUNAWAY_THRESHOLD + 1);
      expect(isPlatformError(result.current[0])).toBe(true);
      const subscriptionsWhileTripped = harness.subscriptions.length;

      // The provider has gone quiet; advance past the cooldown
      currentTimeMs += 10000;
      await act(async () => {
        vi.advanceTimersByTime(10000);
      });

      // A fresh subscription is opened and normal delivery resumes
      expect(harness.subscriptions.length).toBeGreaterThan(subscriptionsWhileTripped);

      // Still loading until that fresh subscription delivers — reporting settled here would hand
      // consumers the pre-trip value as though it were the current one
      expect(result.current[2]).toBe(true);

      const resumed = harness.subscriptions[harness.subscriptions.length - 1];
      await act(async () => resumed.resolveSubscribe());
      act(() => resumed.deliver('back to normal'));

      expect(result.current[0]).toBe('back to normal');
    } finally {
      vi.useRealTimers();
    }
  });

  it('stays tripped while still within the cooldown, rather than re-arming per selector', async () => {
    const { result, rerender } = renderUseStuff(selectorGen1);
    await act(async () => harness.subscriptions[0].resolveSubscribe());
    deliverTimes(harness.subscriptions[0], RUNAWAY_THRESHOLD + 1);
    expect(isPlatformError(result.current[0])).toBe(true);

    // Resetting on selector change would disarm the guard entirely: an unmemoized selector — the
    // mistake the warning names — gets a new identity every render, so it would reset every render
    rerender({ selector: selectorExo1 });

    expect(isPlatformError(result.current[0])).toBe(true);
    expect(result.current[1]).toBeUndefined();
    // No new subscription is opened for the new selector
    expect(harness.subscriptions).toHaveLength(1);
  });

  it('does not trip when many deliveries are spread beyond the rolling window', async () => {
    const { result } = renderUseStuff(selectorGen1);
    await act(async () => harness.subscriptions[0].resolveSubscribe());

    // Well past the count threshold, but 20ms apart — a busy provider, not a runaway loop
    deliverTimes(harness.subscriptions[0], RUNAWAY_THRESHOLD + 50, 20);

    expect(result.current[0]).toBe('value 149');
    expect(logger.warn).not.toHaveBeenCalled();
  });
});
