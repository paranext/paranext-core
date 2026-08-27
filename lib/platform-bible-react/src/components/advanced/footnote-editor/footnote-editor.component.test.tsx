// @vitest-environment jsdom
import { forwardRef, useImperativeHandle } from 'react';
import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import type {
  DeltaOpInsertNoteEmbed,
  EditorOptions,
  EditorRef,
  MarkerMenuContext,
  MarkerMenuItem as EditorMarkerMenuItem,
  SelectionRange,
} from '@eten-tech-foundation/platform-editor';
import { SerializedVerseRef } from '@sillsdev/scripture';
import FootnoteEditor, {
  FootnoteEditorMarkerPalette,
  markerMenuItemToPaletteItem,
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
const { mockEditorRefHolder, mockGetMarkerMenuItems, mockRegisterOnUsjChange } = vi.hoisted(() => ({
  mockEditorRefHolder: {
    // Placeholder only — every test overwrites this with a full mock (see `renderFootnoteEditor`)
    // before rendering, so the empty object is never actually read as an `EditorRef`.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    current: {} as EditorRef,
  },
  mockGetMarkerMenuItems: vi.fn(),
  // Records the `onUsjChange` the stubbed `Editorial` was handed, so a test can fire the editor
  // change the real editor would have: that is what evaluates note-type switchability, and so what
  // enables the note-type dropdown.
  mockRegisterOnUsjChange: vi.fn(),
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
    Editorial: forwardRef<EditorRef, { onUsjChange?: (usj: unknown) => void }>(
      ({ onUsjChange }, ref) => {
        mockRegisterOnUsjChange(onUsjChange);
        useImperativeHandle(ref, () => mockEditorRefHolder.current);
        // This stub only stands in for the real editor in tests that dispatch keydown events at
        // `document` and check `document.activeElement`; it's never navigated via Tab/keyboard, so
        // it doesn't need the interaction handlers a real focusable non-form element would.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        return <div className="editor-input" tabIndex={0} data-testid="popover-editor-input" />;
      },
    ),
  };
});

// The hoisted mock is module-scope and this config sets no `clearMocks`, so without an explicit
// reset a `not.toHaveBeenCalled()` assertion is green-or-red by TEST ORDER rather than by
// behavior — any earlier test that exercised the same path leaks its calls into later ones.
beforeEach(() => {
  mockGetMarkerMenuItems.mockClear();
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
  onChange?: (noteOps: DeltaOpInsertNoteEmbed[]) => void,
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
    commitTypedMarker: vi.fn(),
    commitTypedCloser: vi.fn(),
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
      onChange={onChange}
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

  describe('editable marker mode with markerPalette, collapsed caret (non-focus-stealing palette)', () => {
    it('claims the trigger (never lands) and opens the palette in its non-focus-stealing display', () => {
      // ACTIVE palette: the trigger `\` is claimed in every selection shape — nothing of the
      // palette's ever reaches the document. The collapsed-caret palette still requests the
      // `passive: true` DISPLAY (no focus steal; filter and highlight driven via the session
      // table), which is now purely an overlay display mode, not a typing mode.
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

      expect(notPrevented).toBe(false); // claimed — the trigger never lands
      expect(show).toHaveBeenCalledWith(
        [markerMenuItemToPaletteItem(makeItem())],
        { x: 1, y: 2, width: 3, height: 4 },
        true,
        // The session declares the keys it owns so a palette that takes focus forwards them back
        // instead of consuming them.
        expect.objectContaining({
          keys: expect.arrayContaining([' ', 'Enter', 'Escape', 'Tab', '*', '\\']),
          onKey: expect.any(Function),
        }),
      );
    });

    it('never shows a palette (and starts no session) when there are no marker menu items', () => {
      // The library can legitimately offer nothing for the current context (e.g. an exhausted
      // stylesheet subset). The `\` must then behave exactly like the no-palette degradation:
      // the literal still lands (event not claimed) and no session is left behind to claim
      // later keystrokes.
      mockGetMarkerMenuItems.mockReturnValue([]);
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
      const doc = editorInput.ownerDocument;
      const notPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );

      expect(notPrevented).toBe(true); // the literal still lands
      expect(markerPalette.show).not.toHaveBeenCalled();

      // No session was started: a following keystroke is not forwarded into any palette.
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'w', bubbles: true, cancelable: true }),
      );
      expect(markerPalette.update).not.toHaveBeenCalled();
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
        // ACTIVE palette: the trigger is claimed and never lands, so an item commit never has a
        // literal prefix to clean up.
        literalPrefixLanded: false,
      });
      expect(editorRef.focus).toHaveBeenCalled();
    });

    it('focuses the editor BEFORE applying a commit with no focus-out capture (last-resort selectNote path)', async () => {
      // Clicking a palette item moves focus out of the editor, which can null Lexical's live
      // selection — applying against a null selection lands the marker at the document tail
      // instead of the caret (observed live: an invalid `\fq` after the closing `\f*`). Lexical's
      // focus() synchronously restores the remembered selection, so the commit path must focus
      // FIRST and only then apply. This is a call-order contract, not just
      // "both get called". No focusout ever fires here, so the caret restore ahead of the focus
      // is the last-resort selectNote(0) path; the focus-out capture-restore variant is covered
      // in the commit-selection-restore suite below.
      mockGetMarkerMenuItems.mockReturnValue([makeItem({ marker: 'fq' })]);
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
      // Every mocked EditorRef method is a `vi.fn()` (see `renderFootnoteEditor`); reaching
      // `.mock` for the call-order comparison needs the same cast `mockMarkerMenuContext` uses.
      /* eslint-disable no-type-assertion/no-type-assertion */
      const focusMock = editorRef.focus as ReturnType<typeof vi.fn>;
      const applyMock = editorRef.applyMarkerMenuSelection as ReturnType<typeof vi.fn>;
      /* eslint-enable no-type-assertion/no-type-assertion */
      // Clear the mount-time focus calls so the order comparison isolates the commit path.
      focusMock.mockClear();

      resolveShow('fq');
      await showPromise;
      // Flush the promise microtask queue so the `.then` handler runs.
      await Promise.resolve();

      expect(applyMock).toHaveBeenCalledOnce();
      expect(focusMock).toHaveBeenCalled();
      expect(Math.min(...focusMock.mock.invocationCallOrder)).toBeLessThan(
        applyMock.mock.invocationCallOrder[0],
      );
    });
  });

  describe('editable marker mode with markerPalette, commit selection restore', () => {
    // A palette mouse click steals focus from the editor BEFORE the commit round-trips, and
    // Lexical's blur processing can null the live selection outright — focus() then falls back
    // to the document END instead of the caret. The commit path must therefore put the caret
    // back BEFORE focusing whenever the live selection is gone: restore the selection captured
    // at focusout (the moment of the steal, while it was still readable), or land at the note
    // content as a last resort. A still-live selection must be left completely alone.

    /** A structurally-plausible USJ selection snapshot (exact value is opaque to the popover). */
    const sampleSelection: SelectionRange = {
      start: { jsonPath: '$.content[0].content[2].content[1].content[0]', offset: 22 },
    };

    function setUpCommitScenario() {
      mockGetMarkerMenuItems.mockReturnValue([makeItem({ marker: 'fq' })]);
      let resolveShow: (id: string | undefined) => void = () => {};
      const showPromise = new Promise<string | undefined>((resolve) => {
        resolveShow = resolve;
      });
      const markerPalette = makeMarkerPalette(vi.fn(() => showPromise));
      const rendered = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(rendered.editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: false,
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });
      placeDomCaretInsideNote(rendered.editorInput);
      rendered.editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      // Every mocked EditorRef method is a `vi.fn()` (see `renderFootnoteEditor`); reaching
      // `.mock` needs the same cast `mockMarkerMenuContext` uses.
      /* eslint-disable no-type-assertion/no-type-assertion */
      const mocks = {
        getSelection: rendered.editorRef.getSelection as ReturnType<typeof vi.fn>,
        setSelection: rendered.editorRef.setSelection as ReturnType<typeof vi.fn>,
        selectNote: rendered.editorRef.selectNote as ReturnType<typeof vi.fn>,
        focus: rendered.editorRef.focus as ReturnType<typeof vi.fn>,
        apply: rendered.editorRef.applyMarkerMenuSelection as ReturnType<typeof vi.fn>,
      };
      /* eslint-enable no-type-assertion/no-type-assertion */
      // Clear mount-time focus calls so order comparisons isolate the commit path.
      mocks.focus.mockClear();
      const commit = async (id: string) => {
        resolveShow(id);
        await showPromise;
        // Flush the promise microtask queue so the `.then` handler runs.
        await Promise.resolve();
      };
      return { ...rendered, mocks, commit };
    }

    it('restores the focus-out capture BEFORE focusing and applying when the live selection is gone', async () => {
      const { editorInput, mocks, commit } = setUpCommitScenario();

      // The steal: focusout fires while the selection is still readable (captured)...
      mocks.getSelection.mockReturnValueOnce(sampleSelection);
      editorInput.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
      // ...and by commit time the live selection is gone (getSelection → undefined again).

      await commit('fq');

      expect(mocks.setSelection).toHaveBeenCalledWith(sampleSelection);
      expect(mocks.apply).toHaveBeenCalledOnce();
      // Order contract: restore the caret, then focus (which re-asserts it), then apply.
      expect(mocks.setSelection.mock.invocationCallOrder[0]).toBeLessThan(
        Math.min(...mocks.focus.mock.invocationCallOrder),
      );
      expect(Math.min(...mocks.focus.mock.invocationCallOrder)).toBeLessThan(
        mocks.apply.mock.invocationCallOrder[0],
      );
    });

    it('leaves a live selection completely alone on commit', async () => {
      const { editorInput, mocks, commit } = setUpCommitScenario();

      // Selection stays readable the whole time (the keyboard-commit case), including at the
      // probe — even though a focusout captured a snapshot earlier.
      mocks.getSelection.mockReturnValue(sampleSelection);
      editorInput.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));

      await commit('fq');

      expect(mocks.setSelection).not.toHaveBeenCalled();
      expect(mocks.selectNote).not.toHaveBeenCalled();
      expect(mocks.apply).toHaveBeenCalledOnce();
    });

    it('falls back to selecting the note content when the selection is gone and nothing was captured', async () => {
      const { mocks, commit } = setUpCommitScenario();

      // No focusout ever fired (nothing captured) and the live selection is gone.
      await commit('fq');

      expect(mocks.selectNote).toHaveBeenCalledWith(0);
      expect(mocks.setSelection).not.toHaveBeenCalled();
      expect(Math.min(...mocks.selectNote.mock.invocationCallOrder)).toBeLessThan(
        mocks.apply.mock.invocationCallOrder[0],
      );
    });
  });

  describe('editable marker mode with markerPalette, focused (selection-wrap) palette outcomes', () => {
    // A selection-wrap `\` opens a FOCUSED palette: the palette's own search input takes focus,
    // so every way the palette can end WITHOUT a commit must hand focus back to the editor —
    // otherwise the user is left typing into a dead overlay.

    function setUpFocusedPalette() {
      mockGetMarkerMenuItems.mockReturnValue([makeItem({ marker: 'fq' })]);
      let resolveShow: (id: string | undefined) => void = () => {};
      let rejectShow: (reason?: unknown) => void = () => {};
      const showPromise = new Promise<string | undefined>((resolve, reject) => {
        resolveShow = resolve;
        rejectShow = reject;
      });
      const markerPalette = makeMarkerPalette(vi.fn(() => showPromise));
      const rendered = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );
      mockMarkerMenuContext(rendered.editorRef, {
        source: 'character',
        previousParaMarkers: [],
        openCharMarkers: [],
        hasTextSelection: true, // selection-wrap -> focused palette
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });
      placeDomCaretInsideNote(rendered.editorInput);
      rendered.editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      // Every mocked EditorRef method is a `vi.fn()` (see `renderFootnoteEditor`); reaching
      // `.mock` needs the same cast `mockMarkerMenuContext` uses.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const focusMock = rendered.editorRef.focus as ReturnType<typeof vi.fn>;
      // Clear mount-time focus calls so the assertions isolate the palette-outcome path.
      focusMock.mockClear();
      return { ...rendered, markerPalette, focusMock, resolveShow, rejectShow, showPromise };
    }

    it('refocuses the editor and ends the session when the show promise REJECTS (overlay replaced)', async () => {
      const { editorInput, editorRef, markerPalette, focusMock, rejectShow, showPromise } =
        setUpFocusedPalette();

      // The overlay service rejects a replaced `show` request with an ABORTED-coded error. The
      // component's own catch must swallow it (an unhandled rejection would fail this test run)
      // and treat it exactly like a dismissal.
      rejectShow(new Error('ABORTED: replaced by a newer overlay request'));
      await showPromise.catch(() => {});
      // Flush the extra microtask hops the rejection takes through the `.then` before the
      // `.catch` handler runs.
      await Promise.resolve();
      await Promise.resolve();

      expect(focusMock).toHaveBeenCalled(); // focus handed back from the dead palette
      expect(editorRef.applyMarkerMenuSelection).not.toHaveBeenCalled();

      // The session ended: a following keystroke is no longer forwarded into the palette.
      editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'w', bubbles: true, cancelable: true }),
      );
      expect(markerPalette.update).not.toHaveBeenCalled();
    });

    it('refocuses the editor when the palette resolves undefined (dismissed without a selection)', async () => {
      const { editorRef, focusMock, resolveShow, showPromise } = setUpFocusedPalette();

      resolveShow(undefined);
      await showPromise;
      // Flush the promise microtask queue so the `.then` handler runs.
      await Promise.resolve();

      expect(focusMock).toHaveBeenCalled(); // the palette's search input had focus — hand it back
      expect(editorRef.applyMarkerMenuSelection).not.toHaveBeenCalled();
      // A dismissal must not move the caret — only a commit restores/repositions it.
      expect(editorRef.setSelection).not.toHaveBeenCalled();
      expect(editorRef.selectNote).not.toHaveBeenCalled();
    });
  });

  describe('editable marker mode with markerPalette, an open session forwarding table', () => {
    it('claims the trigger and typed characters — they filter the palette, never the document', () => {
      // ACTIVE palette: under the passive palette the `\` and the typed characters landed as
      // literals and were only mirrored; now the trigger and every filter character are claimed,
      // so typing reaches the query and NOT the document.
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
      const triggerNotPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      const typedNotPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'w', bubbles: true, cancelable: true }),
      );

      expect(triggerNotPrevented).toBe(false); // claimed — the trigger never lands
      expect(typedNotPrevented).toBe(false); // claimed — filters the palette, not the document
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

    it('Escape closes the palette with the document untouched — nothing typed ever landed', () => {
      // Ratified Escape row under the active palette: the trigger and the typed filter were
      // claimed, so Escape has nothing to leave behind — no editor apply of any kind runs.
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
      const doc = editorInput.ownerDocument;
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'w', bubbles: true, cancelable: true }),
      );
      const escapeNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
      );

      expect(escapeNotPrevented).toBe(false); // claimed
      expect(markerPalette.dismiss).toHaveBeenCalledTimes(1);
      expect(editorRef.commitTypedMarker).not.toHaveBeenCalled();
      expect(editorRef.applyMarkerMenuSelection).not.toHaveBeenCalled();
      expect(editorRef.insertMarker).not.toHaveBeenCalled();
    });

    it('types `\\nd` + Space: the typed filter routes to the palette and Space commits the TYPED marker', () => {
      // The owner's report: `\nd` + Space inserted `\fq` (the first item of an unfiltered
      // note-context list). The typed characters must reach the palette query (filter + ranked
      // list), and Space for a non-note marker commits what was TYPED — under the active palette
      // nothing landed, so the commit materializes the literal through the editor
      // (commitTypedMarker) instead of letting the space land for Tier-2 — never a commit of
      // whatever is highlighted.
      mockGetMarkerMenuItems.mockReturnValue([
        makeItem({ marker: 'fq' }),
        makeItem({ marker: 'xt' }),
        makeItem({ marker: 'nd' }),
      ]);
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
      const doc = editorInput.ownerDocument;
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'n', bubbles: true, cancelable: true }),
      );
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'd', bubbles: true, cancelable: true }),
      );
      expect(markerPalette.update).toHaveBeenNthCalledWith(1, { filterText: 'n' });
      expect(markerPalette.update).toHaveBeenNthCalledWith(2, { filterText: 'nd' });

      const spaceNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }),
      );

      expect(spaceNotPrevented).toBe(false); // claimed — no literal space lands
      expect(editorRef.commitTypedMarker).toHaveBeenCalledExactlyOnceWith('nd');
      expect(markerPalette.dismiss).toHaveBeenCalledTimes(1);
      expect(markerPalette.commit).not.toHaveBeenCalled(); // never the highlighted item
    });

    it('collapsed caret: `*` commits the typed marker as a CLOSING marker and closes the palette', () => {
      // The popover's half of the `*` commit — the closing-marker counterpart to Space. Routed to
      // the editor's own closer primitive, never to commitTypedMarker (which would add an opening
      // glyph and a terminating space) and never to the overlay's highlighted-item commit.
      mockGetMarkerMenuItems.mockReturnValue([
        makeItem({ marker: 'fq' }),
        makeItem({ marker: 'nd' }),
      ]);
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
        openCharMarkers: ['nd'],
        hasTextSelection: false, // collapsed caret — the shape a closing marker applies to
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      const doc = editorInput.ownerDocument;
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'n', bubbles: true, cancelable: true }),
      );
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'd', bubbles: true, cancelable: true }),
      );
      const starNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '*', bubbles: true, cancelable: true }),
      );

      expect(starNotPrevented).toBe(false); // claimed — no literal asterisk may land
      expect(editorRef.commitTypedCloser).toHaveBeenCalledExactlyOnceWith('nd');
      expect(editorRef.commitTypedMarker).not.toHaveBeenCalled();
      expect(markerPalette.commit).not.toHaveBeenCalled();
      expect(markerPalette.dismiss).toHaveBeenCalledTimes(1);
    });

    it('`*` over a NON-COLLAPSED selection still commits the typed closer (P9 parity)', () => {
      // Owner-directed: typing `\nd*` with text selected DELETES the selected content and lands
      // the literal closer. It is a commit key in every selection shape — a different gesture
      // from Space's WRAP, which is why the two are not interchangeable here.
      mockGetMarkerMenuItems.mockReturnValue([makeItem({ marker: 'nd' })]);
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
        openCharMarkers: ['nd'],
        hasTextSelection: true, // the shape that used to keep `*` a filter character
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      const doc = editorInput.ownerDocument;
      ['\\', 'n', 'd'].forEach((key) => {
        doc.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      });
      const starNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '*', bubbles: true, cancelable: true }),
      );

      expect(starNotPrevented).toBe(false); // claimed — no literal asterisk may land
      expect(editorRef.commitTypedCloser).toHaveBeenCalledExactlyOnceWith('nd');
      // Not the WRAP: that is Space's commit, and it would keep the selected text.
      expect(editorRef.applyMarkerMenuSelection).not.toHaveBeenCalled();
    });

    it('`\\` commits the typed marker with NO trailing space and reopens the palette', () => {
      // Owner-directed: `\qt-s` then `\` inserts the full `\qt-s` and opens a fresh palette for
      // the backslash just pressed, so a milestone pair is one continuous flow.
      mockGetMarkerMenuItems.mockReturnValue([makeItem({ marker: 'nd' })]);
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
      const doc = editorInput.ownerDocument;
      ['\\', 'n', 'd'].forEach((key) => {
        doc.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      });
      const showCallsBefore = show.mock.calls.length;
      const secondTriggerNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );

      expect(secondTriggerNotPrevented).toBe(false); // claimed — the trigger never lands
      expect(editorRef.commitTypedMarker).toHaveBeenCalledExactlyOnceWith('nd', {
        trailingSpace: false,
      });
      // A REPLACEMENT palette opened for the backslash just pressed.
      expect(show.mock.calls.length).toBe(showCallsBefore + 1);
    });

    it('`\\` on an EMPTY filter lands a literal backslash and opens NO new palette', () => {
      // With nothing typed there is nothing to commit, so the backslash is an ordinary character
      // and must reach the document unclaimed.
      mockGetMarkerMenuItems.mockReturnValue([makeItem({ marker: 'nd' })]);
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
      const doc = editorInput.ownerDocument;
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      const showCallsBefore = show.mock.calls.length;
      const secondTriggerNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );

      expect(secondTriggerNotPrevented).toBe(true); // NOT claimed — the backslash lands
      expect(editorRef.commitTypedMarker).not.toHaveBeenCalled();
      expect(show.mock.calls.length).toBe(showCallsBefore);
      expect(markerPalette.dismiss).toHaveBeenCalled();
    });

    it('selection wrap: typed exact match + Space applies THAT item over the selection', () => {
      // Ratified: Space over a non-collapsed selection wraps the selection in the TYPED marker's
      // closed span — an exact match against the offered entries, applied through
      // applyMarkerMenuSelection, never commitTypedMarker (materializing would replace the
      // selected text) and never the highlighted item.
      mockGetMarkerMenuItems.mockReturnValue([
        makeItem({ marker: 'fq' }),
        makeItem({ marker: 'nd' }),
      ]);
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
        hasTextSelection: true, // selection-wrap session
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      const doc = editorInput.ownerDocument;
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'n', bubbles: true, cancelable: true }),
      );
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'd', bubbles: true, cancelable: true }),
      );
      const spaceNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }),
      );

      expect(spaceNotPrevented).toBe(false); // nothing may replace the wrapped selection
      expect(editorRef.applyMarkerMenuSelection).toHaveBeenCalledExactlyOnceWith(
        makeItem({ marker: 'nd' }),
        { trigger: 'backslash', literalPrefixLanded: false },
      );
      expect(editorRef.commitTypedMarker).not.toHaveBeenCalled();
      expect(markerPalette.commit).not.toHaveBeenCalled();
      expect(markerPalette.dismiss).toHaveBeenCalledTimes(1);
    });

    it('selection wrap: Space with no exact typed match refuses visibly — selection intact, nothing applied', () => {
      mockGetMarkerMenuItems.mockReturnValue([
        makeItem({ marker: 'fq' }),
        makeItem({ marker: 'nd' }),
      ]);
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
        hasTextSelection: true,
        inMarkerText: false,
        anchorRect: { x: 1, y: 2, width: 3, height: 4 },
      });

      placeDomCaretInsideNote(editorInput);
      const doc = editorInput.ownerDocument;
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      // 'n' prefixes 'nd' but is not itself offered — the exact match must refuse, not wrap.
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'n', bubbles: true, cancelable: true }),
      );
      const spaceNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true }),
      );

      expect(spaceNotPrevented).toBe(false); // still claimed — nothing may replace the selection
      expect(editorRef.applyMarkerMenuSelection).not.toHaveBeenCalled();
      expect(editorRef.commitTypedMarker).not.toHaveBeenCalled();
      expect(markerPalette.dismiss).toHaveBeenCalledTimes(1); // visible refusal: palette closes
    });

    it('Enter with zero matches is a no-op: the session survives and keeps mirroring (P9 parity)', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem({ marker: 'nd' })]);
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
      const doc = editorInput.ownerDocument;
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: '\\', bubbles: true, cancelable: true }),
      );
      // 'q' prefixes no offered marker (only 'nd' is offered) — a zero-match filter.
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'q', bubbles: true, cancelable: true }),
      );

      const enterNotPrevented = doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }),
      );

      expect(enterNotPrevented).toBe(false); // claimed: no split under the open palette
      expect(markerPalette.commit).not.toHaveBeenCalled();
      expect(markerPalette.dismiss).not.toHaveBeenCalled();

      // The session is still alive: Backspace keeps editing the filter through the same table.
      doc.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true, cancelable: true }),
      );
      expect(markerPalette.update).toHaveBeenLastCalledWith({ filterText: '' });
    });
  });

  describe('IME composition keys (isComposing / keyCode 229)', () => {
    // Composition keystrokes (CJK etc.) feed or confirm an IME candidate; this capture-phase
    // handler runs ahead of the editor's own `isComposing()` guard, so it needs its own guard —
    // same requirement the main editor's web-view handler documents. Without it, a composing `\`
    // opens the palette and a composing Enter trips the outside-the-note guard mid-composition.
    it('a composing `\\` never opens the palette and is left for the IME', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette();
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
        new KeyboardEvent('keydown', {
          key: '\\',
          isComposing: true,
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(notPrevented).toBe(true);
      expect(markerPalette.show).not.toHaveBeenCalled();
    });

    it('a composing Enter with the caret outside the note is NOT claimed or rerouted', () => {
      // The Enter guard reroutes a stray caret into the note — but a composing Enter is the IME
      // candidate confirmation, not a split request; claiming it would break the composition.
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette();
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );

      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          isComposing: true,
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(notPrevented).toBe(true);
      expect(editorRef.selectNote).not.toHaveBeenCalled();
    });

    it('a keyCode-229 keydown (composition start before isComposing is set) is left untouched', () => {
      mockGetMarkerMenuItems.mockReturnValue([makeItem()]);
      const markerPalette = makeMarkerPalette();
      const { editorInput, editorRef } = renderFootnoteEditor(
        { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
        markerPalette,
      );

      const notPrevented = editorInput.ownerDocument.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'Enter',
          keyCode: 229,
          bubbles: true,
          cancelable: true,
        }),
      );

      expect(notPrevented).toBe(true);
      expect(editorRef.selectNote).not.toHaveBeenCalled();
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

describe('paste guard (dead-space caret)', () => {
  // The pointerup/selectionchange snap above normalizes most stray carets, but a paste can still
  // arrive while the DOM caret sits in the wrapper-para dead space (the snap runs from async
  // events and can lose the race). The engine's paste handling resolves against the caret, so an
  // outside-the-note paste plain-splits the wrapper paragraph instead of landing in the note.
  // This capture-phase guard snaps the caret into the note FIRST and lets the paste proceed.
  it('paste with the DOM caret outside the note: snaps into the note first and lets the paste proceed', () => {
    const { editorInput, editorRef } = renderFootnoteEditor({
      view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
    });
    placeDomCaretOutsideNote(editorInput);

    const notPrevented = editorInput.ownerDocument.dispatchEvent(
      new Event('paste', { bubbles: true, cancelable: true }),
    );

    // Snapped into the note, but NOT claimed — the paste itself must still reach the editor.
    expect(editorRef.selectNote).toHaveBeenCalledWith(0);
    expect(editorRef.focus).toHaveBeenCalled();
    expect(notPrevented).toBe(true);
  });

  it('paste with the caret already inside the note: left completely alone', () => {
    const { editorInput, editorRef } = renderFootnoteEditor({
      view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
    });
    placeDomCaretInsideNote(editorInput);

    const notPrevented = editorInput.ownerDocument.dispatchEvent(
      new Event('paste', { bubbles: true, cancelable: true }),
    );

    expect(editorRef.selectNote).not.toHaveBeenCalled();
    expect(notPrevented).toBe(true);
  });

  it('non-editable marker mode: paste is never intercepted', () => {
    const { editorInput, editorRef } = renderFootnoteEditor({
      view: { markerMode: 'visible', hasSpacing: true, isFormattedFont: true },
    });
    placeDomCaretOutsideNote(editorInput);

    const notPrevented = editorInput.ownerDocument.dispatchEvent(
      new Event('paste', { bubbles: true, cancelable: true }),
    );

    expect(editorRef.selectNote).not.toHaveBeenCalled();
    expect(notPrevented).toBe(true);
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

describe('markerMenuItemToPaletteItem', () => {
  it('maps id/label/description directly from the marker-menu item', () => {
    expect(
      markerMenuItemToPaletteItem({
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

  it('gives close-tag items a localizable end-tag badge', () => {
    expect(
      markerMenuItemToPaletteItem({ marker: 'wj*', kind: 'closeTag', isBasic: true }).badge,
    ).toBe('%markerMenu_endTag_label%');
  });

  it('does not badge non-close-tag items', () => {
    expect(
      markerMenuItemToPaletteItem({ marker: 'zln', kind: 'character', isBasic: false }).badge,
    ).toBeUndefined();
  });

  it('mutes non-basic items and leaves basic items unmuted', () => {
    expect(
      markerMenuItemToPaletteItem({ marker: 'zln', kind: 'character', isBasic: false }).muted,
    ).toBe(true);
    expect(
      markerMenuItemToPaletteItem({ marker: 'wj', kind: 'character', isBasic: true }).muted,
    ).toBe(false);
  });
});

describe('note-type switch over content the note carries without char attributes', () => {
  /**
   * A note whose content is bare text — no `\\ft`/`\\fr` span, so its delta op carries no `char`
   * attributes at all. `\\f + plain text\\f*` is a legal footnote and Paratext writes it, so this
   * is not a malformed shape.
   */
  function makePlainTextNoteOp() {
    return {
      insert: {
        note: {
          style: 'f',
          caller: '+',
          contents: { ops: [{ insert: 'plain text with no char span' }] },
        },
      },
    };
  }

  it('converts to a cross-reference without throwing on the attribute-less op', async () => {
    // `isTypeSwitchable` treats an op with no `char` attributes as switchable
    // (`if (!op.attributes?.char) return true`), so the dropdown ENABLES for exactly the notes the
    // two op converters could not read: both dereferenced `op.attributes.char.style` through a
    // cast that assumed the attributes were there, and choosing a type threw a TypeError out of
    // the click handler, leaving the note untouched with no message.
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const { editorRef, getByRole } = renderFootnoteEditor({
      view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true },
    });
    vi.mocked(editorRef.getNoteOps).mockReturnValue([makePlainTextNoteOp()]);

    // Drive the editor change the real editor would emit: it is what evaluates switchability and
    // so what enables the dropdown item clicked below.
    await act(async () => {
      const onUsjChange = mockRegisterOnUsjChange.mock.calls.at(-1)?.[0];
      onUsjChange?.({ type: 'USJ', version: '3.1', content: [] });
    });

    await user.click(getByRole('button', { name: /noteType/i }));
    await user.click(getByRole('menuitemcheckbox', { name: /crossReference/i }));

    // The switch went through: the note style was rewritten, the replacement applied, and the
    // attribute-less op came through untouched rather than gaining a phantom `char`.
    expect(vi.mocked(editorRef.applyUpdate)).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          insert: expect.objectContaining({
            note: expect.objectContaining({
              style: 'x',
              contents: { ops: [{ insert: 'plain text with no char span' }] },
            }),
          }),
        }),
      ]),
    );
  });
});

describe('caller dropdown', () => {
  function makeNoteOp(caller: string) {
    return {
      insert: {
        note: {
          style: 'f',
          caller,
          contents: {
            ops: [{ insert: 'note text', attributes: { char: { style: 'ft', closed: 'false' } } }],
          },
        },
      },
    };
  }

  async function openDropdownAndPickHidden() {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const onChange = vi.fn();
    const utils = renderFootnoteEditor(
      { view: { markerMode: 'editable', hasSpacing: true, isFormattedFont: true } },
      undefined,
      onChange,
    );
    vi.mocked(utils.editorRef.getNoteOps).mockReturnValue([makeNoteOp('+')]);
    vi.mocked(utils.editorRef.applyUpdate).mockClear();

    await user.click(utils.getByRole('button', { name: /callerDropdown/i }));
    // Choosing an item also CLOSES the menu, which is what commits the selection.
    await user.click(utils.getByRole('menuitemcheckbox', { name: /hidden/i }));
    return { ...utils, onChange };
  }

  it('commits the caller the user just picked, not the one it replaced', async () => {
    // The commit runs from the menu's close handler, and picking an item closes the menu — so the
    // state update and the close land in one React batch and the handler's closure still held the
    // PREVIOUS selection. Every pick therefore committed the value it was replacing, which reads
    // as a dropdown that does nothing.
    const { onChange } = await openDropdownAndPickHidden();

    expect(onChange).toHaveBeenCalledWith([
      expect.objectContaining({
        insert: expect.objectContaining({ note: expect.objectContaining({ caller: '-' }) }),
      }),
    ]);
  });

  it('applies the new caller to the editor showing the note, not only to the host', async () => {
    // In editable marker mode the caller is TEXT the editor renders from the note node's own
    // caller state, so the popover has to be told about the change the way `handleNoteTypeChange`
    // tells it about a style change. The caller paths only mutated a fresh op read out of
    // `getNoteOps` and handed it to the host, leaving the note on screen showing the old caller.
    const { editorRef } = await openDropdownAndPickHidden();

    expect(vi.mocked(editorRef.applyUpdate)).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          insert: expect.objectContaining({ note: expect.objectContaining({ caller: '-' }) }),
        }),
      ]),
    );
    // One replacement per close, not one per caller field.
    expect(vi.mocked(editorRef.applyUpdate)).toHaveBeenCalledTimes(1);
  });
});
