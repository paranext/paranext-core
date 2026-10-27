import { Editorial, getDefaultViewOptions } from '@eten-tech-foundation/platform-editor';
import { USJ_TYPE, USJ_VERSION, type Usj } from '@eten-tech-foundation/scripture-utilities';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, waitFor } from 'storybook/test';
// The demo editor's stylesheet stands in for the web view's, which Storybook does not load.
/* eslint-disable import/no-relative-packages -- the demo editor stylesheet is not part of
   platform-bible-react's package exports, so it can only be pulled in by relative path, as
   model-text-panel.stories.tsx does. */
import '../../../../lib/platform-bible-react/src/components/demo/scripture-editor/scripture-editor.stories.css';
/* eslint-enable import/no-relative-packages */
// The production Simple-mode rules, not a copy.
import './_simple-mode.scss';
import { getSimpleModeRootClassNames } from './platform-scripture-editor.utils';

/**
 * Genesis 11:26–29 with `\w` (no visible style) beside `\nd` (underlined) and `\bd` (bold), so the
 * tint can be compared with markers that must look unchanged.
 */
const GENESIS_11_USJ: Usj = {
  type: USJ_TYPE,
  version: USJ_VERSION,
  content: [
    { type: 'book', marker: 'id', code: 'GEN', content: [] },
    { type: 'chapter', marker: 'c', number: '11', sid: 'GEN 11' },
    {
      type: 'para',
      marker: 'p',
      content: [
        { type: 'verse', marker: 'v', number: '26', sid: 'GEN 11:26' },
        'After Terah was 70 years old, he became the father of ',
        { type: 'char', marker: 'w', content: ['Abram'] },
        ', Nahor, and Haran. ',
        { type: 'verse', marker: 'v', number: '27', sid: 'GEN 11:27' },
        'The ',
        { type: 'char', marker: 'nd', content: ['Lord'] },
        ' spoke to ',
        { type: 'char', marker: 'w', content: ['Abram'] },
        ' and said, “',
        { type: 'char', marker: 'bd', content: ['Leave your country'] },
        '.” ',
        { type: 'verse', marker: 'v', number: '28', sid: 'GEN 11:28' },
        'A marker inside a marker: ',
        {
          type: 'char',
          marker: 'w',
          content: ['outer ', { type: 'char', marker: 'w', content: ['inner'] }, ' outer'],
        },
        '.',
      ],
    },
  ],
};

const SCR_REF: SerializedVerseRef = { book: 'GEN', chapterNum: 11, verseNum: 26 };

// Stable identity: Editorial reconciles its whole config when `options` changes.
const EDITOR_OPTIONS = { isReadonly: true, hasExternalUI: true, view: getDefaultViewOptions() };

type CharacterMarkerIndicatorsProps = {
  /** Whether the text can be typed into; the indicator is on only when it can. */
  isTextEditable: boolean;
};

/**
 * The real Scripture editor with the Simple-mode rules from `_simple-mode.scss`. Hover a tinted
 * word: the line appears after half a second.
 */
function CharacterMarkerIndicators({ isTextEditable }: CharacterMarkerIndicatorsProps) {
  return (
    <div
      className={getSimpleModeRootClassNames({
        isPowerMode: false,
        isInterfaceModeLoading: false,
        isDurablyReadOnly: !isTextEditable,
      }).join(' ')}
    >
      <Editorial defaultUsj={GENESIS_11_USJ} scrRef={SCR_REF} options={EDITOR_OPTIONS} />
    </div>
  );
}

const meta: Meta<typeof CharacterMarkerIndicators> = {
  title: 'Bundled Extensions/platform-scripture-editor/CharacterMarkerIndicators',
  component: CharacterMarkerIndicators,
  tags: ['autodocs'],
  args: { isTextEditable: true },
  // The editor mounts asynchronously; wait for its text so a snapshot never catches it half-drawn.
  play: async ({ canvasElement }) => {
    await waitFor(() => expect(canvasElement.querySelector('.usfm_w')).not.toBeNull());
  },
};
export default meta;

type Story = StoryObj<typeof CharacterMarkerIndicators>;

/** What Simple shows on text the user can type into: `\w` is tinted, `\nd` and `\bd` are not. */
export const Default: Story = {};

/** Text that cannot be typed into: no tint and no hover line. Power mode looks the same. */
export const ReadOnly: Story = { args: { isTextEditable: false } };
