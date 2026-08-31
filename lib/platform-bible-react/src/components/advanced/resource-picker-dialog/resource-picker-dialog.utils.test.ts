import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { DblResourceData } from 'platform-bible-utils';
import { buildLanguageFilterOptions, useProgressiveList } from './resource-picker-dialog.utils';
import {
  MANY_LANGUAGE_INSTALLED_LANGUAGES,
  MANY_LANGUAGE_NON_SCRIPTURE_LANGUAGES,
  MANY_LANGUAGE_RESOURCES,
} from './resource-picker-dialog.data';

type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
let ioCallback: IOCallback;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn((cb: IOCallback) => {
      ioCallback = cb;
      return { observe: mockObserve, disconnect: mockDisconnect };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

const makeItems = (count: number) => Array.from({ length: count }, (_, i) => i);

describe('useProgressiveList', () => {
  it('returns the first pageSize items initially and reports hasMore', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    expect(result.current.visibleItems).toHaveLength(50);
    expect(result.current.visibleItems[0]).toBe(0);
    expect(result.current.visibleItems[49]).toBe(49);
    expect(result.current.hasMore).toBe(true);
  });

  it('appends the next page when the sentinel intersects', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    act(() => {
      ioCallback([{ isIntersecting: true }]);
    });

    expect(result.current.visibleItems).toHaveLength(100);
    expect(result.current.hasMore).toBe(true);
  });

  it('resets to the first page when the items array reference changes', () => {
    const first = makeItems(120);
    const { result, rerender } = renderHook(({ items }) => useProgressiveList(items, 50), {
      initialProps: { items: first },
    });

    // Scroll to page 2
    act(() => {
      ioCallback([{ isIntersecting: true }]);
    });
    expect(result.current.visibleItems).toHaveLength(100);

    // Simulate a filter change — new array reference
    const second = makeItems(80);
    rerender({ items: second });

    expect(result.current.visibleItems).toHaveLength(50);
  });

  it('sets hasMore to false and caps visibleItems at items.length when list is small', () => {
    const items = makeItems(20);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    expect(result.current.visibleItems).toHaveLength(20);
    expect(result.current.hasMore).toBe(false);
  });

  it('does not advance the page when the sentinel fires with isIntersecting false', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    act(() => {
      ioCallback([{ isIntersecting: false }]);
    });

    expect(result.current.visibleItems).toHaveLength(50);
  });
});

describe('buildLanguageFilterOptions', () => {
  const resource = (
    overrides: Partial<DblResourceData> & Pick<DblResourceData, 'bestLanguageName'>,
  ): DblResourceData => ({
    dblEntryUid: `uid-${overrides.bestLanguageName}-${overrides.dblEntryUid ?? '0'}`,
    displayName: 'RES',
    fullName: 'Resource',
    type: 'ScriptureResource',
    size: 1000,
    installed: false,
    updateAvailable: false,
    projectId: 'prj',
    ...overrides,
  });

  it('returns one entry per distinct language, alphabetically', () => {
    const options = buildLanguageFilterOptions([
      resource({ bestLanguageName: 'Swahili' }),
      resource({ bestLanguageName: 'Amharic', dblEntryUid: '2' }),
      resource({ bestLanguageName: 'Swahili', dblEntryUid: '3' }),
      resource({ bestLanguageName: 'Nepali', dblEntryUid: '4' }),
    ]);

    expect(options.map((o) => o.label)).toEqual(['Amharic', 'Nepali', 'Swahili']);
    expect(options.every((o) => o.value === o.label)).toBe(true);
  });

  it('stars languages that have at least one installed resource', () => {
    const options = buildLanguageFilterOptions([
      resource({ bestLanguageName: 'Amharic', installed: true }),
      resource({ bestLanguageName: 'Nepali' }),
      // Swahili has an uninstalled resource first, then an installed one.
      resource({ bestLanguageName: 'Swahili', dblEntryUid: '3' }),
      resource({ bestLanguageName: 'Swahili', dblEntryUid: '4', installed: true }),
    ]);

    expect(options.find((o) => o.label === 'Amharic')?.starred).toBe(true);
    expect(options.find((o) => o.label === 'Swahili')?.starred).toBe(true);
    expect(options.find((o) => o.label === 'Nepali')?.starred).toBe(false);
  });

  it('reports the per-language resource count as the secondary label', () => {
    const options = buildLanguageFilterOptions([
      resource({ bestLanguageName: 'Swahili' }),
      resource({ bestLanguageName: 'Swahili', dblEntryUid: '2' }),
      resource({ bestLanguageName: 'Swahili', dblEntryUid: '3' }),
      resource({ bestLanguageName: 'Nepali' }),
    ]);

    expect(options.find((o) => o.label === 'Swahili')?.secondaryLabel).toBe('3');
    expect(options.find((o) => o.label === 'Nepali')?.secondaryLabel).toBe('1');
  });

  it('omits languages with no resource of the requested type, so the filter cannot dead-end', () => {
    const resources = [
      resource({ bestLanguageName: 'Amharic', type: 'ScriptureResource' }),
      // Coptic exists in the catalogue, but only as a non-Scripture resource.
      resource({ bestLanguageName: 'Coptic', type: 'XmlResource' }),
    ];

    expect(buildLanguageFilterOptions(resources, 'ScriptureResource').map((o) => o.label)).toEqual([
      'Amharic',
    ]);
    // Without a type filter both languages are offered.
    expect(buildLanguageFilterOptions(resources).map((o) => o.label)).toEqual([
      'Amharic',
      'Coptic',
    ]);
  });

  it('counts only resources of the requested type', () => {
    const options = buildLanguageFilterOptions(
      [
        resource({ bestLanguageName: 'Swahili', type: 'ScriptureResource' }),
        resource({ bestLanguageName: 'Swahili', dblEntryUid: '2', type: 'XmlResource' }),
      ],
      'ScriptureResource',
    );

    expect(options.find((o) => o.label === 'Swahili')?.secondaryLabel).toBe('1');
  });

  it('orders the real catalogue fixture alphabetically rather than in catalogue order', () => {
    const options = buildLanguageFilterOptions(MANY_LANGUAGE_RESOURCES);
    const labels = options.map((o) => o.label);

    // The fixture is emitted in a deliberately non-alphabetical order, so this fails if the
    // sort is dropped and catalogue order leaks through.
    expect(labels).not.toEqual(
      MANY_LANGUAGE_RESOURCES.map((r) => r.bestLanguageName).slice(0, labels.length),
    );
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
  });

  it('stars every installed language in the real catalogue fixture', () => {
    const starred = buildLanguageFilterOptions(MANY_LANGUAGE_RESOURCES)
      .filter((o) => o.starred)
      .map((o) => o.label);

    expect(starred).toEqual(
      [...MANY_LANGUAGE_INSTALLED_LANGUAGES].sort((a, b) => a.localeCompare(b)),
    );
  });

  it('drops the non-Scripture-only languages when scoped to Scripture resources', () => {
    const labels = buildLanguageFilterOptions(MANY_LANGUAGE_RESOURCES, 'ScriptureResource').map(
      (o) => o.label,
    );

    MANY_LANGUAGE_NON_SCRIPTURE_LANGUAGES.forEach((language) => {
      expect(labels).not.toContain(language);
    });
  });
});
