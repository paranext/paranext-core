import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MARKER_MENU_STRING_KEYS } from 'platform-bible-react';
import type React from 'react';
import { useRef } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import { CHARACTER_MARKER_CONTROL_STRING_KEYS } from '../character-marker-control/character-marker-control.component';
import type { CharacterMarkerSelection } from '../character-marker-coverage.utils';
import { CharacterMarkerBar } from './character-marker-bar.component';

// Real `en` values, resolved from the contribution files — the control's keys and the menu's, since
// the bar hands one strings object down through both.
const STRINGS = getLocalizedStrings([
  ...CHARACTER_MARKER_CONTROL_STRING_KEYS,
  ...MARKER_MENU_STRING_KEYS,
]);

// Mirrors the reserved gutter from `_simple-mode.scss` so the bar is reviewed at the width it
// actually gets. The trigger is icon-only precisely because 64px fits its chrome with no slack, so
// reviewing it at any other width would not show what ships. Declared here for the same reason the
// stylesheet declares it on `.editor-container-simple`: the bar's own container reads the same
// custom property, so one declaration keeps the two in step.
const GUTTER_STYLE: React.CSSProperties & Record<'--psc-character-marker-bar-width', string> = {
  '--psc-character-marker-bar-width': '64px',
  width: '64px',
};

/** A collapsed caret — one json path, so the selection reads as not-mixed. */
const CARET: CharacterMarkerSelection = { start: { jsonPath: '$.content[0]' } };

/** A selection spanning two json paths, which the state hook's O(1) check reads as `(mixed)`. */
const SPANNING_SELECTION: CharacterMarkerSelection = {
  start: { jsonPath: '$.content[0]' },
  end: { jsonPath: '$.content[3]' },
};

/**
 * Renders the bar the way the editor web view does, in a container of the reserved gutter width.
 *
 * The editor ref is deliberately left empty: with no editor there is no USJ, so
 * `useCharacterMarkerState` degrades to `contextMarker` exactly as it does in the app when the
 * selection cannot be resolved. That is enough to exercise the trigger, the tooltip, and the whole
 * menu — the parts a reviewer needs to see — without standing up a live editor.
 */
function BarHarness({
  contextMarker,
  selection = CARET,
  isSyncBlocked = false,
  textDirection = 'ltr',
}: {
  contextMarker?: string;
  selection?: CharacterMarkerSelection;
  isSyncBlocked?: boolean;
  textDirection?: 'ltr' | 'rtl';
}) {
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);

  return (
    <div style={GUTTER_STYLE}>
      <CharacterMarkerBar
        editorRef={editorRef}
        getSelection={() => selection}
        blockMarker="p"
        contextMarker={contextMarker}
        isSyncBlocked={isSyncBlocked}
        textDirection={textDirection}
        localizedStrings={STRINGS}
      />
    </div>
  );
}

const meta: Meta<typeof BarHarness> = {
  title: 'Bundled Extensions/platform-scripture-editor/CharacterMarkerBar',
  component: BarHarness,
  tags: ['autodocs', 'test'],
};

export default meta;

type Story = StoryObj<typeof BarHarness>;

/** No character marker at the caret: the trigger reads `(none)` through its tooltip. */
export const NoMarkerApplied: Story = { args: {} };

/** A marker at the caret. The code and its localized name appear in the tooltip, never as a label. */
export const MarkerApplied: Story = { args: { contextMarker: 'bd' } };

/** A selection spanning more than one marker state. */
export const MixedSelection: Story = {
  args: { contextMarker: 'bd', selection: SPANNING_SELECTION },
};

/** Editing paused by an automatic Send/Receive: disabled, with the shipped sync-blocked wording. */
export const SyncBlocked: Story = { args: { contextMarker: 'bd', isSyncBlocked: true } };

/**
 * An RTL project. The menu is portaled to `document.body`, outside the only element this app gives
 * a `dir`, so the direction has to be handed down explicitly for `align="end"` to mirror — open the
 * menu to check it opens toward the text rather than off the panel edge.
 */
export const RightToLeft: Story = { args: { contextMarker: 'bd', textDirection: 'rtl' } };
