import type { ProjectSelectorGrouping } from './project-selector.rows';

/**
 * The platform-level localization keys that back every shared ProjectSelector string. Consumers
 * pass this list to `useLocalizedStrings` to fetch them all in one go, then feed the resolved
 * strings into `buildProjectSelectorLocalizedStrings` and (for the built-in groupings)
 * {@link makeBuiltInGroupings}.
 *
 * Consumer-specific strings (per-picker `ariaLabel` and `buttonPlaceholder`) are NOT in this list —
 * those are picker-role copy and should be resolved from the consumer's own l10n keys and merged in
 * on top.
 */
export const PROJECT_SELECTOR_STRING_KEYS = [
  '%projectSelector_searchPlaceholder%',
  '%projectSelector_commandEmptyMessage%',
  '%projectSelector_groupByAriaLabel%',
  '%projectSelector_groupSectionLabel%',
  '%projectSelector_groupByNone%',
  '%projectSelector_openTabsSectionHeading%',
  '%projectSelector_otherProjectsSectionHeading%',
  '%projectSelector_boundButClosedTooltip%',
  '%projectSelector_openButtonLabel%',
  '%projectSelector_clearAll%',
  '%projectSelector_grouping_openTabs_label%',
  '%projectSelector_grouping_lastUsed_label%',
  '%projectSelector_grouping_lastUsed_recentSectionHeading%',
  '%projectSelector_grouping_lastUsed_otherSectionHeading%',
  '%projectSelector_grouping_language_label%',
  '%projectSelector_grouping_language_unknownSectionHeading%',
  '%projectSelector_grouping_type_label%',
  '%projectSelector_grouping_type_unknownSectionHeading%',
  '%projectSelector_grouping_selection_label%',
  '%projectSelector_grouping_selection_selectedSectionHeading%',
  '%projectSelector_grouping_selection_unselectedSectionHeading%',
] as const;

/** The union of {@link PROJECT_SELECTOR_STRING_KEYS} entries. */
export type ProjectSelectorLocalizedStringKey = (typeof PROJECT_SELECTOR_STRING_KEYS)[number];

/** A map from every {@link ProjectSelectorLocalizedStringKey} to its resolved localized value. */
export type ProjectSelectorResolvedStrings = Readonly<
  Record<ProjectSelectorLocalizedStringKey, string>
>;

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

// Internal bucket keys — never rendered, so they are not localized. The user-visible strings are
// `lastUsedRecentSectionHeading` and `lastUsedOtherSectionHeading`, which are.
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
 *
 * These built-ins are a convenience layer, not a privileged one. They return ordinary
 * `ProjectSelectorGrouping` objects — exactly what a consumer-defined grouping is. A consumer that
 * wants different labels, different bucketing, or a different axis entirely constructs its own
 * descriptor and never calls this function. The central `%projectSelector_grouping_*%` keys exist
 * so the common case does not re-translate "Language" in every extension; they are not a
 * restriction on what a grouping can be.
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

/**
 * Convert the raw `%projectSelector_*%` resolved strings into the labels + section-heading strings
 * that {@link makeBuiltInGroupings} accepts. Pair with `buildProjectSelectorLocalizedStrings`
 * to wire the whole picker from a single {@link PROJECT_SELECTOR_STRING_KEYS} call.
 */
export function buildBuiltInGroupingStrings(
  strings: ProjectSelectorResolvedStrings,
): BuiltInGroupingStrings {
  return {
    openTabsLabel: strings['%projectSelector_grouping_openTabs_label%'],
    lastUsedLabel: strings['%projectSelector_grouping_lastUsed_label%'],
    lastUsedRecentSectionHeading:
      strings['%projectSelector_grouping_lastUsed_recentSectionHeading%'],
    lastUsedOtherSectionHeading: strings['%projectSelector_grouping_lastUsed_otherSectionHeading%'],
    languageLabel: strings['%projectSelector_grouping_language_label%'],
    languageUnknownSectionHeading:
      strings['%projectSelector_grouping_language_unknownSectionHeading%'],
    typeLabel: strings['%projectSelector_grouping_type_label%'],
    typeUnknownSectionHeading: strings['%projectSelector_grouping_type_unknownSectionHeading%'],
  };
}

/**
 * Convert the raw `%projectSelector_*%` resolved strings into the labels + section-heading strings
 * that {@link makeSelectionGrouping} accepts. Pair with `buildProjectSelectorLocalizedStrings`
 * to wire the multi-select "Selection" grouping from the same {@link PROJECT_SELECTOR_STRING_KEYS}
 * call.
 */
export function buildSelectionGroupingStrings(
  strings: ProjectSelectorResolvedStrings,
): SelectionGroupingStrings {
  return {
    label: strings['%projectSelector_grouping_selection_label%'],
    selectedSectionHeading: strings['%projectSelector_grouping_selection_selectedSectionHeading%'],
    unselectedSectionHeading:
      strings['%projectSelector_grouping_selection_unselectedSectionHeading%'],
  };
}
