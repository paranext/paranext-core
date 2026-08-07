import type { Meta, StoryObj } from '@storybook/react-vite';
import { DeltaOpInsertNoteEmbed } from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ThemeProvider } from '@/storybook/theme-provider.component';
import localizedStrings from '@/localizedStrings.json';
import FootnoteEditor from './footnote-editor.component';
import { FootnoteEditorLocalizedStrings } from './footnote-editor.types';

const defaultScrRef: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

// eslint-disable-next-line no-type-assertion/no-type-assertion
const enStrings = (localizedStrings.localizedStrings?.en ?? {}) as FootnoteEditorLocalizedStrings;

const sampleFootnoteOps: DeltaOpInsertNoteEmbed[] = [
  {
    insert: {
      note: {
        caller: '+',
        style: 'f',
        contents: {
          ops: [
            { insert: '1.1 ', attributes: { char: { style: 'fr' } } },
            {
              insert: 'Or ',
              attributes: { char: { style: 'ft' } },
            },
            {
              insert: 'wind',
              attributes: { char: { style: 'fqa' } },
            },
          ],
        },
      },
    },
  },
];

const sampleCrossRefOps: DeltaOpInsertNoteEmbed[] = [
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
];

const meta: Meta<typeof FootnoteEditor> = {
  title: 'Advanced/FootnoteEditor',
  component: FootnoteEditor,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="tw-p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  args: {
    scrRef: defaultScrRef,
    localizedStrings: enStrings,
    editorOptions: { hasExternalUI: true, markerMenuTrigger: '\\' },
    defaultMarkerMenuTrigger: '\\',
    onClose: () => console.log('onClose'),
  },
};
export default meta;

type Story = StoryObj<typeof FootnoteEditor>;

/** Default footnote editor with a sample footnote. */
export const Default: Story = {
  args: {
    noteOps: sampleFootnoteOps,
    noteKey: 'story-note-1',
  },
};

/** Cross-reference editor. */
export const CrossReference: Story = {
  args: {
    noteOps: sampleCrossRefOps,
    noteKey: 'story-xref-1',
  },
};

/** Editor with no initial content (empty new footnote). */
export const Empty: Story = {
  args: {
    noteOps: [
      {
        insert: {
          note: {
            caller: '+',
            style: 'f',
            contents: { ops: [] },
          },
        },
      },
    ],
    noteKey: 'story-note-empty',
  },
};

/** Footnote with a custom caller character. */
export const CustomCaller: Story = {
  args: {
    noteOps: [
      {
        insert: {
          note: {
            caller: '†',
            style: 'f',
            contents: {
              ops: [
                { insert: '1.5 ', attributes: { char: { style: 'fr' } } },
                {
                  insert: 'Some ancient manuscripts read differently here.',
                  attributes: { char: { style: 'ft' } },
                },
              ],
            },
          },
        },
      },
    ],
    noteKey: 'story-note-custom-caller',
  },
};
