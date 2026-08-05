import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeltaOpInsertNoteEmbed } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import FootnoteEditor from '@/components/advanced/footnote-editor/footnote-editor.component';
import { FootnoteEditorLocalizedStrings } from '@/components/advanced/footnote-editor/footnote-editor.types';
import '@/components/demo/scripture-editor/usj-nodes.css';

const defaultScrRef: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

// Keys not provided fall back to displaying the key itself; acceptable for the story.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const localizedStrings = {} as FootnoteEditorLocalizedStrings;

const sampleNoteOps: Record<'footnote' | 'crossReference', DeltaOpInsertNoteEmbed[]> = {
  footnote: [
    {
      insert: {
        note: {
          caller: '+',
          style: 'f',
          contents: {
            ops: [
              { insert: '1.1 ', attributes: { char: { style: 'fr' } } },
              { insert: 'Or ', attributes: { char: { style: 'ft' } } },
              { insert: 'wind', attributes: { char: { style: 'fqa' } } },
            ],
          },
        },
      },
    },
  ],
  crossReference: [
    {
      insert: {
        note: {
          caller: '+',
          style: 'x',
          contents: {
            ops: [
              { insert: '1:1 ', attributes: { char: { style: 'xo' } } },
              { insert: 'Ps 33.6; Jn 1.1-3', attributes: { char: { style: 'xt' } } },
            ],
          },
        },
      },
    },
  ],
};

type StoryArgs = {
  /** Which sample note seeds the editor. */
  noteKind: 'footnote' | 'crossReference';
  /** Inline (pane-embedded) vs popover chrome. */
  inline: boolean;
};

function Template({ noteKind, inline }: StoryArgs) {
  return (
    <div className="tw:max-w-[600px] tw:p-4">
      <FootnoteEditor
        noteOps={sampleNoteOps[noteKind]}
        noteKey={`story-${noteKind}`}
        inline={inline}
        onClose={() => {}}
        scrRef={defaultScrRef}
        editorOptions={{ hasExternalUI: true }}
        defaultMarkerMenuTrigger="\\"
        localizedStrings={localizedStrings}
      />
    </div>
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Advanced/FootnoteEditor',
  tags: ['autodocs'],
  render: Template,
  argTypes: {
    noteKind: { control: { type: 'inline-radio' }, options: ['footnote', 'crossReference'] },
    inline: { control: 'boolean' },
  },
};
export default meta;

export const Default: StoryObj<StoryArgs> = {
  args: { noteKind: 'footnote', inline: false },
};
