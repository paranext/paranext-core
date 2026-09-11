import type { ProjectSelectorGrouping } from './project-selector.rows';

/**
 * Localization inputs for {@link makeBuiltInGroupings}. All fields are optional; missing entries
 * fall back to English. The keys mirror the `%projectSelector_*%` central localization block so
 * consumers can wire them from `useLocalizedStrings` in one shot.
 */
export type BuiltInGroupingStrings = {
  openTabsLabel?: string;
  lastUsedLabel?: string;
  languageLabel?: string;
  typeLabel?: string;
  lastUsedRecentSectionHeading?: string;
  lastUsedOtherSectionHeading?: string;
  languageUnknownSectionHeading?: string;
  typeUnknownSectionHeading?: string;
};

// The two bucket keys the built-in `lastUsed` grouping partitions into.
const RECENT = 'recent';
const OTHER = 'other';

/**
 * Build the four built-in groupings (`openTabs`, `lastUsed`, `language`, `type`) with the supplied
 * (or English default) labels and section headings.
 *
 * Consumers that don't need custom groupings pass the returned array directly as
 * `availableGroupings`. Consumers that want to extend the set spread it and append their own
 * `ProjectSelectorGrouping` objects.
 *
 * The built-in groupings read from `project.customData` under well-known keys — see
 * `ProjectSelectorProject.customData` for the contract.
 */
export function makeBuiltInGroupings(strings?: BuiltInGroupingStrings): ProjectSelectorGrouping[] {
  const s = strings ?? {};
  return [
    {
      id: 'openTabs',
      label: s.openTabsLabel ?? 'Open tabs',
    },
    {
      id: 'lastUsed',
      label: s.lastUsedLabel ?? 'Last used',
      getGroupKey: (project) =>
        typeof project.customData?.lastUsedAt === 'number' ? RECENT : OTHER,
      getSectionHeading: (key) =>
        key === RECENT
          ? (s.lastUsedRecentSectionHeading ?? 'Recently used')
          : (s.lastUsedOtherSectionHeading ?? 'Other'),
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, b) => {
        if (a.key === RECENT) return -1;
        if (b.key === RECENT) return 1;
        return 0;
      },
    },
    {
      id: 'language',
      label: s.languageLabel ?? 'Language',
      getGroupKey: (project) =>
        typeof project.customData?.language === 'string' ? project.customData.language : undefined,
      unknownSectionHeading: s.languageUnknownSectionHeading ?? 'Unknown language',
    },
    {
      id: 'type',
      label: s.typeLabel ?? 'Type',
      getGroupKey: (project) =>
        typeof project.customData?.type === 'string' ? project.customData.type : undefined,
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (key, projects) => {
        const first = projects.find((p) => typeof p.customData?.typeName === 'string');
        const heading = first?.customData?.typeName;
        return typeof heading === 'string' && heading.length > 0 ? heading : key;
      },
      unknownSectionHeading: s.typeUnknownSectionHeading ?? 'Unknown type',
    },
  ];
}

/**
 * Convenience: the four built-in groupings with English labels. Suitable for stories, tests, and
 * consumers that don't need localization. Production consumers usually call
 * {@link makeBuiltInGroupings} with a strings object built from the platform's `%projectSelector_*%`
 * localization keys.
 */
export const defaultGroupings: readonly ProjectSelectorGrouping[] = makeBuiltInGroupings();

/** Localization inputs for {@link makeSelectionGrouping}. All fields optional. */
export type SelectionGroupingStrings = {
  label?: string;
  selectedSectionHeading?: string;
  unselectedSectionHeading?: string;
};

/**
 * Build the built-in `'selection'` grouping. Meant for `project-multi` mode: partitions rows into
 * "Selected" (rows.isSelected === true) and "Unselected", with Selected on top.
 * `partitionByGrouping` recognizes the reserved id `'selection'` and does the split off
 * `row.isSelected`; `getGroupKey` on this object is never called.
 *
 * Append it to a `makeBuiltInGroupings(...)` result to expose it in the grouping menu, e.g.:
 *
 * ```ts
 * const groupings = useMemo(
 *   () => [...makeBuiltInGroupings(strings), makeSelectionGrouping(strings)],
 *   [strings],
 * );
 * ```
 */
export function makeSelectionGrouping(strings?: SelectionGroupingStrings): ProjectSelectorGrouping {
  const s = strings ?? {};
  return {
    id: 'selection',
    label: s.label ?? 'Selection',
    getSectionHeading: (key) =>
      key === 'selected'
        ? (s.selectedSectionHeading ?? 'Selected')
        : (s.unselectedSectionHeading ?? 'Unselected'),
  };
}
