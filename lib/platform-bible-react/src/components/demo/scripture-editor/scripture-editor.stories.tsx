import { Editorial, EditorRef, EditorOptions } from '@eten-tech-foundation/platform-editor';
import { USJ_TYPE, USJ_VERSION, usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useEffect } from 'react';
import '@/components/demo/scripture-editor/scripture-editor.stories.css';

const emptyUsx = '<usx version="3.1" />';
const usx = `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="PSA" style="id">World English Bible (WEB)</book>
  <para style="mt1">The Psalms</para>
  <chapter number="1" style="c" sid="PSA 1" />
  <para style="q1">
    <verse number="1" style="v" sid="PSA 1:1" />Blessed is the man<note caller="+" style="f"><char style="fr">1:1 </char><char style="ft">Or "person"</char></note> who doesn’t walk in the counsel of the wicked,</para>
  <para style="q2" vid="PSA 1:1">nor stand on the path<note caller="+" style="f"><char style="fr">1:1 </char><char style="ft">Hebrew: "way"</char></note> of sinners,</para>
  <para style="q2" vid="PSA 1:1">nor sit in the seat of scoffers;<verse eid="PSA 1:1" /></para>
</usx>
`; // Later, move to usx.data.ts next to this file next to the component file

// Word "man" inside first q1 of PSA 1:1.
const annotationRange1 = {
  start: { jsonPath: '$.content[3].content[1]', offset: 15 },
  end: { jsonPath: '$.content[3].content[1]', offset: 18 },
};
// Phrase "man who" inside first q1 of PSA 1:1.
const annotationRange2 = {
  start: { jsonPath: '$.content[3].content[1]', offset: 15 },
  end: { jsonPath: '$.content[3].content[1]', offset: 22 },
};

const defaultScrRef: SerializedVerseRef = { book: 'PSA', chapterNum: 1, verseNum: 1 };

const customNodeOptions: EditorOptions = {
  nodes: {
    noteCallers: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'],
    noteCallerOnClick: (event) => {
      // eslint-disable-next-line no-console
      console.log('Note caller clicked:', event);
      // eslint-disable-next-line no-alert
      alert('Note caller clicked! Check console for details.');
    },
  },
};

const meta: Meta<typeof Editorial> = {
  title: 'Demo/Editorial',
  component: Editorial,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Demo Only:** This component is provided for demonstration purposes only. For production applications, developers should import the Scripture Editor component directly from:
- npm [@eten-tech-foundation/platform-editor](https://www.npmjs.com/package/@eten-tech-foundation/platform-editor)
- github [@eten-tech-foundation/platform-editor](https://github.com/eten-tech-foundation/scripture-editors/tree/main/packages/platform)

This demo version is included in Storybook to showcase the component's functionality and usage patterns.

**Known Limitation:** In the Docs view, all story examples may show the same note caller style due to global state management in the editor component. To see the correct note caller behavior for each story (default lowercase letters vs custom symbols), please view the individual stories in the Canvas view instead of the Docs view.
        `,
      },
    },
  },
  argTypes: {
    // Add argTypes here as needed for props
    ref: {
      control: 'object',
      description: 'Reference to the editor instance',
      // eslint-disable-next-line no-null/no-null
      defaultValue: null,
    },
    defaultUsj: {
      control: 'object',
      description: 'Default USJ object to initialize the editor with',
      defaultValue: {
        type: USJ_TYPE,
        version: USJ_VERSION,
        content: [''],
      },
    },
    scrRef: {
      control: 'object',
      description: 'Scripture reference',
      defaultValue: defaultScrRef,
    },
    options: {
      control: 'object',
      description: 'Options to configure the editor (EditorOptions)',
      defaultValue: {},
      table: {
        type: {
          summary: 'EditorOptions',
          detail:
            '{ isReadonly?: boolean; hasSpellCheck?: boolean; textDirection?: "ltr" | "rtl" | "auto"; markerMenuTrigger?: string; nodes?: UsjNodeOptions; }',
        },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Editorial>;

export const Default: Story = {
  args: {
    defaultUsj: usxStringToUsj(usx),
    scrRef: defaultScrRef,
  },
};

export const Empty: Story = {
  args: {
    defaultUsj: usxStringToUsj(emptyUsx),
    scrRef: defaultScrRef,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultUsj: usxStringToUsj(usx),
    scrRef: defaultScrRef,
    options: {
      isReadonly: true,
    },
  },
};

export const Annotated: Story = {
  render: (args) => {
    // eslint-disable-next-line no-null/no-null
    const editorRef = useRef<EditorRef | null>(null);

    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.addAnnotation(annotationRange1, 'spelling', 'annotationId');
        editorRef.current.addAnnotation(annotationRange2, 'grammar', 'abc123');
      }
    }, []);

    return <Editorial {...args} ref={editorRef} />;
  },
  args: {
    defaultUsj: usxStringToUsj(usx),
    scrRef: defaultScrRef,
  },
};

export const CustomNoteOptions: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates custom note callers and click handling. **Try clicking on the circled number footnote markers (① ②) in the text to see the click handler in action!** The click event will show an alert and log details to the browser console.',
      },
    },
  },
  args: {
    defaultUsj: usxStringToUsj(usx),
    scrRef: defaultScrRef,
    options: customNodeOptions,
  },
};

export const CustomMarkerTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates using a custom marker menu trigger key. **Try typing "?" (question mark) anywhere in the editor text to open the marker menu!** The default trigger is "\\\\" (backslash), but this story changes it to "?" for demonstration. The marker menu allows you to insert USFM markers into the text.',
      },
    },
  },
  args: {
    defaultUsj: usxStringToUsj(usx),
    scrRef: defaultScrRef,
    options: {
      markerMenuTrigger: '?',
    },
  },
};
