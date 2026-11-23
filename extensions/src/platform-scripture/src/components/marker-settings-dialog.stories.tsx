import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  MARKER_SETTINGS_STRING_KEYS,
  MarkerSettingsDialog,
  MarkerSettingsLocalizedStrings,
  type MarkerSettingsValidate,
} from './marker-settings-dialog.component';

/**
 * English fallbacks for the localization keys this component declares. Storybook's
 * `getLocalizedStrings` helper only fills keys that exist in the repo's localization JSON; the new
 * settings keys don't exist yet, so these defaults surface the intended design-phase copy (and they
 * also match what PT9's `MarkerSettingsForm` showed).
 */
const englishFallbacks: MarkerSettingsLocalizedStrings = {
  '%markersChecklist_settings_title%': 'Marker Settings',
  '%markersChecklist_settings_description%':
    'Configure equivalent marker mappings and the marker filter for the Markers checklist.',
  '%markersChecklist_settings_equivalentMarkersLabel%': 'Equivalent marker mappings',
  '%markersChecklist_settings_equivalentMarkersHelp%':
    'If you consider certain markers to be equivalent when you hide matches, enter each pair of equivalent markers separated by the / character. Separate pairs with a space.\nFor example, the mapping q/q1 means that you consider \\q in first text equivalent to \\q1 in the second (comparative) text.',
  '%markersChecklist_settings_markerFilterLabel%': 'Markers to be displayed (blank for all)',
  '%markersChecklist_settings_markerFilterHelp%':
    'To display only certain markers, enter them without the backslash, separated by a space.\nFor example: To display only markers for poetic lines, enter:\nq q1 q2',
  '%markersChecklist_settings_ok%': 'Save',
  '%markersChecklist_settings_cancel%': 'Cancel',
  '%markersChecklist_errorInvalidMarkerPair%':
    'Equivalent markers need to be entered in the form: p/q',
  '%markersChecklist_settings_helpIconAriaLabel%': 'Help',
};

// Resolve localization keys for English. Any keys that aren't yet contributed to
// `contributions/localizedStrings.json` fall back to the key itself (the helper does that
// automatically); we overlay the `englishFallbacks` below to surface design-phase copy for those.
const resolvedLocalizedStrings = getLocalizedStrings([...MARKER_SETTINGS_STRING_KEYS]);

// Build the story-time strings by iterating over the declared keys — avoids a type-assertion cast
// of `Record<string, string>` into the partial `MarkerSettingsLocalizedStrings` shape.
const localizedStringsForStories: MarkerSettingsLocalizedStrings =
  MARKER_SETTINGS_STRING_KEYS.reduce<MarkerSettingsLocalizedStrings>((accumulator, key) => {
    const resolved = resolvedLocalizedStrings[key];
    // The helper returns the key verbatim when it isn't present in the localization JSON — in that
    // case, fall back to the English design-phase copy. Otherwise prefer the resolved value so any
    // future contribution to `localizedStrings.json` flows through unchanged.
    const useResolved = resolved !== undefined && resolved !== key;
    accumulator[key] = useResolved ? resolved : englishFallbacks[key];
    return accumulator;
  }, {});

/**
 * Story-time stand-in for the backend validate callback. Mirrors the regex-validation that the PT9
 * `MarkerSettingsForm` (and the C# `MarkersDataSource.ValidateMarkerSettings`) use: every non-empty
 * whitespace-separated token must contain exactly one `/` with both sides non-empty. Returns the
 * `MarkerSettingsValidationResult` shape the component expects.
 */
const storybookValidate: MarkerSettingsValidate = (equivalentMarkers) => {
  const tokens = equivalentMarkers.split(/\s+/).filter((token) => token.length > 0);
  const valid = tokens.every((token) => {
    const parts = token.split('/');
    return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0;
  });
  return {
    valid,
    parsedPairs: valid
      ? tokens.map((token) => {
          const [marker1, marker2] = token.split('/');
          return { marker1, marker2 };
        })
      : undefined,
    errorMessage: valid ? undefined : englishFallbacks['%markersChecklist_errorInvalidMarkerPair%'],
  };
};

const meta: Meta<typeof MarkerSettingsDialog> = {
  title: 'Bundled Extensions/platform-scripture/MarkerSettingsDialog',
  component: MarkerSettingsDialog,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStringsForStories, false],
    initialEquivalentMarkers: '',
    initialMarkerFilter: '',
    validate: storybookValidate,
  },
  argTypes: {
    open: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof MarkerSettingsDialog>;

/**
 * Default — dialog open with empty values. Matches the "Default State Wireframe". (Per Sebastian PR
 * #2219 #3137704709 "Reduce the number of stories. Default, empty and open are the same" — we keep
 * one Default story plus the meaningful variants below.)
 */
export const Default: Story = {
  args: {
    open: true,
    initialEquivalentMarkers: '',
    initialMarkerFilter: '',
  },
};

/**
 * Dialog open with pre-populated values from the strategic-plan example. Matches the "With Data
 * Entered Wireframe".
 */
export const OpenWithValues: Story = {
  args: {
    open: true,
    initialEquivalentMarkers: 'p/q rq/g',
    initialMarkerFilter: 'id ide toc1',
  },
};

/**
 * Dialog open with an invalid equivalent-markers value (a single-token "p" with no `/`). The inline
 * validation pattern picks this up after the debounce, marks the input invalid via `aria-invalid` +
 * `data-invalid`, surfaces the error message under the input, and disables the OK button. Replaces
 * the previous nested-AlertDialog flow per Sebastian PR #2219 #3138246720.
 */
export const ValidationError: Story = {
  args: {
    open: true,
    initialEquivalentMarkers: 'p',
    initialMarkerFilter: '',
  },
};
