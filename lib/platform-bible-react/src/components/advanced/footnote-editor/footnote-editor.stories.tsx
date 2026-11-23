import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import { $getRoot, $isElementNode, LexicalEditor, LexicalNode } from 'lexical';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn-ui/popover';
import type { DeltaOpInsertNoteEmbed } from '@eten-tech-foundation/platform-editor';
import { FootnoteList } from '@/components/advanced/footnotes/footnote-list.component';
import { usjFootnotes } from '@/components/advanced/footnotes/footnotes.usj.data';
import '@/components/demo/scripture-editor/usj-nodes.css';
import FootnoteEditor from './footnote-editor.component';
import {
  buildDemoLocalizedStrings,
  editableView,
  scrRef,
  sentinelNoteOp,
  twoFpNoteOp,
} from './footnote-editor.fixtures';

/**
 * Real-browser (Chromium) stories for the two things jsdom cannot judge about this editor: what the
 * Enter chain does, and where the toolbar controls actually land.
 *
 * The Enter stories mount FootnoteEditor inside a REAL open Radix popover (exactly as the web view
 * does) and drive real Enter keystrokes, exercising the autofocus → reassert → Enter-guard →
 * Lexical `$handleEnterInNote` chain end to end. jsdom can't mount the Radix popover without
 * polyfills and, even polyfilled, its FocusScope focuses a `<button>` rather than parking a caret
 * inside the contenteditable, and it has no real Lexical Enter handling.
 *
 * The toolbar-layout stories measure real laid-out boxes, which is the only way to tell "beside the
 * caller dropdown" from "pushed to the far end of the row" — jsdom computes no geometry, so its
 * companion tests can only check which group each button is nested in. They double as the visual
 * reference for each surface: the pane row and the popover.
 */

/** The mounted Lexical editor instance, read off the popover's `.editor-input` DOM node. */
function getLexical(): LexicalEditor | undefined {
  const editorInput = document.querySelector('.editor-input');
  // Lexical exposes its mounted editor instance on the root DOM node via this non-public,
  // underscore-prefixed property; there is no public API to reach it from outside a React ref (same
  // technique as the engine's own popover tests and footnote-editor.test-harness).
  // eslint-disable-next-line no-underscore-dangle, no-type-assertion/no-type-assertion
  return (editorInput as unknown as { __lexicalEditor?: LexicalEditor })?.__lexicalEditor;
}

/** Number of top-level element children of the root (the wrapper para; 2+ means it split). */
function rootChildCount(lexical: LexicalEditor): number {
  return lexical.getEditorState().read(() => $getRoot().getChildrenSize());
}

/**
 * All markers of char-like nodes inside the note, document order (an `fp` means Enter inserted a
 * footnote paragraph).
 */
function noteCharMarkers(lexical: LexicalEditor): string[] {
  return lexical.getEditorState().read(() => {
    const markers: string[] = [];
    const walk = (node: LexicalNode): void => {
      if (node.getType() === 'char') {
        // The linked editor package doesn't export its CharNode class for narrowing, so duck-type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const charLike = node as unknown as { getMarker?: () => string };
        if (typeof charLike.getMarker === 'function') markers.push(charLike.getMarker());
      }
      if ($isElementNode(node)) node.getChildren().forEach(walk);
    };
    const note = $getRoot()
      .getChildren()
      .flatMap((child) => ($isElementNode(child) ? child.getChildren() : []))
      .find((child) => child.getType() === 'note');
    if (note && $isElementNode(note)) note.getChildren().forEach(walk);
    return markers;
  });
}

/** Waits for the note editor to mount and its deferred init (applyUpdate + reassert) to settle. */
async function waitForNoteEditor(): Promise<{ editorInput: HTMLElement; lexical: LexicalEditor }> {
  await waitFor(() => expect(getLexical()).toBeTruthy(), { timeout: 4000 });
  await new Promise((resolve) => {
    setTimeout(resolve, 400);
  });
  const editorInput = document.querySelector('.editor-input');
  const lexical = getLexical();
  if (!(editorInput instanceof HTMLElement) || !lexical)
    throw new Error('note editor did not mount');
  return { editorInput, lexical };
}

function dispatchEnter(editorInput: HTMLElement): void {
  editorInput.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
  );
}

const meta: Meta<typeof FootnoteEditor> = {
  title: 'Advanced/FootnoteEditor',
  component: FootnoteEditor,
  tags: ['test'],
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Renders the popover exactly as the web view does: FootnoteEditor inside an open Radix popover. */
function PopoverHost({
  noteOps = [sentinelNoteOp],
  contentClassName = 'tw:w-max tw:min-w-[500px]',
}: {
  noteOps?: DeltaOpInsertNoteEmbed[];
  /** Sizes the pop-up; the default is as wide as its content, and never narrower than 500px. */
  contentClassName?: string;
}) {
  return (
    <Popover open>
      <PopoverAnchor className="tw:absolute" style={{ top: 120, left: 120 }} />
      <PopoverContent className={`${contentClassName} tw:p-[10px]`}>
        <FootnoteEditor
          noteOps={noteOps}
          onClose={() => {}}
          scrRef={scrRef}
          noteKey={undefined}
          editorOptions={{ view: editableView }}
          defaultMarkerMenuTrigger="\"
          localizedStrings={buildDemoLocalizedStrings()}
        />
      </PopoverContent>
    </Popover>
  );
}

/**
 * Hosts an inline `FootnoteEditor` the way the footnotes pane does: as the editing row of a real
 * `FootnoteList`, in a column as wide as the pane's default (bottom) position. The width is the
 * point - it is what makes an end-aligned undo/redo pair read as stranded.
 *
 * The editor is loaded with the shared sentinel note rather than the row's own content: converting
 * a `MarkerObject` into note ops is the host's job, and this story is about where the controls
 * sit.
 */
function FootnotesPaneHost() {
  return (
    <div className="tw:flex tw:h-[300px] tw:w-[700px] tw:flex-col tw:bg-sidebar tw:pb-0 tw:pl-2 tw:pr-0 tw:pt-2">
      <FootnoteList
        listId="inline-pane"
        layout="horizontal"
        footnotes={usjFootnotes}
        showMarkers
        formatCaller={(caller) => caller}
        editingFootnoteIndex={1}
        renderEditingFootnote={() => (
          <FootnoteEditor
            inline
            noteOps={[sentinelNoteOp]}
            onClose={() => {}}
            scrRef={scrRef}
            noteKey={undefined}
            editorOptions={{ view: editableView }}
            defaultMarkerMenuTrigger="\"
            localizedStrings={buildDemoLocalizedStrings()}
          />
        )}
      />
    </div>
  );
}

/** The editing row's `<li>`, which swaps a note's display for the inline editor. */
function getEditingRow(): HTMLElement {
  const row = document.querySelector('li[data-state="editing"]');
  if (!(row instanceof HTMLElement)) throw new Error('editing row not found');
  return row;
}

/** The toolbar row holding the dropdowns and the undo/redo buttons, and the boxes to measure in it. */
function measureToolbar() {
  const editor = document.querySelector('.footnote-editor');
  if (!(editor instanceof HTMLElement)) throw new Error('footnote editor not found');
  const scope = within(editor);
  const callerButton = scope.getByRole('button', { name: /Auto-generated/ });
  const undoButton = scope.getByRole('button', { name: 'Undo' });
  // The dropdown group's parent is the toolbar row itself - the full width the controls can spread
  // across, and so what "pushed to the end" is measured against.
  const toolbarRow = callerButton.parentElement?.parentElement;
  if (!toolbarRow) throw new Error('toolbar row not found');
  // The note-type dropdown leads the caller's group.
  const noteTypeButton = callerButton.parentElement?.querySelector('button');
  if (!noteTypeButton) throw new Error('note-type dropdown not found');
  return {
    scope,
    noteType: noteTypeButton.getBoundingClientRect(),
    caller: callerButton.getBoundingClientRect(),
    undo: undoButton.getBoundingClientRect(),
    row: toolbarRow.getBoundingClientRect(),
  };
}

/**
 * In the pane the editor is one row among the notes and the row is as wide as the pane, so the
 * undo/redo pair joins the note-type and caller dropdowns in a single cluster instead of being
 * pushed to the far end away from them. Also pins the tab handoff the row swap depends on: Tab
 * reaches the editing row's controls at the position that row occupies in the list, from either
 * direction.
 */
export const InlineToolbarGroupsUndoRedoWithTheDropdowns: Story = {
  render: () => <FootnotesPaneHost />,
  play: async () => {
    await waitForNoteEditor();
    const { caller, undo, row } = measureToolbar();

    // Undo starts just past the caller dropdown - one gap, not a gulf.
    expect(undo.left - caller.right).toBeLessThan(40);
    // And the cluster stays at the start of the row rather than riding its trailing edge.
    expect(row.right - undo.right).toBeGreaterThan(100);

    // The editing row takes its turn in the tab order where the note it replaced sat: tabbing
    // forward off the row above it, and backward off the row below it, both land inside it.
    const editingRow = getEditingRow();
    const rows = document.querySelectorAll<HTMLElement>('li[role="option"]');
    rows[0].focus();
    await userEvent.tab();
    expect(editingRow.contains(document.activeElement)).toBe(true);

    rows[1].focus();
    await userEvent.tab({ shift: true });
    expect(editingRow.contains(document.activeElement)).toBe(true);
  },
};

/**
 * The popover is sized to its own content and carries Cancel/Save, so it keeps the opposite
 * arrangement: undo/redo sit with those two at the end of the toolbar row, well clear of the caller
 * dropdown. The contrast with the story above is what makes each layout falsifiable - moving the
 * buttons on either surface breaks exactly one of the two.
 */
export const PopoverToolbarKeepsUndoRedoAtTheEnd: Story = {
  render: () => <PopoverHost />,
  play: async () => {
    await waitForNoteEditor();
    const { scope, noteType, caller, undo, row } = measureToolbar();

    // Both dropdowns on one line (at a width where wrapping would split them, see
    // `NarrowPopoverKeepsTheDropdownsTogether`).
    expect(Math.abs(caller.top - noteType.top)).toBeLessThan(1);
    // Clearly separated from the caller dropdown, not clustered with it.
    expect(undo.left - caller.right).toBeGreaterThan(40);
    // And the group it leads runs out to the end of the row, with Save last.
    const save = scope.getByRole('button', { name: 'Save footnote' }).getBoundingClientRect();
    expect(save.right).toBeGreaterThan(undo.right);
    expect(row.right - save.right).toBeLessThan(4);
  },
};

/**
 * The popover's minimum width gives way to a narrow pane or a zoomed pop-up, so the toolbar row can
 * be far narrower than the default story's. There the note-type and caller dropdowns must still
 * share a line: only the inline editor's cluster wraps.
 */
export const NarrowPopoverKeepsTheDropdownsTogether: Story = {
  render: () => <PopoverHost contentClassName="tw:w-[270px]" />,
  play: async () => {
    await waitForNoteEditor();
    const { caller, noteType } = measureToolbar();

    expect(Math.abs(caller.top - noteType.top)).toBeLessThan(1);
  },
};

/**
 * Happy path: opening a new-note popover and pressing Enter inserts a footnote paragraph (`\fp`)
 * inside the note and does NOT split the wrapper paragraph. Pre-fix, the DOM caret parked by
 * Radix's open-autofocus left Enter splitting the wrapper instead.
 */
export const EnterInsertsFootnoteParagraph: Story = {
  render: () => <PopoverHost />,
  play: async () => {
    const { editorInput, lexical } = await waitForNoteEditor();
    expect(rootChildCount(lexical)).toBe(1);
    expect(noteCharMarkers(lexical)).not.toContain('fp');

    editorInput.focus();
    await userEvent.keyboard('{Enter}');
    await waitFor(() => expect(noteCharMarkers(lexical)).toContain('fp'));

    // Enter inserted a footnote paragraph inside the note; the wrapper para was not split.
    expect(rootChildCount(lexical)).toBe(1);
  },
};

/**
 * Each `\fp` (footnote paragraph) must DISPLAY like a paragraph start — its span begins on a new
 * visual line — while the note stays one inline run in the data (no newline in the DOM text, USJ,
 * or USFM). The break comes from a `::before { content: '\A' }` generated line break in
 * editor-overrides.css, so this needs a real layout engine: jsdom computes no line boxes. Also pins
 * that the mechanism keeps the spans inline: the `\f*` closer glyph stays on the SAME line as the
 * last `\fp`'s content (a `display: block` approach would push it to its own line), and that a
 * click inside an `\fp` still lands the caret in that span (the pseudo-element is not in the DOM,
 * so it can't capture the caret).
 */
export const FootnoteParagraphsRenderOnNewLines: Story = {
  render: () => <PopoverHost noteOps={[twoFpNoteOp]} />,
  play: async () => {
    const { editorInput } = await waitForNoteEditor();

    const note = editorInput.querySelector('span.note');
    if (!note) throw new Error('expanded note span not found');
    expect(note.classList.contains('expanded')).toBe(true);

    const ft = note.querySelector('span.usfm_ft');
    const fps = note.querySelectorAll('span.usfm_fp');
    if (!ft) throw new Error('\\ft span not found');
    expect(fps).toHaveLength(2);

    // Each \fp starts a NEW visual line: strictly increasing line tops from \ft to each \fp.
    const ftRect = ft.getBoundingClientRect();
    const fp1Rect = fps[0].getBoundingClientRect();
    const fp2Rect = fps[1].getBoundingClientRect();
    expect(fp1Rect.top).toBeGreaterThan(ftRect.top);
    expect(fp2Rect.top).toBeGreaterThan(fp1Rect.top);

    // The note's \f* closer glyph shares the last \fp's line (vertical bands overlap) — the
    // break mechanism must keep the \fp spans inline rather than turning them into blocks.
    const closer = note.querySelector('span.closing[data-marker="f"]');
    if (!closer) throw new Error('\\f* closer glyph not found');
    const closerRect = closer.getBoundingClientRect();
    expect(closerRect.top).toBeLessThan(fp2Rect.bottom);
    expect(closerRect.bottom).toBeGreaterThan(fp2Rect.top);

    // The line breaks are generated content only — no newline character exists in the DOM text.
    expect(editorInput.textContent).not.toContain('\n');

    // Click targeting: clicking the second \fp's text parks the caret inside that span.
    await userEvent.pointer({ keys: '[MouseLeft]', target: fps[1] });
    await waitFor(() => {
      const selection = document.getSelection();
      const anchorNode = selection?.anchorNode;
      expect(anchorNode && fps[1].contains(anchorNode)).toBe(true);
    });
  },
};

/**
 * The host Enter-guard's contract, reproduced deterministically against real Lexical: with the DOM
 * caret parked OUTSIDE the note content (the state Radix's open-autofocus produces), the guard
 * CLAIMS the first Enter and reroutes the caret into the note (no `\fp` inserted on that press);
 * the second Enter — now with the caret inside — reaches Lexical's `$handleEnterInNote` and inserts
 * the `\fp`. Falsifiable: temporarily disabling the guard makes that first Enter reach the engine
 * directly and insert `\fp` immediately, failing the `not.toContain('fp')` assertion (verified).
 * The wrapper is never split either way — the engine's own KEY_ENTER fix prevents that
 * independently — so this story isolates the host guard's claim-and-reroute behavior.
 */
export const EnterWithCaretParkedOutsideNoteIsGuarded: Story = {
  render: () => <PopoverHost />,
  play: async () => {
    const { editorInput, lexical } = await waitForNoteEditor();
    const doc = editorInput.ownerDocument;

    // Park the DOM caret at the wrapper-para start (outside span.note) and focus the editor — the
    // exact precondition Radix's open-autofocus creates.
    const parkCaretAtWrapperStart = () => {
      editorInput.focus();
      const selection = doc.getSelection();
      if (!selection) throw new Error('no DOM selection available');
      const range = doc.createRange();
      range.setStart(editorInput, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    };

    parkCaretAtWrapperStart();
    dispatchEnter(editorInput);
    await new Promise((resolve) => {
      setTimeout(resolve, 40);
    });

    // First Enter was claimed by the guard: no wrapper split and no `\fp` inserted yet.
    expect(rootChildCount(lexical)).toBe(1);
    expect(noteCharMarkers(lexical)).not.toContain('fp');

    // Second Enter, now with the caret routed into the note, inserts the footnote paragraph.
    dispatchEnter(editorInput);
    await waitFor(() => expect(noteCharMarkers(lexical)).toContain('fp'));
    expect(rootChildCount(lexical)).toBe(1);
  },
};
