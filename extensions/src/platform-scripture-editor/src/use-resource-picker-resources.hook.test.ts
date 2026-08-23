// @vitest-environment jsdom
import { it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import type { EffectiveResourceReferenceList } from 'platform-scripture';

vi.mock('./use-effective-resource-reference-list.hook', () => ({
  useEffectiveResourceReferenceList: vi.fn(),
}));
vi.mock('./downloaded-resources.utils', async (orig) => ({
  ...(await orig<typeof import('./downloaded-resources.utils')>()),
  fetchDownloadedResources: vi.fn(),
}));

// Mocked module imports must follow vi.mock() calls so they receive the mocked implementation.
// eslint-disable-next-line import/first
import { useEffectiveResourceReferenceList } from './use-effective-resource-reference-list.hook';
// Mocked module imports must follow vi.mock() calls so they receive the mocked implementation.
// eslint-disable-next-line import/first
import { fetchDownloadedResources } from './downloaded-resources.utils';
// The module under test imports after mocks so its dependencies resolve to mocked versions.
// eslint-disable-next-line import/first
import { useResourcePickerResources } from './use-resource-picker-resources.hook';

const effective = (
  items: EffectiveResourceReferenceList['items'],
): EffectiveResourceReferenceList => ({
  dataVersion: '1.1.0',
  items,
});

beforeEach(() => vi.clearAllMocks());

it('returns referenced-only rows when includeDownloaded is false', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue([
    effective([{ type: 'project', name: 'WEB', id: 'proj-web', source: 'admin' }]),
    false,
  ]);
  vi.mocked(fetchDownloadedResources).mockResolvedValue([]);

  const { result } = renderHook(() =>
    useResourcePickerResources('p1', { includeDownloaded: false }, []),
  );
  await waitFor(() => expect(result.current[0]).toHaveLength(1));
  expect(fetchDownloadedResources).not.toHaveBeenCalled();
});

it('unions downloaded rows when includeDownloaded is true', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue([
    effective([{ type: 'project', name: 'WEB', id: 'proj-web', source: 'admin' }]),
    false,
  ]);
  vi.mocked(fetchDownloadedResources).mockResolvedValue([
    { projectId: 'proj-kjn', name: 'KJN', fullName: 'King James New', language: 'English' },
  ]);

  const { result } = renderHook(() =>
    useResourcePickerResources('p1', { includeDownloaded: true }, []),
  );
  await waitFor(() => expect(result.current[0]).toHaveLength(2));
  expect(result.current[0]?.[1]).toMatchObject({ source: 'downloaded', projectId: 'proj-kjn' });
});

it('orders admin-locked rows first when adminLockedFirst is set', async () => {
  vi.mocked(useEffectiveResourceReferenceList).mockReturnValue([
    effective([
      { type: 'project', name: 'User', id: 'p-user', source: 'user' },
      {
        type: 'project',
        name: 'Admin',
        id: 'p-admin',
        source: 'admin',
        isResourceShownByDefault: true,
      },
    ]),
    false,
  ]);
  vi.mocked(fetchDownloadedResources).mockResolvedValue([]);

  const { result } = renderHook(() =>
    useResourcePickerResources('p1', { includeDownloaded: false, adminLockedFirst: true }, []),
  );
  await waitFor(() => expect(result.current[0]).toHaveLength(2));
  expect(result.current[0]?.[0]).toMatchObject({ isAdminLocked: true });
});
