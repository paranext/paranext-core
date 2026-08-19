// @vitest-environment jsdom
/**
 * Popover marker-palette MOUSE commit vs a nulled Lexical selection: clicking a palette item steals
 * focus from this popover's editor BEFORE the commit round-trips, and Lexical's blur processing
 * then nulls the editor-state selection. With a null selection, `LexicalEditor.focus()` does NOT
 * restore the remembered caret — it falls back to `$getRoot().selectEnd()` (verified in lexical
 * 0.43's `focus()` source), which in this popover parks the caret in the note's closing `\f*`
 * glyph. The commit apply then runs against that bogus caret: historically the insert landed at the
 * document tail (live-observed as a red `\fq` after `\f*`).
 *
 * The fix captures the last live USJ selection as focus leaves the editor (focusout fires
 * synchronously, ahead of the selection nulling) and restores it via `EditorRef.setSelection`
 * before focusing and applying — so a focus-stolen commit becomes indistinguishable from a commit
 * whose selection never died (the Enter-commit path). THAT equivalence is the contract pinned here;
 * the final placement of the inserted span itself belongs to the editor engine's apply step and is
 * deliberately not asserted (see the engine's `getUsjMarkerAction` char-insertion path for in-note
 * carets — platform-editor-owned behavior).
 *
 * Under the ACTIVE palette nothing of the session's ever lands in the document — the trigger and
 * filter keystrokes are claimed — so the commit applies against a clean document with
 * `literalPrefixLanded: false` and there is no literal-cleanup half to the contract anymore; the
 * suite still asserts nothing strands as literal text (a regression signal for the apply itself).
 *
 * Like footnote-editor.enter-guard.test.tsx (with which it shares footnote-editor.test-harness),
 * this suite mounts the REAL `Editorial`: the failure is an interaction between DOM focus loss,
 * Lexical's selection state, and the apply path — unobservable with a mocked editor. The palette
 * itself stays a fake driver (`FootnoteEditorMarkerPalette`), exactly the seam the host supplies in
 * production.
 */
import { act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import {
  $getRoot,
  $isElementNode,
  $isTextNode,
  $setSelection,
  LexicalEditor,
  LexicalNode,
  TextNode,
} from 'lexical';
import type { FootnoteEditorMarkerPalette } from './footnote-editor.component';
import { editableView, renderPopoverAndWaitForInit } from './footnote-editor.test-harness';

// jsdom doesn't implement `getBoundingClientRect` on `Range`; the palette-open context reads the
// DOM selection rect for its anchor. Stub it (a zero rect nothing here asserts on) — same as the
// engine's own markerEdit tests.
if (typeof Range.prototype.getBoundingClientRect !== 'function') {
  Range.prototype.getBoundingClientRect = function getBoundingClientRect(): DOMRect {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      toJSON() {
        return this;
      },
    };
  };
}

/** Fake palette driver whose `show` promise the test resolves by hand (the commit). */
function makeDeferredMarkerPalette() {
  let resolveShow: (id: string | undefined) => void = () => {};
  const show = vi.fn<FootnoteEditorMarkerPalette['show']>(
    () =>
      new Promise<string | undefined>((resolve) => {
        resolveShow = resolve;
      }),
  );
  const markerPalette: FootnoteEditorMarkerPalette = {
    show,
    update: vi.fn().mockResolvedValue(undefined),
    commit: vi.fn().mockResolvedValue(undefined),
    dismiss: vi.fn().mockResolvedValue(undefined),
  };
  return { markerPalette, show, resolveShow: (id: string | undefined) => resolveShow(id) };
}

/** Finds the (single) Lexical TextNode holding the `\ft` content, or throws. */
function $findFtTextNode(): TextNode {
  let found: TextNode | undefined;
  const walk = (node: LexicalNode): void => {
    if ($isTextNode(node) && node.getTextContent().includes('sentinel')) found = node;
    if ($isElementNode(node)) node.getChildren().forEach(walk);
  };
  walk($getRoot());
  if (!found) throw new Error('ft content text node not found');
  return found;
}

/**
 * Puts BOTH carets (Lexical editor state and DOM) in the `\ft` content — at its END or MID-text
 * (right after "sentinel", with content following the caret — the position where a break must MOVE
 * the tail). The DOM caret must agree with the editor-state one: jsdom fires `selectionchange` for
 * the DOM placement and Lexical syncs its own selection to the DOM caret, so a mismatch would
 * silently move the editor-state caret.
 */
async function placeCaretInFtText(
  lexical: LexicalEditor,
  editorInput: HTMLElement,
  caretAt: 'end' | 'mid',
): Promise<void> {
  const offsetOf = (text: string): number =>
    caretAt === 'end' ? text.length : text.indexOf('sentinel') + 'sentinel'.length;
  await act(async () => {
    editorInput.focus();
    lexical.update(() => {
      const ft = $findFtTextNode();
      const offset = offsetOf(ft.getTextContent());
      ft.select(offset, offset);
    });
    await Promise.resolve();
  });
  const doc = editorInput.ownerDocument;
  const note = editorInput.querySelector('span.note');
  if (!note) throw new Error('span.note not found');
  const walker = doc.createTreeWalker(note, NodeFilter.SHOW_TEXT);
  let domText: Text | undefined;
  while (walker.nextNode()) {
    const candidate = walker.currentNode;
    if (candidate instanceof Text && candidate.data.includes('sentinel')) domText = candidate;
  }
  if (!domText) throw new Error('ft content DOM text node not found');
  const selection = doc.getSelection();
  if (!selection) throw new Error('no DOM selection available');
  const range = doc.createRange();
  range.setStart(domText, offsetOf(domText.data));
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

/**
 * Post-commit editor-state snapshot:
 *
 * - `tree` — an indented type/text dump of the whole document, for whole-outcome equivalence
 *   comparisons between flows.
 * - `markerCharCount` — how many `<marker>` char spans exist anywhere (a double insertion means the
 *   commit applied somewhere the literal was not).
 * - `strandedLiteralTexts` — CONTENT text still containing the raw `\<marker>` literal (marker glyph
 *   nodes legitimately render it for an inserted span, so they don't count).
 * - `paragraphCount` — top-level blocks (the popover document is ONE wrapper paragraph).
 */
function readCommitOutcome(lexical: LexicalEditor, marker = 'fq') {
  return lexical.getEditorState().read(() => {
    let markerCharCount = 0;
    const strandedLiteralTexts: string[] = [];
    const treeLines: string[] = [];
    const noteCharMarkers: string[] = [];
    const walk = (node: LexicalNode, depth: number): void => {
      treeLines.push(
        `${'  '.repeat(depth)}${node.getType()} ${JSON.stringify(
          $isElementNode(node) ? '' : node.getTextContent(),
        )}`,
      );
      if (node.getType() === 'char') {
        // The linked editor package doesn't export its CharNode class (or $isCharNode) for
        // platform-bible-react to narrow against, so duck-type the marker accessor.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const charLike = node as unknown as { getMarker?: () => string };
        if (typeof charLike.getMarker === 'function') {
          if (charLike.getMarker() === marker) markerCharCount += 1;
          // The note's DIRECT char children in document order — the break-shape signature (an
          // Enter-equivalent `\fp` break never leaves a split-off span AFTER the new one).
          if (node.getParent()?.getType() === 'note') noteCharMarkers.push(charLike.getMarker());
        }
      }
      if (
        $isTextNode(node) &&
        node.getType() !== 'marker' &&
        node.getTextContent().includes(`\\${marker}`)
      )
        strandedLiteralTexts.push(node.getTextContent());
      if ($isElementNode(node)) node.getChildren().forEach((child) => walk(child, depth + 1));
    };
    walk($getRoot(), 0);
    return {
      tree: treeLines.join('\n'),
      fqCharCount: marker === 'fq' ? markerCharCount : 0,
      markerCharCount,
      noteCharMarkers,
      strandedLiteralTexts,
      paragraphCount: $getRoot().getChildrenSize(),
    };
  });
}

/**
 * Mounts a fresh popover, opens a `\` palette session with the caret in the `\ft` content (nothing
 * lands — the active palette claims the trigger), optionally steals focus the way a palette mouse
 * click does (focusout, then Lexical's selection nulled), commits `<marker>`, and returns the
 * settled editor-state outcome. Unmounts before returning so multiple flows can run in one test
 * without their document-level listeners interfering.
 */
async function runCommitFlow({
  stealFocus,
  marker = 'fq',
  caretAt = 'end',
}: {
  stealFocus: boolean;
  marker?: string;
  caretAt?: 'end' | 'mid';
}) {
  const { markerPalette, show, resolveShow } = makeDeferredMarkerPalette();
  const { utils, editorInput, lexical } = await renderPopoverAndWaitForInit(editableView, {
    markerPalette,
  });

  await placeCaretInFtText(lexical, editorInput, caretAt);
  await act(async () => {
    editorInput.dispatchEvent(
      new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
    );
    await Promise.resolve();
  });
  // Preconditions: the session opened as a passive palette offering the marker in this note
  // context.
  expect(show).toHaveBeenCalledTimes(1);
  const [shownItems, , shownPassive] = show.mock.calls[0] ?? [];
  expect(shownPassive).toBe(true);
  expect(shownItems?.some((item) => item.id === marker)).toBe(true);

  // ACTIVE palette: no literal is typed into the document — the real flow claims the trigger and
  // filter keystrokes, so at commit time the document is clean. Let jsdom's queued
  // selectionchange processing settle so the focusout capture below (and the live-selection
  // apply) read the caret deterministically — without this the steal could capture a mid-flight
  // selection state that no real browser would surface.
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });

  if (stealFocus) {
    // The mouse press on the palette item: focus leaves the editor FIRST (focusout fires
    // synchronously at the moment of the steal), THEN Lexical's blur-path selection processing
    // nulls the editor-state selection — the exact order of the live failure.
    await act(async () => {
      editorInput.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      // Lexical's selection type is `BaseSelection | null` — null IS the "no selection" state
      // this test must produce, and undefined does not typecheck for $setSelection.
      // eslint-disable-next-line no-null/no-null
      lexical.update(() => $setSelection(null));
      await Promise.resolve();
    });
  }

  await act(async () => {
    resolveShow(marker);
    await Promise.resolve();
    await Promise.resolve();
    // Let the engine's post-commit async passes (caret snap, note-content re-tokenization)
    // settle so the outcome read is the state the user would actually see. Waits for the tree to
    // QUIESCE rather than sleeping a fixed span: a 50ms guess raced the re-tokenization under
    // full-suite load and read a mid-flight tree (a `\fq` char still carrying an `unmatched`
    // node, before the `\ft*` closer landed), which surfaced as an intermittent failure.
    let previousTree = '';
    let stableReads = 0;
    await vi.waitFor(
      () => {
        const currentTree = readCommitOutcome(lexical, marker).tree;
        stableReads = currentTree === previousTree ? stableReads + 1 : 0;
        previousTree = currentTree;
        // Several consecutive identical reads, not just two: the engine's passes are scheduled
        // far enough apart that two samples can both land in the same mid-flight state.
        if (stableReads < 4) throw new Error('editor state is still settling');
      },
      { timeout: 5_000, interval: 25 },
    );
  });

  const outcome = readCommitOutcome(lexical, marker);
  utils.unmount();
  return outcome;
}

describe('FootnoteEditor palette commit (mouse click steals focus and nulls the selection)', () => {
  it('produces the SAME result as a commit whose selection stayed live (no double insert, nothing strands)', async () => {
    const liveOutcome = await runCommitFlow({ stealFocus: false });
    const stolenOutcome = await runCommitFlow({ stealFocus: true });

    // Pre-fix the stolen flow diverged: the apply ran against the document tail (fallback
    // selectEnd) instead of the caret the user last saw.
    expect(stolenOutcome.fqCharCount).toBe(1);
    expect(stolenOutcome.strandedLiteralTexts).toEqual([]);
    expect(stolenOutcome.tree).toBe(liveOutcome.tree);
  });

  it('live-selection commit (keyboard path) inserts exactly one fq span, nothing strands', async () => {
    // Guard for the fix's restore probe: a live selection must be left completely alone — a
    // wrongly-triggered restore (stale snapshot or a jump-to-note-end fallback) would move the
    // apply off the caret the user last saw.
    const outcome = await runCommitFlow({ stealFocus: false });

    expect(outcome.fqCharCount).toBe(1);
    expect(outcome.strandedLiteralTexts).toEqual([]);
  });
});

describe('FootnoteEditor palette commit of fp (the footnote-paragraph BREAK)', () => {
  // Inside the expanded note, committing `fp` from the palette must do exactly what Enter does
  // there: the unified `\fp` break — everything after the caret within the span moves into the
  // new `\fp`. The generic char-insert route instead split
  // the `\ft` into a [head, empty `\fp`, tail] sandwich whose empty span degraded to literal
  // `\fp` text under the engine's note re-tokenization — a visual no-op with the literal left
  // in the content (live-observed: palette apply of `fp` "did nothing" for both the Enter
  // commit and the mouse-click commit). Mid-text carets are the exposed position; the tail
  // after the caret must ride the break.
  it('Enter-shaped (live selection) commit mid-\\ft: exactly one \\fp span, tail rides the break', async () => {
    const outcome = await runCommitFlow({ stealFocus: false, marker: 'fp', caretAt: 'mid' });

    expect(outcome.paragraphCount).toBe(1);
    expect(outcome.markerCharCount).toBe(1);
    expect(outcome.strandedLiteralTexts).toEqual([]);
    // The Enter break shape: the tail after the caret MOVED into the new \fp — no split-off
    // `\ft` remains after it (the sandwich shape [..., ft, fp, ft] is the generic char-insert
    // misroute this pins against).
    expect(outcome.noteCharMarkers).toEqual(['fr', 'ft', 'fp']);
  });

  it('mouse (focus-stolen) commit produces the SAME result as the live-selection one', async () => {
    const liveOutcome = await runCommitFlow({ stealFocus: false, marker: 'fp', caretAt: 'mid' });
    const stolenOutcome = await runCommitFlow({ stealFocus: true, marker: 'fp', caretAt: 'mid' });

    expect(stolenOutcome.markerCharCount).toBe(1);
    expect(stolenOutcome.strandedLiteralTexts).toEqual([]);
    expect(stolenOutcome.tree).toBe(liveOutcome.tree);
  });
});
