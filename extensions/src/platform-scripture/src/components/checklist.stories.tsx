import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useMemo, useState } from 'react';
import { Button } from 'platform-bible-react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  CHECKLIST_STORY_COLUMN_PROJECT_FULL_NAMES,
  CHECKLIST_STORY_DATA_DEFAULT,
  CHECKLIST_STORY_DATA_EMPTY,
  CHECKLIST_STORY_DATA_HIDE_MATCHES,
  CHECKLIST_STORY_DATA_MULTI_COLUMN,
  CHECKLIST_STORY_DATA_SHOW_VERSE_TEXT,
  CHECKLIST_STORY_DATA_TRUNCATED,
} from '../data/checklist.story-data';
import { ChecklistTool } from './checklist.component';
import {
  CHECKLIST_STRING_KEYS,
  ChecklistLocalizedStrings,
  ChecklistToolProps,
} from './checklist.types';

/**
 * Simple Button placeholder for the `*Selector` slots. The real wiring (`checklist.web-view.tsx`)
 * passes `<ProjectSelector ... />` / `<ScopeSelector variant="dropdown" ... />` ReactNodes; the
 * stories use these stand-ins so the visual review focuses on the data path rather than the picker
 * internals (which have their own stories under Advanced/).
 */
function sampleTrigger(label: string) {
  return (
    <Button variant="outline" className="tw:h-8" onClick={() => undefined}>
      {label}
    </Button>
  );
}

/**
 * English fallbacks for every localization key the component declares. The `.storybook`
 * localization utility fills in any keys that already live in
 * `extensions/src/platform-scripture/contributions/localizedStrings.json`; the rest surface these
 * design-phase defaults so the Storybook review is readable without contributing new keys first.
 */
const englishFallbacks: ChecklistLocalizedStrings = {
  '%markersChecklist_toolbar_primaryProject%': 'Select primary Scripture text',
  '%markersChecklist_toolbar_comparativeTexts%': 'Select comparative texts',
  '%markersChecklist_toolbar_verseRange%': 'Select verse range',
  '%markersChecklist_toolbar_copy%': 'Copy',
  '%markersChecklist_toolbar_view%': 'View',
  '%markersChecklist_toolbar_hideMatches%': 'Hide Matches',
  '%markersChecklist_toolbar_showVerseText%': 'Show Verse Text',
  '%markersChecklist_toolbar_aria%': 'Markers Checklist toolbar',
  '%markersChecklist_matches_omitted%': '{count} Matches Omitted',
  '%markersChecklist_table_aria%': 'Markers checklist',
  '%markersChecklist_noResults%': 'No markers found.',
  '%markersChecklist_helptext%':
    'Use the toolbar to change the primary project, pick comparative texts, or narrow the verse range.',
  '%markersChecklist_emptyResult_identicalMarkers%': 'Comparative texts have identical markers.',
  '%markersChecklist_errorTitle%': "Couldn't load checklist",
  '%markersChecklist_errorRetry%': 'Retry',
  '%markersChecklist_alert_dismiss%': 'Dismiss',
  '%markersChecklist_edit%': 'edit',
  '%markersChecklist_edit_aria%': 'Edit {ref}',
  '%markersChecklist_goto_aria%': 'Goto {ref}',
  '%markersChecklist_columnHeader_aria%': 'Project: {name}',
};

// Resolve localization keys from the repo's locale files, then overlay the English design-phase
// fallbacks for keys that haven't been contributed yet. Mirrors the `marker-settings-dialog`
// stories pattern.
const resolvedLocalizedStrings = getLocalizedStrings([...CHECKLIST_STRING_KEYS]);

const localizedStringsForStories: ChecklistLocalizedStrings =
  CHECKLIST_STRING_KEYS.reduce<ChecklistLocalizedStrings>((accumulator, key) => {
    const resolved = resolvedLocalizedStrings[key];
    const useResolved = resolved !== undefined && resolved !== key;
    accumulator[key] = useResolved ? resolved : englishFallbacks[key];
    return accumulator;
  }, {});

// UX-2 finding #1 (WP3): the inner TabToolbar was removed, so the `ChecklistTool`
// no longer accepts `projectMenuData` / `onSelectProjectMenuItem`. The outer
// Platform.Bible tab chrome's hamburger hosts the menu items via WebViewMenu
// contributions (see WP6). The stories therefore no longer need a stub menu.

const baseArgs: Partial<ChecklistToolProps> = {
  localizedStringsWithLoadingState: [localizedStringsForStories, false],
  primaryProjectSelector: sampleTrigger('TSTGM001'),
  comparativeTextsSelector: sampleTrigger('None'),
  verseRangeSelector: sampleTrigger('Whole Bible'),
  hideMatches: false,
  showVerseText: false,
  isLoading: false,
  error: undefined,
  helpText: undefined,
  matchCountLabel: undefined,
  columnProjectFullNames: CHECKLIST_STORY_COLUMN_PROJECT_FULL_NAMES,
};

/**
 * Storybook decorator that wires the toolbar toggles to live state AND applies the hide-matches
 * filter to the data so the story is interactive (per Sebastian PR #2219 #3137366113: "The
 * Checklist Tool story is too static. ... 'hide matches' does unexpectedly not change anything and
 * does not show/hide the omitted count").
 *
 * Project / comparative-text / scope selectors are simple `<Button>` placeholders here (see
 * `sampleTrigger` above) because the real `ProjectSelector` / `ScopeSelector` from PRs #2223 /
 * #2212 require their own data wiring that's out of scope for this presentational storybook. The
 * live web-view (`checklist.web-view.tsx`) passes the real ReactNodes via the same `*Selector`
 * props.
 */
function InteractiveChecklistTool({
  hideMatches: initialHideMatches,
  showVerseText: initialShowVerseText,
  data: incomingData,
  matchCountLabel: incomingMatchCountLabel,
  localizedStringsWithLoadingState,
  onHideMatchesChange,
  onShowVerseTextChange,
  ...rest
}: ChecklistToolProps) {
  const [hideMatches, setHideMatches] = useState(initialHideMatches);
  const [showVerseText, setShowVerseText] = useState(initialShowVerseText);

  // Apply the same hide-matches filter the wiring layer applies — when toggled on, drop rows
  // marked `isMatch: true` and count them as "omitted". Stories that supply their own
  // `excludedCount` (e.g. the static HideMatches fixture) get that count added on top so the
  // demo behaves consistently regardless of which fixture is loaded.
  const visibleData = useMemo(() => {
    if (!incomingData) return incomingData;
    if (!hideMatches) return incomingData;
    const includedRows = incomingData.rows.filter((r) => !r.isMatch);
    const filteredOut = incomingData.rows.length - includedRows.length;
    return {
      ...incomingData,
      rows: includedRows,
      excludedCount: (incomingData.excludedCount ?? 0) + filteredOut,
    };
  }, [incomingData, hideMatches]);

  // Compute a live match-count label when hide-matches is on. Use the localized template if
  // available; fall back to a plain English string so unlocalized story runs are still readable.
  const liveMatchCountLabel = useMemo(() => {
    if (!hideMatches) return undefined;
    const excluded = visibleData?.excludedCount ?? 0;
    if (excluded <= 0) return undefined;
    const [stringsMap] = localizedStringsWithLoadingState ?? [{}, false];
    const template =
      stringsMap?.['%markersChecklist_matches_omitted%'] ?? '{count} Matches Omitted';
    return template.replace('{count}', String(excluded));
  }, [hideMatches, visibleData, localizedStringsWithLoadingState]);

  return (
    <div style={{ height: '90vh' }}>
      <ChecklistTool
        {...rest}
        data={visibleData}
        localizedStringsWithLoadingState={localizedStringsWithLoadingState}
        matchCountLabel={liveMatchCountLabel ?? incomingMatchCountLabel}
        hideMatches={hideMatches}
        onHideMatchesChange={(next) => {
          setHideMatches(next);
          onHideMatchesChange?.(next);
        }}
        showVerseText={showVerseText}
        onShowVerseTextChange={(next) => {
          setShowVerseText(next);
          onShowVerseTextChange?.(next);
        }}
      />
    </div>
  );
}

const meta: Meta<typeof ChecklistTool> = {
  title: 'Bundled Extensions/platform-scripture/ChecklistTool',
  component: ChecklistTool,
  tags: ['autodocs'],
  args: baseArgs,
  argTypes: {
    isLoading: { control: 'boolean' },
    hideMatches: { control: 'boolean' },
    showVerseText: { control: 'boolean' },
  },
  render: (args) => <InteractiveChecklistTool {...args} />,
};
export default meta;

type Story = StoryObj<typeof ChecklistTool>;

/**
 * Default state — a single primary-project column with three marker rows. Derived from
 * `gm-001-single-project-markers/expected-output.json`. No comparative texts → the Hide Matches
 * checkbox item is absent from the View dropdown per BHV-300.
 */
export const Default: Story = {
  args: {
    data: CHECKLIST_STORY_DATA_DEFAULT,
    primaryProjectSelector: sampleTrigger('TSTGM001'),
    comparativeTextsSelector: sampleTrigger('None'),
    verseRangeSelector: sampleTrigger('Whole Bible'),
  },
};

/**
 * Multi-column comparison — primary + two comparative texts with difference rows visible. Derived
 * from `gm-003-different-markers-comparison/expected-output.json`. The Hide Matches checkbox item
 * becomes visible in the View dropdown because `comparativeTexts.length > 0`.
 */
export const MultiColumn: Story = {
  args: {
    data: CHECKLIST_STORY_DATA_MULTI_COLUMN,
    primaryProjectSelector: sampleTrigger('TSTGM003A'),
    comparativeTextsSelector: sampleTrigger('2 selected'),
    verseRangeSelector: sampleTrigger('EXO 20:1 - EXO 20:5'),
  },
};

/**
 * Hide Matches on — matching rows excluded, `matchCountLabel` shown as a live region. Derived from
 * `gm-004-hide-matches-filtering/expected-output.json`. Demonstrates BHV-303 and BHV-314 together.
 */
export const HideMatches: Story = {
  args: {
    data: CHECKLIST_STORY_DATA_HIDE_MATCHES,
    primaryProjectSelector: sampleTrigger('TSTGM004A'),
    comparativeTextsSelector: sampleTrigger('1 selected'),
    verseRangeSelector: sampleTrigger('EXO 20:1 - EXO 20:5'),
    hideMatches: true,
    matchCountLabel: '12 Matches Omitted',
  },
};

/**
 * Loading state — `isLoading=true` while data is undefined. The `DataTable` component renders
 * skeleton rows internally; the table wrapper is `aria-busy`.
 */
export const Loading: Story = {
  args: {
    data: undefined,
    isLoading: true,
    primaryProjectSelector: sampleTrigger('TSTGM001'),
    comparativeTextsSelector: sampleTrigger('None'),
    verseRangeSelector: sampleTrigger('Whole Bible'),
  },
};

/**
 * Empty result — `rows` is empty and the backend emitted the BHV-600 "Comparative texts have
 * identical markers." message. Derived from
 * `gm-002-identical-markers-message/expected-output.json`. The DataTable's `noResultsMessage`
 * displays the localized identical-markers copy.
 */
export const Empty: Story = {
  args: {
    data: CHECKLIST_STORY_DATA_EMPTY,
    primaryProjectSelector: sampleTrigger('TSTGM002A'),
    comparativeTextsSelector: sampleTrigger('1 selected'),
    verseRangeSelector: sampleTrigger('Whole Bible'),
    helpText: undefined,
  },
};

/**
 * Error state — the backend rejected the `buildChecklistData` call. The component renders a shadcn
 * `Alert variant="destructive"` between the toolbar row and the `DataTable` with a Retry action.
 * Per `ui-state-contracts.md` T-R-2, the error banner suppresses the helptext banner until the next
 * successful refresh.
 */
export const Error: Story = {
  args: {
    data: undefined,
    error: 'Failed to build checklist: project data provider returned INVALID_SOURCE.',
    primaryProjectSelector: sampleTrigger('TSTGM001'),
    comparativeTextsSelector: sampleTrigger('None'),
    verseRangeSelector: sampleTrigger('Whole Bible'),
  },
};

/**
 * Show Verse Text on — demonstrates BHV-604 (character styles shown in parentheses) against data
 * derived from `gm-016-show-verse-text-char-styles/expected-output.json`. Includes two columns with
 * `em` character-style spans.
 */
export const ShowVerseText: Story = {
  args: {
    data: CHECKLIST_STORY_DATA_SHOW_VERSE_TEXT,
    primaryProjectSelector: sampleTrigger('TSTGM016A'),
    comparativeTextsSelector: sampleTrigger('1 selected'),
    verseRangeSelector: sampleTrigger('EXO 20:1 - EXO 20:5'),
    showVerseText: true,
  },
};

/**
 * Max-rows truncation (INV-012). Demonstrates the helptext banner carrying the truncation warning —
 * the wiring layer chooses the copy; stories illustrate the destination Alert slot.
 */
export const TruncatedMaxRows: Story = {
  args: {
    data: CHECKLIST_STORY_DATA_TRUNCATED,
    primaryProjectSelector: sampleTrigger('TSTGM001'),
    comparativeTextsSelector: sampleTrigger('None'),
    verseRangeSelector: sampleTrigger('Whole Bible'),
    helpText:
      'Too many items to display; showing the first 5000. Please check a smaller range of books at a time in order to see all items.',
  },
};
