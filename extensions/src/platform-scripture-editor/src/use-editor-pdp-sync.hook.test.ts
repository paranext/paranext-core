// @vitest-environment jsdom

/**
 * Regression tests for useEditorPdpSync.
 *
 * Bug: After navigating through a non-existent book and back to a previously-visited chapter, the
 * editor showed "Enter some scripture…" (empty placeholder) instead of chapter content.
 *
 * Root cause: usjSentToPdp was not reset when the editor unmounted (editorRef.current === null). On
 * returning to the same chapter, usjFromPdp matched the stale usjSentToPdp value, so the equality
 * check skipped the setEditorUsj call and the fresh editor was never given its content.
 *
 * Fix: Reset usjSentToPdp to undefined when the editor is unmounted so the next PDP response always
 * triggers setEditorUsj, regardless of whether the chapter data has changed.
 */

import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { useRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import { NON_CONVERGENCE_WARN_THRESHOLD, useEditorPdpSync } from './use-editor-pdp-sync.hook';

const { mockLoggerDebug, mockLoggerWarn } = vi.hoisted(() => ({
  mockLoggerDebug: vi.fn(),
  mockLoggerWarn: vi.fn(),
}));
vi.mock('@papi/frontend', () => ({
  logger: { debug: mockLoggerDebug, warn: mockLoggerWarn, info: vi.fn(), error: vi.fn() },
}));

beforeEach(() => {
  mockLoggerDebug.mockClear();
  mockLoggerWarn.mockClear();
});

// Empty USJ — returned by useProjectData while loading or when a book doesn't exist
const emptyUsj: Usj = { type: 'USJ', version: '3.1', content: [] };

// LEV chapter 14 with minimal content
const levUsj: Usj = {
  type: 'USJ',
  version: '3.1',
  content: [
    { type: 'book', marker: 'id', code: 'LEV' },
    { type: 'chapter', marker: 'c', number: '14' },
    {
      type: 'para',
      marker: 'p',
      content: [{ type: 'verse', marker: 'v', number: '2' }, 'This is the law of the leper.'],
    },
  ],
};

describe('useEditorPdpSync', () => {
  it('calls setEditorUsj when PDP data first arrives', () => {
    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();

    renderHook(() => {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const editorRef = useRef<EditorRef | null>({
        setUsj: setUsjSpy,
        isFocused: () => false,
      } as unknown as EditorRef);
      const usjSentToPdp = useRef<Usj | undefined>(undefined);
      const setEditorUsj = useRef((usj: Usj) => setUsjSpy(usj));
      useEditorPdpSync({
        usjFromPdp: levUsj,
        editorRef,
        usjSentToPdp,
        setEditorUsj,
        saveUsjToPdpIfUpdated,
      });
    });

    expect(setUsjSpy).toHaveBeenCalledOnce();
    expect(setUsjSpy).toHaveBeenCalledWith(levUsj);
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled();
  });

  it('does not call setEditorUsj again when the same chapter data re-arrives while the editor is mounted', () => {
    // In the real component, useProjectData fires with whichUpdates:'*' so each PDP update
    // produces a new object reference even when the content is unchanged. Simulate this by
    // spreading levUsj to a new object with identical content.
    const levUsjNewRef = { ...levUsj, content: [...levUsj.content] };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();

    // Plain objects instead of useRef so that state mutations are visible across rerenders without
    // closure capture. useRef would re-create the ref on each render inside renderHook's callback.
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: { setUsj: setUsjSpy, isFocused: () => false } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );

    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    // Same chapter content re-arrives as a new object reference (PDP subscription fired again)
    act(() => rerender({ usjFromPdp: levUsjNewRef }));

    expect(setUsjSpy).not.toHaveBeenCalled();
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalled();
  });

  // The PDP round-trips USJ through USFM, so a save made
  // MID-marker-typing (a pending literal like `\q1` still in plain text) echoes back
  // NORMALIZED-different from what we sent - sometimes across multiple subscription deliveries
  // per save, so an in-flight-write flag cannot classify them. Hard-replacing the editor with
  // such an echo while the user is typing nulls the selection and eats the keystrokes typed
  // during the round trip (observed live: `\q1<space>` type-through lost q/1/space ~150-250ms
  // after the `\`). While actively editing, the editor owns the freshest content: differing
  // echoes defer to it (and push local content up); matching echoes are pure confirmations.
  it('does not replace the actively-edited editor with a differing echo; saves the newer local content', () => {
    const normalizedEcho: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 2),
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'This is the law of the leper. \\q1',
          ],
        },
      ],
    };
    const newerEditorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 2),
        {
          type: 'para',
          marker: 'q1',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'This is the law of the leper. typed more',
          ],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    // The user is actively editing: the editor instance reports its own root holds focus.
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => newerEditorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    // A (PDP-normalized, content-different) echo arrives while the editor holds newer typing.
    act(() => rerender({ usjFromPdp: normalizedEcho }));

    expect(setUsjSpy).not.toHaveBeenCalled(); // editor NOT clobbered mid-typing
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalled(); // newer local edits get saved instead
    expect(usjSentToPdp.current).toBe(normalizedEcho); // echo adopted as the new PDP baseline

    // A confirmation echo matching the editor's live content arrives: nothing to do (no replace
    // - which would reset the selection - and no save loop).
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();
    const confirmationEcho = { ...newerEditorContent, content: [...newerEditorContent.content] };
    act(() => rerender({ usjFromPdp: confirmationEcho }));
    expect(setUsjSpy).not.toHaveBeenCalled();
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled();
  });

  // Regression: chapter navigation while focus sits in the editor. The actively-editing
  // deferral must apply ONLY to same-document updates - a DIFFERENT book/chapter arriving means
  // navigation, and deferring would keep the editor on the old chapter forever (and save the old
  // chapter's content through the new chapter's data selector).
  it('replaces the actively-edited editor when a DIFFERENT chapter arrives (navigation)', () => {
    const lev15: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'book', marker: 'id', code: 'LEV' },
        { type: 'chapter', marker: 'c', number: '15' },
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '1' }, 'Chapter fifteen text.'],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    // The user is actively editing (editor reports focus), then navigates chapters.
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => levUsj,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    // The user picked LEV 15 in the BookChapter control; the new chapter's USJ arrives while
    // focus is still on the editor input.
    act(() => rerender({ usjFromPdp: lev15 }));

    expect(setUsjSpy).toHaveBeenCalledOnce(); // editor navigates
    expect(setUsjSpy).toHaveBeenCalledWith(lev15);
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled(); // no cross-chapter save-back
  });

  // Defense-in-depth (Fix 3): a document is identified by the book code + chapter number in its own
  // content. When a document has neither, it cannot be identified, so the hook must NOT assume an
  // incoming update is the "same document" as what the editor shows — it replaces instead of
  // deferring, so an unidentifiable update can never silently suppress a real change while typing.
  it('replaces (does not defer) when neither the incoming update nor the editor content is identifiable', () => {
    const identitylessEditor: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para', marker: 'p', content: ['editor text with no book or chapter'] }],
    };
    const identitylessIncoming: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [{ type: 'para', marker: 'p', content: ['incoming text with no book or chapter'] }],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => identitylessEditor,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    act(() => rerender({ usjFromPdp: identitylessIncoming }));

    expect(setUsjSpy).toHaveBeenCalledWith(identitylessIncoming); // replaced, not deferred
  });

  it('still replaces the editor for a content-different update that is not our own write echo', () => {
    const externalChange: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 2),
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'Externally edited text.'],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: { setUsj: setUsjSpy, isFocused: () => false } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );
    setUsjSpy.mockClear();

    // No write of ours is in flight: a different-content update is a genuine external change.
    act(() => rerender({ usjFromPdp: externalChange }));

    expect(setUsjSpy).toHaveBeenCalledOnce();
    expect(setUsjSpy).toHaveBeenCalledWith(externalChange);
  });

  // Fix 1 (editor-owned focus): the "actively editing" decision must come from the editor
  // instance (editorRef.current.isFocused()), NOT a global document.querySelector('.editor-input')
  // + document.activeElement check. Two failure modes of the old global query, pinned here:
  //
  //   (a) The editor reports focused but there is no matching `.editor-input` in the document — the
  //       old query returned null and wrongly concluded "not editing", clobbering the caret.
  it('defers to the editor when editorRef.isFocused() is true even with no .editor-input in the DOM', () => {
    const normalizedEcho: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 2),
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'This is the law of the leper. \\q1',
          ],
        },
      ],
    };
    const newerEditorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 2),
        {
          type: 'para',
          marker: 'q1',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'This is the law of the leper. typed more',
          ],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => newerEditorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    act(() => rerender({ usjFromPdp: normalizedEcho }));

    expect(setUsjSpy).not.toHaveBeenCalled(); // editor NOT clobbered — decided by isFocused()
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalled(); // newer local content pushed up instead
  });

  //   (b) A DIFFERENT editor's `.editor-input` holds focus (e.g. the footnote-editor popover, which
  //       renders its own `.editor-input`). The old query grabbed the first `.editor-input` and saw
  //       it focused, wrongly treating THIS editor as actively edited and deferring a real change.
  it('replaces the editor when editorRef.isFocused() is false even if another .editor-input holds focus', () => {
    const externalChange: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 2),
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'Externally edited text.'],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => levUsj,
        isFocused: () => false,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    // A different editor's `.editor-input` (the footnote popover's own root) holds DOM focus.
    const otherEditorInput = document.createElement('div');
    otherEditorInput.className = 'editor-input';
    otherEditorInput.tabIndex = 0;
    document.body.appendChild(otherEditorInput);
    otherEditorInput.focus();
    expect(document.activeElement).toBe(otherEditorInput);

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );
    setUsjSpy.mockClear();

    act(() => rerender({ usjFromPdp: externalChange }));

    expect(setUsjSpy).toHaveBeenCalledWith(externalChange); // replaced — THIS editor isn't focused

    document.body.removeChild(otherEditorInput);
  });

  it('calls setEditorUsj again after the editor unmounts and remounts with the same chapter data (regression: non-existent book navigation)', () => {
    // Reproduces: LEV → 2KI (does not exist) → LEV
    //
    // After viewing 2KI (which sets editorRef.current = null and usjFromPdp = emptyUsj), the
    // stale usjSentToPdp still holds LEV's content. When LEV data arrives again and the editor
    // remounts, the equality check must fail so setEditorUsj is called to initialize the fresh
    // empty editor. Without the fix, the check would pass and the editor would stay empty.

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();

    // Shared refs that persist across rerenders, just like in the real component
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: { setUsj: setUsjSpy, isFocused: () => false } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );

    // Step 1: LEV loads — editor receives its content
    expect(setUsjSpy).toHaveBeenCalledOnce();
    expect(setUsjSpy).toHaveBeenCalledWith(levUsj);
    setUsjSpy.mockClear();

    // Step 2: Navigate to non-existent 2KI — editor unmounts (editorRef.current = null) and
    // usjFromPdp becomes emptyUsj (the "book doesn't exist" state)
    // eslint-disable-next-line no-null/no-null -- simulates React unmounting an element ref (which uses null)
    editorRef.current = null;
    act(() => rerender({ usjFromPdp: emptyUsj }));

    // usjSentToPdp must have been cleared so we know to re-initialize on next mount
    expect(usjSentToPdp.current).toBeUndefined();
    expect(setUsjSpy).not.toHaveBeenCalled();

    // Step 3: Navigate back to LEV — same chapter data arrives and the editor remounts fresh
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    editorRef.current = { setUsj: setUsjSpy, isFocused: () => false } as unknown as EditorRef;
    act(() => rerender({ usjFromPdp: levUsj }));

    // The fresh (empty) editor must receive its content even though the data hasn't changed
    expect(setUsjSpy).toHaveBeenCalledOnce();
    expect(setUsjSpy).toHaveBeenCalledWith(levUsj);
  });

  // Logging: an incoming update that the hook does NOT apply to the editor is logged. A single
  // deferral during active editing is almost always the editor's own USFM round-trip, so it is a
  // debug line, not a warning.
  it('logs a debug line (not a warning) when it defers a single incoming update during active editing', () => {
    const editorContent: Usj = {
      ...levUsj,
      content: [...levUsj.content.slice(0, 2), { type: 'para', marker: 'q1', content: ['newer'] }],
    };
    const differingEcho: Usj = {
      ...levUsj,
      content: [...levUsj.content.slice(0, 2), { type: 'para', marker: 'p', content: ['echo'] }],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => editorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );
    mockLoggerDebug.mockClear();
    mockLoggerWarn.mockClear();

    act(() => rerender({ usjFromPdp: differingEcho }));

    expect(mockLoggerDebug).toHaveBeenCalled();
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('logs a debug line when an incoming update matches the editor content (confirmation echo)', () => {
    const editorContent: Usj = {
      ...levUsj,
      content: [...levUsj.content.slice(0, 2), { type: 'para', marker: 'p', content: ['match'] }],
    };
    const differentInitial: Usj = {
      ...levUsj,
      content: [...levUsj.content.slice(0, 2), { type: 'para', marker: 'p', content: ['other'] }],
    };
    const confirmationEcho: Usj = { ...editorContent, content: [...editorContent.content] };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => editorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: differentInitial } },
    );
    mockLoggerDebug.mockClear();
    mockLoggerWarn.mockClear();

    act(() => rerender({ usjFromPdp: confirmationEcho }));

    expect(mockLoggerDebug).toHaveBeenCalled();
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  // Telemetry: if incoming Scripture keeps getting deferred without the round-trip ever converging,
  // that is worth a single warning (a non-idempotent round-trip or a concurrent external edit).
  it('logs a single warning once deferrals reach the non-convergence threshold', () => {
    const editorContent: Usj = {
      ...levUsj,
      content: [...levUsj.content.slice(0, 2), { type: 'para', marker: 'q1', content: ['wins'] }],
    };
    const makeEcho = (i: number): Usj => ({
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 2),
        { type: 'para', marker: 'p', content: [`echo ${i}`] },
      ],
    });

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => editorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: makeEcho(0) } },
    );

    // The initial render is deferral #1; drive further distinct differing echoes past the
    // threshold. The warning must fire exactly once (at the crossing), not once per update.
    for (let i = 1; i <= NON_CONVERGENCE_WARN_THRESHOLD; i += 1) {
      act(() => rerender({ usjFromPdp: makeEcho(i) }));
    }

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
  });
});
