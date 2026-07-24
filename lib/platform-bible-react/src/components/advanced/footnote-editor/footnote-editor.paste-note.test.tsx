// @vitest-environment jsdom
/**
 * Popover multi-line paste inside the expanded note (REAL `Editorial` mount): inside note content a
 * pasted line break must become an `\fp` (footnote-paragraph) break — the same break Enter makes
 * there — never a paragraph split threading `\p` paragraphs through the inline note.
 *
 * The live failure this pins (diagnosed empirically in this harness): the paste claim itself works
 * whenever the editor-state caret truly sits in the note, but a LIVE paste is dispatched
 * asynchronously — `ClipboardPlugin` intercepts Ctrl+V on the editor root, prevents the native
 * paste, reads `navigator.clipboard`, and only then dispatches a SYNTHESIZED ClipboardEvent. In
 * that gap selection processing can park the editor-state caret OUTSIDE the note (observed here and
 * live-documented for this popover: on the wrapper paragraph's `\p` marker glyph — the Radix
 * open-autofocus parking spot) while the user still SEES the caret inside the note. The claim then
 * declined and RichText's paste split `\p` paragraphs through the popover document. The engine fix
 * adopts the user-visible DOM caret when it maps into expanded note content.
 *
 * The clipboard payloads mirror real-world copies (the synthesized live event is a plain `{
 * clipboardData }`-shaped object; VS Code/Word/browsers ship `text/html` ALONGSIDE `text/plain` and
 * Windows sources use `\r\n`) — the shapes the engine-level plain-`\n`-only jsdom tests did not
 * cover.
 */
import { act } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  $getRoot,
  $isElementNode,
  $isTextNode,
  LexicalEditor,
  LexicalNode,
  PASTE_COMMAND,
  TextNode,
} from 'lexical';
import { editableView, renderPopoverAndWaitForInit } from './footnote-editor.test-harness';

// jsdom implements neither `ClipboardEvent` nor `DragEvent`, but Lexical's paste path
// (`eventFiles`/`onPasteForRichText`) references both as bare globals for its klass checks, so the
// identifiers must resolve. The stubs never have to MATCH: the mock event below is a plain object
// (the same shape the synthesized live event presents to duck-typed readers), so Lexical's
// constructor-name comparisons all decline and it falls through to the `event.clipboardData` read
// — the exact path a real ClipboardEvent takes.
const globalStubs: { DragEvent?: unknown; ClipboardEvent?: unknown } = globalThis;
// Named function stubs (not classes) — only the identifier and its `.name` matter to Lexical's
// constructor-name comparisons; nothing is ever instantiated.
if (typeof globalStubs.DragEvent === 'undefined') globalStubs.DragEvent = function DragEvent() {};
if (typeof globalStubs.ClipboardEvent === 'undefined')
  globalStubs.ClipboardEvent = function ClipboardEvent() {};

// jsdom doesn't implement `getBoundingClientRect` on `Range`; Lexical's post-commit
// scroll-into-view reads the collapsed DOM selection's range rect. Stub it (a zero rect nothing
// here asserts on) — same as the sibling palette-commit suite.
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

/**
 * A paste event carrying the flavors a real-world copy delivers, duck-typed like the live
 * synthesized event — a plain object with `clipboardData`.
 */
function pasteEvent(flavors: { [mime: string]: string }): ClipboardEvent {
  const clipboardData = {
    types: Object.keys(flavors),
    files: [],
    getData: (type: string) => flavors[type] ?? '',
  };
  // The mock is deliberately NOT a real ClipboardEvent (jsdom has none; the live synthesized
  // event is duck-typed the same way), so the assertion is the only way to hand it to
  // PASTE_COMMAND's typed dispatch.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { clipboardData, preventDefault: () => undefined } as unknown as ClipboardEvent;
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

/** Finds the wrapper paragraph's `\p` marker-glyph node (the live stray-caret parking spot). */
function $findWrapperParaGlyph(): TextNode {
  let found: TextNode | undefined;
  const walk = (node: LexicalNode): void => {
    if (
      !found &&
      $isTextNode(node) &&
      node.getType() === 'marker' &&
      node.getTextContent() === '\\p'
    )
      found = node;
    if ($isElementNode(node)) node.getChildren().forEach(walk);
  };
  walk($getRoot());
  if (!found) throw new Error('wrapper paragraph glyph not found');
  return found;
}

/** Sets the DOM caret at the end of the `\ft` content's DOM text node (inside `span.note`). */
function placeDomCaretAtFtTextEnd(editorInput: HTMLElement): void {
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
  range.setStart(domText, domText.data.length);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

/**
 * Puts BOTH carets (Lexical editor state and DOM) at the END of the `\ft` content — the caret the
 * user sees, with state and DOM agreeing (the palette-commit suite's discipline).
 */
async function placeAgreedCaretAtFtTextEnd(
  lexical: LexicalEditor,
  editorInput: HTMLElement,
): Promise<void> {
  await act(async () => {
    editorInput.focus();
    lexical.update(() => {
      const ft = $findFtTextNode();
      ft.select(ft.getTextContentSize(), ft.getTextContentSize());
    });
    await Promise.resolve();
  });
  placeDomCaretAtFtTextEnd(editorInput);
}

/**
 * Post-paste editor-state snapshot:
 *
 * - `paragraphCount` — top-level blocks; the popover's document is ONE wrapper paragraph, so any
 *   higher count means the paste split paragraphs (the live `\p`-splits failure).
 * - `noteCount` — a torn note shows up as extra/zero notes.
 * - `noteCharMarkers` — the note's char-span markers in order (each `\fp` break appends "fp").
 * - `noteText` / `rootText` — content placement checks (includes `\r`/literal-marker leaks).
 */
function readPasteOutcome(lexical: LexicalEditor) {
  return lexical.getEditorState().read(() => {
    let noteCount = 0;
    const noteCharMarkers: string[] = [];
    let noteText = '';
    const walk = (node: LexicalNode): void => {
      if (node.getType() === 'note') {
        noteCount += 1;
        noteText = node.getTextContent();
        if ($isElementNode(node)) {
          node.getChildren().forEach((child) => {
            if (child.getType() === 'char') {
              // The linked editor package doesn't export its CharNode class (or $isCharNode) for
              // platform-bible-react to narrow against, so duck-type the marker accessor.
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              const charLike = child as unknown as { getMarker?: () => string };
              if (typeof charLike.getMarker === 'function')
                noteCharMarkers.push(charLike.getMarker());
            }
          });
        }
      }
      if ($isElementNode(node)) node.getChildren().forEach(walk);
    };
    walk($getRoot());
    return {
      paragraphCount: $getRoot().getChildrenSize(),
      noteCount,
      noteCharMarkers,
      noteText,
      rootText: $getRoot().getTextContent(),
    };
  });
}

/** Waits for the engine's post-paste async passes (transform cascade, re-tokenization). */
async function settle(): Promise<void> {
  await act(async () => {
    await Promise.resolve();
    await new Promise((resolve) => {
      setTimeout(resolve, 50);
    });
  });
}

describe('FootnoteEditor multi-line paste inside the expanded note (real Editorial)', () => {
  it('claims the paste when the state caret STRAYED to the wrapper glyph while the DOM caret is in the note (live dispatch shape)', async () => {
    // The deterministic live-failure shape: the user-visible (DOM) caret is inside the note, but
    // by async-dispatch time the editor-state caret is parked on the wrapper `\p` glyph. The
    // paste and the divergence are set up in ONE synchronous block so jsdom's async
    // selectionchange reconcile can't heal the divergence before the dispatch — exactly the
    // ordering the live async ClipboardPlugin dispatch produces.
    const { utils, editorInput, lexical } = await renderPopoverAndWaitForInit(editableView);

    await act(async () => {
      editorInput.focus();
      lexical.update(() => {
        const glyph = $findWrapperParaGlyph();
        glyph.select(0, 0);
      });
      await Promise.resolve();
    });
    await act(async () => {
      placeDomCaretAtFtTextEnd(editorInput);
      lexical.dispatchCommand(
        PASTE_COMMAND,
        pasteEvent({
          'text/plain': 'first\r\nsecond',
          'text/html': '<html><body><p>first</p><p>second</p></body></html>',
        }),
      );
      await Promise.resolve();
    });
    await settle();

    const outcome = readPasteOutcome(lexical);
    utils.unmount();
    // Pre-fix: the claim declined against the strayed state caret and RichText split `\p`
    // paragraphs through the popover document (live-observed).
    expect(outcome.paragraphCount).toBe(1);
    expect(outcome.noteCount).toBe(1);
    expect(outcome.noteCharMarkers).toContain('fp');
    expect(outcome.noteText).toContain('first');
    expect(outcome.noteText).toContain('second');
    expect(outcome.rootText).not.toContain('\r');
  });

  it('agreed caret in the note: text/html alongside \\r\\n text/plain still breaks with \\fp', async () => {
    const { utils, editorInput, lexical } = await renderPopoverAndWaitForInit(editableView);
    await placeAgreedCaretAtFtTextEnd(lexical, editorInput);

    await act(async () => {
      lexical.dispatchCommand(
        PASTE_COMMAND,
        pasteEvent({
          'text/plain': 'first\r\nsecond',
          'text/html': '<html><body><p>first</p><p>second</p></body></html>',
        }),
      );
      await Promise.resolve();
    });
    await settle();

    const outcome = readPasteOutcome(lexical);
    utils.unmount();
    expect(outcome.paragraphCount).toBe(1);
    expect(outcome.noteCount).toBe(1);
    expect(outcome.noteCharMarkers).toContain('fp');
    expect(outcome.noteText).toContain('first');
    expect(outcome.noteText).toContain('second');
    expect(outcome.rootText).not.toContain('\r');
  });

  it('pasted USFM with paragraph-kind markers: the markers are STRIPPED and the lines become \\fp breaks', async () => {
    // Paragraph markers have no meaning inside an inline note: each pasted line's leading
    // paragraph-kind marker converts into the note's own paragraph break form (`\fp`), keeping
    // the line text as content — never literal `\q1` text in the note.
    const { utils, editorInput, lexical } = await renderPopoverAndWaitForInit(editableView);
    await placeAgreedCaretAtFtTextEnd(lexical, editorInput);

    await act(async () => {
      lexical.dispatchCommand(
        PASTE_COMMAND,
        pasteEvent({ 'text/plain': 'test stuff\n\\q1 something\n\\q2 something else' }),
      );
      await Promise.resolve();
    });
    await settle();

    const outcome = readPasteOutcome(lexical);
    utils.unmount();
    expect(outcome.paragraphCount).toBe(1);
    expect(outcome.noteCount).toBe(1);
    // Two pasted line breaks → two \fp spans.
    expect(outcome.noteCharMarkers.filter((marker) => marker === 'fp')).toHaveLength(2);
    expect(outcome.noteText).toContain('test stuff');
    expect(outcome.noteText).toContain('something');
    expect(outcome.noteText).toContain('something else');
    // The paragraph-kind marker literals are gone from the note text, except as the \fp
    // glyphs' own "\fp" rendering.
    expect(outcome.noteText).not.toContain('\\q1');
    expect(outcome.noteText).not.toContain('\\q2');
  });
});
