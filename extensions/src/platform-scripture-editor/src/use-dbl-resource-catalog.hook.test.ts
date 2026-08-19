// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { DblResourceData } from 'platform-bible-utils';
import papi from '@papi/frontend';
import { useDblResourceCatalog } from './use-dbl-resource-catalog.hook';

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: vi.fn() } },
  logger: { warn: vi.fn() },
}));

const mockSendCommand = vi.mocked(papi.commands.sendCommand);

const RESOURCE: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: true,
  updateAvailable: false,
  projectId: 'project-web',
};

describe('useDblResourceCatalog', () => {
  beforeEach(() => vi.clearAllMocks());

  it('reports the catalog as ready once the fetch delivers', async () => {
    mockSendCommand.mockResolvedValue([RESOURCE]);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(result.current.dblResources).toEqual([RESOURCE]);
    expect(result.current.hasCatalogError).toBe(false);
  });

  it('reports an error instead of loading forever when the fetch rejects', async () => {
    // `usePromise` has no rejection path, so an uncaught rejection leaves `isLoading` true forever
    // and strands the panel on a spinner it can never leave.
    mockSendCommand.mockRejectedValue(new Error('offline'));

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));
    expect(result.current.isLoadingResources).toBe(false);
  });

  it('clears the error and re-fetches when asked to refetch', async () => {
    mockSendCommand.mockRejectedValueOnce(new Error('offline'));

    const { result } = renderHook(() => useDblResourceCatalog());
    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));

    mockSendCommand.mockResolvedValue([RESOURCE]);
    act(() => result.current.refetchCatalog());

    await waitFor(() => expect(result.current.hasCatalogError).toBe(false));
    await waitFor(() => expect(result.current.dblResources).toEqual([RESOURCE]));
  });
});
