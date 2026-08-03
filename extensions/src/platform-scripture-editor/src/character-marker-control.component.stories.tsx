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

/**
 * Drives the control from real state so the story exercises the same wiring the app does, rather
 * than a set of static args.
 */
function StatefulHarness({
  initialMarker,
  isMixed = false,
  isSyncBlocked = false,
  hasMarkers = true,
}: {
  initialMarker?: string;
  isMixed?: boolean;
  isSyncBlocked?: boolean;
  hasMarkers?: boolean;
}) {
  const [appliedMarker, setAppliedMarker] = useState(initialMarker);
  const [openCount, setOpenCount] = useState(0);

  const items: MarkerMenuItem[] = hasMarkers
    ? [
        {
          marker: 'bd',
          title: 'Bold',
          selectionState: appliedMarker === 'bd' ? 'all' : 'none',
          action: () => setAppliedMarker('bd'),
        },
        {
          marker: 'nd',
          title: 'Name of God',
          selectionState: appliedMarker === 'nd' ? 'partial' : 'none',
          action: () => setAppliedMarker('nd'),
        },
        {
          marker: 'it',
          title: 'Italic',
          selectionState: 'none',
          action: () => setAppliedMarker('it'),
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

export const MarkerApplied: Story = { args: { initialMarker: 'bd' } };

export const MixedSelection: Story = { args: { initialMarker: 'bd', isMixed: true } };

export const SyncBlocked: Story = { args: { isSyncBlocked: true } };

export const NoMarkersAvailable: Story = { args: { hasMarkers: false } };
