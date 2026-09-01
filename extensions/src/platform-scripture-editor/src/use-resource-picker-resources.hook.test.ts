// @vitest-environment jsdom

import { it, expect, vi, beforeEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { EffectiveResourceReferenceList } from 'platform-scripture';
import type { DblResourceData } from 'platform-bible-utils';
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
import type { EffectiveResourceReferenceListState } from './use-effective-resource-reference-list.hook';
import { fetchDownloadedResources } from './downloaded-resources.utils';
import { useResourcePickerResources } from './use-resource-picker-resources.hook';

vi.mock('./use-effective-resource-reference-list.hook', () => ({
  useEffectiveResourceReferenceList: vi.fn(),
}));
vi.mock('./downloaded-resources.utils', async (orig) => ({
  ...(await orig<typeof import('./downloaded-resources.utils')>()),
  fetchDownloadedResources: vi.fn(),
}));
vi.mock('@papi/frontend', () => ({
  default: { network: { getNetworkEvent: vi.fn(() => 'onDidChangeProjects-token') } },
}));

// The hook subscribes to `platform.onDidChangeProjects` through `useEvent`. Capture the handler it
// registers so a test can fire the event and drive the refetch.
let capturedProjectsChangedHandler: (() => void) | undefined;
vi.mock('platform-bible-react', () => ({
  useEvent: vi.fn((_event, handler) => {
    capturedProjectsChangedHandler = handler;
  }),
}));

const readyState = (
  items: EffectiveResourceReferenceList['items'],
): EffectiveResourceReferenceListState => ({
  status: 'ready',
  list: { dataVersion: '1.1.0', items },
});

/** Minimal catalog entry, enough for a row to adopt a type from the catalog. */
const dblEntry = (
  projectId: string,
  type: DblResourceData['type'] = 'ScriptureResource',
): DblResourceData => ({
  dblEntryUid: `uid-${projectId}`,
  displayName: projectId,
  fullName: projectId,
  bestLanguageName: 'English',
  type,
  size: 0,
  installed: true,
  updateAvailable: false,
  projectId,
});

beforeEach(() => {
  vi.clearAllMocks();
  capturedProjectsChangedHandler = undefined;
});

it('returns referenced-only rows when includeDownloaded is false', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue(
    readyState([{ type: 'project', name: 'WEB', id: 'proj-web', source: 'admin' }]),
  );
  vi.mocked(fetchDownloadedResources).mockResolvedValue([]);

  const { result } = renderHook(() =>
    useResourcePickerResources('p1', { includeDownloaded: false }, [dblEntry('proj-web')], true),
  );
  await waitFor(() => expect(result.current[0]).toHaveLength(1));
  expect(fetchDownloadedResources).not.toHaveBeenCalled();
});

it('unions downloaded rows when includeDownloaded is true', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue(
    readyState([{ type: 'project', name: 'WEB', id: 'proj-web', source: 'admin' }]),
  );
  vi.mocked(fetchDownloadedResources).mockResolvedValue([
    { projectId: 'proj-kjn', name: 'KJN', fullName: 'King James New', language: 'English' },
  ]);

  const { result } = renderHook(() =>
    useResourcePickerResources('p1', { includeDownloaded: true }, [dblEntry('proj-web')], true),
  );
  await waitFor(() => expect(result.current[0]).toHaveLength(2));
  expect(result.current[0]?.[1]).toMatchObject({ source: 'downloaded', projectId: 'proj-kjn' });
});

it('orders admin-locked rows first when adminLockedFirst is set', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue(
    readyState([
      { type: 'project', name: 'User', id: 'p-user', source: 'user' },
      {
        type: 'project',
        name: 'Admin',
        id: 'p-admin',
        source: 'admin',
        isInTextCollection: true,
      },
    ]),
  );
  vi.mocked(fetchDownloadedResources).mockResolvedValue([]);

  const { result } = renderHook(() =>
    useResourcePickerResources(
      'p1',
      { includeDownloaded: false, adminLockedFirst: true },
      [dblEntry('p-user'), dblEntry('p-admin')],
      true,
    ),
  );
  await waitFor(() => expect(result.current[0]).toHaveLength(2));
  expect(result.current[0]?.[0]).toMatchObject({ isAdminLocked: true });
});

it('exposes isLoading=true while the downloaded resource fetch is in flight', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue(
    readyState([{ type: 'project', name: 'WEB', id: 'proj-web', source: 'admin' }]),
  );
  let resolveDownloaded!: (v: Awaited<ReturnType<typeof fetchDownloadedResources>>) => void;
  vi.mocked(fetchDownloadedResources).mockReturnValue(
    new Promise((resolve) => {
      resolveDownloaded = resolve;
    }),
  );

  const { result } = renderHook(() =>
    useResourcePickerResources('p1', { includeDownloaded: true }, [], true),
  );

  await waitFor(() => expect(result.current[1]).toBe(true));
  resolveDownloaded([]);
  await waitFor(() => expect(result.current[1]).toBe(false));
});

it('withholds rows until the catalog has settled, since a row type comes from the catalog', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue(
    readyState([{ type: 'project', name: 'Comm', id: 'p-comm', source: 'user' }]),
  );
  vi.mocked(fetchDownloadedResources).mockResolvedValue([]);

  const emptyCatalog: DblResourceData[] = [];
  const { result, rerender } = renderHook(
    ({ isSettled, catalog }: { isSettled: boolean; catalog: DblResourceData[] }) =>
      useResourcePickerResources('p1', { includeDownloaded: false }, catalog, isSettled),
    { initialProps: { isSettled: false, catalog: emptyCatalog } },
  );

  await waitFor(() => expect(result.current[1]).toBe(true));
  expect(result.current[0]).toBeUndefined();

  rerender({ isSettled: true, catalog: [dblEntry('p-comm', 'CommentaryResource')] });
  await waitFor(() => expect(result.current[0]).toHaveLength(1));
  expect(result.current[0]?.[0]).toMatchObject({ type: 'CommentaryResource' });
});

it('re-reads the downloaded list when the project set changes', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue(readyState([]));
  vi.mocked(fetchDownloadedResources).mockResolvedValue([]);

  const { result } = renderHook(() =>
    useResourcePickerResources('p1', { includeDownloaded: true }, [], true),
  );
  await waitFor(() => expect(result.current[0]).toHaveLength(0));
  expect(fetchDownloadedResources).toHaveBeenCalledTimes(1);

  vi.mocked(fetchDownloadedResources).mockResolvedValue([
    { projectId: 'proj-new', name: 'NEW', fullName: 'Newly installed', language: 'English' },
  ]);
  act(() => capturedProjectsChangedHandler?.());

  await waitFor(() => expect(result.current[0]).toHaveLength(1));
  expect(result.current[0]?.[0]).toMatchObject({ projectId: 'proj-new' });
});
