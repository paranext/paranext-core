import { logger } from '@papi/frontend';
import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';
import { MutableRefObject, useEffect, useRef } from 'react';

/**
 * How many consecutive PDP updates may be deferred to the actively-edited chapter (kept unapplied)
 * before a single warning is logged. Deferrals are normal during continuous typing — the editor
 * keeps winning its own USFM round-trip — so the threshold is set well above a typing burst; a
 * count this high instead suggests a non-idempotent round-trip or a concurrent external edit being
 * lost.
 */
export const NON_CONVERGENCE_WARN_THRESHOLD = 25;

/**
 * Identity of a USJ document — its book code and first chapter number — for telling a SAME-document
 * update (echo/refresh) apart from a DIFFERENT document arriving (book/chapter navigation).
 *
 * Identity is read from the document's OWN content, NOT from the selected `scrRef`, on purpose:
 * during navigation the incoming PDP data and the editor's displayed content each lag `scrRef`
 * independently — the PDP subscription re-delivers asynchronously, and the editor is only replaced
 * afterward — so `scrRef` would report a chapter that neither the incoming data nor the editor has
 * actually reached yet. The document's own `book`/`chapter` markers are the only ground truth for
 * which document a given USJ actually is.
 *
 * Returns `undefined` when the document has no book or chapter marker: it cannot be identified, so
 * callers must not treat two such documents as the same one.
 */
function getUsjBookChapterIdentity(usj: Usj | undefined): string | undefined {
  let book = '';
  let chapter = '';
  usj?.content?.forEach((entry) => {
    if (typeof entry === 'string') return;
    if (!book && entry.type === 'book') book = String(entry.code ?? '');
    if (!chapter && entry.type === 'chapter') chapter = String(entry.number ?? '');
  });
  if (!book && !chapter) return undefined;
  return `${book}|${chapter}`;
}

/**
 * Synchronizes the editor's displayed content with data received from the PDP.
 *
 * Runs on every PDP update (even ones with unchanged content): an update whose content already
 * matches what we last sent still needs to push up any newer editor edits the PDP has not
 * recorded.
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
  saveUsjToPdpIfUpdated,
}: {
  usjFromPdp: Usj | undefined;
  editorRef: MutableRefObject<EditorRef | null>;
  usjSentToPdp: MutableRefObject<Usj | undefined>;
  /** Stable ref whose `.current` is the function to call to update the editor's displayed content */
  setEditorUsj: MutableRefObject<(usj: Usj) => void>;
  saveUsjToPdpIfUpdated: () => void;
}): void {
  // Counts consecutive incoming updates deferred to the actively-edited chapter without the
  // round-trip converging (the editor's content matching the echo). Reset whenever an update is
  // actually applied or the round-trip converges; drives the non-convergence warning.
  const nonConvergingDeferralCount = useRef(0);
  useEffect(() => {
    if (!usjFromPdp) return;
    if (!editorRef.current) {
      // Editor unmounted — reset so it re-initializes when it remounts (see TSDoc)
      usjSentToPdp.current = undefined;
      return;
    }

    // If what the PDP provided is different than the last thing we sent to the PDP, assume the PDP
    // has the best data. This could happen if the selected chapter changed or something other than
    // the editor wrote to the PDP.
    if (!areUsjContentsEqualExceptWhitespace(usjFromPdp, usjSentToPdp.current)) {
      usjSentToPdp.current = usjFromPdp;
      // The PDP round-trips USJ through USFM, so a save made
      // MID-marker-typing (a pending literal like `\q1` still in plain text) echoes back
      // NORMALIZED-different from what we sent even though nobody else wrote — sometimes across
      // MULTIPLE subscription deliveries per save (whichUpdates '*'), so a one-shot "our write is
      // in flight" flag cannot classify them. Hard-replacing the editor with such an echo while
      // the user is typing nulls the Lexical selection and eats the keystrokes typed during the
      // round trip (observed live: `\q1<space>` type-through lost q/1/space ~150-250ms after the
      // `\`). While the user is ACTIVELY EDITING — asked of the editor instance itself via
      // `editorRef.current.isFocused()`, so the answer is scoped to THIS editor's own
      // content-editable root rather than a global `document.querySelector('.editor-input')` that
      // couples to the CSS class name and to DOM order (a footnote-editor popover renders its own
      // `.editor-input`) — the editor owns the freshest content: an echo that equals it is a pure
      // confirmation (nothing to do — replacing would still reset the selection), and an echo that
      // differs defers to the editor and pushes the newer local content up instead. Once typing
      // rests, well-formed USJ round-trips stably, the echo matches the editor, and this settles.
      // When the editor is NOT focused (idle, blurred, popover open), the PDP echo replaces as
      // before — including genuine external co-edits, whose replace-while-focused case is
      // deliberately deferred to the next update that arrives outside active typing.
      //
      // Regression guard: the deferral applies ONLY to the SAME document. When the
      // incoming USJ is a DIFFERENT book/chapter (navigation via the BookChapter control while
      // focus sits in the editor), deferring would keep the editor on the OLD chapter forever —
      // and, worse, save-back would write the old chapter's content through the NEW chapter's
      // data selector. A different-document update always replaces.
      const isActivelyEditing = editorRef.current.isFocused();
      if (isActivelyEditing) {
        const editorUsj = editorRef.current.getUsj();
        // Same document only when BOTH are identifiable and their identities match. An
        // unidentifiable document (no book/chapter) is never assumed to match another, so it
        // replaces rather than deferring.
        const incomingIdentity = getUsjBookChapterIdentity(usjFromPdp);
        const editorIdentity = getUsjBookChapterIdentity(editorUsj);
        const isSameDocument =
          incomingIdentity !== undefined && incomingIdentity === editorIdentity;
        if (isSameDocument) {
          if (areUsjContentsEqualExceptWhitespace(usjFromPdp, editorUsj)) {
            // The PDP now agrees with the editor — the round-trip converged.
            nonConvergingDeferralCount.current = 0;
            logger.debug(
              'useEditorPdpSync: incoming PDP update matches the editor content; nothing to apply.',
            );
            return;
          }
          // The incoming update differs from what the editor shows, so it is NOT applied: we keep
          // the editor's newer content and push it up instead. Almost always the editor's own USFM
          // round-trip while typing, so each deferral is a debug line; a run of them that never
          // converges past the threshold is worth a single warning.
          nonConvergingDeferralCount.current += 1;
          if (nonConvergingDeferralCount.current === NON_CONVERGENCE_WARN_THRESHOLD) {
            logger.warn(
              `useEditorPdpSync: incoming Scripture has not been applied to the actively-edited ` +
                `chapter across ${NON_CONVERGENCE_WARN_THRESHOLD} consecutive PDP updates. This is ` +
                `expected during continuous typing (the editor keeps winning the round-trip), but a ` +
                `persistently high count can indicate a non-idempotent USFM round-trip or a ` +
                `concurrent external edit being deferred.`,
            );
          } else {
            logger.debug(
              'useEditorPdpSync: deferring an incoming PDP update to the actively-edited editor; ' +
                'keeping local edits and pushing them up.',
            );
          }
          saveUsjToPdpIfUpdated();
          return;
        }
      }
      // The update is being applied to the editor (navigation, external change, or an idle editor),
      // so the round-trip is no longer diverging.
      nonConvergingDeferralCount.current = 0;
      setEditorUsj.current(usjFromPdp);
    }
    // If the editor has updates that the PDP hasn't recorded, save them to the PDP
    else {
      nonConvergingDeferralCount.current = 0;
      saveUsjToPdpIfUpdated();
    }
  }, [
    // usjFromPdp and saveUsjToPdpIfUpdated are the only deps that actually change and trigger
    // re-runs. The refs below are stable (their identities never change), but are listed to
    // satisfy the exhaustive-deps lint rule.
    editorRef,
    nonConvergingDeferralCount,
    saveUsjToPdpIfUpdated,
    setEditorUsj,
    usjFromPdp,
    usjSentToPdp,
  ]);
}
