// @vitest-environment jsdom

/**
 * Regression tests for useEditorPdpSync.
 *
 * Fixture shape matters here: real `ChapterUSJ` data starts at the chapter node and carries NO book
 * marker (verified against a live `getChapterUSJ` response). Document identity therefore cannot be
 * derived from the content — an earlier content-derived identity collapsed to the chapter number
 * alone and collided across books (GEN 1 vs EXO 1). Identity now comes from the data selector
 * paired with each delivery (`documentSelector`), which the platform's data hooks guarantee matches
 * the delivered data.
 */

import '@testing-library/jest-dom';
import { act, renderHook } from '@testing-library/react';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { useRef } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import {
  EditorDocumentSelector,
  NON_CONVERGENCE_WARN_THRESHOLD,
  useEditorPdpSync,
} from './use-editor-pdp-sync.hook';

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

/**
 * A chapter document as the `ChapterUSJ` data type actually delivers it: content starts at the
 * chapter node, with NO book marker.
 */
function makeChapterUsj(
  chapterNumber: string,
  text: string,
  { paraMarker = 'p', verseNumber = '2' } = {},
): Usj {
  return {
    type: 'USJ',
    version: '3.1',
    content: [
      { type: 'chapter', marker: 'c', number: chapterNumber },
      {
        type: 'para',
        marker: paraMarker,
        content: [{ type: 'verse', marker: 'v', number: verseNumber }, text],
      },
    ],
  };
}

const lev14Selector: EditorDocumentSelector = { book: 'LEV', chapterNum: 14 };
const lev15Selector: EditorDocumentSelector = { book: 'LEV', chapterNum: 15 };
const gen1Selector: EditorDocumentSelector = { book: 'GEN', chapterNum: 1 };
const exo1Selector: EditorDocumentSelector = { book: 'EXO', chapterNum: 1 };

// LEV chapter 14 with minimal content
const levUsj = makeChapterUsj('14', 'This is the law of the leper.');

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
        documentSelector: lev14Selector,
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
          documentSelector: lev14Selector,
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
    const normalizedEcho = makeChapterUsj('14', 'This is the law of the leper. \\q1');
    const newerEditorContent = makeChapterUsj('14', 'This is the law of the leper. typed more', {
      paraMarker: 'q1',
    });

    // The user keeps typing across the round-trip, so the editor content advances between the
    // first push and the echo's arrival. `liveEditorUsj` models that live-changing content.
    const evenNewerEditorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'q1',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'This is the law of the leper. typed even more',
          ],
        },
      ],
    };
    let liveEditorUsj: Usj = newerEditorContent;

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    // The user is actively editing: the editor instance reports its own root holds focus.
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => liveEditorUsj,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
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
    liveEditorUsj = evenNewerEditorContent;
    act(() => rerender({ usjFromPdp: normalizedEcho }));

    expect(setUsjSpy).not.toHaveBeenCalled(); // editor NOT clobbered mid-typing
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalled(); // newer local edits get saved instead
    expect(usjSentToPdp.current).toBe(normalizedEcho); // echo adopted as the new PDP baseline

    // A confirmation echo matching the editor's LIVE content (evenNewerEditorContent — the editor
    // is still parked there) arrives: the round-trip converged, so there is nothing to do (no
    // replace, which would reset the selection, and no save). The no-op here comes from the
    // convergence branch — a genuine content match — not from editor-side damping: a differing
    // incoming while the editor is unchanged is treated as new information and re-pushed instead
    // (covered by the concurrent-external-write test below).
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();
    const confirmationEcho = {
      ...evenNewerEditorContent,
      content: [...evenNewerEditorContent.content],
    };
    act(() => rerender({ usjFromPdp: confirmationEcho }));
    expect(setUsjSpy).not.toHaveBeenCalled();
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled();
  });

  // Regression: chapter navigation while focus sits in the editor. The actively-editing
  // deferral must apply ONLY to same-document updates - a DIFFERENT chapter's selector arriving
  // means navigation, and deferring would keep the editor on the old chapter forever (and save
  // the old chapter's content through the new chapter's data selector).
  it('replaces the actively-edited editor when a DIFFERENT chapter arrives (navigation)', () => {
    const lev15 = makeChapterUsj('15', 'Chapter fifteen text.', { verseNumber: '1' });

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
      ({
        usjFromPdp,
        documentSelector,
      }: {
        usjFromPdp: Usj;
        documentSelector: EditorDocumentSelector;
      }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj, documentSelector: lev14Selector } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    // The user picked LEV 15 in the BookChapter control; the new chapter's USJ arrives while
    // focus is still on the editor input.
    act(() => rerender({ usjFromPdp: lev15, documentSelector: lev15Selector }));

    expect(setUsjSpy).toHaveBeenCalledOnce(); // editor navigates
    expect(setUsjSpy).toHaveBeenCalledWith(lev15);
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled(); // no cross-chapter save-back
  });

  // Regression: cross-BOOK navigation to the SAME chapter number while focused. Chapter USJ
  // carries no book marker, so a content-derived identity collapses to the chapter number alone
  // — GEN 1 and EXO 1 read as the "same document", the new book's content was deferred, and
  // GEN's content was saved through EXO's data selector. Selector-based identity must see the
  // book change.
  it('replaces the actively-edited editor when a different BOOK with the same chapter number arrives', () => {
    const gen1 = makeChapterUsj('1', 'In the beginning...', { verseNumber: '1' });
    const exo1 = makeChapterUsj('1', 'These are the names...', { verseNumber: '1' });

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => gen1,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({
        usjFromPdp,
        documentSelector,
      }: {
        usjFromPdp: Usj;
        documentSelector: EditorDocumentSelector;
      }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: gen1, documentSelector: gen1Selector } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    // Navigate GEN 1 -> EXO 1 with the editor focused; EXO 1's USJ arrives.
    act(() => rerender({ usjFromPdp: exo1, documentSelector: exo1Selector }));

    expect(setUsjSpy).toHaveBeenCalledOnce(); // editor navigates to EXO 1
    expect(setUsjSpy).toHaveBeenCalledWith(exo1);
    // The old book's content must NOT be pushed through the new book's selector.
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled();
  });

  // Regression: the selector moves one render BEFORE its data. `createUseDataHook` keeps the
  // previous selector's `data` until the new subscription delivers (it only flips `isLoading` on a
  // selector change), so a render exists where `documentSelector` is the NEW chapter while
  // `usjFromPdp` is still the OLD chapter's. Acting on that pair is acting on a lie: the hook
  // would treat the stale content as belonging to the new chapter — pushing the old chapter's
  // bytes through the NEW chapter's save function, then mis-pairing the real delivery when it
  // lands. Nothing may happen until data and selector describe the same document.
  it('does nothing when the selector changes before the new chapter data arrives', () => {
    const gen1 = makeChapterUsj('1', 'In the beginning...', { verseNumber: '1' });

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => gen1,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({
        usjFromPdp,
        documentSelector,
      }: {
        usjFromPdp: Usj;
        documentSelector: EditorDocumentSelector;
      }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: gen1, documentSelector: gen1Selector } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    // Navigate GEN 1 -> EXO 1. The selector is already EXO 1; the data is still GEN 1's.
    act(() => rerender({ usjFromPdp: gen1, documentSelector: exo1Selector }));

    expect(setUsjSpy).not.toHaveBeenCalled();
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled();
  });

  // Defense-in-depth: before anything has been applied to a (focused) editor, an incoming update
  // can never be the "same document" as what the editor shows, so it replaces instead of
  // deferring — a fresh editor must always receive its first content.
  it('replaces (does not defer) the first arrival even while the editor reports focus', () => {
    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => emptyUsj,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    renderHook(() => {
      useEditorPdpSync({
        usjFromPdp: levUsj,
        documentSelector: lev14Selector,
        editorRef,
        usjSentToPdp,
        setEditorUsj,
        saveUsjToPdpIfUpdated,
      });
    });

    expect(setUsjSpy).toHaveBeenCalledWith(levUsj); // replaced, not deferred
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled();
  });

  // Partial identity: a document with a book marker but no chapter marker still has an identity
  // ("LEV|"). Against a full identity ("LEV|14") the identities differ, so the documents are NOT
  // treated as the same one: the incoming full-chapter update replaces the actively-edited
  // chapter-less content instead of being deferred (and nothing is saved back through it).
  it('replaces the actively-edited editor holding book-only content when a full book|chapter update arrives', () => {
    const bookOnlyEditorContent: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'book', marker: 'id', code: 'LEV' },
        { type: 'para', marker: 'p', content: ['intro text before any chapter marker'] },
      ],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => bookOnlyEditorContent,
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
      { initialProps: { usjFromPdp: bookOnlyEditorContent } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    act(() => rerender({ usjFromPdp: levUsj }));

    expect(setUsjSpy).toHaveBeenCalledWith(levUsj); // "LEV|" !== "LEV|14" — replaced, not deferred
    expect(saveUsjToPdpIfUpdated).not.toHaveBeenCalled(); // book-only content never saved back
  });

  // The partial identity is still an IDENTITY (not the unidentifiable case): two book-only
  // documents with the same book both resolve to "LEV|", so a differing echo defers to the
  // actively-edited editor exactly as full-identity same-document echoes do.
  it('defers to the actively-edited editor when both documents have only a matching book marker', () => {
    const bookOnlyEditorContent: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'book', marker: 'id', code: 'LEV' },
        { type: 'para', marker: 'p', content: ['newer typing before any chapter marker'] },
      ],
    };
    const bookOnlyEcho: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'book', marker: 'id', code: 'LEV' },
        { type: 'para', marker: 'p', content: ['normalized echo before any chapter marker'] },
      ],
    };

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => bookOnlyEditorContent,
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
      { initialProps: { usjFromPdp: bookOnlyEditorContent } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    act(() => rerender({ usjFromPdp: bookOnlyEcho }));

    expect(setUsjSpy).not.toHaveBeenCalled(); // same "LEV|" identity — editor not clobbered
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalled(); // newer local content pushed up instead
  });

  it('still replaces the editor for a content-different update that is not our own write echo', () => {
    const externalChange = makeChapterUsj('14', 'Externally edited text.');

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
          documentSelector: lev14Selector,
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
    const normalizedEcho = makeChapterUsj('14', 'This is the law of the leper. \\q1');
    const newerEditorContent = makeChapterUsj('14', 'This is the law of the leper. typed more', {
      paraMarker: 'q1',
    });

    // The user keeps typing across the round-trip, so the editor content advances between the
    // first push and the echo's arrival.
    const evenNewerEditorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'q1',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'This is the law of the leper. typed even more',
          ],
        },
      ],
    };
    let liveEditorUsj: Usj = newerEditorContent;

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => liveEditorUsj,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
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

    liveEditorUsj = evenNewerEditorContent;
    act(() => rerender({ usjFromPdp: normalizedEcho }));

    expect(setUsjSpy).not.toHaveBeenCalled(); // editor NOT clobbered — decided by isFocused()
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalled(); // newer local content pushed up instead
  });

  it('defers to the editor when a note/palette editing session is active even though the editor is BLURRED', () => {
    // The popover flow: focus sits in the footnote editor (main editor blurred) while its edits
    // have not reached the PDP yet. A differing same-document echo replacing the main editor
    // would regenerate every Lexical node key — killing the popover session mid-edit (its Save
    // then targets a dead key and silently no-ops). The session predicate extends the SAME
    // "the editor owns the freshest content" deferral that isFocused() drives for live typing.
    const normalizedEcho = makeChapterUsj('14', 'This is the law of the leper. \\q1');
    const newerEditorContent = makeChapterUsj(
      '14',
      'This is the law of the leper. edited in popover',
      { paraMarker: 'q1' },
    );

    // The popover edit advances the main editor's content across the round-trip.
    const evenNewerEditorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'q1',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'This is the law of the leper. edited more in popover',
          ],
        },
      ],
    };
    let liveEditorUsj: Usj = newerEditorContent;

    const setUsjSpy = vi.fn();
    const saveUsjToPdpIfUpdated = vi.fn();
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => liveEditorUsj,
        isFocused: () => false, // main editor blurred — focus is in the popover
      } as unknown as EditorRef,
    };
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
          isEditingSessionActive: () => true,
        });
      },
      { initialProps: { usjFromPdp: levUsj } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    liveEditorUsj = evenNewerEditorContent;
    act(() => rerender({ usjFromPdp: normalizedEcho }));

    expect(setUsjSpy).not.toHaveBeenCalled(); // popover session survives — no key regeneration
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalled(); // newer local content pushed up instead
  });

  //   (b) A DIFFERENT editor's `.editor-input` holds focus (e.g. the footnote-editor popover, which
  //       renders its own `.editor-input`). The old query grabbed the first `.editor-input` and saw
  //       it focused, wrongly treating THIS editor as actively edited and deferring a real change.
  it('replaces the editor when editorRef.isFocused() is false even if another .editor-input holds focus', () => {
    const externalChange = makeChapterUsj('14', 'Externally edited text.');

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
    // This focused DOM node exists to prove the hook does NOT consult the DOM: with a focused
    // `.editor-input` present, only an editorRef.isFocused()-driven decision can still replace.
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
          documentSelector: lev14Selector,
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
      ({
        usjFromPdp,
        documentSelector,
      }: {
        usjFromPdp: Usj;
        documentSelector: EditorDocumentSelector;
      }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: levUsj, documentSelector: lev14Selector } },
    );

    // Step 1: LEV loads — editor receives its content
    expect(setUsjSpy).toHaveBeenCalledOnce();
    expect(setUsjSpy).toHaveBeenCalledWith(levUsj);
    setUsjSpy.mockClear();

    // Step 2: Navigate to non-existent 2KI — editor unmounts (editorRef.current = null) and
    // usjFromPdp becomes emptyUsj (the "book doesn't exist" state)
    // eslint-disable-next-line no-null/no-null -- simulates React unmounting an element ref (which uses null)
    editorRef.current = null;
    act(() => rerender({ usjFromPdp: emptyUsj, documentSelector: { book: '2KI', chapterNum: 1 } }));

    // usjSentToPdp must have been cleared so we know to re-initialize on next mount
    expect(usjSentToPdp.current).toBeUndefined();
    expect(setUsjSpy).not.toHaveBeenCalled();

    // Step 3: Navigate back to LEV — same chapter data arrives and the editor remounts fresh
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    editorRef.current = { setUsj: setUsjSpy, isFocused: () => false } as unknown as EditorRef;
    act(() => rerender({ usjFromPdp: levUsj, documentSelector: lev14Selector }));

    // The fresh (empty) editor must receive its content even though the data hasn't changed
    expect(setUsjSpy).toHaveBeenCalledOnce();
    expect(setUsjSpy).toHaveBeenCalledWith(levUsj);
  });

  // Logging: an incoming update that the hook does NOT apply to the editor is logged. A single
  // deferral during active editing is almost always the editor's own USFM round-trip, so it is a
  // debug line, not a warning.
  it('logs a debug line (not a warning) when it defers a single incoming update during active editing', () => {
    const editorContent = makeChapterUsj('14', 'newer', { paraMarker: 'q1' });
    const differingEcho = makeChapterUsj('14', 'echo');

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
          documentSelector: lev14Selector,
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
    const editorContent = makeChapterUsj('14', 'match');
    const differentInitial = makeChapterUsj('14', 'other');
    const confirmationEcho = { ...editorContent, content: [...editorContent.content] };

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
          documentSelector: lev14Selector,
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
    const editorContent = makeChapterUsj('14', 'wins', { paraMarker: 'q1' });
    const makeEcho = (i: number): Usj => makeChapterUsj('14', `echo ${i}`);

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
          documentSelector: lev14Selector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: makeEcho(0) } },
    );

    // The initial render applies echo 0 (nothing had been applied yet); each further distinct
    // differing echo is a deferral. Drive deferrals past the threshold: the warning must fire
    // exactly once (at the crossing), not once per update.
    for (let i = 1; i <= NON_CONVERGENCE_WARN_THRESHOLD + 1; i += 1) {
      act(() => rerender({ usjFromPdp: makeEcho(i) }));
    }

    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
  });

  // Item 5 (the typed-attribute non-convergence loop). The editor holds the literal
  // `\nd ...|stuff="thing"\nd*` bytes as content; the PDP parses those bytes so its echo carries a
  // real char node instead. The two USJ shapes are content-different for the same book/chapter, so
  // the convergence branch can NEVER be reached and every echo is deferred. Before the damping
  // guard, each deferral re-saved the identical editor bytes and — because the subscription is
  // whichUpdates '*' — that save re-delivered as the next echo, deferred, re-saved, forever. With
  // the guard, the unchanged editor is pushed exactly once; the next identical echo produces no
  // save, so no further echo is generated and the loop terminates.
  it('damps the non-idempotent typed-attribute round-trip to a single save instead of looping forever', () => {
    // What the editor holds: the attribute as literal content bytes.
    const attributeAsContent: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'chapter', marker: 'c', number: '14' },
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'holy \\nd word|stuff="thing"\\nd* text',
          ],
        },
      ],
    };
    // What the PDP echoes: the same bytes parsed into a char node — content-different, same
    // book/chapter, so it can never equal the editor's content (non-idempotent round-trip).
    const attributeAsProp: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'chapter', marker: 'c', number: '14' },
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'holy ',
            { type: 'char', marker: 'nd', content: ['word'] },
            ' text',
          ],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    // Faithful save mock: a real save records the editor's own USJ as the new PDP baseline (exactly
    // as saveUsjToPdpInternal sets usjSentToPdp.current = newUsj). Without modeling that, the echo
    // comparison could not reproduce the loop shape at all.
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => attributeAsContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const saveUsjToPdpIfUpdated = vi.fn(() => {
      usjSentToPdp.current = editorRef.current?.getUsj();
    });
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    // The PDP re-delivers under whichUpdates '*': a fresh object with identical content each time.
    // A delivery only happens in the app BECAUSE a save wrote to the PDP, so the echo dries up once
    // a delivery causes no save.
    const freshEcho = (): Usj => ({ ...attributeAsProp, content: [...attributeAsProp.content] });

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      // Prime with the editor's own content so the hook records which document the editor is
      // showing. Deferral governs SAME-document echoes, which requires a document to have been
      // applied — a fresh editor with nothing applied yet always replaces instead.
      { initialProps: { usjFromPdp: attributeAsContent } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    // The first differing echo is a deferral that pushes the editor's literal up exactly once.
    act(() => rerender({ usjFromPdp: attributeAsProp }));
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalledTimes(1);

    // Keep delivering echoes, but only while the previous echo actually caused a save (which is what
    // re-arms the subscription in the app). A terminating loop stops on its own; a runaway one would
    // save on every delivery and never break, exhausting the cap.
    const deliverEcho = () => act(() => rerender({ usjFromPdp: freshEcho() }));
    const MAX_DELIVERIES = 100;
    let deliveries = 0;
    for (; deliveries < MAX_DELIVERIES; deliveries += 1) {
      const savesBefore = saveUsjToPdpIfUpdated.mock.calls.length;
      deliverEcho();
      if (saveUsjToPdpIfUpdated.mock.calls.length === savesBefore) break; // echo dried up
    }

    expect(deliveries).toBeLessThan(MAX_DELIVERIES); // terminated, not a runaway loop
    // One push on the first differing echo, then quiescence — the unchanged editor is never re-saved.
    expect(saveUsjToPdpIfUpdated.mock.calls.length).toBeLessThanOrEqual(2);
    // The incoming update is always deferred (never applied) — the editor is never clobbered, and
    // the convergence branch is never reached (that is the non-terminating condition the damping,
    // not convergence, resolves).
    expect(setUsjSpy).not.toHaveBeenCalled();
  });

  // Concurrent external write while the editor is quiescent post-deferral. The damping must key on
  // BOTH sides: an incoming update that DIFFERS from the last deferred incoming is new information
  // (a genuine external writer, e.g. PT9 on the same project), so even though the editor's own
  // content is unchanged, its authority must be re-pushed rather than silently skipped — otherwise
  // disk keeps the external bytes while the screen shows the editor's, unsaved.
  it('re-pushes the editor when a NEW external write arrives while the editor is unchanged', () => {
    // What the editor holds (constant across the whole test — the editor is quiescent).
    const editorContent: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'chapter', marker: 'c', number: '14' },
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'holy \\nd word|stuff="thing"\\nd* text',
          ],
        },
      ],
    };
    // The PDP's normalized echo of the editor's own push — content-different, same book/chapter.
    const normalizedEcho: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'chapter', marker: 'c', number: '14' },
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'holy ',
            { type: 'char', marker: 'nd', content: ['word'] },
            ' text',
          ],
        },
      ],
    };
    // A genuinely NEW write from an external editor — differs from BOTH the editor content and the
    // prior echo, same book/chapter (so it is deferred, not treated as navigation).
    const externalWrite: Usj = {
      type: 'USJ',
      version: '3.1',
      content: [
        { type: 'chapter', marker: 'c', number: '14' },
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'An external editor wrote this.'],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => editorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    // Faithful save mock: a real save records the editor's own USJ as the new PDP baseline.
    const saveUsjToPdpIfUpdated = vi.fn(() => {
      usjSentToPdp.current = editorRef.current?.getUsj();
    });
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      // Prime with the editor's own content so the hook records which document the editor shows;
      // the damping under test lives in the SAME-document deferral branch, which a fresh editor
      // with nothing applied yet never takes.
      { initialProps: { usjFromPdp: editorContent } },
    );
    setUsjSpy.mockClear();
    saveUsjToPdpIfUpdated.mockClear();

    // The first echo is deferred and pushes the editor's content up once.
    act(() => rerender({ usjFromPdp: normalizedEcho }));
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalledTimes(1);
    saveUsjToPdpIfUpdated.mockClear();

    // Now a NEW external write arrives while the editor is quiescent (its own content unchanged).
    act(() => rerender({ usjFromPdp: externalWrite }));

    // The editor's authority must be re-pushed — the external write is new information, not an echo
    // of our own unchanged push, so it is NOT damped.
    expect(saveUsjToPdpIfUpdated).toHaveBeenCalled();
    // The incoming external write is still deferred (the editor is never clobbered while focused).
    expect(setUsjSpy).not.toHaveBeenCalled();
  });

  // Lossy-round-trip telemetry: when OUR OWN save round-trips through the PDP to a DIFFERENT shape
  // (beyond insignificant whitespace) and STABLY never converges, the editor is doing something
  // lossy (a non-idempotent USJ->USFM->USJ). That must be surfaced loudly so it can be
  // investigated. The signal is the pure echo of our unchanged push (editor unchanged AND the same
  // differing echo re-delivered) — as distinct from a concurrent external write, whose incoming
  // CHANGES between deliveries (a normal deferral, not our fault).
  it('warns once that our own save round-tripped lossily when a stable non-convergent echo differs beyond whitespace', () => {
    // What the editor holds (constant — the editor is quiescent and WE are the writer).
    const editorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'holy word text'],
        },
      ],
    };
    // The PDP's echo of our push, round-tripped to a DIFFERENT shape (same book/chapter, differs
    // beyond whitespace) and STABLE — the identical shape re-delivered each time. Models the
    // optbreak / typed-attribute non-idempotent round-trip.
    const lossyEcho: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'holy ',
            { type: 'char', marker: 'nd', content: ['word'] },
            ' text',
          ],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => editorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    // Faithful save mock: records the editor's own USJ as the new PDP baseline (as
    // saveUsjToPdpInternal sets usjSentToPdp.current = newUsj), so the echo comparison reproduces
    // the loop shape.
    const saveUsjToPdpIfUpdated = vi.fn(() => {
      usjSentToPdp.current = editorRef.current?.getUsj();
    });
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };
    // whichUpdates '*' re-delivers a fresh object with identical content each time.
    const freshEcho = (): Usj => ({ ...lossyEcho, content: [...lossyEcho.content] });

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      // Prime with the editor's own content so the hook records which document the editor shows;
      // the lossy-warn path lives in the SAME-document deferral branch, which a fresh editor with
      // nothing applied yet never takes.
      { initialProps: { usjFromPdp: editorContent } },
    );
    setUsjSpy.mockClear();
    mockLoggerWarn.mockClear();

    // Re-deliver the SAME stable differing echo several times.
    act(() => rerender({ usjFromPdp: freshEcho() }));
    act(() => rerender({ usjFromPdp: freshEcho() }));
    act(() => rerender({ usjFromPdp: freshEcho() }));

    // Exactly one lossy-round-trip warning across all re-deliveries (deduped on the echo).
    expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
    // The message names the defect as a lossy round-trip so the log is greppable.
    expect(mockLoggerWarn.mock.calls[0][0]).toMatch(/lossy/i);
    // The warn must carry the FULL differing entries, not only the bounded summary: with settled
    // saves this line names a real round-trip defect, and a 200-character truncation is not enough
    // to attribute one.
    const warnText = String(mockLoggerWarn.mock.calls.at(-1)?.[0] ?? '');
    expect(warnText).toContain('Full sent entry:');
    expect(warnText).toContain('Full received entry:');
    // The editor is never clobbered while the loop runs.
    expect(setUsjSpy).not.toHaveBeenCalled();
  });

  it('does not warn about lossiness when the echo equals the editor content except for whitespace', () => {
    const editorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'holy text'],
        },
      ],
    };
    // Same content — only insignificant trailing whitespace at the end of the block marker differs
    // (the exact case areUsjContentsEqualExceptWhitespace treats as equal; runs are NOT collapsed,
    // so only end-of-block trailing space is safe to vary).
    const whitespaceOnlyEcho: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'holy text '],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => editorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const saveUsjToPdpIfUpdated = vi.fn(() => {
      usjSentToPdp.current = editorRef.current?.getUsj();
    });
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };
    const freshEcho = (): Usj => ({
      ...whitespaceOnlyEcho,
      content: [...whitespaceOnlyEcho.content],
    });

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: whitespaceOnlyEcho } },
    );
    mockLoggerWarn.mockClear();

    act(() => rerender({ usjFromPdp: freshEcho() }));
    act(() => rerender({ usjFromPdp: freshEcho() }));

    // A whitespace-only difference is the benign case the sync already tolerates — never lossy.
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('does not warn about lossiness for a concurrent external write (incoming changes between deliveries)', () => {
    const editorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'our editor content'],
        },
      ],
    };
    // Each external write differs from the previous one — new information, not a stable echo of
    // ours. Same book/chapter so it is deferred (not treated as navigation).
    const externalWrite = (n: number): Usj => ({
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, `external edit ${n}`],
        },
      ],
    });

    const setUsjSpy = vi.fn();
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => editorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const saveUsjToPdpIfUpdated = vi.fn(() => {
      usjSentToPdp.current = editorRef.current?.getUsj();
    });
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: externalWrite(0) } },
    );
    mockLoggerDebug.mockClear();
    mockLoggerWarn.mockClear();

    act(() => rerender({ usjFromPdp: externalWrite(1) }));
    act(() => rerender({ usjFromPdp: externalWrite(2) }));

    // A changing incoming is a normal deferral (debug), never attributed to our own lossy round-trip.
    expect(mockLoggerWarn).not.toHaveBeenCalled();
    expect(mockLoggerDebug).toHaveBeenCalled();
  });

  // The dedup must be keyed on the DISTINCT DIFFERENCE, not on a single-slot memory of the last
  // echo. Two distinct stable lossy differences that alternate (A, B, A) — e.g. two different
  // never-converging spots in the same chapter, revisited as the user moves around — must warn
  // exactly ONCE EACH (two warnings total): the re-visited A was already warned. A single-slot
  // dedup keyed on "the last echo" re-warns A the second time (its slot now remembers B), spamming
  // the log with a warning that is not new information.
  it('warns once per DISTINCT lossy difference across an A→B→A oscillation (no re-warn on revisit)', () => {
    // The editor is quiescent (WE are the writer); its content never changes across deliveries.
    const editorContent: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [{ type: 'verse', marker: 'v', number: '2' }, 'alpha text', 'beta text'],
        },
      ],
    };
    // Difference A: the PDP wraps "alpha" in a \nd char span (stable, distinct from B).
    const echoA: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            { type: 'char', marker: 'nd', content: ['alpha'] },
            ' text',
            'beta text',
          ],
        },
      ],
    };
    // Difference B: a genuinely DIFFERENT lossy shape — the PDP wraps "beta" instead.
    const echoB: Usj = {
      ...levUsj,
      content: [
        ...levUsj.content.slice(0, 1),
        {
          type: 'para',
          marker: 'p',
          content: [
            { type: 'verse', marker: 'v', number: '2' },
            'alpha text',
            { type: 'char', marker: 'nd', content: ['beta'] },
            ' text',
          ],
        },
      ],
    };

    const setUsjSpy = vi.fn();
    const usjSentToPdp: { current: Usj | undefined } = { current: undefined };
    const editorRef: { current: EditorRef | null } = {
      // EditorRef has many members; casting from a minimal stub is intentional in tests
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      current: {
        setUsj: setUsjSpy,
        getUsj: () => editorContent,
        isFocused: () => true,
      } as unknown as EditorRef,
    };
    const saveUsjToPdpIfUpdated = vi.fn(() => {
      usjSentToPdp.current = editorRef.current?.getUsj();
    });
    const setEditorUsj = { current: (usj: Usj) => setUsjSpy(usj) };
    // whichUpdates '*' re-delivers a fresh object with identical content each time.
    const fresh = (echo: Usj): Usj => ({ ...echo, content: [...echo.content] });

    const { rerender } = renderHook(
      ({ usjFromPdp }: { usjFromPdp: Usj }) => {
        useEditorPdpSync({
          usjFromPdp,
          documentSelector: lev14Selector,
          editorRef,
          usjSentToPdp,
          setEditorUsj,
          saveUsjToPdpIfUpdated,
        });
      },
      { initialProps: { usjFromPdp: echoA } },
    );
    mockLoggerWarn.mockClear();

    // A must be delivered twice consecutively to look STABLE (the first delivery of any new shape
    // takes the re-push branch; the second, unchanged, is the stable-echo lossy signal).
    act(() => rerender({ usjFromPdp: fresh(echoA) })); // warn #1 (difference A)
    act(() => rerender({ usjFromPdp: fresh(echoB) })); // re-push (B is new incoming)
    act(() => rerender({ usjFromPdp: fresh(echoB) })); // warn #2 (difference B)
    act(() => rerender({ usjFromPdp: fresh(echoA) })); // re-push (A is new incoming again)
    act(() => rerender({ usjFromPdp: fresh(echoA) })); // must NOT warn — A already warned once

    // Two DISTINCT differences → exactly two warnings; the revisited A is not re-warned.
    expect(mockLoggerWarn).toHaveBeenCalledTimes(2);
    // Each warning names a different content entry (A wrapped "alpha", B wrapped "beta").
    const messages = mockLoggerWarn.mock.calls.map((call) => String(call[0]));
    expect(messages.some((message) => message.includes('alpha'))).toBe(true);
    expect(messages.some((message) => message.includes('beta'))).toBe(true);
  });
});
