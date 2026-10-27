import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeltaOpInsertNoteEmbed } from '@eten-tech-foundation/platform-editor';
import FootnoteEditor from '@/components/advanced/footnote-editor/footnote-editor.component';
import {
  buildDemoLocalizedStrings,
  scrRef as defaultScrRef,
} from '@/components/advanced/footnote-editor/footnote-editor.fixtures';
import '@/components/demo/scripture-editor/usj-nodes.css';

// Real English labels rather than raw `%…%` keys: this story exists to compare the two chromes'
// layouts, and key-length text lays the toolbar out nothing like the app does.
const localizedStrings = buildDemoLocalizedStrings();

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
        defaultMarkerMenuTrigger="\"
        localizedStrings={localizedStrings}
      />
    </div>
  );
}

/**
 * Control-driven demo of the editor's two chrome modes. Kept apart from
 * `footnote-editor.stories.tsx`, whose stories are real-browser interaction TESTS of the popover's
 * Enter/caret behavior and are typed against the component's own props - this file's controls are
 * story args (`noteKind`) that are not component props, so the two need separate metas.
 */
const meta: Meta<StoryArgs> = {
  title: 'Advanced/FootnoteEditor Chrome',
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
