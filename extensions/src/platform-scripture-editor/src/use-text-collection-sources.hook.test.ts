// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type {
  ResourceReferenceList,
  ShownByDefaultOverlay,
  ITextConnectionSettingsProjectDataProvider,
} from 'platform-scripture';
import { useProjectSetting, useProjectDataProvider } from '@papi/frontend/react';
import { useTextCollectionSources } from './use-text-collection-sources.hook';

vi.mock('@papi/frontend/react', () => ({
  useProjectSetting: vi.fn(),
  useProjectDataProvider: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({
  logger: { warn: vi.fn() },
}));

const mockUseProjectSetting = vi.mocked(useProjectSetting);
const mockUseProjectDataProvider = vi.mocked(useProjectDataProvider);

// #region fixtures

/** Minimal PlatformError shape — matches the `isPlatformError` runtime check. */
function makePlatformError(): object {
  return { platformErrorVersion: 1, message: 'test error' };
}

const list = (dataVersion = '1.0.0'): ResourceReferenceList => ({ dataVersion, items: [] });

/**
 * A settings return-tuple as produced by `useProjectSetting`: `[value, setter, reset, isLoading]`.
 * We only read index 0 (value) and index 3 (isLoading) in the hook under test.
 */
function settingTuple(
  value: ResourceReferenceList | object,
  isLoading: boolean,
): ReturnType<typeof useProjectSetting> {
  // The 2nd/3rd tuple slots (setter/reset) are unused by the hook; a no-op stands in for them.
  // Cast is required because the value may be a PlatformError in the error-path tests.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return [value, vi.fn(), vi.fn(), isLoading] as unknown as ReturnType<typeof useProjectSetting>;
}

/**
 * Configures `useProjectSetting` to answer with the admin `referencedProjectsAndResources` tuple.
 * That is the only project setting the hook reads (model texts are decoupled from the
 * shown-by-default feature, so they are no longer a source).
 */
function mockSettings(referenced: ReturnType<typeof useProjectSetting>) {
  mockUseProjectSetting.mockImplementation(() => referenced);
}

/**
 * Builds a mock PDP whose two subscribe methods capture their callbacks so tests can drive
 * deliveries manually, and whose returned unsubscribe promise resolves to a spy so cleanup and the
 * dispose-before-subscribe race can be asserted.
 */
function makeControllablePdp() {
  const unsubUserReferenced = vi.fn(() => Promise.resolve(true));
  const unsubOverlay = vi.fn(() => Promise.resolve(true));

  let deliverUserReferenced: (value: ResourceReferenceList | object) => void = () => {};
  let deliverOverlay: (value: ShownByDefaultOverlay | object) => void = () => {};

  // Resolvers for the subscribe promises themselves — left pending until a test resolves them,
  // which is what lets us simulate the dispose-before-subscribe race.
  let resolveUserReferencedSub: (unsub: () => Promise<boolean>) => void = () => {};
  let resolveOverlaySub: (unsub: () => Promise<boolean>) => void = () => {};

  const subscribeUserReferencedProjectsAndResources = vi.fn(
    (_selector: undefined, callback: (value: ResourceReferenceList | object) => void) => {
      deliverUserReferenced = callback;
      return new Promise<() => Promise<boolean>>((resolve) => {
        resolveUserReferencedSub = resolve;
      });
    },
  );
  const subscribeShownByDefaultOverlay = vi.fn(
    (_selector: undefined, callback: (value: ShownByDefaultOverlay | object) => void) => {
      deliverOverlay = callback;
      return new Promise<() => Promise<boolean>>((resolve) => {
        resolveOverlaySub = resolve;
      });
    },
  );

  // Mock object literal cannot satisfy the full PDP interface — cast is required for test isolation.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const pdp = {
    subscribeUserReferencedProjectsAndResources,
    subscribeShownByDefaultOverlay,
  } as unknown as ITextConnectionSettingsProjectDataProvider;

  return {
    pdp,
    unsubUserReferenced,
    unsubOverlay,
    /** Resolve both subscribe promises with their unsubscribe spies. */
    resolveSubscriptions: () =>
      act(() => {
        resolveUserReferencedSub(unsubUserReferenced);
        resolveOverlaySub(unsubOverlay);
        // Let the .then handlers that push/dispose unsubscribers run.
        return Promise.resolve();
      }),
    /** Fire both subscription callbacks with values (data delivery is synchronous in the PDP). */
    deliver: (userReferenced: ResourceReferenceList | object, overlay: ShownByDefaultOverlay) =>
      act(() => {
        deliverUserReferenced(userReferenced);
        deliverOverlay(overlay);
      }),
    deliverUserReferencedOnly: (userReferenced: ResourceReferenceList | object) =>
      act(() => {
        deliverUserReferenced(userReferenced);
      }),
    deliverOverlayOnly: (overlay: ShownByDefaultOverlay) =>
      act(() => {
        deliverOverlay(overlay);
      }),
  };
}

// #endregion

describe('useTextCollectionSources', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns sources undefined while the admin setting is still loading', () => {
    mockSettings(settingTuple(list(), true));
    mockUseProjectDataProvider.mockReturnValue(makeControllablePdp().pdp);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    expect(result.current.sources).toBeUndefined();
  });

  it('returns sources undefined when settings are loaded but subscriptions have not delivered', async () => {
    mockSettings(settingTuple(list(), false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    await controller.resolveSubscriptions();

    // Subscriptions are wired up but no callback has fired yet.
    expect(result.current.sources).toBeUndefined();
  });

  it('assembles all three fields once the setting is loaded and both subscriptions deliver', async () => {
    const adminReferenced = list('ref-v');
    mockSettings(settingTuple(adminReferenced, false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    await controller.resolveSubscriptions();
    const userReferenced = list('user-v');
    const overlay: ShownByDefaultOverlay = { 'res-1': true };
    await controller.deliver(userReferenced, overlay);

    expect(result.current.sources).toEqual({
      adminReferenced,
      userReferenced,
      overlay,
    });
  });

  it('keeps sources undefined until BOTH subscriptions have delivered', async () => {
    mockSettings(settingTuple(list(), false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    await controller.resolveSubscriptions();
    // Only the user-referenced subscription has delivered; overlay is still undefined.
    await controller.deliverUserReferencedOnly(list('user-v'));
    expect(result.current.sources).toBeUndefined();

    // Now the overlay delivers too.
    await controller.deliverOverlayOnly({ 'res-1': false });
    expect(result.current.sources).toBeDefined();
  });

  it('keeps sources undefined when the admin referenced setting is a PlatformError', async () => {
    mockSettings(settingTuple(makePlatformError(), false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    await controller.resolveSubscriptions();
    await controller.deliver(list('user-v'), { 'res-1': true });

    expect(result.current.sources).toBeUndefined();
  });

  it('reflects updated subscription values in a later memo pass', async () => {
    mockUseProjectSetting.mockReturnValue(settingTuple(list(), false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    await controller.resolveSubscriptions();
    const firstUser = list('user-v1');
    await controller.deliver(firstUser, { a: true });
    expect(result.current.sources?.userReferenced).toBe(firstUser);
    expect(result.current.sources?.overlay).toEqual({ a: true });

    // A subsequent delivery flows through to the memoized result.
    const secondUser = list('user-v2');
    await controller.deliverUserReferencedOnly(secondUser);
    await controller.deliverOverlayOnly({ a: false, b: true });
    expect(result.current.sources?.userReferenced).toBe(secondUser);
    expect(result.current.sources?.overlay).toEqual({ a: false, b: true });
  });

  it('substitutes the default list when a subscription delivers a PlatformError value', async () => {
    mockUseProjectSetting.mockReturnValue(settingTuple(list(), false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    await controller.resolveSubscriptions();
    // A PlatformError from the user subscription is swapped for the default (empty) list, and the
    // overlay delivers a real value — so sources still assembles.
    await controller.deliver(makePlatformError(), { a: true });

    expect(result.current.sources).toBeDefined();
    expect(result.current.sources?.userReferenced.items).toEqual([]);
  });

  it('unsubscribes both subscriptions on unmount', async () => {
    mockUseProjectSetting.mockReturnValue(settingTuple(list(), false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { unmount } = renderHook(() => useTextCollectionSources('proj-1'));

    await controller.resolveSubscriptions();

    expect(controller.unsubUserReferenced).not.toHaveBeenCalled();
    expect(controller.unsubOverlay).not.toHaveBeenCalled();

    unmount();

    expect(controller.unsubUserReferenced).toHaveBeenCalledTimes(1);
    expect(controller.unsubOverlay).toHaveBeenCalledTimes(1);
  });

  it('immediately unsubscribes a subscription whose promise resolves after unmount (no leak)', async () => {
    mockUseProjectSetting.mockReturnValue(settingTuple(list(), false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { unmount } = renderHook(() => useTextCollectionSources('proj-1'));

    // Unmount BEFORE the subscribe promises resolve — the dispose-before-subscribe race.
    unmount();

    // The unsubscribers do not exist yet, so cleanup could not have called them.
    expect(controller.unsubUserReferenced).not.toHaveBeenCalled();
    expect(controller.unsubOverlay).not.toHaveBeenCalled();

    // Now the subscribe promises resolve — since the effect already disposed, the resolved
    // unsubscribe functions must be invoked immediately rather than stored.
    await controller.resolveSubscriptions();

    expect(controller.unsubUserReferenced).toHaveBeenCalledTimes(1);
    expect(controller.unsubOverlay).toHaveBeenCalledTimes(1);
  });

  it('returns the same textConnectionPdp object that useProjectDataProvider yields', () => {
    mockUseProjectSetting.mockReturnValue(settingTuple(list(), false));
    const controller = makeControllablePdp();
    mockUseProjectDataProvider.mockReturnValue(controller.pdp);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    expect(result.current.textConnectionPdp).toBe(controller.pdp);
  });

  it('returns sources undefined and no subscriptions when there is no PDP yet', () => {
    mockUseProjectSetting.mockReturnValue(settingTuple(list(), false));
    mockUseProjectDataProvider.mockReturnValue(undefined);

    const { result } = renderHook(() => useTextCollectionSources('proj-1'));

    expect(result.current.sources).toBeUndefined();
    expect(result.current.textConnectionPdp).toBeUndefined();
  });
});
