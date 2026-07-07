import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';
import { MutableRefObject, useEffect } from 'react';

/**
 * `book|chapter` identity of a USJ document, for telling a SAME-document update (echo/refresh)
 * apart from a DIFFERENT document arriving (book/chapter navigation). Content entries are either
 * marker objects or plain strings; the book code and first chapter number identify the document.
 */
function getUsjBookChapterIdentity(usj: Usj | undefined): string {
  let book = '';
  let chapter = '';
  usj?.content?.forEach((entry) => {
    if (typeof entry === 'string') return;
    if (!book && entry.type === 'book') book = String(entry.code ?? '');
    if (!chapter && entry.type === 'chapter') chapter = String(entry.number ?? '');
  });
  return `${book}|${chapter}`;
}

/**
 * Synchronizes the editor's displayed content with data received from the PDP.
 *
 * Runs on every PDP update (even ones with unchanged content) so we know when a write we initiated
 * has completed and `currentlyWritingUsjToPdp` can be cleared.
 *
 * When the editor is unmounted (e.g. book doesn't exist or data is loading), `usjSentToPdp` is
 * reset so that the editor is properly re-initialized with content when it remounts. Without this
 * reset, returning to the same chapter after passing through a non-existent book would leave the
 * fresh editor empty because the stale `usjSentToPdp` value would match the incoming PDP data and
 * skip the `setEditorUsj` call.
 */
export function useEditorPdpSync({
  usjFromPdp,
  editorRef,
  usjSentToPdp,
  setEditorUsj,
  currentlyWritingUsjToPdp,
  saveUsjToPdpIfUpdated,
}: {
  usjFromPdp: Usj | undefined;
  editorRef: MutableRefObject<EditorRef | null>;
  usjSentToPdp: MutableRefObject<Usj | undefined>;
  /** Stable ref whose `.current` is the function to call to update the editor's displayed content */
  setEditorUsj: MutableRefObject<(usj: Usj) => void>;
  currentlyWritingUsjToPdp: MutableRefObject<boolean>;
  saveUsjToPdpIfUpdated: () => void;
}): void {
  useEffect(() => {
    if (!usjFromPdp) return;
    if (!editorRef.current) {
      // Editor unmounted — reset so it re-initializes when it remounts (see TSDoc)
      usjSentToPdp.current = undefined;
      return;
    }

    // The PDP informed us of updates, so writing to it must be complete (if we were writing)
    currentlyWritingUsjToPdp.current = false;

    // If what the PDP provided is different than the last thing we sent to the PDP, assume the PDP
    // has the best data. This could happen if the selected chapter changed or something other than
    // the editor wrote to the PDP.
    if (!areUsjContentsEqualExceptWhitespace(usjFromPdp, usjSentToPdp.current)) {
      usjSentToPdp.current = usjFromPdp;
      // Task 15 (standard-view fix wave): the PDP round-trips USJ through USFM, so a save made
      // MID-marker-typing (a pending literal like `\q1` still in plain text) echoes back
      // NORMALIZED-different from what we sent even though nobody else wrote — sometimes across
      // MULTIPLE subscription deliveries per save (whichUpdates '*'), so a one-shot "our write is
      // in flight" flag cannot classify them. Hard-replacing the editor with such an echo while
      // the user is typing nulls the Lexical selection and eats the keystrokes typed during the
      // round trip (observed live: `\q1<space>` type-through lost q/1/space ~150-250ms after the
      // `\`). While the user is ACTIVELY EDITING (focus on the main editor's content-editable
      // root — the same gate the keydown handlers use), the editor owns the freshest content:
      // an echo that equals it is a pure confirmation (nothing to do — replacing would still
      // reset the selection), and an echo that differs defers to the editor and pushes the newer
      // local content up instead. Once typing rests, well-formed USJ round-trips stably, the
      // echo matches the editor, and this settles. When the editor is NOT focused (idle,
      // blurred, popover open), the PDP echo replaces as before — including genuine external
      // co-edits, whose replace-while-focused case is deliberately deferred to the next update
      // that arrives outside active typing.
      //
      // QA run 4 regression guard: the deferral applies ONLY to the SAME document. When the
      // incoming USJ is a DIFFERENT book/chapter (navigation via the BookChapter control while
      // focus sits in the editor), deferring would keep the editor on the OLD chapter forever —
      // and, worse, save-back would write the old chapter's content through the NEW chapter's
      // data selector. A different-document update always replaces.
      const mainEditorInput = document.querySelector('.editor-input') ?? undefined;
      const isActivelyEditing =
        mainEditorInput !== undefined && document.activeElement === mainEditorInput;
      if (isActivelyEditing) {
        const editorUsj = editorRef.current.getUsj();
        const isSameDocument =
          getUsjBookChapterIdentity(usjFromPdp) === getUsjBookChapterIdentity(editorUsj);
        if (isSameDocument) {
          if (areUsjContentsEqualExceptWhitespace(usjFromPdp, editorUsj)) return;
          saveUsjToPdpIfUpdated();
          return;
        }
      }
      setEditorUsj.current(usjFromPdp);
    }
    // If the editor has updates that the PDP hasn't recorded, save them to the PDP
    else saveUsjToPdpIfUpdated();
  }, [
    // usjFromPdp and saveUsjToPdpIfUpdated are the only deps that actually change and trigger
    // re-runs. The refs below are stable (their identities never change), but are listed to
    // satisfy the exhaustive-deps lint rule.
    currentlyWritingUsjToPdp,
    editorRef,
    saveUsjToPdpIfUpdated,
    setEditorUsj,
    usjFromPdp,
    usjSentToPdp,
  ]);
}
