import { describe, it, expect } from 'vitest';
import { makeProjectSelectorCustomData } from 'platform-bible-utils';
import {
  buildBuiltInGroupingStrings,
  buildSelectionGroupingStrings,
  makeBuiltInGroupings,
  makeOpenTabsGrouping,
  makeSelectionGrouping,
  readProjectSelectorString,
  PROJECT_SELECTOR_STRING_KEYS,
  type BuiltInGroupingStrings,
  type ProjectSelectorStringLookup,
} from './project-selector.groupings';
import { buildProjectSelectorLocalizedStrings } from './project-selector.component';
import type { ProjectSelectorGrouping, ProjectSelectorProject } from './project-selector.rows';

/**
 * A lookup whose value for every key IS that key. Feeding it through a string builder makes the
 * builder's key-to-field mapping directly assertable: the field's value names the key it was built
 * from, so a mistyped key surfaces as a wrong (or undefined) value rather than silently falling
 * back to English.
 */
const IDENTITY_STRINGS: ProjectSelectorStringLookup = Object.freeze(
  Object.fromEntries(PROJECT_SELECTOR_STRING_KEYS.map((key) => [key, key])),
);

function project(id: string, customData?: Record<string, unknown>): ProjectSelectorProject {
  return { id, shortName: id, fullName: id, customData };
}

function groupingById(id: string, strings?: BuiltInGroupingStrings): ProjectSelectorGrouping {
  const grouping = makeBuiltInGroupings(strings).find((g) => g.id === id);
  if (!grouping) throw new Error(`makeBuiltInGroupings returned no grouping with id "${id}"`);
  return grouping;
}

/** The bucket key a grouping assigns to a project. Throws rather than asserting non-null. */
function keyFor(grouping: ProjectSelectorGrouping, candidate: ProjectSelectorProject): string {
  const key = grouping.getGroupKey?.(candidate);
  if (key === undefined) throw new Error(`grouping "${grouping.id}" produced no key`);
  return key;
}

/** The `{ key, heading }` pair `compareSections` receives for the bucket a project lands in. */
function section(grouping: ProjectSelectorGrouping, candidate: ProjectSelectorProject) {
  const key = keyFor(grouping, candidate);
  return { key, heading: grouping.getSectionHeading?.(key, [candidate]) ?? key };
}

describe('readProjectSelectorString', () => {
  it('returns the value for a string entry', () => {
    expect(
      readProjectSelectorString(
        { '%projectSelector_clearAll%': 'Clear all' },
        '%projectSelector_clearAll%',
      ),
    ).toBe('Clear all');
  });

  it('returns undefined for a missing or non-string entry so the English fallback applies', () => {
    expect(readProjectSelectorString({}, '%projectSelector_clearAll%')).toBeUndefined();
    expect(
      readProjectSelectorString({ '%projectSelector_clearAll%': 42 }, '%projectSelector_clearAll%'),
    ).toBeUndefined();
  });
});

describe('string builders — key-to-field mapping', () => {
  // These assertions are the reason this suite exists. A mistyped localization key in a builder
  // degrades silently to English at runtime; nothing else in the codebase would fail.
  it('maps every built-in grouping field to its own localization key', () => {
    expect(buildBuiltInGroupingStrings(IDENTITY_STRINGS)).toEqual({
      openTabsLabel: '%projectSelector_grouping_openTabs_label%',
      lastUsedLabel: '%projectSelector_grouping_lastUsed_label%',
      lastUsedRecentSectionHeading: '%projectSelector_grouping_lastUsed_recentSectionHeading%',
      lastUsedOtherSectionHeading: '%projectSelector_grouping_lastUsed_otherSectionHeading%',
      languageLabel: '%projectSelector_grouping_language_label%',
      languageUnknownSectionHeading: '%projectSelector_grouping_language_unknownSectionHeading%',
      typeLabel: '%projectSelector_grouping_type_label%',
      typeUnknownSectionHeading: '%projectSelector_grouping_type_unknownSectionHeading%',
    });
  });

  it('maps every selection grouping field to its own localization key', () => {
    expect(buildSelectionGroupingStrings(IDENTITY_STRINGS)).toEqual({
      label: '%projectSelector_grouping_selection_label%',
      selectedSectionHeading: '%projectSelector_grouping_selection_selectedSectionHeading%',
      unselectedSectionHeading: '%projectSelector_grouping_selection_unselectedSectionHeading%',
    });
  });

  it('maps every picker-chrome field to its own localization key', () => {
    expect(buildProjectSelectorLocalizedStrings(IDENTITY_STRINGS)).toEqual({
      searchPlaceholder: '%projectSelector_searchPlaceholder%',
      commandEmptyMessage: '%projectSelector_commandEmptyMessage%',
      groupByAriaLabel: '%projectSelector_groupByAriaLabel%',
      groupSectionLabel: '%projectSelector_groupSectionLabel%',
      groupByNone: '%projectSelector_groupByNone%',
      openTabsSectionHeading: '%projectSelector_openTabsSectionHeading%',
      otherProjectsSectionHeading: '%projectSelector_otherProjectsSectionHeading%',
      autoOpenTabsGroupingLabel: '%projectSelector_grouping_openTabs_label%',
      autoSelectionGroupingLabel: '%projectSelector_grouping_selection_label%',
      autoSelectionSelectedSectionHeading:
        '%projectSelector_grouping_selection_selectedSectionHeading%',
      autoSelectionUnselectedSectionHeading:
        '%projectSelector_grouping_selection_unselectedSectionHeading%',
      boundButClosedTooltip: '%projectSelector_boundButClosedTooltip%',
      openButtonLabel: '%projectSelector_openButtonLabel%',
      clearAll: '%projectSelector_clearAll%',
    });
  });

  it('leaves every field undefined when the lookup has none of the keys', () => {
    expect(Object.values(buildBuiltInGroupingStrings({}))).toEqual(
      Array.from({ length: 8 }, () => undefined),
    );
    expect(Object.values(buildSelectionGroupingStrings({}))).toEqual([
      undefined,
      undefined,
      undefined,
    ]);
  });
});

describe('makeBuiltInGroupings', () => {
  it('returns the four built-ins in a stable order with English defaults', () => {
    expect(makeBuiltInGroupings().map((g) => [g.id, g.label])).toEqual([
      ['openTabs', 'Open tabs'],
      ['lastUsed', 'Last used'],
      ['language', 'Language'],
      ['type', 'Type'],
    ]);
  });

  it('applies supplied labels and unknown-section headings', () => {
    const groupings = makeBuiltInGroupings(buildBuiltInGroupingStrings(IDENTITY_STRINGS));
    expect(groupings.map((g) => g.label)).toEqual([
      '%projectSelector_grouping_openTabs_label%',
      '%projectSelector_grouping_lastUsed_label%',
      '%projectSelector_grouping_language_label%',
      '%projectSelector_grouping_type_label%',
    ]);
    expect(groupings.find((g) => g.id === 'language')?.unknownSectionHeading).toBe(
      '%projectSelector_grouping_language_unknownSectionHeading%',
    );
    expect(groupings.find((g) => g.id === 'type')?.unknownSectionHeading).toBe(
      '%projectSelector_grouping_type_unknownSectionHeading%',
    );
  });

  it('shares one openTabs descriptor with makeOpenTabsGrouping', () => {
    expect(groupingById('openTabs')).toEqual(makeOpenTabsGrouping());
    expect(makeOpenTabsGrouping('Tabs').label).toBe('Tabs');
  });
});

describe('lastUsed grouping', () => {
  it('treats lastUsedAt as a presence flag, not a sort key', () => {
    const { getGroupKey } = groupingById('lastUsed');
    // Both are "recent" — the magnitude is never compared, so a larger value does not outrank a
    // smaller one. Ordering within the bucket is the row order the caller supplied.
    expect(getGroupKey?.(project('a', makeProjectSelectorCustomData({ lastUsedAt: 1 })))).toBe(
      getGroupKey?.(project('b', makeProjectSelectorCustomData({ lastUsedAt: 99 }))),
    );
    expect(getGroupKey?.(project('c'))).not.toBe(
      getGroupKey?.(project('d', makeProjectSelectorCustomData({ lastUsedAt: 1 }))),
    );
  });

  it('orders the recent bucket ahead of the other bucket regardless of argument order', () => {
    const grouping = groupingById('lastUsed');
    const { compareSections } = grouping;
    const recent = section(
      grouping,
      project('a', makeProjectSelectorCustomData({ lastUsedAt: 1 })),
    );
    const other = section(grouping, project('b'));
    expect(compareSections?.(recent, other)).toBeLessThan(0);
    expect(compareSections?.(other, recent)).toBeGreaterThan(0);
    expect(compareSections?.(other, other)).toBe(0);
  });

  it('labels the two buckets from the supplied strings', () => {
    const grouping = groupingById('lastUsed', buildBuiltInGroupingStrings(IDENTITY_STRINGS));
    const recent = keyFor(grouping, project('a', makeProjectSelectorCustomData({ lastUsedAt: 1 })));
    const other = keyFor(grouping, project('b'));
    expect(grouping.getSectionHeading?.(recent, [])).toBe(
      '%projectSelector_grouping_lastUsed_recentSectionHeading%',
    );
    expect(grouping.getSectionHeading?.(other, [])).toBe(
      '%projectSelector_grouping_lastUsed_otherSectionHeading%',
    );
  });
});

describe('language grouping', () => {
  it('buckets by the language custom-data key and returns undefined when it is absent', () => {
    const { getGroupKey } = groupingById('language');
    expect(getGroupKey?.(project('a', makeProjectSelectorCustomData({ language: 'fr' })))).toBe(
      'fr',
    );
    expect(getGroupKey?.(project('b'))).toBeUndefined();
    expect(getGroupKey?.(project('c', { language: 7 }))).toBeUndefined();
  });
});

describe('type grouping', () => {
  it('buckets by the type custom-data key', () => {
    const { getGroupKey } = groupingById('type');
    expect(getGroupKey?.(project('a', makeProjectSelectorCustomData({ type: 'Standard' })))).toBe(
      'Standard',
    );
    expect(getGroupKey?.(project('b'))).toBeUndefined();
  });

  it('uses the first non-empty typeName in the bucket as the heading', () => {
    const { getSectionHeading } = groupingById('type');
    const rows = [
      project('a', makeProjectSelectorCustomData({ type: 'BackTranslation' })),
      project(
        'b',
        makeProjectSelectorCustomData({ type: 'BackTranslation', typeName: 'Back translation' }),
      ),
    ];
    expect(getSectionHeading?.('BackTranslation', rows)).toBe('Back translation');
  });

  it('falls back to the raw bucket key when no row carries a usable typeName', () => {
    const { getSectionHeading } = groupingById('type');
    expect(getSectionHeading?.('BackTranslation', [project('a')])).toBe('BackTranslation');
    // An empty string is not a usable heading — it would render a blank section header.
    expect(getSectionHeading?.('BackTranslation', [project('a', { typeName: '' })])).toBe(
      'BackTranslation',
    );
  });
});

describe('makeSelectionGrouping', () => {
  it('carries the reserved id and defaults both headings in English', () => {
    const grouping = makeSelectionGrouping();
    expect(grouping.id).toBe('selection');
    expect(grouping.label).toBe('Selection');
    expect(grouping.getSectionHeading?.('selected', [])).toBe('Selected');
    expect(grouping.getSectionHeading?.('unselected', [])).toBe('Unselected');
  });

  it('applies supplied headings', () => {
    const grouping = makeSelectionGrouping(buildSelectionGroupingStrings(IDENTITY_STRINGS));
    expect(grouping.label).toBe('%projectSelector_grouping_selection_label%');
    expect(grouping.getSectionHeading?.('selected', [])).toBe(
      '%projectSelector_grouping_selection_selectedSectionHeading%',
    );
    expect(grouping.getSectionHeading?.('unselected', [])).toBe(
      '%projectSelector_grouping_selection_unselectedSectionHeading%',
    );
  });
});
