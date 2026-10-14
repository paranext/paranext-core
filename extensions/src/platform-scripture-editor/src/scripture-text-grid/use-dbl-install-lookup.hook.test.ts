// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import papi from '@papi/frontend';
import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceInstallStatus } from 'platform-get-resources';
import type { DblResourceReference } from 'platform-scripture';
import type { InstallLookup } from './grid-resources.utils';
import { useDblInstallLookup } from './use-dbl-install-lookup.hook';

vi.mock('@papi/frontend', () => ({
  default: {
    dataProviders: { get: vi.fn() },
    network: { getNetworkEvent: vi.fn(() => 'onDidChangeProjects-token') },
  },
  logger: { warn: vi.fn(), debug: vi.fn() },
}));

// The hook subscribes to `platform.onDidChangeProjects` through `useEvent`. Capture the handler it
// registers so a test can fire the event; `usePromise` stays real.
let capturedProjectsChangedHandler: (() => void) | undefined;
vi.mock('platform-bible-react', async (importOriginal) => ({
  ...(await importOriginal<typeof import('platform-bible-react')>()),
  useEvent: vi.fn((_event: unknown, handler: () => void) => {
    capturedProjectsChangedHandler = handler;
  }),
}));

const mockGet = vi.mocked(papi.dataProviders.get);

const REFERENCES: DblResourceReference[] = [{ type: 'dblResource', id: 'uid', name: 'NIV' }];

type Props = {
  cachedResources: DblResourceData[] | undefined;
  isCatalogLoading: boolean;
  hasCatalogSettled: boolean;
  refreshCounter: number;
};

const CATALOG_FAILED: Props = {
  cachedResources: undefined,
  isCatalogLoading: false,
  hasCatalogSettled: true,
  refreshCounter: 0,
};

/** The catalog refetching, as it does after a Retry or an install. */
const CATALOG_REFETCHING: Props = {
  ...CATALOG_FAILED,
  isCatalogLoading: true,
  hasCatalogSettled: false,
};

/** Makes `dataProviders.get` hand back a provider whose disk scan runs `recompute`. */
function provideRecompute(recompute: () => Promise<DblResourceInstallStatus>) {
  const recomputeDblResourcesInstallStatus = vi.fn(recompute);
  // The hook reads only this one method; a full provider is not needed to exercise it.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockGet.mockResolvedValue({ recomputeDblResourcesInstallStatus } as unknown as Awaited<
    ReturnType<typeof papi.dataProviders.get>
  >);
  return recomputeDblResourcesInstallStatus;
}

/** Renders the hook, recording the status every render reported. */
function renderLookup(initialProps: Props) {
  const statuses: InstallLookup['status'][] = [];
  const rendered = renderHook(
    (props: Props) => {
      const lookup = useDblInstallLookup({ references: REFERENCES, ...props });
      statuses.push(lookup.status);
      return lookup;
    },
    { initialProps },
  );
  return { ...rendered, statuses };
}

/** Lets pending promises and the state updates they cause settle. */
async function flush() {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(0);
  });
}

describe('useDblInstallLookup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('answers from disk when the catalog failed, never reporting unanswered on the way', async () => {
    provideRecompute(() => Promise.resolve({ uid: 'P' }));

    const { result, statuses } = renderLookup(CATALOG_FAILED);
    await flush();

    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'P' } });
    expect(statuses).not.toContain('unanswered');
  });

  it('asks again when the catalog settles after finding no provider to ask', async () => {
    mockGet.mockResolvedValue(undefined);
    const { result, rerender } = renderLookup(CATALOG_FAILED);
    await flush();
    expect(result.current.status).toBe('unanswered');

    // The loading-edge ask alone must not be credited with the answer: give it a provider that is
    // merely busy (an empty map), so only the settle re-ask below can produce 'answered'.
    provideRecompute(() => Promise.resolve({}));
    rerender({ ...CATALOG_FAILED, isCatalogLoading: true, hasCatalogSettled: false });
    await flush();
    expect(result.current.status).toBe('pending');

    provideRecompute(() => Promise.resolve({ uid: 'P' }));
    rerender(CATALOG_FAILED);
    await flush();

    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'P' } });
  });

  it('never reports unanswered before a settling retry answers, even though the loading-edge ask already failed', async () => {
    mockGet.mockResolvedValue(undefined);
    const { result, rerender, statuses } = renderLookup(CATALOG_REFETCHING);
    await flush();
    // Still loading: even though the ask itself already failed (no provider), the lookup must wait
    // for the catalog to settle rather than declaring defeat early.
    expect(result.current.status).toBe('pending');

    rerender(CATALOG_FAILED);
    // Not yet resolved — the settle re-ask must not read as 'unanswered' before it has answered.
    expect(statuses).not.toContain('unanswered');
    await flush();

    expect(result.current.status).toBe('unanswered');
    expect(statuses.slice(0, -1)).not.toContain('unanswered');
  });

  it('rides out a busy provider before settling on its answer', async () => {
    const answers: DblResourceInstallStatus[] = [{}, {}, { uid: 'P' }];
    const recompute = provideRecompute(() => Promise.resolve(answers.shift() ?? {}));

    const { result } = renderLookup(CATALOG_FAILED);
    await flush();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });

    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'P' } });
    expect(recompute).toHaveBeenCalledTimes(3);
  });

  it('does not ask when the catalog resolves every DBL reference', async () => {
    const row: DblResourceData = {
      dblEntryUid: 'uid',
      displayName: 'NIV',
      fullName: 'NIV',
      bestLanguageName: 'English',
      type: 'ScriptureResource',
      size: 0,
      installed: true,
      updateAvailable: false,
      projectId: 'P',
    };

    const { result } = renderLookup({ ...CATALOG_FAILED, cachedResources: [row] });
    await flush();

    expect(mockGet).not.toHaveBeenCalled();
    expect(result.current.status).toBe('unanswered');
  });

  it('does not offer an answer from before an install as current while the new ask is in flight', async () => {
    provideRecompute(() => Promise.resolve({ uid: 'P' }));
    const { result, rerender, statuses } = renderLookup(CATALOG_FAILED);
    await flush();
    expect(result.current.status).toBe('answered');

    provideRecompute(() => new Promise<DblResourceInstallStatus>(() => {}));
    const rendersBefore = statuses.length;
    rerender({ ...CATALOG_REFETCHING, refreshCounter: 1 });
    await flush();

    expect(statuses.slice(rendersBefore)).not.toContain('answered');
    expect(result.current.status).toBe('pending');
  });

  it('keeps an answer through a Retry, without asking a provider the refetch holds', async () => {
    provideRecompute(() => Promise.resolve({ uid: 'P' }));
    const { result, rerender, statuses } = renderLookup(CATALOG_FAILED);
    await flush();
    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'P' } });

    const recompute = provideRecompute(() => Promise.resolve({ uid: 'Q' }));
    const rendersBefore = statuses.length;
    rerender(CATALOG_REFETCHING);
    await flush();

    expect(statuses.length).toBeGreaterThan(rendersBefore);
    expect(statuses.slice(rendersBefore)).not.toContain('pending');
    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'P' } });
    expect(recompute).not.toHaveBeenCalled();

    // Once the refetch releases the provider, a fresh answer replaces the one in hand.
    rerender(CATALOG_FAILED);
    await flush();

    expect(recompute).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'Q' } });
  });

  it('keeps an answer in hand when a later ask only hears that the provider is busy', async () => {
    provideRecompute(() => Promise.resolve({ uid: 'P' }));
    const { result, rerender } = renderLookup(CATALOG_FAILED);
    await flush();

    provideRecompute(() => Promise.resolve({}));
    rerender(CATALOG_REFETCHING);
    await flush();
    rerender(CATALOG_FAILED);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'P' } });
  });

  it('asks again when a project is added, removed or renamed', async () => {
    const answers: DblResourceInstallStatus[] = [{ uid: 'P' }, { other: 'O' }];
    const recompute = provideRecompute(() => Promise.resolve(answers.shift() ?? {}));
    const { result } = renderLookup(CATALOG_FAILED);
    await flush();
    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'P' } });

    act(() => capturedProjectsChangedHandler?.());
    await flush();

    expect(recompute).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual({
      status: 'answered',
      installedProjectIds: { other: 'O' },
    });
  });

  it('does not let a slow earlier ask replace a newer answer', async () => {
    let resolveFirstAsk: (status: DblResourceInstallStatus) => void = () => {};
    const answers: Promise<DblResourceInstallStatus>[] = [
      new Promise((resolve) => {
        resolveFirstAsk = resolve;
      }),
      Promise.resolve({ uid: 'NEW' }),
    ];
    provideRecompute(() => answers.shift() ?? Promise.resolve({}));
    const { result, rerender } = renderLookup(CATALOG_FAILED);
    await flush();
    act(() => capturedProjectsChangedHandler?.());
    await flush();
    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'NEW' } });

    resolveFirstAsk({ uid: 'OLD' });
    await flush();
    // A Retry answers from the answer in hand without asking, so it shows which one was kept.
    rerender(CATALOG_REFETCHING);
    await flush();

    expect(result.current).toEqual({ status: 'answered', installedProjectIds: { uid: 'NEW' } });
  });
});
