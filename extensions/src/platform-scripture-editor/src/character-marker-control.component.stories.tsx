import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MARKER_MENU_STRING_KEYS, MarkerMenuItem } from 'platform-bible-react';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../.storybook/localization.utils';
import {
  CHARACTER_MARKER_CONTROL_STRING_KEYS,
  CharacterMarkerControl,
  CharacterMarkerToolbar,
} from './character-marker-control.component';

// Real `en` values, resolved from the contribution files — the menu's own keys as well as the
// control's, since the control passes one strings object through to MarkerMenu.
const STRINGS = getLocalizedStrings([
  ...CHARACTER_MARKER_CONTROL_STRING_KEYS,
  ...MARKER_MENU_STRING_KEYS,
]);

type SelectionState = 'all' | 'partial' | 'none';

/** Every row starts uncovered until a story overrides it via `initialSelectionStates`. */
const DEFAULT_SELECTION_STATES: Record<string, SelectionState> = {
  bd: 'none',
  nd: 'none',
  it: 'none',
};

/**
 * Drives the control from real state so the story exercises the same wiring the app does, rather
 * than a set of static args.
 *
 * Each marker's `selectionState` is tracked independently (keyed by marker code) rather than
 * derived from a single "applied marker" value, so a story can render `all`, `partial`, and `none`
 * side by side — the three states describe per-marker coverage of the current selection, not a
 * single mutually-exclusive choice.
 */
function StatefulHarness({
  initialMarker,
  isMixed = false,
  isSyncBlocked = false,
  hasMarkers = true,
  initialSelectionStates,
}: {
  initialMarker?: string;
  isMixed?: boolean;
  isSyncBlocked?: boolean;
  hasMarkers?: boolean;
  initialSelectionStates?: Record<string, SelectionState>;
}) {
  const [appliedMarker, setAppliedMarker] = useState(initialMarker);
  const [openCount, setOpenCount] = useState(0);
  const [selectionStates, setSelectionStates] = useState<Record<string, SelectionState>>(
    initialSelectionStates ?? DEFAULT_SELECTION_STATES,
  );

  // Applying a marker to the whole selection makes that row `all` and clears the others — a
  // selection can only be fully covered by one marker at a time.
  const applyMarker = (marker: string) => {
    setAppliedMarker(marker);
    setSelectionStates((previous) =>
      Object.fromEntries(
        Object.keys(previous).map((key) => [key, key === marker ? 'all' : 'none']),
      ),
    );
  };

  const items: MarkerMenuItem[] = hasMarkers
    ? [
        {
          marker: 'bd',
          title: 'Bold',
          selectionState: selectionStates.bd ?? 'none',
          action: () => applyMarker('bd'),
        },
        {
          marker: 'nd',
          title: 'Name of God',
          selectionState: selectionStates.nd ?? 'none',
          action: () => applyMarker('nd'),
        },
        {
          marker: 'it',
          title: 'Italic',
          selectionState: selectionStates.it ?? 'none',
          action: () => applyMarker('it'),
        },
      ]
    : [];

  const labels: Record<string, string> = { bd: 'Bold', nd: 'Name of God', it: 'Italic' };

  return (
    <div className="tw:flex tw:flex-col tw:gap-2">
      <CharacterMarkerToolbar>
        <CharacterMarkerControl
          currentMarker={appliedMarker}
          currentMarkerLabel={appliedMarker ? labels[appliedMarker] : undefined}
          isMixed={isMixed}
          isSyncBlocked={isSyncBlocked}
          markerMenuItems={items}
          onOpen={() => setOpenCount((count) => count + 1)}
          onClose={() => {}}
          localizedStrings={STRINGS}
        />
      </CharacterMarkerToolbar>
      <p className="tw:text-xs tw:text-muted-foreground">Menu opened {openCount} time(s)</p>
    </div>
  );
}

const meta: Meta<typeof StatefulHarness> = {
  title: 'Bundled Extensions/platform-scripture-editor/CharacterMarkerControl',
  component: StatefulHarness,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof StatefulHarness>;

export const NoMarkerApplied: Story = { args: {} };

// The one story that shows all three tri-state glyphs at once on initial render: `bd` is fully
// applied (check), `nd` partially applied (dash), `it` unapplied (empty square).
export const MarkerApplied: Story = {
  args: {
    initialMarker: 'bd',
    initialSelectionStates: { bd: 'all', nd: 'partial', it: 'none' },
  },
};

export const MixedSelection: Story = {
  args: {
    initialMarker: 'bd',
    isMixed: true,
    initialSelectionStates: { bd: 'all', nd: 'none', it: 'none' },
  },
};

export const SyncBlocked: Story = { args: { isSyncBlocked: true } };

export const NoMarkersAvailable: Story = { args: { hasMarkers: false } };
