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
import { describe, expect, it, vi } from 'vitest';
import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import { useEditorPdpSync } from './use-editor-pdp-sync.hook';

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
      const editorRef = useRef<EditorRef | null>({ setUsj: setUsjSpy } as unknown as EditorRef);
      const usjSentToPdp = useRef<Usj | undefined>(undefined);
      const setEditorUsj = useRef((usj: Usj) => setUsjSpy(usj));
      const currentlyWritingUsjToPdp = useRef(false);
      useEditorPdpSync({
        usjFromPdp: levUsj,
        editorRef,
        usjSentToPdp,
        setEditorUsj,
        currentlyWritingUsjToPdp,
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
      current: { setUsj: setUsjSpy } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };
    const currentlyWritingUsjToPdp = { current: false };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          currentlyWritingUsjToPdp,
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
      current: { setUsj: setUsjSpy } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };
    const currentlyWritingUsjToPdp = { current: false };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          currentlyWritingUsjToPdp,
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
    editorRef.current = { setUsj: setUsjSpy } as unknown as EditorRef;
    act(() => rerender({ usjFromPdp: levUsj }));

    // The fresh (empty) editor must receive its content even though the data hasn't changed
    expect(setUsjSpy).toHaveBeenCalledOnce();
    expect(setUsjSpy).toHaveBeenCalledWith(levUsj);
  });
});
