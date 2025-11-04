import {
  DeltaOp,
  Editorial,
  EditorOptions,
  EditorRef,
  GENERATOR_NOTE_CALLER,
  getDefaultViewOptions,
  HIDDEN_NOTE_CALLER,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import { USJ_TYPE, USJ_VERSION } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { CanvasWithDescription } from '@/components/demo/scripture-editor/canvas-with-description.component';
import { renderEditorialWithToolbar } from '@/components/demo/scripture-editor/editorial-with-toolbar.renderer';
import {
  annotationRangeWeb1,
  annotationRangeWeb2,
  usjEmpty,
  usjHebrew,
  usjWeb,
} from '@/components/demo/scripture-editor/usj.data';
import '@/components/demo/scripture-editor/scripture-editor.stories.css';
import FootnoteEditor from '@/components/advanced/footnotes/footnote-editor.component';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn-ui/popover';

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

export const Annotated: Story = {
  render: (args) => {
    // eslint-disable-next-line no-null/no-null
    const editorRef = useRef<EditorRef | null>(null);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.addAnnotation(annotationRangeWeb1, 'spelling', 'annotationId');
          editorRef.current.addAnnotation(annotationRangeWeb2, 'grammar', 'abc123');
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

export const FootnoteEditorView: Story = {
  render: (args) => {
    // eslint-disable-next-line no-null/no-null
    const editorRef = useRef<EditorRef | null>(null);

    const [noteKey, setNoteKey] = useState<string>();
    const [noteOps, setNoteOps] = useState<DeltaOp[]>();

    const [popoverX, setPopoverX] = useState<number>();
    const [popoverY, setPopoverY] = useState<number>();
    const [popoverHeight, setPopoverHeight] = useState<number>();

    const [showFootnoteEditor, setShowFootnoteEditor] = useState<boolean>();

    const viewOptions = useMemo<ViewOptions>(
      () => ({
        markerMode: 'hidden',
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
              if (noteKey) return;

              setNoteKey(noteNodeKey);
              setNoteOps(getNoteOps());
              setShowFootnoteEditor(true);
            }
          },
        },
        view: viewOptions,
      };
    }, [args.options, viewOptions, noteKey]);

    const onEditorClose = () => {
      setNoteKey(undefined);
      setNoteOps(undefined);
      setShowFootnoteEditor(false);
    };

    const onEditorSave = (newNoteOps: DeltaOp[]) => {
      if (noteKey) {
        editorRef.current?.replaceEmbedUpdate(noteKey, newNoteOps);
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
          <PopoverContent className="tw-w-96 tw-p-[10px]">
            <FootnoteEditor
              noteKey={noteKey}
              noteOps={noteOps}
              onSave={onEditorSave}
              onClose={onEditorClose}
              scrRef={args.scrRef ?? defaultScrRef}
              viewOptions={viewOptions}
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
    },
  },
};

export const MarkersView: Story = {
  render: (args, context) => {
    // eslint-disable-next-line no-null/no-null
    const editorRef = useRef<EditorRef | null>(null);
    // eslint-disable-next-line no-null/no-null
    const [toolbarEndEl, setToolbarEndEl] = useState<HTMLElement | null>(null);
    const [showMarkers, setShowMarkers] = useState(false);

    const mergedOptions = useMemo(() => {
      const base = args.options ?? {};
      const view: ViewOptions = {
        markerMode: showMarkers ? 'visible' : 'hidden',
        hasSpacing: true,
        isFormattedFont: true,
      };
      return {
        ...base,
        view,
      };
    }, [args.options, showMarkers]);

    useEffect(() => {
      const el = editorRef.current?.toolbarEndRef?.current;
      if (el) setToolbarEndEl(el);
      else {
        // Retry once on next tick in case the toolbar mounts after the ref effect
        const id = window.setTimeout(() => {
          const el2 = editorRef.current?.toolbarEndRef?.current;
          if (el2) setToolbarEndEl(el2);
        }, 0);
        return () => window.clearTimeout(id);
      }
      return undefined;
    }, [mergedOptions]);

    const handleShowMarkerToggle = useCallback(() => setShowMarkers((v) => !v), []);

    return (
      <CanvasWithDescription
        viewMode={context.viewMode}
        description={
          context.parameters?.docs?.description?.story ?? context.parameters?.description
        }
      >
        <Editorial {...args} options={mergedOptions} ref={editorRef} />
        {toolbarEndEl &&
          createPortal(
            <button
              type="button"
              title="Show/hide markers"
              aria-label="Show/hide markers"
              aria-pressed={showMarkers}
              className={`toolbar-item ${showMarkers ? 'active' : ''}`}
              onClick={handleShowMarkerToggle}
            >
              <span className="icon pilcrow-icon" aria-hidden="true">
                ¶
              </span>
            </button>,
            toolbarEndEl,
          )}
      </CanvasWithDescription>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'This story demonstrates the Markers view, which shows USFM markers inline with the ' +
          'text. Click the **Show/hide markers** (¶) button in the editor toolbar to toggle the ' +
          'Markers view on and off. ',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    scrRef: defaultScrRef,
  },
};

export const ViewOptionsStory: Story = {
  name: 'View Options',
  render: (args, context) => renderEditorialWithToolbar(args, context, defaultScrRef),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates the editor view options (marker visibility, spacing, and formatted font) ' +
          'using USX input. Below in the **Controls** tab, try changing the **options.view** ' +
          'values to see how they affect the editor display. Valid values for **markerMode** are ' +
          '_"hidden"_, _"visible"_, and _"editable"_. Valid values for **noteMode** are ' +
          '_"collapsed"_, _"expandInline"_, and _"expanded"_.',
      },
    },
  },
  args: {
    defaultUsj: usjWeb,
    options: {
      hasExternalUI: true,
      view: {
        markerMode: 'hidden',
        noteMode: 'collapsed',
        hasSpacing: true,
        isFormattedFont: true,
      },
    },
  },
};
