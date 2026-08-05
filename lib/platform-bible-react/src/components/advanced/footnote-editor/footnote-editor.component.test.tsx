// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { forwardRef, useImperativeHandle } from 'react';
import type { DeltaOpInsertNoteEmbed, EditorRef } from '@eten-tech-foundation/platform-editor';
import type { Usj } from '@eten-tech-foundation/scripture-utilities';
import type { SerializedVerseRef } from '@sillsdev/scripture';
import FootnoteEditor from '@/components/advanced/footnote-editor/footnote-editor.component';
import type { FootnoteEditorLocalizedStrings } from '@/components/advanced/footnote-editor/footnote-editor.types';

// ---- Editorial stub harness ------------------------------------------------
// No test in this package renders the real Lexical `Editorial` (heavy, flaky in
// jsdom). We stub only `Editorial`, keeping every other real export
// (isInsertEmbedOpOfType, GENERATOR_NOTE_CALLER, ...) via importOriginal.
// The stub records the latest props so tests can drive onUsjChange, and exposes
// spy functions through the imperative ref the component uses.

const editorRefMock = {
  applyUpdate: vi.fn(),
  getNoteOps: vi.fn(),
  replaceEmbedUpdate: vi.fn(),
  focus: vi.fn(),
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
      return <div data-testid="editorial-stub" className="editor-input" />;
    },
  );
  EditorialStub.displayName = 'Editorial';
  return { ...actual, Editorial: EditorialStub };
});
// ----------------------------------------------------------------------------

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
  vi.clearAllMocks();
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

  // jsdom's getBoundingClientRect() always returns width 0, so the width-lock guard
  // (`if (width > 0) ...`) never fires without a stub — both sides of the popover-vs-inline
  // guard need a non-zero rect to be actually exercised (rather than passing vacuously
  // regardless of the guard's presence).
  describe('width-lock behavior (with non-zero getBoundingClientRect)', () => {
    let getBoundingClientRectSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      getBoundingClientRectSpy = vi
        .spyOn(HTMLElement.prototype, 'getBoundingClientRect')
        .mockReturnValue({
          width: 200,
          height: 100,
          top: 0,
          left: 0,
          bottom: 100,
          right: 200,
          x: 0,
          y: 0,
          toJSON: () => {},
        });
    });

    afterEach(() => {
      getBoundingClientRectSpy.mockRestore();
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
      // The test stub only implements replaceEmbedUpdate, not the full EditorRef surface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      parentEditorRef: parentRef as never,
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
    await vi.advanceTimersByTimeAsync(300);
    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
    // Proves the debounce carried the LATEST edit ('edit 3'), not an earlier coalesced one.
    expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-live', 'edit 3');
  });

  it('flushes a pending apply on unmount', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    const { unmount } = renderEditor({
      inline: true,
      // The test stub only implements replaceEmbedUpdate, not the full EditorRef surface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      parentEditorRef: parentRef as never,
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

    unmount(); // before the 300ms debounce elapses
    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
  });

  it('does not live-apply in popover mode', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    renderEditor({
      // The test stub only implements replaceEmbedUpdate, not the full EditorRef surface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      parentEditorRef: parentRef as never,
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

  // Regression test (deferred from Task 1 review): noteKeyRef must track the LATEST noteKey,
  // even when a save is triggered mid-session after the parent has re-minted the key (e.g. a
  // previous live-apply cycle). Rerendering with a new noteKey must not require a reload
  // (noteOps identity is unchanged), but the next apply must target the new key.
  it('targets the latest noteKey via the ref when noteKey changes mid-session', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    const noteOps = makeNoteOps('first');
    const { rerender, props } = renderEditor({
      inline: true,
      // The test stub only implements replaceEmbedUpdate, not the full EditorRef surface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      parentEditorRef: parentRef as never,
      noteKey: 'key-original',
      noteOps,
    });
    await vi.runOnlyPendingTimersAsync(); // initial load

    rerender(
      <FootnoteEditor
        {...props}
        inline
        // The test stub only implements replaceEmbedUpdate, not the full EditorRef surface.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        parentEditorRef={parentRef as never}
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

    await vi.advanceTimersByTimeAsync(300);
    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
    expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-updated', 'edit 2');
  });

  // Review finding: immediate-apply paths (caller/type changes, closeAndSave) must cancel a
  // pending debounced apply first, or the untouched timer fires again later with a redundant
  // duplicate replaceEmbedUpdate call for the same edit. closeAndSave is also reached via the
  // book/chapter-change auto-close effect (not just the popover Accept button, which inline mode
  // doesn't render), so that effect is the way to exercise it here.
  it('cancels a pending debounced apply when an immediate-apply path fires first (book/chapter change race)', async () => {
    vi.useFakeTimers();
    const parentRef = { current: { replaceEmbedUpdate: vi.fn() } };
    const { rerender, unmount, props } = renderEditor({
      inline: true,
      // The test stub only implements replaceEmbedUpdate, not the full EditorRef surface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      parentEditorRef: parentRef as never,
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
    }); // schedules the 300ms debounce

    // Immediate-apply path, still inside the debounce window: a book/chapter change triggers
    // closeAndSave via the component's useLayoutEffect, applying immediately.
    rerender(
      <FootnoteEditor
        {...props}
        inline
        // The test stub only implements replaceEmbedUpdate, not the full EditorRef surface.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        parentEditorRef={parentRef as never}
        noteKey="key-race"
        scrRef={{ book: 'EXO', chapterNum: 1, verseNum: 1 }}
      />,
    );

    // If the pending debounce wasn't cancelled, it would fire again here - a redundant duplicate.
    await vi.advanceTimersByTimeAsync(300);
    // Unmounting flushes any *still*-pending apply - must not add a further redundant call either.
    unmount();

    expect(parentRef.current.replaceEmbedUpdate).toHaveBeenCalledTimes(1);
    expectAppliedTextTo(parentRef.current.replaceEmbedUpdate, 'key-race', 'latest edit');
  });
});

describe('FootnoteEditor initial caret position', () => {
  // The marker-menu effect also calls focus() on mount, so compare call counts between a
  // baseline render (no caret position) and a caret-position render: the delta must be
  // exactly the one caret-placement focus call. The DOM-level caret math itself is covered
  // by the placeCaretAtPosition util tests; jsdom cannot exercise the real editor DOM.
  async function countFocusCalls(props: Partial<Parameters<typeof FootnoteEditor>[0]>) {
    editorRefMock.focus.mockClear();
    const { unmount } = renderEditor(props);
    await vi.runAllTimersAsync();
    const count = editorRefMock.focus.mock.calls.length;
    unmount();
    return count;
  }

  it('adds exactly one focus call for caret placement, none when omitted', async () => {
    vi.useFakeTimers();
    const baseline = await countFocusCalls({ inline: true });
    const withCaret = await countFocusCalls({ inline: true, initialCaretPosition: 'end' });
    expect(withCaret).toBe(baseline + 1);
  });
});
