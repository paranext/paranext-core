// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ITextConnectionSettingsProjectDataProvider } from 'platform-scripture';
import { useProjectDataProvider } from '@papi/frontend/react';
import { useCanShareLayoutWithTeam } from './use-can-share-layout-with-team.hook';

vi.mock('@papi/frontend/react', () => ({
  useProjectDataProvider: vi.fn(),
}));

const mockUseProjectDataProvider = vi.mocked(useProjectDataProvider);

/** Cast a partial PDP mock to the full `useProjectDataProvider` return type for test isolation. */
function asProvider(pdp: object): ReturnType<typeof useProjectDataProvider> {
  // Partial PDP mocks can't satisfy the full return type; cast through unknown.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return pdp as unknown as ReturnType<typeof useProjectDataProvider>;
}

function makeTextConnectionsPdp(
  result: boolean | Promise<boolean> | (() => Promise<boolean>),
): ITextConnectionSettingsProjectDataProvider {
  const canUserWriteProjectTextConnectionSettings =
    typeof result === 'function' ? vi.fn(result) : vi.fn().mockResolvedValue(result);
  // Mock object literal cannot satisfy the full interface — cast needed for test isolation
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return {
    canUserWriteProjectTextConnectionSettings,
  } as unknown as ITextConnectionSettingsProjectDataProvider;
}

describe('useCanShareLayoutWithTeam', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('is loading and cannot share while the project data provider has not resolved', () => {
    mockUseProjectDataProvider.mockReturnValue(undefined);
    const { result } = renderHook(() => useCanShareLayoutWithTeam(undefined));
    expect(result.current.isLoading).toBe(true);
    expect(result.current.canShareLayout).toBe(false);
  });

  it('resolves canShareLayout=true for a project administrator', async () => {
    mockUseProjectDataProvider.mockReturnValue(asProvider(makeTextConnectionsPdp(true)));
    const { result } = renderHook(() => useCanShareLayoutWithTeam('proj-1'));
    await act(async () => {});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.canShareLayout).toBe(true);
  });

  it('resolves canShareLayout=false for a non-administrator', async () => {
    mockUseProjectDataProvider.mockReturnValue(asProvider(makeTextConnectionsPdp(false)));
    const { result } = renderHook(() => useCanShareLayoutWithTeam('proj-1'));
    await act(async () => {});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.canShareLayout).toBe(false);
  });

  it('treats a rejected permission check as canShareLayout=false (not stuck loading)', async () => {
    const pdp = makeTextConnectionsPdp(() => Promise.reject(new Error('rpc failed')));
    mockUseProjectDataProvider.mockReturnValue(asProvider(pdp));
    const { result } = renderHook(() => useCanShareLayoutWithTeam('proj-1'));
    await act(async () => {});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.canShareLayout).toBe(false);
  });

  it('resets to loading and re-resolves when the project changes', async () => {
    const first = makeTextConnectionsPdp(true);
    const second = makeTextConnectionsPdp(false);
    mockUseProjectDataProvider.mockImplementation((_providerName, projectId) =>
      projectId === 'proj-1' ? asProvider(first) : asProvider(second),
    );
    const { result, rerender } = renderHook(({ id }) => useCanShareLayoutWithTeam(id), {
      initialProps: { id: 'proj-1' },
    });
    await act(async () => {});
    expect(result.current.canShareLayout).toBe(true);

    rerender({ id: 'proj-2' });
    await act(async () => {});
    expect(result.current.canShareLayout).toBe(false);
  });
});
