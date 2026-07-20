// @vitest-environment jsdom
import { forwardRef, useImperativeHandle } from 'react';
import { describe, it, expect, beforeAll, vi } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import type {
  EditorOptions,
  EditorRef,
  MarkerMenuContext,
  MarkerMenuItem as EditorMarkerMenuItem,
} from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import FootnoteEditor, {
  FootnoteEditorMarkerPalette,
  markerMenuItemToPaletteItemLike,
} from './footnote-editor.component';
import {
  FOOTNOTE_EDITOR_STRING_KEYS,
  FootnoteEditorLocalizedStrings,
} from './footnote-editor.types';

// cmdk (Command/CommandInput, used by the inline MarkerMenu popover) instantiates a
// ResizeObserver on mount and schedules scrollTo/scrollIntoView; jsdom ships none of these.
// No-op stubs are sufficient since these tests never open that popover.
class NoopResizeObserver implements ResizeObserver {
  private readonly targets = new Set<Element>();

  observe(target: Element) {
    this.targets.add(target);
  }

  unobserve(target: Element) {
    this.targets.delete(target);
  }

  disconnect() {
    this.targets.clear();
  }
}

beforeAll(() => {
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = NoopResizeObserver;
  }
  if (typeof Element.prototype.scrollTo !== 'function') {
    Element.prototype.scrollTo = () => {};
  }
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
});

/**
 * Mutable holder for the mocked `EditorRef` the stubbed `Editorial` below exposes via
 * `useImperativeHandle`. Declared with `vi.hoisted` so the `vi.mock` factory (itself hoisted to the
 * top of the file by Vitest) can close over it.
 */
const { mockEditorRefHolder, mockGetMarkerMenuItems } = vi.hoisted(() => ({
  mockEditorRefHolder: {
    // Placeholder only — every test overwrites this with a full mock (see `renderFootnoteEditor`)
    // before rendering, so the empty object is never actually read as an `EditorRef`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    current: {} as EditorRef,
  },
  mockGetMarkerMenuItems: vi.fn(),
}));

// Replaces the real `Editorial` with a minimal stub exposing `.editor-input` (queried by the
// component's own keydown-scoping logic) and forwarding whatever `EditorRef` mock the test set up
// in `mockEditorRefHolder.current`. `getMarkerMenuItems` is also replaced so tests can control
// exactly which menu items a `\` trigger offers without depending on the real stylesheet/PT9
// business rules (covered by the editor package's own test suite, not this component's).
vi.mock('@eten-tech-foundation/platform-editor', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@eten-tech-foundation/platform-editor')>();
  return {
    ...actual,
    getMarkerMenuItems: mockGetMarkerMenuItems,
    Editorial: forwardRef<EditorRef>((_props, ref) => {
      useImperativeHandle(ref, () => mockEditorRefHolder.current);
      // This stub only stands in for the real editor in tests that dispatch keydown events at
      // `document` and check `document.activeElement`; it's never navigated via Tab/keyboard, so
      // it doesn't need the interaction handlers a real focusable non-form element would.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      return <div className="editor-input" tabIndex={0} data-testid="popover-editor-input" />;
    }),
  };
});

function buildLocalizedStrings(): FootnoteEditorLocalizedStrings {
  const entries = FOOTNOTE_EDITOR_STRING_KEYS.map((key) => [key, key] as const);
  // `FootnoteEditorLocalizedStrings` is a mapped type over every key in
  // `FOOTNOTE_EDITOR_STRING_KEYS`; building it from `Object.fromEntries` is simpler than spelling
  // out every key by hand, but `Object.fromEntries`'s return type is necessarily untyped.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return Object.fromEntries(entries) as FootnoteEditorLocalizedStrings;
}

const scrRef: SerializedVerseRef = {
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
  verse: '1',
};

function makeMarkerPalette(show: FootnoteEditorMarkerPalette['show'] = vi.fn()) {
  return {
    show,
    update: vi.fn().mockResolvedValue(undefined),
    commit: vi.fn().mockResolvedValue(undefined),
    dismiss: vi.fn().mockResolvedValue(undefined),
  } satisfies FootnoteEditorMarkerPalette;
}

/**
 * Gives the mocked editor a note whose content holds the DOM caret — the "caret inside the note
 * body" state the popover's caret-discipline guards check via `isDomCaretInsideNote()`. Without it,
 * Enter and `\` are claimed and rerouted into the note instead of reaching their handlers.
 */
function placeDomCaretInsideNote(editorInput: HTMLElement): void {
  const doc = editorInput.ownerDocument;
  let note = editorInput.querySelector('span.note');
  if (!note) {
    note = doc.createElement('span');
    note.classList.add('note');
    note.textContent = 'note text';
    editorInput.appendChild(note);
  }
  const selection = doc.getSelection();
  const range = doc.createRange();
  if (!note.firstChild || !selection) throw new Error('mock note text/selection missing');
  range.setStart(note.firstChild, 2);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

/**
 * Places the DOM caret in the popover's wrapper-para "dead space" — a sibling text node outside
 * `span.note` — the state a click on the wrapper paragraph / margins produces. Mirrors
 * `placeDomCaretInsideNote` above, but deliberately selects OUTSIDE the note so
 * `isDomCaretInsideNote()` reports false, the precondition the stray-caret snap guard checks.
 */
function placeDomCaretOutsideNote(editorInput: HTMLElement): void {
  const doc = editorInput.ownerDocument;
  let deadSpace = editorInput.querySelector('[data-dead-space]');
  if (!deadSpace) {
    deadSpace = doc.createElement('span');
    deadSpace.setAttribute('data-dead-space', 'true');
    deadSpace.textContent = 'wrapper para dead space';
    editorInput.insertBefore(deadSpace, editorInput.firstChild);
  }
  const selection = doc.getSelection();
  const range = doc.createRange();
  if (!deadSpace.firstChild || !selection)
    throw new Error('mock dead-space text/selection missing');
  range.setStart(deadSpace.firstChild, 0);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function renderFootnoteEditor(
  editorOptions: EditorOptions,
  markerPalette?: FootnoteEditorMarkerPalette,
) {
  // EditorRef has many required methods; using a partial mock via type assertion is simpler than
  // stubbing all of them in a test (same rationale as
  // editor-keyboard-shortcuts.component.test.tsx's `makeEditorRef`).
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  mockEditorRefHolder.current = {
    focus: vi.fn(),
    undo: vi.fn(),
    redo: vi.fn(),
    cut: vi.fn(),
    copy: vi.fn(),
    paste: vi.fn(),
    pastePlainText: vi.fn(),
    getUsj: vi.fn(),
    setUsj: vi.fn(),
    applyUpdate: vi.fn(),
    replaceEmbedUpdate: vi.fn(),
    getSelection: vi.fn(),
    setSelection: vi.fn(),
    setAnnotation: vi.fn(),
    removeAnnotation: vi.fn(),
    formatPara: vi.fn(),
    getElementByKey: vi.fn(),
    insertMarker: vi.fn(),
    getMarkerMenuContext: vi.fn(),
    applyMarkerMenuSelection: vi.fn(),
    splitParagraphWithMarker: vi.fn(),
    commitPendingMarkerEdits: vi.fn(),
    insertNote: vi.fn(),
    getNoteOps: vi.fn(() => []),
    selectNote: vi.fn(),
  } as unknown as EditorRef;

  // Builder so a test can re-render with a different scrRef to exercise the book/chapter-change
  // close-and-save path (see the "close-and-save settle" suite).
  const renderElement = (currentScrRef: SerializedVerseRef) => (
    <FootnoteEditor
      noteOps={undefined}
      onClose={() => {}}
      scrRef={currentScrRef}
      noteKey={undefined}
      editorOptions={editorOptions}
      defaultMarkerMenuTrigger={'\\'}
      localizedStrings={buildLocalizedStrings()}
      markerPalette={markerPalette}
    />
  );

  const utils = render(renderElement(scrRef));

  const editorInput = utils.getByTestId('popover-editor-input');
  editorInput.focus();
  return {
    ...utils,
    editorInput,
    editorRef: mockEditorRefHolder.current,
    /** Re-render with a new scrRef; a book/chapter change triggers closeAndSave (save-and-close). */
    rerenderScrRef: (nextScrRef: SerializedVerseRef) => utils.rerender(renderElement(nextScrRef)),
  };
}

function makeItem(overrides: Partial<EditorMarkerMenuItem> = {}): EditorMarkerMenuItem {
  return {
    marker: 'wj',
    kind: 'character',
    description: 'Words of Jesus',
    isBasic: true,
    ...overrides,
  };
}

type MockMarkerMenuContext = MarkerMenuContext & {
  anchorRect?: { x: number; y: number; width: number; height: number };
};

/**
 * Sets the next return value of the mocked `getMarkerMenuContext`. Centralizes the one place this
 * file needs to reach past `EditorRef`'s plain-function public type to reach the underlying
 * `vi.fn()` mock (every `editorRef.getMarkerMenuContext` in these tests is always a `vi.fn()` — see
 * `renderFootnoteEditor`), instead of repeating the assertion at every call site.
 */
function mockMarkerMenuContext(editorRef: EditorRef, ctx: MockMarkerMenuContext) {
  // `EditorRef`'s public type declares a plain function; reaching `.mockReturnValue` requires
  // this cast (see the JSDoc above for why it's centralized to this one call site).
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (editorRef.getMarkerMenuContext as ReturnType<typeof vi.fn>).mockReturnValue(ctx);
}

describe('FootnoteEditor marker palette wiring', () => {
  describe('editable marker mode, no markerPalette prop (pass-through degradation)', () => {
    it('lets a typed backslash land as a literal character', () => {
      const { editorInput } = renderFootnoteEditor({
        view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
      });
      placeDomCaretInsideNote(editorInput);
      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      expect(notPrevented).toBe(true);
      expect(mockGetMarkerMenuItems).not.toHaveBeenCalled();
    });
  });

  describe('editable marker mode with markerPalette, collapsed caret (passive palette)', () => {
    it('opens a passive palette without preventing default and does not steal focus', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const show = vi.fn(() => new Promise<string | undefined>(() => {}));
      const markerPalette = makeMarkerPalette(show);
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: false,
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );

      expect(notPrevented).toBe(true);
      expect(show).toHaveBeenCalledWith(
        [markerMenuItemToPaletteItemLike(makeItem())],
        { x: 1, y: 2, width: 3, height: 4 },
        true,
      );
    });

    it('applies the resolved item and refocuses the editor when the palette resolves with an id', async () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem({ marker: 'nd' })]);
      let resolveShow: (id: string | undefined) => void = () => {};
      const showPromise = new Promise<string | undefined>((resolve) => {
        resolveShow = resolve;
      });
      const markerPalette = makeMarkerPalette(vi.fn(() => showPromise));
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: false,
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      resolveShow('nd');
      await showPromise;
      // Flush the promise microtask queue so the `.then` handler runs.
      await Promise.resolve();

      expect(editorRef.applyMarkerMenuSelection).toHaveBeenCalledWith(makeItem({ marker: 'nd' }), {
        trigger: 'backslash',
        literalPrefixLanded: true,
      });
      expect(editorRef.focus).toHaveBeenCalled();
    });
  });

  describe('editable marker mode with markerPalette, an open session forwarding table', () => {
    it('mirrors typed marker characters into the palette filter instead of dismissing', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette(
        vi.fn(() => new Promise<string | undefined>(() => {})),
      );
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: false,
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'w', bubbles: true, cancelable: true }),
      );

      expect(notPrevented).toBe(true);
      expect(markerPalette.update).toHaveBeenCalledWith({ filterText: 'w' });
      expect(markerPalette.dismiss).not.toHaveBeenCalled();
    });

    it('ignores pure modifier keydowns without dismissing the session', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette(
        vi.fn(() => new Promise<string | undefined>(() => {})),
      );
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: false,
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Shift', bubbles: true, cancelable: true }),
      );

      expect(markerPalette.dismiss).not.toHaveBeenCalled();
      expect(markerPalette.update).not.toHaveBeenCalled();
    });

    it('claims in-session Enter in CAPTURE so the editor never mutates before the commit (no double mutation)', () => {
      // Pre-fix this handler was bubble-phase without stopPropagation,
      // so an in-session Enter reached MarkerEditPlugin's KEY_ENTER first — the editor inserted
      // `\fp`/plain-split BEFORE the palette commit applied (double mutation with an uncleaned
      // literal). The claim must prevent default AND stop the event from propagating onward.
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette(
        vi.fn(() => new Promise<string | undefined>(() => {})),
      );
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: false,
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      // A stand-in for Lexical's own root-element keydown handling: registered at the window
      // ABOVE the document, bubble phase — stopPropagation from the capture-phase session table
      // must keep it from ever seeing the Enter.
      const editorSawEnter = vi.fn();
      const doc = editorInput.ownerDocument;
      doc.defaultView?.addEventListener('keydown', editorSawEnter);
      const notPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );
      doc.defaultView?.removeEventListener('keydown', editorSawEnter);

      expect(notPrevented).toBe(false); // claimed
      expect(editorSawEnter).not.toHaveBeenCalled(); // propagation stopped
      expect(markerPalette.commit).toHaveBeenCalledOnce(); // the palette applies, alone
    });

    it('tracks a SELECTION session for the focused wrap palette and claims typed keys', () => {
      // The wrap palette previously set the session to
      // undefined, so typing landed in the document and replaced the wrapped selection.
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette(
        vi.fn(() => new Promise<string | undefined>(() => {})),
      );
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: true, // selection-wrap -> focused palette
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      const doc = editorInput.ownerDocument;
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      const typedNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'w', bubbles: true, cancelable: true }),
      );
      expect(typedNotPrevented).toBe(false); // claimed - must NOT replace the selection
      expect(markerPalette.update).toHaveBeenCalledWith({ filterText: 'w' });

      const escapeNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
      );
      expect(escapeNotPrevented).toBe(false);
      expect(markerPalette.dismiss).toHaveBeenCalledOnce();
    });

    it('lets Space land and dismisses the palette (PT9 Tier-2 commit takes over)', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette(
        vi.fn(() => new Promise<string | undefined>(() => {})),
      );
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: false,
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }),
      );

      expect(notPrevented).toBe(true);
      expect(markerPalette.dismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('Enter inside the popover', () => {
    it('with the caret inside the note content: never intercepted (stays on the library \\fp path)', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette();
      const { editorInput } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      // The caret sits inside the note — the state where the library's own KEY_ENTER handler
      // ($handleEnterInNote → \fp) must receive the event.
      placeDomCaretInsideNote(editorInput);

      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );

      expect(notPrevented).toBe(true);
      expect(markerPalette.show).not.toHaveBeenCalled();
      expect(markerPalette.commit).not.toHaveBeenCalled();
    });

    it('with the DOM caret outside the note: `\\` is claimed and rerouted (no wrapper-context palette)', () => {
      // Same discipline as Enter: a `\` typed while the caret is parked on the wrapper para
      // would open the palette against the WRONG context (paragraph markers instead of \ft/\fq)
      // and land the literal outside the note.
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette();
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );

      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );

      expect(notPrevented).toBe(false); // claimed — the literal must not land outside the note
      expect(editorRef.selectNote).toHaveBeenCalledWith(0);
      expect(markerPalette.show).not.toHaveBeenCalled();
    });

    it('with the DOM caret outside the note content: claimed and rerouted into the note', () => {
      // Radix's open-autofocus can park the DOM caret at the wrapper-para start; Enter there
      // used to plain-split the wrapper instead of inserting \fp. The guard claims the key and
      // routes the caret into the note instead.
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette();
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );

      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );

      expect(notPrevented).toBe(false); // claimed — must not reach Lexical's split path
      expect(editorRef.selectNote).toHaveBeenCalledWith(0);
      expect(markerPalette.show).not.toHaveBeenCalled();
      expect(markerPalette.commit).not.toHaveBeenCalled();
    });
  });

  describe('non-editable marker mode', () => {
    it('never calls the markerPalette prop even when one is supplied', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette();
      const { editorInput } = renderFootnoteEditor(
        { view: { markerMode: 'visible', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );

      placeDomCaretInsideNote(editorInput);
      editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );

      expect(markerPalette.show).not.toHaveBeenCalled();
    });
  });
});

describe('stray caret snap (wrapper-para dead-space normalization)', () => {
  // Enter and `\` (above) only reroute a stray caret when the user happens to press one of those
  // specific keys. A click on the wrapper paragraph / margins followed by ORDINARY letters needs no
  // keydown interception at all — the letters just land wherever the DOM caret already is. This
  // guard normalizes the selection itself (pointerup / selectionchange) so plain typing after a
  // dead-space click still lands in the note.
  it('snaps a selection landing outside the note (dead space) back into the note on pointerup', () => {
    const { editorInput, editorRef } = renderFootnoteEditor({
      view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
    });
    placeDomCaretOutsideNote(editorInput);

    editorInput.ownerDocument.dispatchEvent(new Event('pointerup', { bubbles: true }));

    expect(editorRef.selectNote).toHaveBeenCalledWith(0);
    expect(editorRef.focus).toHaveBeenCalled();
  });

  it('leaves a selection already inside the note untouched on selectionchange (no loop, no override)', () => {
    const { editorInput, editorRef } = renderFootnoteEditor({
      view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
    });
    placeDomCaretInsideNote(editorInput);
    // The mount-time "return focus to the editor" effect already called `focus()` once before this
    // point (unrelated to this guard) — clear it so the assertion below isolates this guard's own
    // behavior rather than that pre-existing call.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (editorRef.focus as ReturnType<typeof vi.fn>).mockClear();

    editorInput.ownerDocument.dispatchEvent(new Event('selectionchange'));

    expect(editorRef.selectNote).not.toHaveBeenCalled();
    expect(editorRef.focus).not.toHaveBeenCalled();
  });
});

describe('close-and-save settle (abandonment window)', () => {
  // closeAndSave runs commitPendingMarkerEdits() before the final note-op read so a marker rename
  // the user walked away from mid-edit serializes as what's on screen, not the stale pre-rename
  // marker — EXCEPT while this popover's own marker-palette session is open, where the palette's
  // own apply must be the one to consume the typed literal. These tests drive closeAndSave through
  // the book/chapter-change path (navigating away closes-and-saves the open note), which invokes
  // the same callback as the Save button without depending on the accept button's enabled state.
  const editorOptions: EditorOptions = {
    view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
  };
  const nextChapterScrRef: SerializedVerseRef = { ...scrRef, chapterNum: 2 };

  it('commits pending marker edits before saving when no palette session is open', () => {
    const { editorRef, rerenderScrRef } = renderFootnoteEditor(editorOptions, makeMarkerPalette());

    rerenderScrRef(nextChapterScrRef);

    expect(editorRef.commitPendingMarkerEdits).toHaveBeenCalledOnce();
  });

  it('skips the settle while a marker-palette session is open', () => {
    mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
    const markerPalette = makeMarkerPalette(vi.fn(() => new Promise<string | undefined>(() => {})));
    const { editorInput, editorRef, rerenderScrRef } = renderFootnoteEditor(
      editorOptions,
      markerPalette,
    );
    mockMarkerMenuContext(editorRef, {
      source: 'character',
      previousParaMarkers: [],
      openCharMarkers: [],
      hasTextSelection: false,
      inMarkerText: false,
      anchorRect: { x: 1, y: 2, width: 3, height: 4 },
    });
    // Open a live palette session — its `show` promise never resolves, so the session stays open
    // across the chapter-change close-and-save below.
    placeDomCaretInsideNote(editorInput);
    editorInput.ownerDocument.dispatchEvent(
      new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
    );

    rerenderScrRef(nextChapterScrRef);

    expect(editorRef.commitPendingMarkerEdits).not.toHaveBeenCalled();
  });
});

describe('markerMenuItemToPaletteItemLike', () => {
  it('maps id/label/description directly from the marker-menu item', () => {
    expect(
      markerMenuItemToPaletteItemLike({
        marker: 'wj',
        kind: 'character',
        description: 'Words of Jesus',
        isBasic: true,
      }),
    ).toEqual({
      id: 'wj',
      label: 'wj',
      description: 'Words of Jesus',
      badge: undefined,
      muted: false,
    });
  });

  it('gives close-tag items an "end" badge', () => {
    expect(
      markerMenuItemToPaletteItemLike({ marker: 'wj*', kind: 'closeTag', isBasic: true }).badge,
    ).toBe('end');
  });

  it('does not badge non-close-tag items', () => {
    expect(
      markerMenuItemToPaletteItemLike({ marker: 'zln', kind: 'character', isBasic: false }).badge,
    ).toBeUndefined();
  });

  it('mutes non-basic items and leaves basic items unmuted', () => {
    expect(
      markerMenuItemToPaletteItemLike({ marker: 'zln', kind: 'character', isBasic: false }).muted,
    ).toBe(true);
    expect(
      markerMenuItemToPaletteItemLike({ marker: 'wj', kind: 'character', isBasic: true }).muted,
    ).toBe(false);
  });
});
