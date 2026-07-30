import { act, renderHook } from '@testing-library/react';
import { PlatformError, UnsubscriberAsync } from 'platform-bible-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { DataProviderDataType } from '@shared/models/data-provider.model';
import { IDataProvider } from '@shared/models/data-provider.interface';
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

  // The hook only touches `subscribeStuff`/`setStuff`; the getter/dispose members complete the
  // shape. The cast avoids re-implementing the full network-object surface in a test double
  // (structural typing rejects the narrower subscribe-callback parameter).
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const provider = {
    getStuff: vi.fn(async () => 'unused'),
    setStuff: vi.fn(async () => true),
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
  } as unknown as TestDataProvider;

  return { provider, subscriptions };
}

const selectorGen1: TestSelector = { book: 'GEN', chapterNum: 1 };
const selectorExo1: TestSelector = { book: 'EXO', chapterNum: 1 };
const selectorLev1: TestSelector = { book: 'LEV', chapterNum: 1 };

let harness: ReturnType<typeof createTestDataProviderHarness>;
let useTestData: ReturnType<typeof createUseDataHook<[]>>;

beforeEach(() => {
  harness = createTestDataProviderHarness();
  useTestData = createUseDataHook<[]>(() => harness.provider);
});

function renderUseStuff(initialSelector: TestSelector) {
  return renderHook(
    ({ selector }: { selector: TestSelector }) =>
      useTestData<TestDataProvider>().Stuff(selector, 'default'),
    { initialProps: { selector: initialSelector } },
  );
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

  it('calls the setter with the current selector', async () => {
    const { result } = renderUseStuff(selectorGen1);

    await act(async () => harness.subscriptions[0].resolveSubscribe());
    await act(async () => {
      await result.current[1]?.('new text');
    });

    expect(harness.provider.setStuff).toHaveBeenCalledExactlyOnceWith(selectorGen1, 'new text');
  });
});
