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
 * The identity of the chapter document a `ChapterUSJ` subscription serves — the fields of the data
 * selector that determine WHICH document the data is (the selector's `verseNum` does not
 * participate in identity; it never changes which chapter the subscription delivers).
 */
export interface EditorDocumentSelector {
  book: string;
  chapterNum: number;
  versificationStr?: string;
}

/** Whether two selectors identify the same chapter document (see {@link EditorDocumentSelector}). */
function areSameDocumentSelectors(
  a: EditorDocumentSelector | undefined,
  b: EditorDocumentSelector | undefined,
): boolean {
  if (!a || !b) return false;
  return (
    a.book === b.book && a.chapterNum === b.chapterNum && a.versificationStr === b.versificationStr
  );
}

/**
 * A single top-level USJ content entry wrapped as its own one-entry document, so it can be
 * whitespace-insensitively compared with `areUsjContentsEqualExceptWhitespace`. An absent entry
 * (`undefined`, one side shorter than the other) wraps to an empty document, so it compares unequal
 * to any present entry.
 */
function wrapSingleUsjEntry(entry: Usj['content'][number] | undefined): Usj {
  return { type: 'USJ', version: '3.1', content: entry === undefined ? [] : [entry] };
}

/**
 * The first place two USJ documents SIGNIFICANTLY differ in their top-level `content`, or
 * `undefined` when they agree there (differing only in whitespace or in fields outside top-level
 * content). Each entry pair is compared with the SAME whitespace-insignificant equality the sync
 * itself uses (`areUsjContentsEqualExceptWhitespace`, applied to a single-entry document), so the
 * result points at the first SIGNIFICANT difference rather than a cosmetic whitespace one.
 *
 * Only top-level content is walked (not recursed into nested marker content): it is enough to
 * identify WHICH entry diverged both for a diagnostic log line and for keying the warn-once dedup,
 * and it keeps the output bounded and cheap.
 */
function firstSignificantUsjContentDifference(
  sent: Usj | undefined,
  received: Usj | undefined,
):
  | { index: number; sentEntry?: Usj['content'][number]; receivedEntry?: Usj['content'][number] }
  | undefined {
  const sentContent = sent?.content ?? [];
  const receivedContent = received?.content ?? [];
  const length = Math.max(sentContent.length, receivedContent.length);
  for (let index = 0; index < length; index += 1) {
    const sentEntry = sentContent[index];
    const receivedEntry = receivedContent[index];
    const differs =
      sentEntry !== undefined && receivedEntry !== undefined
        ? !areUsjContentsEqualExceptWhitespace(
            wrapSingleUsjEntry(sentEntry),
            wrapSingleUsjEntry(receivedEntry),
          )
        : sentEntry !== receivedEntry;
    if (differs) return { index, sentEntry, receivedEntry };
  }
  return undefined;
}

/**
 * Best-effort, BOUNDED description of the first significant difference between two USJ documents'
 * top-level `content` — for a diagnostic log line, never a full-document dump. Each side is
 * truncated so a large chapter cannot flood the log.
 */
function describeFirstUsjContentDifference(
  sent: Usj | undefined,
  received: Usj | undefined,
): string {
  const MAX_SNIPPET_LENGTH = 200;
  const truncate = (entry: Usj['content'][number] | undefined): string => {
    if (entry === undefined) return '(absent)';
    const text = JSON.stringify(entry);
    return text.length > MAX_SNIPPET_LENGTH ? `${text.slice(0, MAX_SNIPPET_LENGTH)}…` : text;
  };
  const difference = firstSignificantUsjContentDifference(sent, received);
  if (!difference) {
    return 'documents differ outside top-level content (or in whitespace-insignificant fields only)';
  }
  return `content[${difference.index}]: sent ${truncate(difference.sentEntry)} vs received ${truncate(difference.receivedEntry)}`;
}

/**
 * The two differing entries in full, for the ONE warning a given difference ever produces. The
 * bounded summary above is what a repeated line should carry; a defect that fires once needs enough
 * bytes to attribute — the divergences this catches are single-character whitespace shifts inside a
 * span, which a 200-character truncation can hide entirely.
 */
function describeFullUsjContentDifference(
  sent: Usj | undefined,
  received: Usj | undefined,
): string {
  const difference = firstSignificantUsjContentDifference(sent, received);
  if (!difference) return '';
  return (
    `\nFull sent entry: ${JSON.stringify(difference.sentEntry)}` +
    `\nFull received entry: ${JSON.stringify(difference.receivedEntry)}`
  );
}

/**
 * How many DISTINCT lossy differences the warn-once dedup remembers at a time. Bounded so a long
 * session that surfaces many different non-convergent spots cannot grow the memory without limit;
 * old differences fall out FIFO. Sized well above the handful of distinct spots a real chapter
 * exhibits, so a genuine oscillation among them is never mistaken for a new difference.
 */
export const LOSSY_WARN_MEMORY_LIMIT = 32;

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
  documentSelector,
  editorRef,
  usjSentToPdp,
  setEditorUsj,
  saveUsjToPdpIfUpdated,
  isEditingSessionActive,
}: {
  usjFromPdp: Usj | undefined;
  /**
   * The identity fields of the SAME selector the `ChapterUSJ` subscription producing `usjFromPdp`
   * uses. That pairing is what makes selector-based document identity sound: the platform's data
   * hooks guarantee a delivered value comes from the subscription for the CURRENT selector (a
   * superseded subscription's late emission is dropped), so `usjFromPdp` always belongs to this
   * selector. Identity deliberately does NOT come from the USJ content itself — chapter USJ carries
   * no book marker, so content-derived identity collapses to the chapter number alone and collides
   * across books (navigating GEN 1 → EXO 1 while focused read as the SAME document, deferring the
   * new book and saving GEN's content through EXO's selector).
   */
  documentSelector: EditorDocumentSelector;
  editorRef: MutableRefObject<EditorRef | null>;
  usjSentToPdp: MutableRefObject<Usj | undefined>;
  /** Stable ref whose `.current` is the function to call to update the editor's displayed content */
  setEditorUsj: MutableRefObject<(usj: Usj) => void>;
  saveUsjToPdpIfUpdated: () => void;
  /**
   * Extends the "actively editing" deferral beyond DOM focus: returns true while an editing SESSION
   * owns the editor's content even though the editor itself is blurred — a marker-palette session
   * (the palette overlay outside the iframe holds focus) or an open footnote-editor popover (its
   * own inner editor holds focus while its edits haven't reached the PDP yet). Replacing the editor
   * mid-session would regenerate every Lexical node key, killing the session (the popover's Save
   * then targets a dead key and silently no-ops). Same-document deferral only — a
   * different-document update (navigation) always replaces, exactly as for live typing.
   */
  isEditingSessionActive?: () => boolean;
}): void {
  // Counts consecutive incoming updates deferred to the actively-edited chapter without the
  // round-trip converging (the editor's content matching the echo). Reset whenever an update is
  // actually applied or the round-trip converges; drives the non-convergence warning.
  const nonConvergingDeferralCount = useRef(0);
  // The editor USJ most recently pushed back to the PDP from the deferral branch below. A
  // non-idempotent USFM round-trip (e.g. a typed attribute literal the PDP parses into a
  // different-but-equivalent shape) can NEVER converge, and — because the subscription is
  // whichUpdates '*' — every save re-delivers, re-defers, and re-saves the SAME editor bytes
  // forever. Remembering what we last pushed lets us skip re-pushing unchanged editor content, so
  // a non-convergent round-trip degrades to a single push plus quiescence instead of an infinite
  // save/echo loop. Reset (below) wherever the editor's content is replaced or the round-trip
  // converges, so a genuinely new divergence always gets pushed once.
  const lastEditorUsjPushedWhileDeferring = useRef<Usj | undefined>(undefined);
  // The incoming PDP USJ most recently DEFERRED (kept unapplied) in the branch below. The damping
  // must key on the incoming side too, not just the editor side: an editor that stays quiescent
  // (its own content unchanged) can still be facing a genuinely NEW incoming document — a
  // concurrent external writer (another app on the same project) — and a save skipped purely
  // because the editor did not change would leave disk holding the external bytes while the screen
  // shows the editor's, silently unsaved. Remembering the last deferred incoming lets the skip fire
  // ONLY for a true echo of our own unchanged push (incoming AND editor both unchanged); an
  // incoming that differs is new information and re-pushes the editor's authority. Reset (below)
  // wherever the editor content is replaced or the round-trip converges, alongside
  // `lastEditorUsjPushedWhileDeferring`.
  const lastIncomingUsjDeferred = useRef<Usj | undefined>(undefined);
  // The DISTINCT lossy differences we have already warned about — a bounded FIFO, each entry the
  // first significantly-differing (editor-entry, incoming-entry) pair of a stable non-convergent
  // round-trip. The warning must fire once per distinct DIFFERENCE, not once per re-delivery and
  // not once per whole-document echo:
  //   - A single-slot memory of the last echo re-warns on an A→B→A oscillation (revisiting a
  //     never-converging spot after a different one displaces the slot), spamming the log with a
  //     warning that is not new information.
  //   - Keying on the WHOLE incoming document re-warns the SAME difference whenever anything
  //     ELSE in the chapter changes (an unrelated edit elsewhere), and can conversely SWALLOW a
  //     genuinely new difference whose whole-document echo happens to match a remembered one.
  // Keying on the specific differing entries, compared whitespace-insensitively, fixes both: an
  // already-warned difference stays quiet however the rest of the chapter moves, while a truly new
  // one always warns. Reset (below) wherever the round-trip converges or the editor content is
  // replaced, so a genuinely NEW lossy divergence always warns again.
  const warnedLossyDifferences = useRef<
    { sentEntry?: Usj['content'][number]; receivedEntry?: Usj['content'][number] }[]
  >([]);
  // Identity of the document last APPLIED to the editor via setEditorUsj — i.e. what the editor is
  // showing now. Local edits never change which document the editor shows, so this only moves when
  // an update is applied. Compared against the current documentSelector to tell a same-document
  // echo (defer while actively editing) from a different document arriving (navigation: always
  // replace).
  const lastAppliedDocumentSelector = useRef<EditorDocumentSelector | undefined>(undefined);
  useEffect(() => {
    if (!usjFromPdp) return;
    if (!editorRef.current) {
      // Editor unmounted — reset so it re-initializes when it remounts (see TSDoc). The applied
      // identity describes the CURRENT editor instance's content, so it resets with it.
      usjSentToPdp.current = undefined;
      lastEditorUsjPushedWhileDeferring.current = undefined;
      lastIncomingUsjDeferred.current = undefined;
      warnedLossyDifferences.current = [];
      lastAppliedDocumentSelector.current = undefined;
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
      const isActivelyEditing =
        editorRef.current.isFocused() || (isEditingSessionActive?.() ?? false);
      if (isActivelyEditing) {
        const editorUsj = editorRef.current.getUsj();
        // Same document when the incoming update's selector (== documentSelector, per the pairing
        // invariant on that param) matches the selector whose data was last applied to the editor.
        // A fresh editor with nothing applied yet is never "the same document", so it replaces
        // rather than deferring.
        const isSameDocument = areSameDocumentSelectors(
          documentSelector,
          lastAppliedDocumentSelector.current,
        );
        if (isSameDocument) {
          if (areUsjContentsEqualExceptWhitespace(usjFromPdp, editorUsj)) {
            // The PDP now agrees with the editor — the round-trip converged.
            nonConvergingDeferralCount.current = 0;
            lastEditorUsjPushedWhileDeferring.current = undefined;
            lastIncomingUsjDeferred.current = undefined;
            warnedLossyDifferences.current = [];
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
          // Idempotency damping: skip the re-push ONLY when this deferral is a pure echo of our own
          // unchanged push — i.e. BOTH the editor content is unchanged since our last deferral push
          // AND the incoming update is content-equal to the last one we deferred. That is the exact
          // shape of the infinite save/echo loop a non-idempotent round-trip sustains (e.g. a typed
          // `\nd text|x="y"\nd*` literal that never round-trips to itself): the editor never changes
          // and the whichUpdates '*' subscription keeps re-delivering the SAME normalized echo, so
          // damping it terminates the loop. But an incoming that DIFFERS from the last deferred one
          // is new information — a concurrent external writer on the same project — even when the
          // editor itself is quiescent; skipping the save there would leave the external bytes on
          // disk while the screen shows the editor's content, silently unsaved. So a changed
          // incoming re-pushes the editor's authority (the deferral of the APPLY, not clobbering the
          // caret, is unchanged either way). Genuine continued typing changes the editor content and
          // is likewise still pushed.
          const editorUnchanged = areUsjContentsEqualExceptWhitespace(
            editorUsj,
            lastEditorUsjPushedWhileDeferring.current,
          );
          const incomingUnchanged = areUsjContentsEqualExceptWhitespace(
            usjFromPdp,
            lastIncomingUsjDeferred.current,
          );
          lastIncomingUsjDeferred.current = usjFromPdp;
          if (!editorUnchanged || !incomingUnchanged) {
            lastEditorUsjPushedWhileDeferring.current = editorUsj;
            saveUsjToPdpIfUpdated();
          }
          // Pure echo of our OWN unchanged push: the editor still shows exactly what we last pushed
          // (editorUnchanged) AND the PDP keeps re-delivering the SAME differing echo
          // (incomingUnchanged). That is a STABLE non-convergent round-trip of our own save — we
          // sent one shape and the PDP echoes a DIFFERENT one (beyond insignificant whitespace),
          // indefinitely. That is lossy/non-idempotent EDITOR behavior (our USJ->USFM->USJ is not a
          // fixed point), which we surface loudly so it can be investigated — as distinct from a
          // concurrent EXTERNAL write, whose incoming CHANGES between deliveries and so takes the
          // re-push branch above (a normal deferral, not our fault).
          //
          // Attribution is a heuristic (the PDP gives us no per-write IDs to prove authorship):
          //   - False positive: an external app that writes the SAME bytes on two consecutive
          //     deliveries while our editor is quiescent would also look like a stable echo and be
          //     mislabeled lossy. Rare, and we deliberately PREFER over-warning — a spurious
          //     "investigate lossiness" line is far cheaper than a silently-lost round-trip.
          //   - False negative: a one-shot lossy round-trip applied immediately (editor idle or
          //     blurred — the replace branch below) never loops, so it is not flagged here; only
          //     the persistent, user-visible loops are.
          // Deduped on the DISTINCT DIFFERENCE (the first significantly-differing entry pair), so a
          // single divergence warns once — not once per re-delivery, and not again when the user
          // revisits it after a DIFFERENT divergence (the A→B→A oscillation a single-slot memory
          // would re-warn). A difference not already remembered warns and is remembered (bounded
          // FIFO); a re-visited one stays quiet.
          else {
            const difference = firstSignificantUsjContentDifference(editorUsj, usjFromPdp);
            const alreadyWarned =
              difference !== undefined &&
              warnedLossyDifferences.current.some(
                (warned) =>
                  areUsjContentsEqualExceptWhitespace(
                    wrapSingleUsjEntry(warned.sentEntry),
                    wrapSingleUsjEntry(difference.sentEntry),
                  ) &&
                  areUsjContentsEqualExceptWhitespace(
                    wrapSingleUsjEntry(warned.receivedEntry),
                    wrapSingleUsjEntry(difference.receivedEntry),
                  ),
              );
            if (difference !== undefined && !alreadyWarned) {
              warnedLossyDifferences.current.push({
                sentEntry: difference.sentEntry,
                receivedEntry: difference.receivedEntry,
              });
              if (warnedLossyDifferences.current.length > LOSSY_WARN_MEMORY_LIMIT)
                warnedLossyDifferences.current.shift();
              logger.warn(
                `useEditorPdpSync: our own save round-tripped through the PDP to DIFFERENT content ` +
                  `beyond insignificant whitespace and has not converged — the editor is doing ` +
                  `something lossy (a stable non-idempotent USFM round-trip of our own push, not an ` +
                  `external edit). The editor's getUsj() is settled, so this is not a mid-edit save ` +
                  `snapshot: it is a real USJ->USFM->USJ defect. First differing content entry: ` +
                  `${describeFirstUsjContentDifference(editorUsj, usjFromPdp)}` +
                  `${describeFullUsjContentDifference(editorUsj, usjFromPdp)}`,
              );
            }
          }
          return;
        }
      }
      // The update is being applied to the editor (navigation, external change, or an idle editor),
      // so the round-trip is no longer diverging.
      nonConvergingDeferralCount.current = 0;
      lastEditorUsjPushedWhileDeferring.current = undefined;
      lastIncomingUsjDeferred.current = undefined;
      warnedLossyDifferences.current = [];
      lastAppliedDocumentSelector.current = documentSelector;
      setEditorUsj.current(usjFromPdp);
    }
    // If the editor has updates that the PDP hasn't recorded, save them to the PDP
    else {
      nonConvergingDeferralCount.current = 0;
      // Note: warnedLossyDifferences is deliberately NOT reset here. This branch fires when the
      // incoming matches our last-sent baseline, which a damped lossy loop passes through
      // transiently (usjSentToPdp flips between the editor content and the differing echo). Resetting
      // the dedup here would re-arm the warning on every oscillation. It is reset only where the
      // divergence is genuinely resolved — the editor content is replaced, the round-trip converges
      // to the editor, or the editor unmounts. A genuinely NEW lossy difference still re-warns
      // because it is absent from the remembered set.
      saveUsjToPdpIfUpdated();
    }
  }, [
    // usjFromPdp, documentSelector, and saveUsjToPdpIfUpdated are the only deps that actually
    // change and trigger re-runs. The refs below are stable (their identities never change), but
    // are listed to satisfy the exhaustive-deps lint rule.
    documentSelector,
    editorRef,
    isEditingSessionActive,
    nonConvergingDeferralCount,
    saveUsjToPdpIfUpdated,
    setEditorUsj,
    usjFromPdp,
    usjSentToPdp,
  ]);
}
