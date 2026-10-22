// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import type { SharedProjectsInfo } from 'platform-scripture';
import type { LocalProjectInfo } from './home.component';
import { useUnsupportedReasonStrings } from './use-unsupported-reason-strings.hook';

const { mockUseLocalizedStrings } = vi.hoisted(() => ({
  mockUseLocalizedStrings: vi.fn(),
}));

vi.mock('@papi/frontend/react', () => ({
  useLocalizedStrings: mockUseLocalizedStrings,
}));

const localProject = (
  overrides: Partial<LocalProjectInfo> & { projectId: string },
): LocalProjectInfo => ({
  isPublished: false,
  name: overrides.projectId,
  language: '',
  ...overrides,
});

const sharedProject = (
  overrides: Partial<SharedProjectsInfo[string]> & { id: string },
): SharedProjectsInfo[string] => ({
  name: overrides.id,
  fullName: overrides.id,
  language: '',
  editedStatus: '',
  lastSendReceiveDate: '',
  ...overrides,
});

const GENERIC_REASON_KEY = '%project_unsupported_generic%';
const GENERIC_REASON_FALLBACK_TEXT = "This project can't be opened.";

describe('useUnsupportedReasonStrings', () => {
  beforeEach(() => {
    mockUseLocalizedStrings.mockClear();
  });

  /** The key list handed to `useLocalizedStrings` on its most recent call. */
  const lastRequestedKeys = (): unknown => mockUseLocalizedStrings.mock.lastCall?.[0];

  it('asks useLocalizedStrings for each distinct unsupportedReason key exactly once', () => {
    mockUseLocalizedStrings.mockReturnValue([{}, false]);
    const localProjectsInfo: LocalProjectInfo[] = [
      localProject({
        projectId: 'p1',
        unsupportedReason: '%project_unsupported_studyBibleAdditions%',
      }),
      // Same key as p1 — must be deduped to a single entry.
      localProject({
        projectId: 'p2',
        unsupportedReason: '%project_unsupported_studyBibleAdditions%',
      }),
      // No reason at all — contributes nothing.
      localProject({ projectId: 'p3' }),
    ];
    const sharedProjectsInfo: SharedProjectsInfo = {
      p4: sharedProject({ id: 'p4', unsupportedReason: '%project_unsupported_other%' }),
    };

    renderHook(() => useUnsupportedReasonStrings(localProjectsInfo, sharedProjectsInfo));

    const keys = lastRequestedKeys();
    expect(keys).toHaveLength(3);
    expect(keys).toEqual(
      expect.arrayContaining([
        '%project_unsupported_studyBibleAdditions%',
        '%project_unsupported_other%',
        GENERIC_REASON_KEY,
      ]),
    );
  });

  it('asks once for a key that both a local and a shared project carry', () => {
    mockUseLocalizedStrings.mockReturnValue([{}, false]);
    const key = '%project_unsupported_studyBibleAdditions%';

    renderHook(() =>
      useUnsupportedReasonStrings([localProject({ projectId: 'p1', unsupportedReason: key })], {
        p1: sharedProject({ id: 'p1', unsupportedReason: key }),
      }),
    );

    expect(lastRequestedKeys()).toEqual([GENERIC_REASON_KEY, key]);
  });

  it('keeps the same key list when a refresh brings new lists with the same reasons', () => {
    mockUseLocalizedStrings.mockReturnValue([{}, false]);
    const withReasons = (firstKey: string, secondKey: string): LocalProjectInfo[] => [
      localProject({ projectId: 'p1', unsupportedReason: firstKey }),
      localProject({ projectId: 'p2', unsupportedReason: secondKey }),
    ];
    const { rerender } = renderHook(
      ({ localProjectsInfo }) => useUnsupportedReasonStrings(localProjectsInfo),
      {
        initialProps: {
          localProjectsInfo: withReasons('%project_unsupported_a%', '%project_unsupported_b%'),
        },
      },
    );
    const firstKeys = lastRequestedKeys();

    // New list identities, and the reasons in the other order.
    rerender({
      localProjectsInfo: withReasons('%project_unsupported_b%', '%project_unsupported_a%'),
    });

    expect(lastRequestedKeys()).toBe(firstKeys);
  });

  it('asks for a new key list when the set of reasons changes (positive control)', () => {
    mockUseLocalizedStrings.mockReturnValue([{}, false]);
    const { rerender } = renderHook(
      ({ localProjectsInfo }) => useUnsupportedReasonStrings(localProjectsInfo),
      {
        initialProps: {
          localProjectsInfo: [
            localProject({ projectId: 'p1', unsupportedReason: '%project_unsupported_a%' }),
          ],
        },
      },
    );
    const firstKeys = lastRequestedKeys();

    rerender({
      localProjectsInfo: [
        localProject({ projectId: 'p1', unsupportedReason: '%project_unsupported_b%' }),
      ],
    });

    expect(lastRequestedKeys()).not.toBe(firstKeys);
    expect(lastRequestedKeys()).toEqual(['%project_unsupported_b%', GENERIC_REASON_KEY]);
  });

  it('keeps the same empty key list across refreshes when no project has a reason', () => {
    mockUseLocalizedStrings.mockReturnValue([{}, false]);
    const { rerender } = renderHook(
      ({ localProjectsInfo }) => useUnsupportedReasonStrings(localProjectsInfo, {}),
      { initialProps: { localProjectsInfo: [localProject({ projectId: 'p1' })] } },
    );
    const firstKeys = lastRequestedKeys();

    rerender({ localProjectsInfo: [localProject({ projectId: 'p1' })] });

    expect(firstKeys).toEqual([]);
    expect(lastRequestedKeys()).toBe(firstKeys);
  });

  it('asks only for the generic reason for a value that is not itself a localize key', () => {
    mockUseLocalizedStrings.mockReturnValue([{}, false]);
    const localProjectsInfo: LocalProjectInfo[] = [
      localProject({ projectId: 'p1', unsupportedReason: 'not-a-localize-key' }),
    ];

    renderHook(() => useUnsupportedReasonStrings(localProjectsInfo));

    expect(lastRequestedKeys()).toEqual([GENERIC_REASON_KEY]);
  });

  it('returns the localized strings once they have resolved', () => {
    mockUseLocalizedStrings.mockReturnValue([
      {
        '%project_unsupported_studyBibleAdditions%': "Study Bible Additions aren't supported yet.",
      },
      false,
    ]);
    const localProjectsInfo: LocalProjectInfo[] = [
      localProject({
        projectId: 'p1',
        unsupportedReason: '%project_unsupported_studyBibleAdditions%',
      }),
    ];

    const { result } = renderHook(() => useUnsupportedReasonStrings(localProjectsInfo));

    expect(result.current).toEqual({
      '%project_unsupported_studyBibleAdditions%': "Study Bible Additions aren't supported yet.",
      [GENERIC_REASON_KEY]: GENERIC_REASON_FALLBACK_TEXT,
    });
  });

  it('returns {} while loading, even though useLocalizedStrings resolves a key-to-key seed', () => {
    const key = '%project_unsupported_studyBibleAdditions%';
    mockUseLocalizedStrings.mockReturnValue([{ [key]: key }, true]);
    const localProjectsInfo: LocalProjectInfo[] = [
      localProject({ projectId: 'p1', unsupportedReason: key }),
    ];

    const { result } = renderHook(() => useUnsupportedReasonStrings(localProjectsInfo));

    expect(result.current).toEqual({});
  });

  it("keeps the generic reason's translation when it has one", () => {
    mockUseLocalizedStrings.mockReturnValue([
      { [GENERIC_REASON_KEY]: 'Ce projet ne peut pas être ouvert.' },
      false,
    ]);

    const { result } = renderHook(() =>
      useUnsupportedReasonStrings([localProject({ projectId: 'p1', unsupportedReason: 'oops' })]),
    );

    expect(result.current[GENERIC_REASON_KEY]).toBe('Ce projet ne peut pas être ouvert.');
  });

  it('falls back to English for the generic reason when it resolves to its own key', () => {
    mockUseLocalizedStrings.mockReturnValue([{ [GENERIC_REASON_KEY]: GENERIC_REASON_KEY }, false]);

    const { result } = renderHook(() =>
      useUnsupportedReasonStrings([localProject({ projectId: 'p1', unsupportedReason: 'oops' })]),
    );

    expect(result.current[GENERIC_REASON_KEY]).toBe(GENERIC_REASON_FALLBACK_TEXT);
  });
});
