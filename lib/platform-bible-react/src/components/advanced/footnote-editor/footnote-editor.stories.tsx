import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor } from 'storybook/test';
import { $getRoot, $isElementNode, LexicalEditor, LexicalNode } from 'lexical';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/shadcn-ui/popover';
import FootnoteEditor from './footnote-editor.component';
import {
  buildLocalizedStrings,
  editableView,
  scrRef,
  sentinelNoteOp,
} from './footnote-editor.fixtures';

/**
 * Real-browser (Chromium) interaction tests for the PT-4187 bug-2 popover-Enter behavior. jsdom
 * cannot reproduce this: it can't mount the Radix popover without polyfills and, even polyfilled,
 * its FocusScope focuses a `<button>` rather than parking a caret inside the contenteditable, and
 * it has no real Lexical Enter handling. These stories mount FootnoteEditor inside a REAL open
 * Radix popover (exactly as the web view does) and drive real Enter keystrokes, so they exercise
 * the autofocus → reassert → Enter-guard → Lexical `$handleEnterInNote` chain end to end.
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

/** Waits for the popover editor to mount and its deferred init (applyUpdate + reassert) to settle. */
async function waitForPopover(): Promise<{ editorInput: HTMLElement; lexical: LexicalEditor }> {
  await waitFor(() => expect(getLexical()).toBeTruthy(), { timeout: 4000 });
  await new Promise((resolve) => {
    setTimeout(resolve, 400);
  });
  const editorInput = document.querySelector('.editor-input');
  const lexical = getLexical();
  if (!(editorInput instanceof HTMLElement) || !lexical)
    throw new Error('popover editor did not mount');
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
function PopoverHost() {
  return (
    <Popover open>
      <PopoverAnchor className="tw:absolute" style={{ top: 120, left: 120 }} />
      <PopoverContent className="tw:w-max tw:min-w-[500px] tw:p-[10px]">
        <FootnoteEditor
          noteOps={[sentinelNoteOp]}
          onClose={() => {}}
          scrRef={scrRef}
          noteKey={undefined}
          isNewNote
          editorOptions={{ view: editableView }}
          defaultMarkerMenuTrigger="\"
          localizedStrings={buildLocalizedStrings()}
        />
      </PopoverContent>
    </Popover>
  );
}

/**
 * Happy path (PT-4187 bug 2): opening a new-note popover and pressing Enter inserts a footnote
 * paragraph (`\fp`) inside the note and does NOT split the wrapper paragraph. Pre-fix, the DOM
 * caret parked by Radix's open-autofocus left Enter splitting the wrapper instead.
 */
export const EnterInsertsFootnoteParagraph: Story = {
  render: () => <PopoverHost />,
  play: async () => {
    const { editorInput, lexical } = await waitForPopover();
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
    const { editorInput, lexical } = await waitForPopover();
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
