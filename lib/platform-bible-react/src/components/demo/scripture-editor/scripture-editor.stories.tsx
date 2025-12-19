import {
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  Editorial,
  EditorOptions,
  EditorRef,
  GENERATOR_NOTE_CALLER,
  getDefaultViewOptions,
  HIDDEN_NOTE_CALLER,
  isInsertEmbedOpOfType,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import { USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { renderEditorialWithToolbar } from '@/components/demo/scripture-editor/editorial-with-toolbar.renderer';
import {
  annotationRangeWeb1,
  annotationRangeWeb2,
  usjEmpty,
  usjHebrew,
  usjWeb,
} from '@/components/demo/scripture-editor/usj.data';
import '@/components/demo/scripture-editor/scripture-editor.stories.css';
import FootnoteEditor from '@/components/advanced/footnote-editor/footnote-editor.component';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn-ui/popover';
import { FootnoteEditorLocalizedStrings } from '@/components/advanced/footnote-editor/footnote-editor.types';

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
- npm [@eten-tech-foundation/platform-editor](https://www.npmjs.com/package/@eten-tech-foundation/platform-editor)
- github [eten-tech-foundation/platform-editor](https://github.com/eten-tech-foundation/scripture-editors/tree/main/packages/platform)

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
            '{ isReadonly?: boolean; hasSpellCheck?: boolean; textDirection?: "ltr" | "rtl" | ' +
            '"auto"; markerMenuTrigger?: string; nodes?: UsjNodeOptions; }',
        },
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof Editorial>;

/** Story type with custom flattened ViewOptions args for the Controls panel */
type ViewOptionsStory = Omit<Story, 'args' | 'argTypes' | 'render'> & {
  args: ViewOptions;
  argTypes: Partial<Record<keyof ViewOptions, object>>;
  render: (
    args: ViewOptions,
    context: { viewMode: string; parameters?: { docs?: { description?: { story?: string } } } },
  ) => ReactNode;
};

export const Default: Story = {
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
  },
};

export const Empty: Story = {
  args: {
    defaultUsj: usjEmpty,
    scrRef: defaultScrRef,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
    options: {
      isReadonly: true,
    },
  },
};

export const RTL: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'Right-to-left example using a Hebrew snippet (Psalm 1:1). ' +
          'The editor is set to RTL via _options.textDirection = "rtl"_. If you want the UI ' +
          '(tab toolbar) to be RTL click **Switch direction** in the Storybook toolbar.',
      },
    },
  },
  args: {
    defaultUsj: usjHebrew,
    options: {
      hasExternalUI: true,
      textDirection: 'rtl',
    },
  },
};

function handleAnnotationOnClick(
  event: globalThis.MouseEvent,
  type: string,
  id: string,
  textContent: string,
) {
  // eslint-disable-next-line no-console
  console.log('handleAnnotationOnClick', { event, type, id, textContent });
}

function handleAnnotationOnRemove(type: string, id: string, cause: string, textContent: string) {
  // eslint-disable-next-line no-console
  console.log('handleAnnotationOnRemove', { type, id, cause, textContent });
}

export const Annotated: Story = {
  render: (args) => {
    // eslint-disable-next-line no-null/no-null
    const editorRef = useRef<EditorRef | null>(null);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.setAnnotation(
            annotationRangeWeb1,
            'spelling',
            'annotationId',
            handleAnnotationOnClick,
            handleAnnotationOnRemove,
          );
          editorRef.current.setAnnotation(
            annotationRangeWeb2,
            'grammar',
            'abc123',
            handleAnnotationOnClick,
            handleAnnotationOnRemove,
          );
        }
      }, 0);
      return () => clearTimeout(timeoutId);
    }, []);

    return <Editorial {...args} ref={editorRef} />;
  },
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
  },
};

const inlineNoteOptions: EditorOptions = {
  hasExternalUI: true,
  view: { ...getDefaultViewOptions(), noteMode: 'expandInline' },
  nodes: {
    noteCallerOnClick: (_event, _noteNodeKey, isCollapsed, getCaller, setCaller) => {
      if (isCollapsed) return;

      if (getCaller() === GENERATOR_NOTE_CALLER) setCaller(HIDDEN_NOTE_CALLER);
      else setCaller(GENERATOR_NOTE_CALLER);
    },
  },
};

export const InlineNoteEditing: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates editing notes inline. Move your cursor to a note caller and ' +
          'the note will expand and can be edited. Move the cursor out of the note and it will ' +
          'collapse. Click the expanded note caller to toggle between the auto-generated caller ' +
          'and the hidden caller.',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    options: inlineNoteOptions,
  },
};

const insertNoteOptions: EditorOptions = {
  hasExternalUI: true,
  view: { ...getDefaultViewOptions(), noteMode: 'expandInline' },
};

export const InsertNote: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates inserting notes. Use the Project menu (hamburger) or the ' +
          'toolbar buttons above the editor to insert footnotes, cross-references, and endnotes ' +
          'at the current cursor position. Selecting text before inserting a footnote will use ' +
          'that text as the footnote quote. You can also insert by typing "\\f", "\\x", or "\\fe".',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    options: insertNoteOptions,
  },
};

const customNodeOptions: EditorOptions = {
  hasExternalUI: true,
  nodes: {
    noteCallers: ['①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩'],
    noteCallerOnClick: (event, noteNodeKey, isCollapsed, getCaller, setCaller, getNoteOps) => {
      // eslint-disable-next-line no-console
      console.log(
        'Note caller clicked:',
        event,
        noteNodeKey,
        isCollapsed,
        getCaller,
        setCaller,
        getNoteOps,
      );
      // eslint-disable-next-line no-alert
      alert('Note caller clicked! Check console for details.');
    },
  },
};

export const CustomNoteOptions: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates custom note callers and click handling. **Try clicking on the ' +
          'circled number footnote markers (① ②) in the text to see the click handler in ' +
          'action!** The click event will show an alert and log details to the browser console.',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    options: customNodeOptions,
  },
};

export const CustomMarkerTrigger: Story = {
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates using a custom marker menu trigger key. **Try typing "?" ' +
          '(question mark) anywhere in the editor text to open the marker menu!** The default ' +
          'trigger is "\\\\" (backslash), but this story changes it to "?" for demonstration. ' +
          'The marker menu allows you to insert USFM markers into the text.',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    options: {
      hasExternalUI: true,
      markerMenuTrigger: '?',
    },
  },
};

const sampleFootnoteEditorLocalizedStrings: FootnoteEditorLocalizedStrings = {
  '%footnoteEditor_callerDropdown_label%': 'Footnote caller',
  '%footnoteEditor_callerDropdown_item_generated%': 'Auto-generated',
  '%footnoteEditor_callerDropdown_item_hidden%': 'Hidden',
  '%footnoteEditor_callerDropdown_item_custom%': 'Custom',
  '%footnoteEditor_callerDropdown_tooltip%': 'Footnote caller',
  '%footnoteEditor_cancelButton_tooltip%': 'Cancel',
  '%footnoteEditor_copyButton_tooltip%': 'Copy footnote',
  '%footnoteEditor_noteType_crossReference_label%': 'Cross reference',
  '%footnoteEditor_noteType_endNote_label%': 'Endnote',
  '%footnoteEditor_noteType_footnote_label%': 'Footnote',
  '%footnoteEditor_noteType_tooltip%': 'Change type: Footnote',
  '%footnoteEditor_noteTypeDropdown_label%': 'Type',
  '%footnoteEditor_saveButton_tooltip%': 'Save',
};

export const FootnoteEditorView: Story = {
  render: (args) => {
    // eslint-disable-next-line no-null/no-null
    const editorRef = useRef<EditorRef | null>(null);

    const noteKey = useRef<string>();
    const noteOps = useRef<DeltaOpInsertNoteEmbed[]>();

    const [popoverX, setPopoverX] = useState<number>();
    const [popoverY, setPopoverY] = useState<number>();
    const [popoverHeight, setPopoverHeight] = useState<number>();

    const [showFootnoteEditor, setShowFootnoteEditor] = useState<boolean>();

    const viewOptions = useMemo<ViewOptions>(
      () => ({
        markerMode: 'hidden',
        noteMode: 'collapsed',
        hasSpacing: true,
        isFormattedFont: true,
      }),
      [],
    );

    const mergedOptions = useMemo<EditorOptions>(() => {
      const base = args.options ?? {};
      return {
        ...base,
        nodes: {
          noteCallerOnClick: (
            event,
            noteNodeKey,
            isCollapsed,
            _getCaller,
            _setCaller,
            getNoteOps,
          ) => {
            const targetRect = event.currentTarget.getBoundingClientRect();
            setPopoverX(targetRect.left);
            setPopoverY(targetRect.top);
            setPopoverHeight(targetRect.height);

            if (isCollapsed) {
              // (event as SyntheticEvent<)
              if (noteKey.current) return;

              // Makes sure the note op is the correct type and is defined
              const noteOp = getNoteOps()?.at(0);
              if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) return;

              noteKey.current = noteNodeKey;
              noteOps.current = [noteOp];
              setShowFootnoteEditor(true);
            }
          },
        },
        view: viewOptions,
      };
    }, [args.options, viewOptions, noteKey]);

    const onEditorClose = () => {
      noteKey.current = undefined;
      noteOps.current = undefined;
      setShowFootnoteEditor(false);
    };

    const onEditorSave = (newNoteOps: DeltaOp[]) => {
      if (noteKey.current) {
        editorRef.current?.replaceEmbedUpdate(noteKey.current, newNoteOps);
      }
      onEditorClose();
    };

    return (
      <div>
        <Editorial
          {...args}
          options={mergedOptions}
          ref={editorRef}
          onScrRefChange={() => undefined}
        />
        <Popover open={showFootnoteEditor}>
          <PopoverAnchor
            className="tw-absolute"
            style={{ top: popoverY ?? 0, left: popoverX ?? 0, height: popoverHeight, width: 0 }}
          />
          <PopoverContent className="tw-w-[500px] tw-p-[10px]">
            <FootnoteEditor
              noteKey={noteKey.current}
              noteOps={noteOps.current}
              onSave={onEditorSave}
              onClose={onEditorClose}
              scrRef={args.scrRef ?? defaultScrRef}
              editorOptions={mergedOptions}
              localizedStrings={sampleFootnoteEditorLocalizedStrings}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates the use of the new footnote editor on the side of the ' +
          ' editorial component',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
    options: {
      hasExternalUI: false,
      markerMenuTrigger: '\\',
    },
  },
};

export const EditorViewOptions: ViewOptionsStory = {
  name: 'View Options',
  render: (args, context) => {
    // Destructure flattened view options from args
    const { markerMode, noteMode, hasSpacing, isFormattedFont } = args;

    // Reconstruct the args with the options.view settings
    const mergedArgs = {
      defaultUsj: usjWeb,
      options: {
        hasExternalUI: true,
        view: {
          markerMode,
          noteMode,
          hasSpacing,
          isFormattedFont,
        },
      },
    };

    return renderEditorialWithToolbar(mergedArgs, context, defaultScrRef);
  },
  argTypes: {
    markerMode: {
      control: { type: 'select' },
      options: ['hidden', 'visible', 'editable'],
      description: 'Controls how USFM markers are displayed in the editor',
      table: { category: 'View Options' },
    },
    noteMode: {
      control: { type: 'select' },
      options: ['collapsed', 'expandInline', 'expanded'],
      description: 'Controls how notes are displayed in the editor',
      table: { category: 'View Options' },
    },
    hasSpacing: {
      control: { type: 'boolean' },
      description: 'Whether to add spacing between paragraphs',
      table: { category: 'View Options' },
    },
    isFormattedFont: {
      control: { type: 'boolean' },
      description: 'Whether to use formatted font styling',
      table: { category: 'View Options' },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the editor view options (marker visibility, spacing, and formatted font) ' +
          'using USX input. Below in the **Controls** tab, try changing the **View Options** ' +
          'to see how they affect the editor display.',
      },
    },
  },
  args: {
    markerMode: 'hidden',
    noteMode: 'collapsed',
    hasSpacing: true,
    isFormattedFont: true,
  },
};
