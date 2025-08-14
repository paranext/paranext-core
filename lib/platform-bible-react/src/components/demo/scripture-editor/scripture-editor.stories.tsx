import type { Meta, StoryObj } from '@storybook/react-vite';
import { USJ_TYPE, USJ_VERSION, usxStringToUsj } from '@biblionexus-foundation/scripture-utilities';
import { useRef, useEffect } from 'react';
import { Editorial, EditorRef } from '@biblionexus-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import '@/components/demo/scripture-editor/scripture-editor.stories.css';

const emptyUsx = '<usx version="3.1" />';
const usx = `<?xml version="1.0" encoding="utf-8"?>}
<usx version="3.1">
  <book code="PSA" style="id">World English Bible (WEB)</book>
  <para style="mt1">The Psalms</para>
  <chapter number="1" style="c" sid="PSA 1" />
  <para style="q1">
    <verse number="1" style="v" sid="PSA 1:1" />Blessed is the man who doesn’t walk in the counsel of the wicked,</para>
  <para style="q2" vid="PSA 1:1">nor stand on the path of sinners,</para>
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

const meta: Meta<typeof Editorial> = {
  title: 'Demo/Editorial',
  component: Editorial,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
**Demo Only:** This component is provided for demonstration purposes only. For production applications, developers should import the Scripture Editor component directly from:
- [@biblionexus-foundation/platform-editor](https://www.npmjs.com/package/@biblionexus-foundation/platform-editor)
- [@eten-foundation/platform-editor](https://github.com/eten-tech-foundation/scripture-editors/tree/main/packages/platform)

This demo version is included in Storybook to showcase the component's functionality and usage patterns.
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
