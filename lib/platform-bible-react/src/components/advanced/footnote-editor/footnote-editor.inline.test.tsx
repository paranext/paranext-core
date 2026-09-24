// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createRef, forwardRef, useImperativeHandle } from 'react';
import type { RefObject } from 'react';
import type { DeltaOpInsertNoteEmbed, EditorRef } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import FootnoteEditor, {
  INLINE_APPLY_DEBOUNCE_MS,
  type FootnoteEditorHandle,
} from '@/components/advanced/footnote-editor/footnote-editor.component';
import type { FootnoteEditorLocalizedStrings } from '@/components/advanced/footnote-editor/footnote-editor.types';
import {
  buildLocalizedStrings,
  editableView,
} from '@/components/advanced/footnote-editor/footnote-editor.fixtures';

// ---- Editorial stub harness ------------------------------------------------
// No test in this package renders the real Lexical `Editorial` (heavy, flaky in
// jsdom). We stub only `Editorial`, keeping every other real export
// (isInsertEmbedOpOfType, GENERATOR_NOTE_CALLER, ...) via importOriginal.
// The stub records the latest props so tests can drive onUsjChange, and exposes
// spy functions through the imperative ref the component uses.

const editorRefMock = {
  applyUpdate: vi.fn(),
  getNoteOps: vi.fn(),
  focus: vi.fn(),
  selectNote: vi.fn(),
  selectNoteTextOffset: vi.fn(),
  commitPendingMarkerEdits: vi.fn(),
  getSelection: vi.fn(),
  undo: vi.fn(),
  redo: vi.fn(),
};

// Latest props passed to the stubbed Editorial, so tests can invoke callbacks.
const latestEditorialProps: {
  onUsjChange?: (usj: Usj) => void;
} = {};

vi.mock('@eten-tech-foundation/platform-editor', async (importOriginal) => {
  const actual = await importOriginal<object>();
  const EditorialStub = forwardRef<Partial<EditorRef>, { onUsjChange?: (usj: Usj) => void }>(
    (props, ref) => {
      latestEditorialProps.onUsjChange = props.onUsjChange;
      // The component only calls the subset of EditorRef methods in editorRefMock
      useImperativeHandle(ref, () => editorRefMock);
      // `tabIndex` so jsdom will accept `focus()` on it: the real `.editor-input` is a
      // contenteditable, which is focusable, and the key handlers under test all gate on the
      // editor holding DOM focus.
      return <div data-testid="editorial-stub" className="editor-input" tabIndex={-1} />;
    },
  );
  EditorialStub.displayName = 'Editorial';
  return { ...actual, Editorial: EditorialStub };
});
// ----------------------------------------------------------------------------

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

const scrRef: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };

// Localized strings fall back to their keys when missing; empty object is fine for tests.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const localizedStrings = {} as FootnoteEditorLocalizedStrings;

function makeNoteOps(text: string): DeltaOpInsertNoteEmbed[] {
  return [
    {
      insert: {
        note: {
          caller: '+',
          style: 'f',
          contents: {
            ops: [
              { insert: '1.1 ', attributes: { char: { style: 'fr' } } },
              { insert: text, attributes: { char: { style: 'ft' } } },
            ],
          },
        },
      },
    },
  ];
}

/** The same note {@link makeNoteOps} builds, with every object's keys written in another order. */
function makeKeyReorderedNoteOps(text: string): DeltaOpInsertNoteEmbed[] {
  return [
    {
      insert: {
        note: {
          contents: {
            ops: [
              { attributes: { char: { style: 'fr' } }, insert: '1.1 ' },
              { attributes: { char: { style: 'ft' } }, insert: text },
            ],
          },
          style: 'f',
          caller: '+',
        },
      },
    },
  ];
}

/**
 * Widens a live-apply test's `replaceEmbedUpdate`-only stub to `parentEditorRef`'s declared prop
 * type (`RefObject<EditorRef | null>`). The stub implements only `replaceEmbedUpdate` — the one
 * EditorRef method this component's live-apply path calls on its parent — so this is the single
 * justified assertion that bridges the gap; call sites pass the same object straight through and
 * keep reading `parentRef.current.replaceEmbedUpdate` for their assertions.
 */
function makeParentRef(parentRef: {
  current: { replaceEmbedUpdate: ReturnType<typeof vi.fn> };
}): RefObject<EditorRef | null> {
  // The stub above only implements `replaceEmbedUpdate`, not the full EditorRef surface.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return parentRef as unknown as RefObject<EditorRef | null>;
}

function renderEditor(overrides: Partial<Parameters<typeof FootnoteEditor>[0]> = {}) {
  const props = {
    noteOps: makeNoteOps('first'),
    onClose: vi.fn(),
    scrRef,
    noteKey: 'key-1',
    editorOptions: {},
    defaultMarkerMenuTrigger: '\\',
    localizedStrings,
    ...overrides,
  };
  return { ...render(<FootnoteEditor {...props} />), props };
}

beforeEach(() => {
  // `resetAllMocks` (not `clearAllMocks`): also clears `mockReturnValue` implementations set by an
  // earlier test (e.g. `editorRefMock.getNoteOps`), so one test's stubbed return value can't leak
  // into the next test's run when the suite order is shuffled.
  vi.resetAllMocks();
  vi.useRealTimers();
});

describe('FootnoteEditor note loading', () => {
  it('applies noteOps once on mount', async () => {
    vi.useFakeTimers();
    renderEditor();
    await vi.runAllTimersAsync(); // load effect applies ops in a setTimeout(0)
    expect(editorRefMock.applyUpdate).toHaveBeenCalledTimes(1);
  });

  it('does NOT reload when only noteKey changes', async () => {
    vi.useFakeTimers();
    const noteOps = makeNoteOps('stable');
    const { rerender, props } = renderEditor({ noteOps });
    await vi.runAllTimersAsync();
    editorRefMock.applyUpdate.mockClear();

    rerender(<FootnoteEditor {...props} noteOps={noteOps} noteKey="key-2" />);
    await vi.runAllTimersAsync();
    expect(editorRefMock.applyUpdate).not.toHaveBeenCalled();
  });

  it('reloads when noteOps identity changes', async () => {
    vi.useFakeTimers();
    const { rerender, props } = renderEditor();
    await vi.runAllTimersAsync();
    editorRefMock.applyUpdate.mockClear();

    rerender(<FootnoteEditor {...props} noteOps={makeNoteOps('second')} />);
    await vi.runAllTimersAsync();
    expect(editorRefMock.applyUpdate).toHaveBeenCalledTimes(1);
  });

  // A reload happens on a MOUNTED editor (the consumer re-opens the same row, or hands over the
  // note's current content), where the document already holds the note the last load put there.
  // A bare insert would stack the incoming copy on top of it and show the note twice.
  it('replaces the loaded note instead of stacking a second copy on an in-place reload', async () => {
    vi.useFakeTimers();
    const { rerender, props } = renderEditor();
    await vi.runAllTimersAsync();
    expect(editorRefMock.applyUpdate).toHaveBeenCalledWith([props.noteOps[0]]);
    editorRefMock.applyUpdate.mockClear();
    // The first load left its note in the editor's document.
    editorRefMock.getNoteOps.mockReturnValue(makeNoteOps('first'));

    const reloaded = makeNoteOps('first');
    rerender(<FootnoteEditor {...props} noteOps={reloaded} />);
    await vi.runAllTimersAsync();

    expect(editorRefMock.applyUpdate).toHaveBeenCalledTimes(1);
    expect(editorRefMock.applyUpdate).toHaveBeenCalledWith([reloaded[0], { delete: 1 }]);
  });

  it("offers the default custom caller for the next note, not the previous note's own", async () => {
    const withCustomCaller = makeNoteOps('first');
    if (withCustomCaller[0].insert.note) withCustomCaller[0].insert.note.caller = 'a';
    const { rerender, props } = renderEditor({
      inline: true,
      noteOps: withCustomCaller,
      localizedStrings: buildLocalizedStrings(),
    });
    // The next note has a generated caller, so it has no custom caller of its own to offer.
    rerender(<FootnoteEditor {...props} noteOps={makeNoteOps('second')} noteKey="key-2" />);

    await userEvent
      .setup({ pointerEventsCheck: 0 })
      .click(screen.getByRole('button', { name: /callerDropdown/i }));

    expect(screen.getByRole('textbox')).toHaveValue('*');
  });
});

describe('FootnoteEditor inline mode', () => {
  // CancelAcceptButtons' cancel button carries aria-label from '%cancelButton_tooltip%',
  // which falls back to the key itself when localizedStrings is empty (verified in
  // cancel-accept-buttons.component.tsx: aria-label={cancelLocalized}).
  const cancelButtonSelector = '[aria-label="%cancelButton_tooltip%"]';

  it('renders Save/Cancel buttons in popover mode (default)', () => {
    const { container } = renderEditor();
    expect(container.querySelector(cancelButtonSelector)).toBeInTheDocument();
  });

  it('does not render Save/Cancel buttons in inline mode', () => {
    const { container } = renderEditor({ inline: true });
    expect(container.querySelector(cancelButtonSelector)).toBeNull();
  });

  // jsdom has no layout, so the container's computed width is empty and the width-lock guard
  // (`if (width > 0) ...`) never fires without a stub — both sides of the popover-vs-inline guard
  // need a non-zero width to be actually exercised (rather than passing vacuously regardless of the
  // guard's presence).
  describe('width-lock behavior (with a non-zero computed width)', () => {
    let getComputedStyleSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      const originalGetComputedStyle = window.getComputedStyle.bind(window);
      getComputedStyleSpy = vi
        .spyOn(window, 'getComputedStyle')
        .mockImplementation((element, pseudoElement) => {
          const style = originalGetComputedStyle(element, pseudoElement);
          if (!element.classList.contains('footnote-editor')) return style;
          return new Proxy(style, {
            get: (target, property) =>
              property === 'width' ? '200px' : Reflect.get(target, property),
          });
        });
    });

    afterEach(() => {
      getComputedStyleSpy.mockRestore();
    });

    it('width-locks its container in popover mode (default)', () => {
      const { container } = renderEditor();
      const root = container.querySelector<HTMLElement>('.footnote-editor');
      expect(root?.style.width).toBe('200px');
    });

    it('does not width-lock its container in inline mode', () => {
      const { container } = renderEditor({ inline: true });
      const root = container.querySelector<HTMLElement>('.footnote-editor');
      expect(root?.style.width).toBe('');
    });
  });
});

describe('FootnoteEditor inline live-apply', () => {
  function primeCurrentOps(text: string) {
    editorRefMock.getNoteOps.mockReturnValue(makeNoteOps(text));
  }

  // Asserts the applied ops actually carry `text`, not just "some insert" - a matcher like
  // `expect.anything()` would pass even for stale or wrong-edit content.
  function expectAppliedTextTo(
    replaceEmbedUpdate: ReturnType<typeof vi.fn>,
    key: string,
    text: string,
  ) {
    expect(replaceEmbedUpdate).toHaveBeenCalledWith(
      key,
      expect.arrayContaining([
        expect.objectContaining({
          insert: expect.objectContaining({
            note: expect.objectContaining({
              contents: expect.objectContaining({
                ops: expect.arrayContaining([expect.objectContaining({ insert: text })]),
              }),
            }),
          }),
        }),
      ]),
    );
  }

  it('debounces replaceEmbedUpdate on content changes', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    renderEditor({
      inline: true,
      parentEditorRef: makeParentRef(parentRef),
      noteKey: 'key-live',
    });
    await vi.runOnlyPendingTimersAsync(); // initial load

    primeCurrentOps('edit 1');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    // First onUsjChange after load only snapshots initial state - no save yet.
    primeCurrentOps('edit 2');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    primeCurrentOps('edit 3');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });

    expect(parentRef.current.replaceEmbedUpdate).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(INLINE_APPLY_DEBOUNCE_MS);
    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
    // Proves the debounce carried the LATEST edit ('edit 3'), not an earlier coalesced one.
    expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-live', 'edit 3');
  });

  it('flushes a pending apply on unmount', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    const { unmount } = renderEditor({
      inline: true,
      parentEditorRef: makeParentRef(parentRef),
      noteKey: 'key-flush',
    });
    await vi.runOnlyPendingTimersAsync();

    primeCurrentOps('initial'); // snapshot call
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    primeCurrentOps('unsaved edit');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });

    unmount(); // before the apply debounce elapses
    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
  });

  it('does not live-apply in popover mode', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    renderEditor({
      parentEditorRef: makeParentRef(parentRef),
    });
    await vi.runOnlyPendingTimersAsync();
    primeCurrentOps('snapshot');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    primeCurrentOps('edit');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    await vi.advanceTimersByTimeAsync(1000);
    expect(parentRef.current.replaceEmbedUpdate).not.toHaveBeenCalled();
  });

  // `noteKeyRef` must track the LATEST noteKey, even when a save is triggered mid-session after
  // the parent has re-minted the key (e.g. a previous live-apply cycle). Rerendering with a new
  // noteKey must not require a reload (noteOps identity is unchanged), but the next apply must
  // target the new key.
  it('targets the latest noteKey via the ref when noteKey changes mid-session', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    const noteOps = makeNoteOps('first');
    const { rerender, props } = renderEditor({
      inline: true,
      parentEditorRef: makeParentRef(parentRef),
      noteKey: 'key-original',
      noteOps,
    });
    await vi.runOnlyPendingTimersAsync(); // initial load

    rerender(
      <FootnoteEditor
        {...props}
        inline
        parentEditorRef={makeParentRef(parentRef)}
        noteKey="key-updated"
        noteOps={noteOps}
      />,
    );

    primeCurrentOps('edit 1');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    // First onUsjChange after load only snapshots initial state - no save yet.
    primeCurrentOps('edit 2');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });

    await vi.advanceTimersByTimeAsync(INLINE_APPLY_DEBOUNCE_MS);
    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
    expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-updated', 'edit 2');
  });

  // Immediate-apply paths (caller/type changes, closeAndSave) must cancel a
  // pending debounced apply first, or the untouched timer fires again later with a redundant
  // duplicate replaceEmbedUpdate call for the same edit. closeAndSave is also reached via the
  // book/chapter-change auto-close effect (not just the popover Accept button, which inline mode
  // doesn't render), so that effect is the way to exercise it here.
  it('cancels a pending debounced apply when an immediate-apply path fires first (book/chapter change race)', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    const { rerender, unmount, props } = renderEditor({
      inline: true,
      parentEditorRef: makeParentRef(parentRef),
      noteKey: 'key-race',
    });
    await vi.runOnlyPendingTimersAsync(); // initial load

    primeCurrentOps('snapshot');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    // First onUsjChange after load only snapshots initial state - no save yet.
    primeCurrentOps('latest edit');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    }); // schedules the apply debounce

    // Immediate-apply path, still inside the debounce window: a book/chapter change triggers
    // closeAndSave via the component's useLayoutEffect, applying immediately.
    rerender(
      <FootnoteEditor
        {...props}
        inline
        parentEditorRef={makeParentRef(parentRef)}
        noteKey="key-race"
        scrRef={{ book: 'EXO', chapterNum: 1, verseNum: 1 }}
      />,
    );

    // If the pending debounce wasn't cancelled, it would fire again here - a redundant duplicate.
    await vi.advanceTimersByTimeAsync(INLINE_APPLY_DEBOUNCE_MS);
    // Unmounting flushes any *still*-pending apply - must not add a further redundant call either.
    unmount();

    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
    expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-race', 'latest edit');
  });

  // `replaceEmbedUpdate` always swaps the note node (re-minting its key), but the parent only
  // announces the swap when the document actually changed. An apply that writes back content the
  // parent already holds would therefore re-key the note silently and strand the host's session
  // on the dead key, dropping every later apply.
  it('does not apply back a note the parent already holds', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    renderEditor({
      inline: true,
      parentEditorRef: makeParentRef(parentRef),
      noteKey: 'key-unchanged',
      noteOps: makeNoteOps('unchanged'),
    });
    await vi.runOnlyPendingTimersAsync(); // initial load

    // Two change notifications carrying exactly the loaded content: the first is the load
    // snapshot, the second schedules an apply that has nothing new to say.
    primeCurrentOps('unchanged');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    primeCurrentOps('unchanged');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });

    await vi.advanceTimersByTimeAsync(INLINE_APPLY_DEBOUNCE_MS);
    expect(parentRef.current.replaceEmbedUpdate).not.toHaveBeenCalled();
  });

  // Same content, different key insertion order: a serialized comparison calls these two notes
  // different and re-keys the note behind the host's back — the very thing the dedupe prevents.
  it('does not apply back a note the parent already holds under a different key order', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    renderEditor({
      inline: true,
      parentEditorRef: makeParentRef(parentRef),
      noteKey: 'key-reordered',
      noteOps: makeNoteOps('unchanged'),
    });
    await vi.runOnlyPendingTimersAsync(); // initial load

    // Two change notifications, as above: the first is the load snapshot the initialization guard
    // swallows, the second schedules the apply this dedupe has to skip.
    editorRefMock.getNoteOps.mockReturnValue(makeKeyReorderedNoteOps('unchanged'));
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });

    await vi.advanceTimersByTimeAsync(INLINE_APPLY_DEBOUNCE_MS);
    expect(parentRef.current.replaceEmbedUpdate).not.toHaveBeenCalled();
  });

  // The other half of the guard: a real edit still applies, and applies once.
  it('applies a changed note once, then stops repeating it', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    renderEditor({
      inline: true,
      parentEditorRef: makeParentRef(parentRef),
      noteKey: 'key-changed',
      noteOps: makeNoteOps('before'),
    });
    await vi.runOnlyPendingTimersAsync(); // initial load

    primeCurrentOps('before');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    primeCurrentOps('after');
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });

    await vi.advanceTimersByTimeAsync(INLINE_APPLY_DEBOUNCE_MS);
    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
    expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-changed', 'after');

    // A further change notification carrying the content just applied adds nothing.
    latestEditorialProps.onUsjChange?.({
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para' }],
    });
    await vi.advanceTimersByTimeAsync(INLINE_APPLY_DEBOUNCE_MS);
    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
  });

  // The load effect's cleanup (which fires when a consumer swaps in a different
  // note's noteOps on a MOUNTED inline editor) must flush a still-pending debounced apply before
  // the reload - otherwise the pending timer would later fire against note B's just-loaded
  // content, silently discarding note A's last edit.
  describe('FootnoteEditor imperative flush', () => {
    it('applies a pending edit on demand, before the debounce would have', async () => {
      vi.useFakeTimers();
      const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
      // The ref needs to start out with null for it to work as a component ref
      const handleRef = createRef<FootnoteEditorHandle>();
      renderEditor({
        inline: true,
        ref: handleRef,
        parentEditorRef: makeParentRef(parentRef),
        noteKey: 'key-handle-flush',
      });
      await vi.runOnlyPendingTimersAsync();

      primeCurrentOps('initial'); // snapshot call
      latestEditorialProps.onUsjChange?.({
        type: 'USJ',
        version: '3.1',
        content: [{ type: 'para' }],
      });
      primeCurrentOps('unsaved edit');
      latestEditorialProps.onUsjChange?.({
        type: 'USJ',
        version: '3.1',
        content: [{ type: 'para' }],
      });
      expect(parentRef.current.replaceEmbedUpdate).not.toHaveBeenCalled();

      // A host ending the session: the edit has to reach the parent while the session that owns it
      // is still open, not a commit later when this component unmounts.
      handleRef.current?.flushPendingEdits();

      expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
      expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-handle-flush', 'unsaved edit');
    });

    it('is a no-op when the note is unchanged, so ending a session never rewrites it', async () => {
      vi.useFakeTimers();
      const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
      // The ref needs to start out with null for it to work as a component ref
      const handleRef = createRef<FootnoteEditorHandle>();
      renderEditor({
        inline: true,
        ref: handleRef,
        parentEditorRef: makeParentRef(parentRef),
        noteKey: 'key-handle-clean',
      });
      await vi.runOnlyPendingTimersAsync();

      handleRef.current?.flushPendingEdits();

      expect(parentRef.current.replaceEmbedUpdate).not.toHaveBeenCalled();
    });

    it('settles mid-edit marker text before reading the note it applies', async () => {
      // A marker left mid-rename is still plain text in the document until it settles. Every
      // ordinary end of an inline session - the user clicking another note, focus leaving the
      // pane - arrives through this handle rather than through `closeAndSave`, so the settle that
      // keeps a rename from serializing as the stale pre-rename marker has to happen here too.
      vi.useFakeTimers();
      const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
      // The ref needs to start out with null for it to work as a component ref
      const handleRef = createRef<FootnoteEditorHandle>();
      renderEditor({
        inline: true,
        ref: handleRef,
        parentEditorRef: makeParentRef(parentRef),
        noteKey: 'key-handle-settle',
      });
      await vi.runOnlyPendingTimersAsync();

      primeCurrentOps('initial'); // snapshot call
      latestEditorialProps.onUsjChange?.({
        type: 'USJ',
        version: '3.1',
        content: [{ type: 'para' }],
      });
      primeCurrentOps('unsaved edit');
      latestEditorialProps.onUsjChange?.({
        type: 'USJ',
        version: '3.1',
        content: [{ type: 'para' }],
      });

      handleRef.current?.flushPendingEdits();

      expect(editorRefMock.commitPendingMarkerEdits).toHaveBeenCalledOnce();
    });

    it('settles a marker rename that the debounced apply already passed over', async () => {
      // Typing into a marker glyph leaves the rename PENDING, and the note the debounced apply
      // reads is unsettled - so the apply fires, finds the note unchanged, and applies nothing. A
      // session that ends after that (the user moving to another row a moment later) still owes
      // the rename to the parent.
      vi.useFakeTimers();
      const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
      // The ref needs to start out with null for it to work as a component ref
      const handleRef = createRef<FootnoteEditorHandle>();
      renderEditor({
        inline: true,
        ref: handleRef,
        noteOps: makeNoteOps('loaded'),
        parentEditorRef: makeParentRef(parentRef),
        noteKey: 'key-handle-rename',
      });
      await vi.runOnlyPendingTimersAsync();

      const usj: Usj = { type: 'USJ', version: '3.1', content: [{ type: 'para' }] };
      primeCurrentOps('loaded');
      latestEditorialProps.onUsjChange?.(usj); // snapshot call
      // The glyph keystroke: the editor reports a change, but the unsettled note reads as loaded.
      latestEditorialProps.onUsjChange?.(usj);
      await vi.advanceTimersByTimeAsync(INLINE_APPLY_DEBOUNCE_MS);
      expect(parentRef.current.replaceEmbedUpdate).not.toHaveBeenCalled();

      // Settling moves the rename into the note and reports it synchronously, as the editor's
      // discrete settle commit does.
      const renamed: DeltaOpInsertNoteEmbed[] = [
        {
          insert: {
            note: {
              caller: '+',
              style: 'f',
              contents: {
                ops: [
                  { insert: '1.1 ', attributes: { char: { style: 'fr' } } },
                  { insert: 'loaded', attributes: { char: { style: 'fqa' } } },
                ],
              },
            },
          },
        },
      ];
      editorRefMock.commitPendingMarkerEdits.mockImplementationOnce(() => {
        editorRefMock.getNoteOps.mockReturnValue(renamed);
        latestEditorialProps.onUsjChange?.(usj);
      });

      handleRef.current?.flushPendingEdits();

      expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledOnce();
      expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledWith(
        'key-handle-rename',
        renamed,
      );
    });

    it('does not settle when the session ends with nothing pending', async () => {
      // Ending a session that changed nothing must not dispatch into the editor at all: this
      // handle is called on every close, including ones reached from inside the PARENT editor's
      // update listener, where the note has usually already gone.
      vi.useFakeTimers();
      const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
      // The ref needs to start out with null for it to work as a component ref
      const handleRef = createRef<FootnoteEditorHandle>();
      renderEditor({
        inline: true,
        ref: handleRef,
        parentEditorRef: makeParentRef(parentRef),
        noteKey: 'key-handle-settle-clean',
      });
      await vi.runOnlyPendingTimersAsync();

      handleRef.current?.flushPendingEdits();

      expect(editorRefMock.commitPendingMarkerEdits).not.toHaveBeenCalled();
    });

    it('flushes a pending apply for the OUTGOING note before an in-place noteOps reload', async () => {
      vi.useFakeTimers();
      const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
      const noteOpsA = makeNoteOps('note A first');
      const { rerender, props } = renderEditor({
        inline: true,
        parentEditorRef: makeParentRef(parentRef),
        noteKey: 'key-A',
        noteOps: noteOpsA,
      });
      await vi.runOnlyPendingTimersAsync(); // initial load of note A

      primeCurrentOps('note A snapshot');
      latestEditorialProps.onUsjChange?.({
        type: 'USJ',
        version: '3.1',
        content: [{ type: 'para' }],
      });
      // First onUsjChange after load only snapshots initial state - no save yet.
      primeCurrentOps('note A latest edit');
      latestEditorialProps.onUsjChange?.({
        type: 'USJ',
        version: '3.1',
        content: [{ type: 'para' }],
      }); // schedules the apply debounce for note A's edit

      // Still inside the debounce window: the consumer swaps in note B (new noteOps identity, new
      // noteKey) on this SAME mounted instance - the load effect reloads in place.
      rerender(
        <FootnoteEditor
          {...props}
          inline
          parentEditorRef={makeParentRef(parentRef)}
          noteKey="key-B"
          noteOps={makeNoteOps('note B first')}
        />,
      );

      // The flush must have happened synchronously as part of the reload's cleanup - before note
      // B's own load timers even run - targeting note A's key and its LATEST (not snapshot) edit.
      expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
      expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-A', 'note A latest edit');

      // If the old pending timer had survived the reload uncancelled, it would fire again here -
      // a redundant duplicate call (possibly against note B's content).
      await vi.runAllTimersAsync();
      expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('FootnoteEditor initial caret position', () => {
    // WHERE the caret lands is resolved by the editor, against its own nodes
    // (`EditorRef.selectNoteTextOffset`) - see FootnoteCaretPosition for why a consumer cannot
    // resolve it by walking the editor's DOM. What this component owns is which of the two
    // placements it asks for, and that it asks on load.
    it('asks the editor to resolve an offset over the note text', async () => {
      vi.useFakeTimers();
      renderEditor({ inline: true, initialCaretPosition: { utf16Offset: 7 } });
      await vi.runAllTimersAsync();

      expect(editorRefMock.selectNoteTextOffset).toHaveBeenCalledWith(0, 7);
      expect(editorRefMock.selectNote).not.toHaveBeenCalled();
    });

    it("lands at the end of the note's text for 'end'", async () => {
      vi.useFakeTimers();
      renderEditor({ inline: true, initialCaretPosition: 'end' });
      await vi.runAllTimersAsync();

      expect(editorRefMock.selectNote).toHaveBeenCalledWith(0);
      expect(editorRefMock.selectNoteTextOffset).not.toHaveBeenCalled();
    });

    it('does not re-apply the opening click offset when the note reloads under the user', async () => {
      // `initialCaretPosition` describes the gesture that OPENED the session. A reload replaces
      // this document from outside it - a collaborator's edit, an echo from the backend - so
      // putting the caret back where the user first clicked would drag it off wherever they had
      // typed to since.
      vi.useFakeTimers();
      const { rerender, props } = renderEditor({
        inline: true,
        initialCaretPosition: { utf16Offset: 7 },
      });
      await vi.runAllTimersAsync();
      expect(editorRefMock.selectNoteTextOffset).toHaveBeenCalledWith(0, 7);
      editorRefMock.selectNoteTextOffset.mockClear();
      editorRefMock.selectNote.mockClear();

      rerender(<FootnoteEditor {...props} noteOps={makeNoteOps('changed elsewhere')} />);
      await vi.runAllTimersAsync();

      expect(editorRefMock.selectNoteTextOffset).not.toHaveBeenCalled();
      expect(editorRefMock.selectNote).toHaveBeenCalledWith(0);
    });

    it('lands at the end when the consumer asks for no particular position', async () => {
      vi.useFakeTimers();
      renderEditor({ inline: true });
      await vi.runAllTimersAsync();

      expect(editorRefMock.selectNote).toHaveBeenCalledWith(0);
      expect(editorRefMock.selectNoteTextOffset).not.toHaveBeenCalled();
    });
  });
});

describe('FootnoteEditor inline Escape dismissal', () => {
  /** Focuses the stubbed editor input and sends Escape to it the way the browser would. */
  function pressEscapeInEditor(container: HTMLElement) {
    const editorInput = container.querySelector<HTMLElement>('.editor-input');
    if (!editorInput) throw new Error('no editor input rendered');
    editorInput.focus();
    editorInput.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
  }

  // The inline surface renders no Cancel/Close control - its edits apply live - so Escape is the
  // only explicit way to end a row-editing session, and the only one that needs no pointer.
  it.each([
    { name: 'in editable marker mode (Standard view)', editorOptions: { view: editableView } },
    { name: 'in the default marker mode', editorOptions: {} },
  ])('ends the session on Escape $name', async ({ editorOptions }) => {
    vi.useFakeTimers();
    const { container, props } = renderEditor({ inline: true, editorOptions });
    await vi.runAllTimersAsync();

    pressEscapeInEditor(container);

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  // The final settle holds back the marker the caret is in while the editor has focus, so a
  // rename typed just before Escape would stay pending and be lost with the unmounting editor.
  it('releases focus before the final settle, so the marker under the caret settles too', async () => {
    vi.useFakeTimers();
    const { container, props } = renderEditor({
      inline: true,
      editorOptions: { view: editableView },
    });
    await vi.runAllTimersAsync();
    const editorInput = container.querySelector<HTMLElement>('.editor-input');
    let editorHeldFocusAtSettle: boolean | undefined;
    editorRefMock.commitPendingMarkerEdits.mockImplementationOnce(() => {
      editorHeldFocusAtSettle = editorInput?.contains(document.activeElement);
    });

    pressEscapeInEditor(container);

    expect(editorRefMock.commitPendingMarkerEdits).toHaveBeenCalledOnce();
    expect(editorHeldFocusAtSettle).toBe(false);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('leaves the popover surface alone - it has its own Cancel button', async () => {
    vi.useFakeTimers();
    const { container, props } = renderEditor({ editorOptions: { view: editableView } });
    await vi.runAllTimersAsync();

    pressEscapeInEditor(container);

    expect(props.onClose).not.toHaveBeenCalled();
  });

  // Tab from the row above lands on the note-type dropdown first, and closing a dropdown returns
  // focus to its trigger, so Escape has to work from the editor's own controls too.
  it("ends the session on Escape from the editor's own controls", async () => {
    vi.useFakeTimers();
    const { props } = renderEditor({
      inline: true,
      editorOptions: { view: editableView },
      localizedStrings: buildLocalizedStrings(),
    });
    await vi.runAllTimersAsync();
    const callerDropdown = screen.getByRole('button', { name: /callerDropdown/i });
    callerDropdown.focus();

    callerDropdown.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );

    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  // The right-click menu leaves focus in the note text and closes itself on Escape.
  it.each([
    { name: 'in editable marker mode (Standard view)', editorOptions: { view: editableView } },
    { name: 'in the default marker mode', editorOptions: {} },
  ])("leaves Escape to the editor's open right-click menu $name", async ({ editorOptions }) => {
    vi.useFakeTimers();
    const { container, props } = renderEditor({ inline: true, editorOptions });
    await vi.runAllTimersAsync();
    const contextMenu = document.body.appendChild(document.createElement('div'));
    contextMenu.className = 'typeahead-popover';

    try {
      pressEscapeInEditor(container);
    } finally {
      contextMenu.remove();
    }

    expect(props.onClose).not.toHaveBeenCalled();
  });

  it('ignores Escape pressed outside the editor', async () => {
    vi.useFakeTimers();
    const { props } = renderEditor({ inline: true, editorOptions: { view: editableView } });
    await vi.runAllTimersAsync();

    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );

    expect(props.onClose).not.toHaveBeenCalled();
  });
});

describe('FootnoteEditor caller and note-type changes', () => {
  /** `makeNoteOps(text)` with its `\ft` run renamed to `\fqa`: a rename that has settled. */
  function renamedNoteOps(text: string): DeltaOpInsertNoteEmbed[] {
    const [noteOp] = makeNoteOps(text);
    const ops = noteOp.insert.note?.contents?.ops ?? [];
    ops[1] = { insert: text, attributes: { char: { style: 'fqa' } } };
    return [noteOp];
  }

  /** The char style of the second run of the note last applied to the editor. */
  function lastAppliedSecondRunStyle(): unknown {
    const [ops] = editorRefMock.applyUpdate.mock.calls.at(-1) ?? [];
    const noteOp: DeltaOpInsertNoteEmbed | undefined = ops?.[0];
    return noteOp?.insert.note?.contents?.ops?.[1]?.attributes?.char;
  }

  /**
   * Renders the inline editor on a note whose `\ft` rename is still pending: the editor reads the
   * old marker until its pending edits are committed.
   */
  async function renderWithPendingRename() {
    renderEditor({
      inline: true,
      editorOptions: { view: editableView },
      localizedStrings: buildLocalizedStrings(),
    });
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    });
    editorRefMock.getNoteOps.mockReturnValue(makeNoteOps('loaded'));
    editorRefMock.commitPendingMarkerEdits.mockImplementation(() => {
      editorRefMock.getNoteOps.mockReturnValue(renamedNoteOps('loaded'));
    });
    editorRefMock.applyUpdate.mockClear();
  }

  // The dropdown takes focus from the note text, which leaves the rename under the caret pending,
  // and the note is rebuilt from what the editor reads: an unsettled read would write the old
  // marker back.
  it('keeps a pending marker rename through a caller change', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await renderWithPendingRename();

    await user.click(screen.getByRole('button', { name: /callerDropdown/i }));
    await user.click(screen.getByRole('menuitemcheckbox', { name: /hidden/i }));

    expect(lastAppliedSecondRunStyle()).toEqual({ style: 'fqa' });
  }, 20_000);

  it('keeps a pending marker rename through a note-type change', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    await renderWithPendingRename();

    await user.click(screen.getByRole('button', { name: /noteType_footnote_label/i }));
    await user.click(screen.getByRole('menuitemcheckbox', { name: /noteType_endNote_label/i }));

    expect(lastAppliedSecondRunStyle()).toEqual({ style: 'fqa' });
  }, 20_000);

  // A note-type change is a discrete action like a caller change: the inline surface has no Save,
  // so it reaches the parent at once rather than after the typing debounce.
  it('applies a note-type change to the parent at once', async () => {
    const user = userEvent.setup({ pointerEventsCheck: 0 });
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    renderEditor({
      inline: true,
      localizedStrings: buildLocalizedStrings(),
      parentEditorRef: makeParentRef(parentRef),
      noteKey: 'key-type',
    });
    await act(async () => {
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });
    });
    const usj: Usj = { type: 'USJ', version: '3.1', content: [{ type: 'para' }] };
    editorRefMock.getNoteOps.mockReturnValue(makeNoteOps('loaded'));
    latestEditorialProps.onUsjChange?.(usj); // the load's own report
    // The rebuilt note reaches the editor, which reports it as a change.
    editorRefMock.applyUpdate.mockImplementation(([noteOp]) => {
      editorRefMock.getNoteOps.mockReturnValue([noteOp]);
      latestEditorialProps.onUsjChange?.(usj);
    });

    await user.click(screen.getByRole('button', { name: /noteType_footnote_label/i }));
    await user.click(screen.getByRole('menuitemcheckbox', { name: /noteType_endNote_label/i }));

    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledOnce();
    const [, [appliedNoteOp]] = parentRef.current.replaceEmbedUpdate.mock.calls[0];
    expect(appliedNoteOp.insert.note.style).toBe('fe');
  }, 20_000);
});

describe('FootnoteEditor handle focus', () => {
  it('reports focus anywhere in the editor, its own controls included', async () => {
    const handleRef = createRef<FootnoteEditorHandle>();
    renderEditor({ inline: true, ref: handleRef, localizedStrings: buildLocalizedStrings() });
    expect(handleRef.current?.containsFocus()).toBe(false);

    screen.getByRole('button', { name: /callerDropdown/i }).focus();

    expect(handleRef.current?.containsFocus()).toBe(true);
  });

  it("puts focus back in the note text through the editor's own focus", () => {
    const handleRef = createRef<FootnoteEditorHandle>();
    renderEditor({ inline: true, ref: handleRef });
    editorRefMock.focus.mockClear();

    handleRef.current?.focus();

    expect(editorRefMock.focus).toHaveBeenCalledOnce();
  });
});
