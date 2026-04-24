import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useEffect, useState } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  MARKER_SETTINGS_STRING_KEYS,
  MarkerSettingsDialog,
  MarkerSettingsDialogProps,
  MarkerSettingsLocalizedStrings,
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
  '%markersChecklist_settings_markerFilterLabel%': 'Markers to be displayed (blank for all)',
  '%markersChecklist_settings_ok%': 'OK',
  '%markersChecklist_settings_cancel%': 'Cancel',
  '%markersChecklist_settings_validationErrorTitle%': 'Invalid marker mappings',
  '%markersChecklist_settings_validationErrorDescription%':
    'Equivalent markers need to be entered in the form: p/q',
  '%markersChecklist_settings_validationErrorOk%': 'OK',
  '%markersChecklist_settings_close%': 'Close',
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

const meta: Meta<typeof MarkerSettingsDialog> = {
  title: 'Bundled Extensions/platform-scripture/MarkerSettingsDialog',
  component: MarkerSettingsDialog,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStringsForStories, false],
    initialEquivalentMarkers: '',
    initialMarkerFilter: '',
  },
  argTypes: {
    open: { control: 'boolean' },
  },
};
export default meta;

type Story = StoryObj<typeof MarkerSettingsDialog>;

/**
 * Default — closed dialog. Flip the `open` arg in Storybook controls to preview the opened state,
 * or pick one of the explicit variants below.
 */
export const Default: Story = {
  args: {
    open: false,
  },
};

/** Dialog open with empty default values — matches the "Default State Wireframe". */
export const Open: Story = {
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

/** Alias for `Open` — kept as an explicit variant because it maps 1:1 to the first-run scenario. */
export const OpenEmpty: Story = {
  args: {
    open: true,
    initialEquivalentMarkers: '',
    initialMarkerFilter: '',
  },
};

/**
 * Dialog open with an invalid equivalent-markers value. A decorator pre-seeds the input and
 * dispatches a click on the OK button after the dialog mounts, so the blocking `AlertDialog` (the
 * validation-error "alertdialog"-role modal) renders on first paint — matching the "Validation
 * Error State Wireframe".
 */
function ValidationErrorDecorator(props: MarkerSettingsDialogProps) {
  // Mounts the dialog in the open state with an invalid value, then auto-clicks OK so the
  // validation alert appears. Uses DOM lookups rather than refs because the stories file is not
  // allowed to import PAPI and the dialog is portaled into `document.body`.
  const [open, setOpen] = useState<boolean>(true);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const okButton = document.querySelector<HTMLButtonElement>(
        'button[data-testid="marker-settings-ok"]',
      );
      okButton?.click();
    }, 100);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <MarkerSettingsDialog
      {...props}
      open={open}
      onCancel={() => setOpen(false)}
      onSubmit={() => setOpen(false)}
    />
  );
}

export const ValidationError: Story = {
  args: {
    open: true,
    initialEquivalentMarkers: 'p',
    initialMarkerFilter: '',
  },
  render: (args) => <ValidationErrorDecorator {...args} />,
};
