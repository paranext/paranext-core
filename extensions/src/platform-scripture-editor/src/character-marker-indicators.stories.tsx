import { Editorial, getDefaultViewOptions } from '@eten-tech-foundation/platform-editor';
import { USJ_TYPE, USJ_VERSION, type Usj } from '@eten-tech-foundation/scripture-utilities';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
// The demo editor's stylesheet stands in for the web view's, which Storybook does not load.
/* eslint-disable import/no-relative-packages -- the demo editor stylesheet is not part of
   platform-bible-react's package exports, so it can only be pulled in by relative path, as
   model-text-panel.stories.tsx does. */
import '../../../../lib/platform-bible-react/src/components/demo/scripture-editor/scripture-editor.stories.css';
/* eslint-enable import/no-relative-packages */
// The production Simple-mode rules, not a copy.
import './_simple-mode.scss';
import {
  CHARACTER_MARKER_INDICATORS_CLASS,
  getSimpleModeRootClassNames,
} from './platform-scripture-editor.utils';

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

type LineStyle = 'underline' | 'underline overline';

type CharacterMarkerIndicatorsProps = {
  /** Whether the text can be typed into; the indicator is on only when it can. */
  isTextEditable: boolean;
  /** The hover line: `underline` ships, and `underline overline` is the alternative. */
  lineStyle: LineStyle;
};

/**
 * The real Scripture editor with the Simple-mode rules from `_simple-mode.scss`. Hover a tinted
 * word: the line appears after half a second.
 */
function CharacterMarkerIndicators({ isTextEditable, lineStyle }: CharacterMarkerIndicatorsProps) {
  return (
    <div
      className={getSimpleModeRootClassNames({
        isPowerMode: false,
        isInterfaceModeLoading: false,
        isDurablyReadOnly: !isTextEditable,
      }).join(' ')}
    >
      {lineStyle === 'underline overline' && (
        // Previews the one-word change in `_simple-mode.scss`. Same selector weight as the real
        // rule, so it wins by coming later. `\w` is the only invisible marker in this text.
        <style>{`.editor-container-simple.${CHARACTER_MARKER_INDICATORS_CLASS} .usfm_w { text-decoration-line: underline overline; }`}</style>
      )}
      <Editorial defaultUsj={GENESIS_11_USJ} scrRef={SCR_REF} options={EDITOR_OPTIONS} />
    </div>
  );
}

const meta: Meta<typeof CharacterMarkerIndicators> = {
  title: 'Bundled Extensions/platform-scripture-editor/CharacterMarkerIndicators',
  component: CharacterMarkerIndicators,
  tags: ['autodocs'],
  args: { isTextEditable: true, lineStyle: 'underline' },
  argTypes: {
    lineStyle: { control: 'inline-radio', options: ['underline', 'underline overline'] },
  },
  // The editor mounts asynchronously, so a snapshot can catch it half-drawn.
  parameters: { chromatic: { disableSnapshot: true } },
};
export default meta;

type Story = StoryObj<typeof CharacterMarkerIndicators>;

/** What Simple shows on text the user can type into: `\w` is tinted, `\nd` and `\bd` are not. */
export const Default: Story = {};

/** The alternative hover line: underline plus overline. */
export const UnderlinePlusOverline: Story = { args: { lineStyle: 'underline overline' } };

/** Text that cannot be typed into: no tint and no hover line. Power mode looks the same. */
export const ReadOnly: Story = { args: { isTextEditable: false } };
