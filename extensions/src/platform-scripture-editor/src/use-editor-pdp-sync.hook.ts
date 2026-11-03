import { logger } from '@papi/frontend';
import type { EditorRef } from '@eten-tech-foundation/platform-editor';
import { Usj } from '@eten-tech-foundation/scripture-utilities';
import { areUsjContentsEqualExceptWhitespace } from 'platform-bible-utils';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  areUsjContentDivergencesEquivalent,
  describeUsjContentDivergence,
  describeUsjContentDivergenceInFull,
  detectUsjContentDivergence,
  type UsjContentDivergence,
} from './usj-content-divergence.util';
import { useForgetEditsWhen } from './use-forget-edits-when.hook';

/**
 * How many consecutive PDP updates may be deferred to the actively-edited chapter (kept unapplied)
 * before a single warning is logged. Deferrals are normal during continuous typing — the editor
 * keeps winning its own USFM round-trip — so the threshold is set well above a typing burst; a
 * count this high instead suggests a non-idempotent round-trip or a concurrent external edit being
 * lost.
 */
export const NON_CONVERGENCE_WARN_THRESHOLD = 25;

/**
 * How long, in milliseconds, the focused editor OWNS the chapter's data after the user's last LOCAL
 * edit — the ownership contract for the focused-editor deferral below.
 *
 * While the editor is focused and the last local edit is more recent than this window, an incoming
 * same-document PDP update that differs from the editor is deferred (kept unapplied) and the
 * editor's content is pushed back up instead: mid-typing, the editor is the authority, and the
 * differing incoming is almost always the editor's own USFM-normalized echo.
 *
 * Once the last local edit is OLDER than this window, focus alone no longer confers ownership: an
 * incoming update is applied exactly as if the editor were unfocused. The bound is what keeps a
 * caret parked in the editor from deferring every external write indefinitely, which would let the
 * focused editor's pre-merge content overwrite a Send/Receive merge or another app's concurrent
 * edit no matter how long ago the user last typed.
 *
 * Sized far above the real echo round-trip (700ms save debounce + save + echo, low seconds) so a
 * typing pause never lets an echo clobber the caret, while still bounding how long a parked caret
 * can hold external data at bay.
 */
export const EDITOR_OWNERSHIP_WINDOW_MS = 15_000;

/**
 * Where keyboard focus is, as far as the focused-editor deferral is concerned.
 *
 * - `'thisEditor'`: focus is in this editor's web view, or somewhere that leaves its claim in place
 *   (a menu, any dialog, or unknown).
 * - `'anotherWebView'`: the user moved to another web view. The editor's own iframe still reports
 *   focus, but nobody is typing here, so an incoming update is applied.
 * - `'settling'`: focus may be moving and the focus subject has not caught up yet.
 */
export type EditorFocusLocation = 'thisEditor' | 'anotherWebView' | 'settling';

/**
 * How long, in milliseconds, a delivery is held while the focus location is `'settling'`. If focus
 * is still settling when this elapses, the user has left the window and the update is applied.
 * Sized well above the window service's focus-subject debounce (250 ms), so a click into another
 * web view normally decides the hold long before this elapses.
 */
export const FOCUS_SETTLE_GRACE_MS = 1000;

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

/**
 * Whether the editor's USJ holds the same content as a PDP document, IGNORING the `version` field.
 *
 * `areUsjContentsEqualExceptWhitespace` shallow-compares every top-level property except `content`
 * — `version` included — while the editor always reports its USJ as 3.1 and the PDP serves 3.0
 * (which is why every save path runs `correctEditorUsjVersion` on the way out). Comparing the two
 * documents raw is therefore FALSE whatever the content says, so an editor-vs-PDP equality check
 * that does not neutralize `version` can never report a converged round trip.
 */
function areUsjContentsEqualIgnoringVersion(
  editorUsj: Usj | undefined,
  pdpUsj: Usj | undefined,
): boolean {
  if (!editorUsj || !pdpUsj) return areUsjContentsEqualExceptWhitespace(editorUsj, pdpUsj);
  return areUsjContentsEqualExceptWhitespace({ ...editorUsj, version: pdpUsj.version }, pdpUsj);
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
 * A delivery held while focus settles: the delivery, the selector it was paired with when it was
 * held, its pending grace-period re-run (`undefined` once that has fired), and whether its grace
 * period has run out.
 */
interface HeldDelivery {
  usj: Usj;
  documentSelector: EditorDocumentSelector;
  graceTimeout: ReturnType<typeof setTimeout> | undefined;
  expired: boolean;
}

/** Forgets the held delivery, cancelling its grace-period re-run if it has not fired. */
function releaseHeldDelivery(heldDelivery: MutableRefObject<HeldDelivery | undefined>): void {
  if (heldDelivery.current?.graceTimeout !== undefined)
    clearTimeout(heldDelivery.current.graceTimeout);
  heldDelivery.current = undefined;
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
  flushPendingDebouncedSave,
  isEditingSessionActive,
  isFootnotesPaneOwner,
  lastPaneEditTimestamp,
  lastLocalEditTimestamp,
  editorDocumentSelector,
  getFocusLocation,
  focusLocationKey,
  isSyncBlocked = false,
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
  /**
   * Saves the editor's USJ to the PDP if it changed. Resolves `true` only when a write actually RAN
   * (the write-in-flight guard accepted it) — the deferral bookkeeping below records a push only on
   * that confirmation. A plain `void` return is treated as "ran" for compatibility.
   */
  saveUsjToPdpIfUpdated: () => void | Promise<boolean>;
  /**
   * Fires the web view's pending debounced keystroke-driven save NOW, through the normal save
   * pipeline, and returns that invocation's promise — or `undefined` when no save was pending (or
   * the capability is not wired). The pending invocation must run SYNCHRONOUSLY during the call
   * (the flushable debouncer's `flush` contract), so the flushed save reads the editor before the
   * caller's next statement. Called by the replace path below just before an external update
   * overwrites the editor — see the "recent typing wins" comment there.
   */
  flushPendingDebouncedSave?: () => Promise<void> | undefined;
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
  /**
   * Whether the footnotes pane owns the chapter's content: focus in the pane and an edit there
   * within {@link EDITOR_OWNERSHIP_WINDOW_MS}. Its edits never stamp `lastLocalEditTimestamp`, and
   * `editorRef` reports no focus while the pane has it, so without this the pane would not get the
   * settle hold the Scripture text gets. Must be stable and free of side effects.
   */
  isFootnotesPaneOwner?: () => boolean;
  /**
   * `Date.now()` of the last edit in the footnotes pane, which `isFootnotesPaneOwner` reads. This
   * hook clears it when it clears `lastLocalEditTimestamp`, so the pane gives up its claim with the
   * Scripture text.
   */
  lastPaneEditTimestamp?: MutableRefObject<number | undefined>;
  /**
   * `Date.now()` of the last LOCAL editor edit (a change the user originated in this editor —
   * stamped where the web view schedules the debounced PDP save for a `'local'`-source change), or
   * `undefined` when none has happened yet. Applying an incoming PDP update must NOT refresh this:
   * the editor loads external content under a change-suppression tag, so external applies never
   * reach the stamping path (see the web view's `handleEditorialUsjChange`). Drives the
   * {@link EDITOR_OWNERSHIP_WINDOW_MS} ownership contract — focus alone, with no local edit inside
   * the window, no longer defers incoming updates. This hook clears it when `isSyncBlocked` turns
   * true and when focus moves to another web view, so every reader of the ref sees no recent edit
   * until the next local one.
   */
  lastLocalEditTimestamp: MutableRefObject<number | undefined>;
  /**
   * Where this hook records which chapter document the editor is holding, for a caller that has to
   * know. That is not always `documentSelector`: after navigation the selector names the new
   * chapter at once, while the editor goes on holding the old one, still editable, until the new
   * chapter's content is delivered and applied. `undefined` until a delivery is applied, and again
   * once the editor unmounts. Written only by this hook. The hook keeps its own record when this is
   * omitted.
   */
  editorDocumentSelector?: MutableRefObject<EditorDocumentSelector | undefined>;
  /**
   * Where keyboard focus is right now, read on every render, to give up the claim to the chapter
   * when focus moves to another web view, and when a focused editor or footnotes pane that edited
   * recently receives a differing update. Omitted, focus is taken to be in this editor. See
   * {@link EditorFocusLocation} and the CONTRACT comment in the effect.
   */
  getFocusLocation?: () => EditorFocusLocation;
  /**
   * Any value whose identity changes when focus moves (the web view passes its latest focus
   * subject). In this hook, its only job is to re-run the decision for a delivery held while focus
   * was `'settling'`.
   */
  focusLocationKey?: unknown;
  /**
   * True while a Send/Receive blocks this editor. When it turns true the editor gives up its claim
   * to the chapter (the last local edit is forgotten), so the merge is applied unless the user has
   * typed again since the block ended or a footnote popover is still open. While it is true, a
   * pending debounced save is not flushed before an incoming update replaces the editor: it holds
   * pre-merge text. The write gate would reject it, and the save-failure path would put that text
   * back on screen; in the moment the block outlasts the gate, it would be written over the merge.
   */
  isSyncBlocked?: boolean;
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
  const warnedLossyDifferences = useRef<UsjContentDivergence[]>([]);
  // Identity of the document the editor is showing now: recorded when an update is APPLIED via
  // setEditorUsj, and also when an incoming update matches what this editor last sent (the editor
  // is already showing that document, and that branch can be the only one a chapter ever runs).
  // Local edits never change which document the editor shows, so nothing else moves it. Compared
  // against the current documentSelector to tell a same-document echo (defer while actively
  // editing) from a different document arriving (navigation: always replace). Kept in the caller's
  // ref when it passes one (`editorDocumentSelector`), so the caller can read it too.
  const ownAppliedDocumentSelector = useRef<EditorDocumentSelector | undefined>(undefined);
  const lastAppliedDocumentSelector = editorDocumentSelector ?? ownAppliedDocumentSelector;
  // The `usjFromPdp` reference this effect has already acted on. Every decision below reads the
  // (usjFromPdp, documentSelector) PAIR, but the two do not move together: `documentSelector`
  // changes during the navigation render while `usjFromPdp` still holds the OLD chapter's data
  // (`createUseDataHook` keeps the previous value until the new subscription delivers, flipping
  // only `isLoading`). Acting on that render would treat the old chapter's bytes as the new
  // chapter's — saving them through the new chapter's save function and mis-pairing the real
  // delivery when it lands. Gating on a genuinely new delivery keeps the pair honest.
  const lastProcessedUsjFromPdp = useRef<Usj | undefined>(undefined);
  // The delivery being held while focus is `'settling'`, if any. Released whenever a delivery is
  // decided or dropped, replaced when a different delivery is held, and released on unmount, so its
  // grace-period timer never outlives the hook or the delivery it waits on.
  const heldDelivery = useRef<HeldDelivery | undefined>(undefined);
  // Bumped when a held delivery's grace period runs out. State rather than a ref because setting it
  // is what re-runs the effect.
  const [graceExpiryCount, setGraceExpiryCount] = useState(0);
  useEffect(() => () => releaseHeldDelivery(heldDelivery), []);

  // A Send/Receive replaces the chapter on disk with its merge. Forget the last local edit as soon
  // as it starts, so the merge is applied during the block or after it. Two exceptions push the
  // pre-merge text over the merge once writes are accepted again: a footnote popover still open
  // (`isEditingSessionActive`), and a merge delivered after the user has typed again. The block
  // outlasts the write gate by the store's `HIDE_GRACE_MS` to make the second unlikely, but nothing
  // here rules it out. Called before the sync effect so a block and a delivery in the same render
  // are handled in that order.
  useForgetEditsWhen(isSyncBlocked, lastLocalEditTimestamp, lastPaneEditTimestamp);
  // Leaving for another web view ends the claim for good, rather than only while focus is away:
  // an update from that web view (a Find replacement) can arrive after the user has clicked back,
  // and the editor must not push its older copy over it. The next edit claims the chapter again.
  //
  // Hidden case: a hidden editor tab releases its claim the same way, since this reads the focus
  // subject rather than anything laid out. A non-web-view tab (Settings, About) and a move to
  // another window do not name another web view, so neither releases it.
  useForgetEditsWhen(
    getFocusLocation?.() === 'anotherWebView',
    lastLocalEditTimestamp,
    lastPaneEditTimestamp,
  );

  useEffect(() => {
    if (!usjFromPdp) return;
    if (!editorRef.current) {
      // Editor unmounted — reset so it re-initializes when it remounts (see TSDoc). The applied
      // identity describes the CURRENT editor instance's content, so it resets with it.
      releaseHeldDelivery(heldDelivery);
      usjSentToPdp.current = undefined;
      lastEditorUsjPushedWhileDeferring.current = undefined;
      lastIncomingUsjDeferred.current = undefined;
      warnedLossyDifferences.current = [];
      lastAppliedDocumentSelector.current = undefined;
      lastProcessedUsjFromPdp.current = undefined;
      return;
    }
    // A re-run with no new delivery (the selector moved ahead of its data, or an unrelated dep
    // changed) carries no information to act on. Reference equality is the right test: each
    // delivery hands down a new object, and a re-delivery of identical content under
    // `whichUpdates: '*'` is a fresh object too, so genuine echoes still get through.
    if (usjFromPdp === lastProcessedUsjFromPdp.current) return;
    // A held delivery is not yet recorded as processed, so the guard above does not cover it. If
    // the selector moved on while it was held (navigation), it is the PREVIOUS chapter's data and
    // must not be paired with the new selector: drop it and wait for the new chapter's delivery.
    if (
      heldDelivery.current?.usj === usjFromPdp &&
      !areSameDocumentSelectors(heldDelivery.current.documentSelector, documentSelector)
    ) {
      releaseHeldDelivery(heldDelivery);
      lastProcessedUsjFromPdp.current = usjFromPdp;
      return;
    }

    // Whether the focused editor or footnotes pane claims this delivery, and where focus really is
    // (see THE CONTRACT below). Worked out before anything is recorded, because a delivery held
    // while focus settles must leave every piece of state as it was so it is decided again from
    // scratch.
    //
    // Hidden case: this is data-driven, so a hidden editor tab decides deliveries the same way.
    // Once another web view's tab is active, the focus subject names it, so the update is applied
    // (at worst after FOCUS_SETTLE_GRACE_MS). A non-web-view tab such as Settings or About keeps the
    // claim, but none of them write Scripture.
    const isNewFromPdp = !areUsjContentsEqualExceptWhitespace(usjFromPdp, usjSentToPdp.current);
    const lastLocalEditAt = lastLocalEditTimestamp.current;
    const editorOwnsContent =
      lastLocalEditAt !== undefined && Date.now() - lastLocalEditAt < EDITOR_OWNERSHIP_WINDOW_MS;
    const isFocusedOwner =
      isNewFromPdp &&
      ((editorRef.current.isFocused() && editorOwnsContent) || (isFootnotesPaneOwner?.() ?? false));
    let focusLocation: EditorFocusLocation = isFocusedOwner
      ? (getFocusLocation?.() ?? 'thisEditor')
      : 'thisEditor';
    // Focus still settling once this delivery's grace period ran out means the user left the
    // window, so the update is applied. Focus that came back to this editor keeps the claim.
    if (
      focusLocation === 'settling' &&
      heldDelivery.current?.usj === usjFromPdp &&
      heldDelivery.current.expired
    ) {
      logger.info(
        `useEditorPdpSync: focus did not settle within ${FOCUS_SETTLE_GRACE_MS} ms, so the ` +
          'incoming chapter is applied.',
      );
      focusLocation = 'anotherWebView';
    }
    // Same document when the incoming update's selector (== documentSelector, per the pairing
    // invariant on that param) matches the selector whose data was last applied to the editor. A
    // fresh editor with nothing applied yet is never "the same document", so it replaces rather
    // than deferring.
    const isSameDocument = areSameDocumentSelectors(
      documentSelector,
      lastAppliedDocumentSelector.current,
    );
    // `isEditingSessionActive` must stay the only predicate call on this path: it has side effects
    // (it closes a stale note session). `isActivelyEditing` below skips it when this one ran.
    if (
      isFocusedOwner &&
      focusLocation === 'settling' &&
      isSameDocument &&
      !(isEditingSessionActive?.() ?? false)
    ) {
      // Neither apply nor push back: wait for the focus subject to say where focus went
      // (`focusLocationKey` re-runs this), or for the grace period to run out.
      if (heldDelivery.current?.usj !== usjFromPdp) {
        releaseHeldDelivery(heldDelivery);
        const held: HeldDelivery = {
          usj: usjFromPdp,
          documentSelector,
          graceTimeout: undefined,
          expired: false,
        };
        held.graceTimeout = setTimeout(() => {
          held.graceTimeout = undefined;
          held.expired = true;
          setGraceExpiryCount((count) => count + 1);
        }, FOCUS_SETTLE_GRACE_MS);
        heldDelivery.current = held;
      }
      logger.debug(
        'useEditorPdpSync: holding an incoming PDP update until focus settles; neither applying ' +
          'it nor pushing the editor content.',
      );
      return;
    }
    releaseHeldDelivery(heldDelivery);
    lastProcessedUsjFromPdp.current = usjFromPdp;

    // If what the PDP provided is different than the last thing we sent to the PDP, assume the PDP
    // has the best data. This could happen if the selected chapter changed or something other than
    // the editor wrote to the PDP.
    if (isNewFromPdp) {
      usjSentToPdp.current = usjFromPdp;
      // The PDP round-trips USJ through USFM, so a save made
      // MID-marker-typing (a pending literal like `\q1` still in plain text) echoes back
      // NORMALIZED-different from what we sent even though nobody else wrote — sometimes across
      // MULTIPLE subscription deliveries per save (whichUpdates '*'), so a one-shot "our write is
      // in flight" flag cannot classify them. Hard-replacing the editor with such an echo while
      // the user is typing nulls the Lexical selection and eats the keystrokes typed during the
      // round trip (observed live: `\q1<space>` type-through lost q/1/space ~150-250ms after the
      // `\`).
      //
      // THE CONTRACT: the editor owns the chapter's data for EDITOR_OWNERSHIP_WINDOW_MS after the
      // user's last LOCAL edit, while focused. Inside that window a differing same-document
      // incoming is deferred (kept unapplied) and the editor's newer content is pushed back up
      // instead; an incoming that equals the editor is a pure confirmation (nothing to do —
      // replacing would still reset the selection). Once typing rests, well-formed USJ round-trips
      // stably, the echo matches the editor, and this settles. Focus is asked of the editor
      // instance itself via `editorRef.current.isFocused()`, so the answer is scoped to THIS
      // editor's own content-editable root rather than a global
      // `document.querySelector('.editor-input')` that couples to the CSS class name and to DOM
      // order (a footnote-editor popover renders its own `.editor-input`).
      //
      // `isFocused()` alone overstates the claim: each web view's iframe keeps its own focused
      // element, so the editor still reports focus after the user clicks into Find.
      // `'anotherWebView'` applies the update. The focus subject lags a click by its debounce, so
      // `'settling'` holds the delivery (above) until the subject moves; if it has not moved within
      // FOCUS_SETTLE_GRACE_MS the user has left the window, and the update is applied. A
      // Send/Receive (`isSyncBlocked`) ends the claim, and so does focus reaching another web view,
      // even if it comes back before the update arrives. The footnotes pane claims on the same
      // terms (`isFootnotesPaneOwner`).
      //
      // Once the last local edit is OLDER than the window, focus alone confers nothing: the
      // incoming update is applied exactly as if the editor were unfocused, and nothing is pushed
      // back. A parked caret must never defer external writes indefinitely: a Send/Receive merge
      // or another app's concurrent write has to land — not be overwritten by the focused editor's
      // pre-merge content — however long ago the user last typed, and the window is what bounds
      // the deferral. An active editing SESSION (marker palette, footnote
      // popover — `isEditingSessionActive`) still defers regardless of the window: typing inside
      // the popover's own editor never stamps the main editor's local-edit timestamp, and
      // replacing the main editor mid-session regenerates every Lexical key and kills the session.
      // The predicate bounds only the footnote-popover session web-view-side (a wedged note session
      // stops deferring once stale). A marker-palette session has no bound: while one stays open,
      // every differing same-document update is deferred and the editor's content pushed over it,
      // including a genuine external merge — a known gap documented on
      // `resolveEditingSessionActivity`.
      //
      // When the editor is NOT focused (idle, blurred) and no session is active, the PDP update
      // replaces as before — genuine external co-edits land immediately.
      //
      // Regression guard: the deferral applies ONLY to the SAME document. When the
      // incoming USJ is a DIFFERENT book/chapter (navigation via the BookChapter control while
      // focus sits in the editor), deferring would keep the editor on the OLD chapter forever —
      // and, worse, save-back would write the old chapter's content through the NEW chapter's
      // data selector. A different-document update always replaces.
      const isActivelyEditing =
        (isFocusedOwner && focusLocation !== 'anotherWebView') ||
        (isEditingSessionActive?.() ?? false);
      if (isActivelyEditing) {
        const editorUsj = editorRef.current.getUsj();
        if (isSameDocument) {
          // Every return below this point deliberately skips `setEditorUsj`, so `editorChapterKey`
          // (the web view's `useScrollToRange` gate — see `setEditorUsj`'s call site) does not
          // advance here either. A range jump waiting on that chapter stays pending for as long as
          // this branch keeps firing.
          if (areUsjContentsEqualIgnoringVersion(editorUsj, usjFromPdp)) {
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
            // Record the push only once the save pipeline CONFIRMS a write ran: a save the
            // write-in-flight guard drops never leaves the editor, so recording it would make
            // the next deferral compare against content that never left — misattributing an
            // ordinary deferral as "the editor is doing something lossy". A `void`-returning
            // save has no outcome to wait on and records SYNCHRONOUSLY (deferring it to a
            // microtask would let a same-tick delivery burst bypass the damping entirely); a
            // promise-returning save records when it resolves, and until then the slot keeps
            // its previous value — the worst case of that window is one extra re-push, never a
            // wrong lossy warning.
            const pushOutcome = saveUsjToPdpIfUpdated();
            if (pushOutcome) {
              pushOutcome
                .then((pushed) => {
                  if (pushed) lastEditorUsjPushedWhileDeferring.current = editorUsj;
                  return undefined;
                })
                .catch(() => undefined);
            } else {
              lastEditorUsjPushedWhileDeferring.current = editorUsj;
            }
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
            const divergence = detectUsjContentDivergence(editorUsj, usjFromPdp);
            const alreadyWarned = warnedLossyDifferences.current.some((warned) =>
              areUsjContentDivergencesEquivalent(warned, divergence),
            );
            if (divergence !== undefined && !alreadyWarned) {
              warnedLossyDifferences.current.push(divergence);
              if (warnedLossyDifferences.current.length > LOSSY_WARN_MEMORY_LIMIT)
                warnedLossyDifferences.current.shift();
              logger.warn(
                `useEditorPdpSync: our own save round-tripped through the PDP to DIFFERENT content ` +
                  `beyond insignificant whitespace and has not converged — the editor is doing ` +
                  `something lossy (a stable non-idempotent USFM round-trip of our own push, not an ` +
                  `external edit). The editor's getUsj() is settled, so this is not a mid-edit save ` +
                  `snapshot: it is a real USJ->USFM->USJ defect. First differing content entry: ` +
                  `${describeUsjContentDivergence(divergence)}` +
                  `${describeUsjContentDivergenceInFull(divergence)}`,
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
      // Recent typing wins: before this external update replaces the editor, flush any pending
      // debounced keystroke save so the final keystrokes are WRITTEN rather than silently
      // discarded. (The mirror case — focus still in the editor — pushes them via the deferral
      // branch above; without this flush, focus at the delivery instant decided between "pushed"
      // and "lost".) The ordering here is deliberate:
      //
      //   - The flush runs its invocation synchronously (see `FlushableDebouncer.flush`), so the
      //     save reads the editor BEFORE the replace below overwrites it, and its PDP write is
      //     already in flight — the write-in-flight guard held — when the replace happens. The
      //     returned promise settles when the invocation completes, not when the PDP write does,
      //     so awaiting it would only defer the replace to a microtask; the replace proceeds
      //     synchronously instead, closing any interleaving window.
      //   - Any pending save here was scheduled for the CURRENT chapter: a cross-chapter pending save is
      //     flushed by the web view's chapter-switch effect cleanup before a new chapter's first
      //     delivery can reach this effect.
      //   - After the flush, this incoming update is STALE relative to the flushed content. It is
      //     still applied (below); the flushed write's echo then arrives as an ordinary differing
      //     delivery and replaces the editor through this same path, converging editor and PDP on
      //     the typed content. Re-recording the incoming update as last-sent is what routes that
      //     echo here: the flushed write records its own newer content as last-sent, which would
      //     make the echo look identical-to-sent and take the push-back branch below — re-pushing
      //     this stale update's content over the just-flushed keystrokes.
      //   - The editor's document identity moves only AFTER the flush, together with the replace:
      //     until then the editor still holds the previous document, and the flushed save must see
      //     that. After navigation, a save pending here was scheduled for the NEW chapter while the
      //     editor was still showing the old one, and the web view drops it rather than write one
      //     chapter's content into another.
      //   - Not while a Send/Receive blocks the editor: the save holds pre-merge text. The write
      //     gate would reject it, and the save-failure path would put that text back on screen over
      //     this update; in the moment the block outlasts the gate, it would overwrite the merge.
      if (!isSyncBlocked && flushPendingDebouncedSave?.() !== undefined)
        usjSentToPdp.current = usjFromPdp;
      lastAppliedDocumentSelector.current = documentSelector;
      setEditorUsj.current(usjFromPdp);
    }
    // If the editor has updates that the PDP hasn't recorded, save them to the PDP
    else {
      // This branch does not call `setEditorUsj` either, so `editorChapterKey` does not advance for
      // it — same coupling as the deferral branch above. A range jump waiting on this chapter stays
      // pending for as long as this is the branch that keeps firing for it.
      nonConvergingDeferralCount.current = 0;
      // The editor is already showing this document — the incoming update matches what this
      // editor last sent — so record the selector as applied even though nothing is (re)applied
      // here. This branch can be the ONLY one a chapter ever runs (the first delivery matches the
      // sent baseline), and leaving the applied identity unset/stale would make the deferral
      // branch above misread a later differing delivery as a DIFFERENT document and hard-replace
      // the actively-edited editor instead of deferring.
      lastAppliedDocumentSelector.current = documentSelector;
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
    // `usjFromPdp` and `documentSelector` carry the deliveries; `saveUsjToPdpIfUpdated` changes
    // with the chapter. `focusLocationKey`, `graceExpiryCount` and `isSyncBlocked` re-decide a held
    // delivery; a re-run with nothing new or held returns at the processed-delivery guard. The
    // refs, `getFocusLocation` and `isFootnotesPaneOwner` are stable, listed for exhaustive-deps.
    documentSelector,
    editorRef,
    flushPendingDebouncedSave,
    focusLocationKey,
    getFocusLocation,
    graceExpiryCount,
    isEditingSessionActive,
    isFootnotesPaneOwner,
    isSyncBlocked,
    lastAppliedDocumentSelector,
    lastLocalEditTimestamp,
    nonConvergingDeferralCount,
    saveUsjToPdpIfUpdated,
    setEditorUsj,
    usjFromPdp,
    usjSentToPdp,
  ]);
}
