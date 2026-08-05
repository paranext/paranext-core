import { useCallback, useMemo, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  DeltaSource,
  Editorial,
  EditorOptions,
  EditorRef,
  isInsertEmbedOpOfType,
} from '@eten-tech-foundation/platform-editor';
import { MarkerObject, Usj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { USFM_MARKERS_MAP_PARATEXT_3_0, UsjReaderWriter } from 'platform-bible-utils';
import FootnoteEditor from '@/components/advanced/footnote-editor/footnote-editor.component';
import { FootnoteEditorLocalizedStrings } from '@/components/advanced/footnote-editor/footnote-editor.types';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';
import { FootnoteCaretPosition } from '@/components/advanced/footnotes/footnotes.types';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/shadcn-ui/resizable';
import { usjWeb } from '@/components/demo/scripture-editor/usj.data';
import '@/components/demo/scripture-editor/scripture-editor.stories.css';

type StoryArgs = {
  paneDirection: 'vertical' | 'horizontal';
  textDirection: 'ltr' | 'rtl';
  isReadonly: boolean;
};

const defaultScrRef: SerializedVerseRef = { book: 'PSA', chapterNum: 1, verseNum: 1 };
// Keys not provided fall back to displaying the key itself; acceptable for the story.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const localizedStrings = {} as FootnoteEditorLocalizedStrings;

function ScriptureEditorWithFootnotesPane({ paneDirection, textDirection, isReadonly }: StoryArgs) {
  // Ref must default to null to be accepted by React as an element ref
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);
  const [usj, setUsj] = useState<Usj>(usjWeb);
  const [editingIndex, setEditingIndex] = useState<number | undefined>(undefined);
  const [caretPosition, setCaretPosition] = useState<FootnoteCaretPosition>('end');
  const editingNoteKey = useRef<string | undefined>(undefined);
  const editingNoteOps = useRef<DeltaOpInsertNoteEmbed[] | undefined>(undefined);

  const footnotes = useMemo<MarkerObject[]>(() => {
    try {
      return new UsjReaderWriter(usj, { markersMap: USFM_MARKERS_MAP_PARATEXT_3_0 }).findAllNotes();
    } catch {
      return [];
    }
  }, [usj]);

  const editorOptions = useMemo<EditorOptions>(
    () => ({
      hasExternalUI: true,
      textDirection,
      isReadonly,
      nodes: {
        noteCallerOnClick: isReadonly
          ? undefined
          : (_event, noteNodeKey, isCollapsed, _getCaller, _setCaller, getNoteOps) => {
              if (!isCollapsed) return;
              const noteOp = getNoteOps()?.at(0);
              if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) return;
              editingNoteKey.current = noteNodeKey;
              editingNoteOps.current = [noteOp];
              // Resolve index by comparing ops (story-local; Package 2 uses findNoteIndexByOps)
              const opsJson = JSON.stringify([noteOp]);
              for (let i = 0; i < footnotes.length; i += 1) {
                if (JSON.stringify(editorRef.current?.getNoteOps(i)) === opsJson) {
                  setCaretPosition('end'); // PT9: caller click lands at end of note text
                  setEditingIndex(i);
                  return;
                }
              }
            },
      },
    }),
    [textDirection, isReadonly, footnotes.length],
  );

  const handleEditRequested = useCallback(
    (
      _footnote: MarkerObject,
      index: number,
      _listId: string | number,
      caret: FootnoteCaretPosition,
    ) => {
      if (isReadonly) return;
      const ops = editorRef.current?.getNoteOps(index);
      const noteOp = ops?.at(0);
      if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) return;
      editingNoteOps.current = [noteOp];
      editingNoteKey.current = undefined;
      setCaretPosition(caret); // caret-where-you-clicked
      setEditingIndex(index);
    },
    [isReadonly],
  );

  const renderEditingFootnote = useCallback(
    () => (
      <FootnoteEditor
        inline
        noteOps={editingNoteOps.current}
        noteKey={editingNoteKey.current}
        initialCaretPosition={caretPosition}
        onClose={() => setEditingIndex(undefined)}
        scrRef={defaultScrRef}
        editorOptions={editorOptions}
        defaultMarkerMenuTrigger="\\"
        localizedStrings={localizedStrings}
        parentEditorRef={editorRef}
      />
    ),
    [caretPosition, editorOptions],
  );

  return (
    <div className="tw:h-[600px] tw:w-full">
      <ResizablePanelGroup direction={paneDirection} className="tw:h-full tw:w-full">
        <ResizablePanel className="tw:overflow-auto" defaultSize={70} minSize={30}>
          <div className="tw:h-full tw:w-full tw:overflow-auto tw:p-2">
            <Editorial
              ref={editorRef}
              defaultUsj={usj}
              scrRef={defaultScrRef}
              options={editorOptions}
              onUsjChange={(
                newUsj: Usj,
                ops?: DeltaOp[],
                _source?: DeltaSource,
                insertedNodeKey?: string,
              ) => {
                // replaceEmbedUpdate creates a new node with a new key; keep the caller-click-
                // tracked note key in sync so a later live-apply still finds the right node (mirrors
                // FootnoteEditorView's onUsjChange in scripture-editor.stories.tsx). Only for
                // replaceEmbedUpdate (not a fresh note insertion, which has ops[1] as the note embed).
                if (
                  editingNoteKey.current &&
                  insertedNodeKey &&
                  !isInsertEmbedOpOfType('note', ops?.[1])
                ) {
                  editingNoteKey.current = insertedNodeKey;
                }
                setUsj(newUsj);
              }}
              onScrRefChange={() => {}}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          // `usfm formatted-font` (the editor's own base classes, not Tailwind utilities) make the
          // display rows inherit the same font stack the swapped-in FootnoteEditor uses (its
          // `.editor-input` always carries both), so the row-swap doesn't visibly change the note
          // text's font family/size (spec commitment: "the swap is visually quiet").
          className="tw:bg-sidebar tw:overflow-auto usfm formatted-font"
          defaultSize={30}
          minSize={15}
        >
          <FootnoteList
            footnotes={footnotes}
            listId={footnotes.length}
            layout={paneDirection === 'vertical' ? 'horizontal' : 'vertical'}
            showMarkers={false}
            editingFootnoteIndex={isReadonly ? undefined : editingIndex}
            renderEditingFootnote={renderEditingFootnote}
            onFootnoteEditRequested={isReadonly ? undefined : handleEditRequested}
            onFootnoteSelected={(_footnote, index) => editorRef.current?.selectNote(index)}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

const meta: Meta<StoryArgs> = {
  title: 'Demo/Scripture Editor/Footnotes Pane',
  render: (args) => <ScriptureEditorWithFootnotesPane {...args} />,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'PT-4189: footnote editing in the footnotes pane. Click a note caller in the text or a ' +
          'row in the pane - the row swaps to an inline FootnoteEditor with the caret where you ' +
          'clicked. Production-props successor to draft PR #2153.',
      },
    },
  },
  argTypes: {
    paneDirection: { control: { type: 'inline-radio' }, options: ['vertical', 'horizontal'] },
    textDirection: { control: { type: 'inline-radio' }, options: ['ltr', 'rtl'] },
    isReadonly: { control: 'boolean' },
  },
};
export default meta;

export const Default: StoryObj<StoryArgs> = {
  args: { paneDirection: 'vertical', textDirection: 'ltr', isReadonly: false },
};
