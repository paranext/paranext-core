import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';
import { getLocalizedStrings } from '../../../../../../.storybook/localization.utils';
import {
  MOCK_NOTE_DEFAULT,
  MOCK_NOTE_EMPTY,
  MOCK_NOTE_LONG,
} from '../../data/marble-form.story-data';
import {
  TempNoteRenderer,
  TEMP_NOTE_RENDERER_STRING_KEYS,
  type NoteData,
} from './temp-note-renderer.component';

const localizedStrings = getLocalizedStrings([...TEMP_NOTE_RENDERER_STRING_KEYS]);

const meta: Meta<typeof TempNoteRenderer> = {
  title: 'Temp/TempNoteRenderer',
  component: TempNoteRenderer,
  tags: ['autodocs'],
  args: {
    localizedStringsWithLoadingState: [localizedStrings, false],
  },
};
export default meta;

type Story = StoryObj<typeof TempNoteRenderer>;

type NoteVariantKey = 'default' | 'long' | 'empty' | 'crossRef';

// MOCK_NOTE_* are structurally compatible with NoteData (`MockNoteData` and `NoteData` mirror each
// other) - TypeScript accepts them via structural assignment so no `as` cast is needed.
const VARIANTS: Record<NoteVariantKey, NoteData> = {
  default: MOCK_NOTE_DEFAULT,
  long: MOCK_NOTE_LONG,
  empty: MOCK_NOTE_EMPTY,
  crossRef: {
    ...MOCK_NOTE_DEFAULT,
    callerType: 'cross-reference',
    callerMarker: 'x',
    body: 'See parallel passage in Psalm 33:6.',
  },
};

function isNoteVariantKey(value: string): value is NoteVariantKey {
  return value === 'default' || value === 'long' || value === 'empty' || value === 'crossRef';
}

/**
 * [Revised: 2026-04-29] Theme 4 — fully interactive default story. The pane is a pure data display,
 * so "interactivity" is exposing the variant switcher and a body-text editor that re-render the
 * NoteRenderer in real time. Reviewers can confirm caller-marker / caller-type / body text /
 * references all flow through the component without separate static stories.
 */
export const Default: Story = {
  parameters: { chromatic: { disableSnapshot: true } },
  render: function Render() {
    const [variant, setVariant] = useState<NoteVariantKey>('default');
    const [body, setBody] = useState(VARIANTS.default.body);

    const handleVariantChange = (next: NoteVariantKey) => {
      setVariant(next);
      setBody(VARIANTS[next].body);
    };

    const data: NoteData = { ...VARIANTS[variant], body };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <label style={{ fontSize: 12 }}>
            Variant:
            <select
              value={variant}
              onChange={(e) => {
                if (isNoteVariantKey(e.target.value)) handleVariantChange(e.target.value);
              }}
              style={{ marginLeft: 6 }}
            >
              <option value="default">Default footnote</option>
              <option value="long">Long footnote</option>
              <option value="empty">Empty body</option>
              <option value="crossRef">Cross-reference</option>
            </select>
          </label>
          <label style={{ fontSize: 12, flex: 1, display: 'flex', gap: 6 }}>
            Body:
            <input
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              style={{ flex: 1 }}
            />
          </label>
        </div>
        <TempNoteRenderer
          localizedStringsWithLoadingState={[localizedStrings, false]}
          data={data}
        />
      </div>
    );
  },
};

/** Long body — exercises wrapping; unreachable as a starting state from the interactive flow. */
export const LongFootnote: Story = {
  args: {
    data: MOCK_NOTE_LONG,
  },
};

/** Empty body — exercises the empty-body fallback; unreachable as initial state from interactive. */
export const Empty: Story = {
  args: {
    data: MOCK_NOTE_EMPTY,
  },
};
