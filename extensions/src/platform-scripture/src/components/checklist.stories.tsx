import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import type { Localized, MultiColumnMenu } from 'platform-bible-utils';
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
  '%markersChecklist_edit%': 'edit',
  '%markersChecklist_goto%': 'goto',
  '%markersChecklist_edit_aria%': 'Edit {ref}',
  '%markersChecklist_goto_aria%': 'Goto {ref}',
  '%markersChecklist_edit_disabled_tooltip%': 'Coming in a future release',
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

/**
 * A minimal localized `MultiColumnMenu` that shows a single `Settings…` item under an `export`
 * group. Mirrors the production menu contribution documented in `ui-alignment.md` — the real menu
 * data is supplied by the wiring phase via `useData(papi.menuData.dataProviderName).WebViewMenu`.
 */
const tabViewMenuData: Localized<MultiColumnMenu> = {
  columns: {
    'platformScripture.markersChecklist.view': {
      label: 'View',
      order: 1,
    },
    // The localized `MultiColumnMenu` requires the `isExtensible` discriminator on the index
    // signature — include it on the single column entry so the narrow shape typechecks.
    isExtensible: true,
  },
  groups: {
    'platformScripture.markersChecklist.export': {
      column: 'platformScripture.markersChecklist.view',
      order: 1,
    },
  },
  items: [
    {
      label: 'Settings...',
      localizeNotes: 'Opens the Marker Settings dialog',
      group: 'platformScripture.markersChecklist.export',
      order: 1,
      command: 'platformScripture.openMarkersChecklistSettings',
    },
  ],
};

const baseArgs: Partial<ChecklistToolProps> = {
  localizedStringsWithLoadingState: [localizedStringsForStories, false],
  primaryProjectLabel: 'TSTGM001',
  comparativeTextsLabel: 'None',
  verseRangeLabel: 'Whole Bible',
  hideMatches: false,
  showVerseText: false,
  isLoading: false,
  error: undefined,
  helpText: undefined,
  matchCountLabel: undefined,
  tabViewMenuData,
  columnProjectFullNames: CHECKLIST_STORY_COLUMN_PROJECT_FULL_NAMES,
  isEditLinkEnabled: false,
};

/**
 * Storybook decorator that wires local state for the three toolbar toggles so controls interact in
 * the playground. We DELIBERATELY do not wire the selector triggers to real popovers — the draft
 * PRs (#2223, #2212) provide those primitives, and the phase-3-ui-design-scope decision is to keep
 * the triggers abstract in this phase.
 */
function InteractiveChecklistTool({
  hideMatches: initialHideMatches,
  showVerseText: initialShowVerseText,
  onHideMatchesChange,
  onShowVerseTextChange,
  ...rest
}: ChecklistToolProps) {
  const [hideMatches, setHideMatches] = useState(initialHideMatches);
  const [showVerseText, setShowVerseText] = useState(initialShowVerseText);

  return (
    <div style={{ height: '90vh' }}>
      <ChecklistTool
        {...rest}
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
    primaryProjectLabel: 'TSTGM001',
    comparativeTextsLabel: 'None',
    verseRangeLabel: 'Whole Bible',
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
    primaryProjectLabel: 'TSTGM003A',
    comparativeTextsLabel: '2 selected',
    verseRangeLabel: 'EXO 20:1 - EXO 20:5',
  },
};

/**
 * Hide Matches on — matching rows excluded, `matchCountLabel` shown as a live region. Derived from
 * `gm-004-hide-matches-filtering/expected-output.json`. Demonstrates BHV-303 and BHV-314 together.
 */
export const HideMatches: Story = {
  args: {
    data: CHECKLIST_STORY_DATA_HIDE_MATCHES,
    primaryProjectLabel: 'TSTGM004A',
    comparativeTextsLabel: '1 selected',
    verseRangeLabel: 'EXO 20:1 - EXO 20:5',
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
    primaryProjectLabel: 'TSTGM001',
    comparativeTextsLabel: 'None',
    verseRangeLabel: 'Whole Bible',
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
    primaryProjectLabel: 'TSTGM002A',
    comparativeTextsLabel: '1 selected',
    verseRangeLabel: 'Whole Bible',
    helpText: undefined,
  },
};

/**
 * Error state — the backend rejected the `buildChecklistData` call. The component renders a shadcn
 * `Alert variant="destructive"` between the `TabToolbar` and the `DataTable` with a Retry action.
 * Per `ui-state-contracts.md` T-R-2, the error banner suppresses the helptext banner until the next
 * successful refresh.
 */
export const Error: Story = {
  args: {
    data: undefined,
    error: 'Failed to build checklist: project data provider returned INVALID_SOURCE.',
    primaryProjectLabel: 'TSTGM001',
    comparativeTextsLabel: 'None',
    verseRangeLabel: 'Whole Bible',
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
    primaryProjectLabel: 'TSTGM016A',
    comparativeTextsLabel: '1 selected',
    verseRangeLabel: 'EXO 20:1 - EXO 20:5',
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
    primaryProjectLabel: 'TSTGM001',
    comparativeTextsLabel: 'None',
    verseRangeLabel: 'Whole Bible',
    helpText:
      'Too many items to display; showing the first 5000. Please check a smaller range of books at a time in order to see all items.',
  },
};
