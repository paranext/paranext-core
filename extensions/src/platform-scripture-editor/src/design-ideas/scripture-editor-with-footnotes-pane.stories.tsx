import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  DeltaOp,
  DeltaOpInsertNoteEmbed,
  DeltaSource,
  Editorial,
  EditorOptions,
  EditorRef,
  isInsertEmbedOpOfType,
  ViewOptions,
} from '@eten-tech-foundation/platform-editor';
import { MarkerObject, Usj, usxStringToUsj } from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { USFM_MARKERS_MAP_PARATEXT_3_0, UsjReaderWriter } from 'platform-bible-utils';
import {
  FootnoteEditor,
  FootnoteEditorLocalizedStrings,
  FootnoteItem,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from 'platform-bible-react';

// NOTE: This story reproduces the visual outcome of PR #2153 ("footnote editor inside
// footnote pane") using ONLY pre-PR-2153 public APIs of platform-bible-react,
// @eten-tech-foundation/platform-editor, and platform-bible-utils. No production code
// is changed by this PR — the trial-balloon production changes from PR #2153 have been
// reverted; only this Storybook demo remains so reviewers can evaluate the design idea.
//
// Workarounds the story relies on:
//   1. FootnoteEditor has a useLayoutEffect that width-locks the editor to its initial
//      container width. PR #2153 added an `inline` prop to disable that — we don't have
//      it post-revert. To approximate gracefully-resizable behavior, we bucket the pane
//      size and use the bucket as part of the editor's React `key`, so the editor
//      remounts whenever the splitter moves to a new ~5% bucket and re-locks at the new
//      width. There is a brief visual flicker on remount; this is acceptable for a
//      design-evaluation demo.
//   2. The row-swap (replace a FootnoteItem row with an inline FootnoteEditor while
//      editing) is built story-locally rather than via FootnoteList props. The
//      post-revert FootnoteList has no row-swap support — those props are also from
//      PR #2153 and were reverted.

const defaultScrRef: SerializedVerseRef = { book: 'PSA', chapterNum: 1, verseNum: 1 };

// Localized strings: the FootnoteEditor will fall back to displaying its string keys for
// any missing labels. That's acceptable for a design-evaluation demo. A real composition
// would pipe in `useLocalizedStrings(FOOTNOTE_EDITOR_STRING_KEYS)` from a PAPI host.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const enStrings = {} as FootnoteEditorLocalizedStrings;

// Inline USJ seed documents. Equivalent to the ones in
// lib/platform-bible-react/src/components/demo/scripture-editor/usj.data.ts, copied here
// so the story stays self-contained (avoids cross-package relative imports and the
// Storybook-only `@/` alias).
const usjEmpty = usxStringToUsj('<usx version="3.1" />');

const usjWeb = usxStringToUsj(
  `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="PSA" style="id">World English Bible (WEB)</book>
  <para style="mt1">The Psalms</para>
  <chapter number="1" style="c" sid="PSA 1" />
  <para style="q1">
    <verse number="1" style="v" sid="PSA 1:1" />Blessed is the man who doesn't walk in the counsel of the wicked<note caller="+" style="f"><char style="fr">1:1 </char><char style="ft">Or "sinful"</char></note>,</para>
  <para style="q2" vid="PSA 1:1">nor stand on the path<note caller="+" style="f"><char style="fr">1:1 </char><char style="ft">Hebrew: "way"</char></note> of sinners,</para>
  <para style="q2" vid="PSA 1:1">nor sit in the seat of scoffers;<verse eid="PSA 1:1" /></para>
  <para style="q1">
    <verse number="2" style="v" sid="PSA 1:2" /><note caller="+" style="f"><char style="fr" closed="false">1:2 </char><char style="ft" closed="false">After verse</char></note> but his delight is in Yahweh's<note caller="+" style="f"><char style="fr" closed="false">1:2 </char><char style="ft" closed="false">"Yahweh" is God's proper Name.</char></note> law.</para>
  <para style="q2" vid="PSA 1:2">On his law he meditates day and night.<verse eid="PSA 1:2" /></para>
</usx>
`,
);

const usjHebrew = usxStringToUsj(
  `<?xml version="1.0" encoding="utf-8"?>
<usx version="3.1">
  <book code="PSA" style="id">תהילים</book>
  <para style="mt1">תהילים</para>
  <chapter number="1" style="c" sid="PSA 1" />
  <para style="q1">
    <verse number="1" style="v" sid="PSA 1:1" />אשרי האיש אשר לא הלך בעצת רשעים,</para>
  <para style="q2" vid="PSA 1:1">ובדרך חטאים לא עמד,</para>
  <para style="q2" vid="PSA 1:1">ובמושב לצים לא ישב.<verse eid="PSA 1:1" /></para>
  <para style="q1">
    <verse number="2" style="v" sid="PSA 1:2" />כי אם בתורת יהוה חפצו,</para>
  <para style="q2" vid="PSA 1:2">ובתורתו יהגה יומם ולילה.<verse eid="PSA 1:2" /></para>
</usx>
`,
);

type StoryArgs = {
  /** USJ document to load into the editor. */
  usj: Usj;
  /**
   * Direction of the resizable split: vertical = footnote pane below; horizontal = pane on the
   * trailing side.
   */
  paneDirection: 'vertical' | 'horizontal';
  /** Text direction of the editor. */
  textDirection: 'ltr' | 'rtl';
  /** Whether the editor (and the footnote-pane edit affordances) are read-only. */
  isReadonly: boolean;
};

/**
 * Story-local composition: Editorial editor on top/leading, a resizable footnote pane on the
 * bottom/trailing side. Clicking a note caller in the editor swaps the corresponding row in the
 * pane for an inline FootnoteEditor; double-clicking a row in the pane does the same.
 */
function ScriptureEditorWithFootnotesPane({
  usj,
  paneDirection,
  textDirection,
  isReadonly,
}: StoryArgs) {
  // EditorRef from @eten-tech-foundation/platform-editor requires the ref to be created
  // with an initial value of `null` (not `undefined`) for forwardRef compatibility, hence
  // the explicit `null` literal that triggers the no-null/no-null rule.
  // eslint-disable-next-line no-null/no-null
  const editorRef = useRef<EditorRef | null>(null);

  const editingNoteKey = useRef<string | undefined>(undefined);
  const editingNoteOps = useRef<DeltaOpInsertNoteEmbed[] | undefined>(undefined);

  const [editingFootnoteIndex, setEditingFootnoteIndex] = useState<number | undefined>(undefined);
  // ~5% buckets for the remount-on-resize workaround (see NOTE at top of file)
  const [paneSizeBucket, setPaneSizeBucket] = useState(0);

  // Extract the list of footnote MarkerObjects from the USJ document. Same approach the
  // production FootnotesLayout used before PR #2153 changed it.
  const footnotes = useMemo<MarkerObject[]>(() => {
    try {
      return new UsjReaderWriter(usj, {
        markersMap: USFM_MARKERS_MAP_PARATEXT_3_0,
      }).findAllNotes();
    } catch {
      return [];
    }
  }, [usj]);

  // Reset edit state when the document or read-only mode changes
  useEffect(() => {
    editingNoteKey.current = undefined;
    editingNoteOps.current = undefined;
    setEditingFootnoteIndex(undefined);
  }, [usj, isReadonly]);

  /**
   * Find the numeric footnote index in the document corresponding to a given lexical note node key
   * in the editor. Lifted from PR #2153's
   * `extensions/src/platform-scripture-editor/src/platform-scripture-editor.web-view.tsx` (function
   * `findNoteIndexForKey`). The editor exposes `getNoteOps(keyOrIndex)`; we compare ops to resolve
   * the index.
   */
  const findNoteIndexForKey = useCallback((noteNodeKey: string): number => {
    const keyOps = editorRef.current?.getNoteOps(noteNodeKey);
    if (!keyOps) return -1;
    const keyOpsJson = JSON.stringify(keyOps);
    for (let i = 0; i < 1000; i += 1) {
      const ops = editorRef.current?.getNoteOps(i);
      if (!ops) return -1;
      if (JSON.stringify(ops) === keyOpsJson) return i;
    }
    return -1;
  }, []);

  const viewOptions = useMemo<ViewOptions>(
    () => ({
      markerMode: 'hidden',
      noteMode: 'collapsed',
      hasSpacing: true,
      isFormattedFont: true,
    }),
    [],
  );

  const editorOptions = useMemo<EditorOptions>(
    () => ({
      hasExternalUI: true,
      markerMenuTrigger: '\\',
      textDirection,
      isReadonly,
      nodes: {
        noteCallerOnClick: isReadonly
          ? undefined
          : (_event, noteNodeKey, isCollapsed, _getCaller, _setCaller, getNoteOps) => {
              // Only react to clicks on collapsed callers (matches PR #2153 + the
              // existing FootnoteEditorView story in scripture-editor.stories.tsx).
              if (!isCollapsed || editingNoteKey.current) return;
              const noteOp = getNoteOps()?.at(0);
              if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) return;
              editingNoteKey.current = noteNodeKey;
              editingNoteOps.current = [noteOp];
              const idx = findNoteIndexForKey(noteNodeKey);
              setEditingFootnoteIndex(idx >= 0 ? idx : undefined);
            },
      },
      view: viewOptions,
    }),
    [textDirection, isReadonly, viewOptions, findNoteIndexForKey],
  );

  const closeFootnoteEditor = useCallback(() => {
    editingNoteKey.current = undefined;
    editingNoteOps.current = undefined;
    setEditingFootnoteIndex(undefined);
  }, []);

  const onEditorialUsjChange = useCallback(
    (_usj: Usj, ops?: DeltaOp[], _source?: DeltaSource, insertedNodeKey?: string) => {
      // Keep noteKey in sync when replaceEmbedUpdate creates a new node key for an
      // already-editing note. Same logic as the existing FootnoteEditorView story.
      if (editingNoteKey.current && insertedNodeKey && !isInsertEmbedOpOfType('note', ops?.[1])) {
        editingNoteKey.current = insertedNodeKey;
      }
    },
    [],
  );

  const handleRowDoubleClick = useCallback(
    (index: number) => {
      if (isReadonly || index < 0 || index >= footnotes.length) return;
      // Best-effort: derive a noteNodeKey by asking the editor for ops at this index.
      // editorRef.current?.getNoteOps(index) returns the ops for the note at `index`.
      const ops = editorRef.current?.getNoteOps(index);
      const noteOp = ops?.at(0);
      if (!noteOp || !isInsertEmbedOpOfType('note', noteOp)) return;
      // We don't have a node key here (the editor's node-key map isn't exposed by index)
      // — that's fine; the editor only needs the key when applying changes via
      // parentEditorRef, which still works via the editor's selectNote mechanism.
      editingNoteOps.current = [noteOp];
      editingNoteKey.current = undefined;
      setEditingFootnoteIndex(index);
      editorRef.current?.selectNote(index);
    },
    [footnotes.length, isReadonly],
  );

  const onPaneResize = useCallback((size: number) => {
    // Bucket to ~5% so the editor doesn't remount on every pixel of drag.
    setPaneSizeBucket(Math.floor(size / 5));
  }, []);

  const inlineEditorSlot: ReactNode = (
    <div className="tw-w-full tw-min-w-0 tw-p-1">
      <FootnoteEditor
        key={`footnote-editor-${editingFootnoteIndex}-${paneSizeBucket}`}
        classNameForEditor="scripture-font"
        noteOps={editingNoteOps.current}
        noteKey={editingNoteKey.current}
        onClose={closeFootnoteEditor}
        scrRef={defaultScrRef}
        editorOptions={editorOptions}
        defaultMarkerMenuTrigger="\\"
        localizedStrings={enStrings}
        parentEditorRef={editorRef}
      />
    </div>
  );

  return (
    <div className="tw-h-[600px] tw-w-full">
      <ResizablePanelGroup direction={paneDirection} className="tw-h-full tw-w-full">
        <ResizablePanel className="tw-overflow-auto" defaultSize={70} minSize={30}>
          <div className="tw-h-full tw-w-full tw-overflow-auto tw-p-2">
            <Editorial
              ref={editorRef}
              defaultUsj={usj}
              scrRef={defaultScrRef}
              options={editorOptions}
              onUsjChange={onEditorialUsjChange}
              onScrRefChange={() => undefined}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel
          className="tw-bg-sidebar tw-overflow-auto"
          defaultSize={30}
          minSize={15}
          maxSize={60}
          onResize={onPaneResize}
        >
          <StoryFootnotePane
            footnotes={footnotes}
            editingIndex={editingFootnoteIndex}
            onRowDoubleClick={handleRowDoubleClick}
            editorSlot={inlineEditorSlot}
            paneDirection={paneDirection}
            isReadonly={isReadonly}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

type StoryFootnotePaneProps = {
  footnotes: MarkerObject[];
  editingIndex: number | undefined;
  onRowDoubleClick: (index: number) => void;
  editorSlot: ReactNode;
  paneDirection: 'vertical' | 'horizontal';
  isReadonly: boolean;
};

/**
 * Story-local replacement for the pre-PR-2153 `FootnoteList` behavior, with row-swap for the row
 * currently being edited. Keeps the story self-contained — no production code touched.
 */
function StoryFootnotePane({
  footnotes,
  editingIndex,
  onRowDoubleClick,
  editorSlot,
  paneDirection,
  isReadonly,
}: StoryFootnotePaneProps) {
  if (footnotes.length === 0) {
    return (
      <div className="tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-p-4 tw-text-sm tw-text-muted-foreground">
        No footnotes in this document.
      </div>
    );
  }
  return (
    <ul
      className="tw-flex tw-h-full tw-w-full tw-list-none tw-flex-col tw-gap-1 tw-overflow-auto tw-p-2"
      aria-label="Footnotes"
    >
      {footnotes.map((footnote, index) => {
        const isEditing = index === editingIndex;
        const key = `${index}-${footnote.marker ?? 'fn'}`;
        if (isEditing) {
          return (
            <li
              key={key}
              className="tw-rounded tw-border tw-border-ring tw-bg-muted tw-min-w-0 tw-p-1"
            >
              {editorSlot}
            </li>
          );
        }
        return (
          <li
            key={key}
            className={
              isReadonly
                ? 'tw-rounded tw-p-1'
                : 'tw-rounded tw-p-1 hover:tw-bg-accent tw-cursor-pointer'
            }
            onDoubleClick={isReadonly ? undefined : () => onRowDoubleClick(index)}
          >
            <FootnoteItem
              footnote={footnote}
              layout={paneDirection === 'vertical' ? 'horizontal' : 'vertical'}
              showMarkers={false}
            />
          </li>
        );
      })}
    </ul>
  );
}

const meta: Meta<typeof ScriptureEditorWithFootnotesPane> = {
  title: 'Design Ideas/Scripture Editor/Footnote Editor in Footnote Pane',
  component: ScriptureEditorWithFootnotesPane,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: [
          'Reproduces the visual outcome of [PR #2153](https://github.com/paranext/paranext-core/pull/2153)',
          '("footnote editor inside footnote pane") as a **Storybook-only design idea**.',
          'No production code is touched by this PR — the original PR #2153 production changes',
          'have been reverted on this branch; only this story remains so the design can be',
          'evaluated visually before committing to a productionizing effort.',
          '',
          'Location convention follows [PR #2321](https://github.com/paranext/paranext-core/pull/2321):',
          'story lives inside the owning extension folder.',
          '',
          'Interactions:',
          '- **Click** a note caller in the editor → the corresponding row in the footnote pane',
          '  is replaced by an inline FootnoteEditor.',
          '- **Double-click** a row in the pane → same swap.',
          '- **X** in the editor → returns the row to its read-only display.',
          '- **Drag the splitter** → the embedded editor remounts at each ~5% bucket to re-fit',
          '  the new pane width (a workaround for the absent `inline` prop on FootnoteEditor).',
        ].join(' '),
      },
    },
  },
  argTypes: {
    paneDirection: {
      control: { type: 'inline-radio' },
      options: ['vertical', 'horizontal'],
      description: 'Footnote pane direction: vertical = below the editor; horizontal = beside it.',
    },
    textDirection: {
      control: { type: 'inline-radio' },
      options: ['ltr', 'rtl'],
    },
    isReadonly: { control: 'boolean' },
    usj: { control: false },
  },
};

export default meta;

type Story = StoryObj<typeof ScriptureEditorWithFootnotesPane>;

/** Default: a populated WEB scripture document with the pane below the editor. */
export const Default: Story = {
  args: {
    usj: usjWeb,
    paneDirection: 'vertical',
    textDirection: 'ltr',
    isReadonly: false,
  },
};

/** Pane on the trailing side instead of below. */
export const PaneOnSide: Story = {
  args: {
    usj: usjWeb,
    paneDirection: 'horizontal',
    textDirection: 'ltr',
    isReadonly: false,
  },
};

/** Hebrew (RTL) document — verifies the layout under right-to-left text direction. */
export const Hebrew: Story = {
  args: {
    usj: usjHebrew,
    paneDirection: 'vertical',
    textDirection: 'rtl',
    isReadonly: false,
  },
};

/** No footnotes — verifies the empty-pane state. */
export const Empty: Story = {
  args: {
    usj: usjEmpty,
    paneDirection: 'vertical',
    textDirection: 'ltr',
    isReadonly: false,
  },
};

/** Read-only mode — pane is visible but editing affordances are suppressed. */
export const Readonly: Story = {
  args: {
    usj: usjWeb,
    paneDirection: 'vertical',
    textDirection: 'ltr',
    isReadonly: true,
  },
};
