import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { MARKER_MENU_STRING_KEYS, MarkerMenuItem } from 'platform-bible-react';
import type React from 'react';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../.storybook/localization.utils';
import {
  CHARACTER_MARKER_CONTROL_STRING_KEYS,
  CharacterMarkerControl,
  CharacterMarkerToolbar,
} from '../character-marker-control.component';
import { CharacterMarkerBarOverlay } from './character-marker-bar-overlay.component';

const STRINGS = getLocalizedStrings([
  ...CHARACTER_MARKER_CONTROL_STRING_KEYS,
  ...MARKER_MENU_STRING_KEYS,
]);

// Mirrors the reserved gutter from _simple-mode.scss so the story shows the real geometry: the bar
// occupies space the text column has given up, never space the text is using.
const MOCK_EDITOR_STYLE: React.CSSProperties = {
  border: '1px solid var(--border)',
  borderRadius: '4px',
  height: '260px',
  overflowY: 'auto',
  padding: '15px 10px',
  paddingInlineEnd: '5em',
  fontFamily: 'serif',
  lineHeight: 1.8,
};

/** Drives the real control from real state, so the story exercises the app's wiring. */
function BarHarness() {
  const [appliedMarker, setAppliedMarker] = useState<string | undefined>(undefined);

  const items: MarkerMenuItem[] = [
    { marker: 'bd', title: 'Bold', selectionState: 'none', action: () => setAppliedMarker('bd') },
    { marker: 'it', title: 'Italic', selectionState: 'none', action: () => setAppliedMarker('it') },
    {
      marker: 'nd',
      title: 'Name of God',
      selectionState: 'none',
      action: () => setAppliedMarker('nd'),
    },
  ];

  return (
    <CharacterMarkerToolbar className="tw:m-1">
      <CharacterMarkerControl
        currentMarker={appliedMarker}
        isMixed={false}
        isSyncBlocked={false}
        markerMenuItems={items}
        onOpen={() => {}}
        onClose={() => {}}
        localizedStrings={STRINGS}
        className="tw:h-8 tw:px-2"
      />
    </CharacterMarkerToolbar>
  );
}

/**
 * Pins the character-marker bar to the inline-end edge of the text column, tracking the line the
 * caret is on.
 *
 * **Try it**: click into any line — the bar moves to that line. Scroll the box — the bar follows
 * its line and pins to the top edge once the line scrolls out of view. Switch the story to RTL to
 * see the bar mirror to the other side with no code change, because placement is
 * `inset-inline-end`.
 */
const meta: Meta<typeof CharacterMarkerBarOverlay> = {
  title: 'Bundled Extensions/platform-scripture-editor/CharacterMarkerBarOverlay',
  component: CharacterMarkerBarOverlay,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CharacterMarkerBarOverlay>;

const PARA_STYLE: React.CSSProperties = { margin: '2px 0' };
const INDENT1_STYLE: React.CSSProperties = { margin: '2px 0 2px 2em' };
const INDENT2_STYLE: React.CSSProperties = { margin: '2px 0 2px 4em' };

const editorContent = (
  // contentEditable so clicking places a real caret, which is what the bar tracks.
  <div className="editor-input usfm" contentEditable suppressContentEditableWarning>
    <p className="para usfm_p" style={PARA_STYLE}>
      The LORD is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me
      beside still waters. He restores my soul.
    </p>
    <p className="para usfm_q1" style={INDENT1_STYLE}>
      He leads me in paths of righteousness for his name&rsquo;s sake.
    </p>
    <p className="para usfm_q2" style={INDENT2_STYLE}>
      Even though I walk through the valley of the shadow of death, I will fear no evil.
    </p>
    <p className="para usfm_p" style={PARA_STYLE}>
      Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the
      house of the LORD forever.
    </p>
  </div>
);

/** Click a line to move the bar to it; scroll to watch it track and clamp. */
export const Default: Story = {
  render: () => (
    <div style={MOCK_EDITOR_STYLE}>
      <CharacterMarkerBarOverlay bar={<BarHarness />}>{editorContent}</CharacterMarkerBarOverlay>
    </div>
  ),
};

/**
 * The same story with `dir="rtl"`. The bar mirrors to the other edge with no code change — the only
 * horizontal placement in this feature is `inset-inline-end: 0`.
 */
export const RightToLeft: Story = {
  render: () => (
    <div dir="rtl" style={MOCK_EDITOR_STYLE}>
      <CharacterMarkerBarOverlay bar={<BarHarness />}>{editorContent}</CharacterMarkerBarOverlay>
    </div>
  ),
};
