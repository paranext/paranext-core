import { CommentStatus, LegacyComment } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ConflictResolutionCallbacks } from './comment-list.types';
import { actionToOutcome, isVerseTextConflictNote } from './comment-list.utils';
import {
  ConflictCardActions,
  ConflictResolution,
  ConflictResolutionOutcome,
} from './conflict-note-card.types';

/** Maps a live resolution choice to the already-resolved outcome it produces. */
function resolutionToOutcome(resolution: ConflictResolution): ConflictResolutionOutcome {
  if (resolution === 'reject') return 'reject';
  if (resolution === 'merge') return 'merged';
  return 'accept';
}

/** Inputs {@link useConflictResolution} needs from the thread it serves. */
export interface UseConflictResolutionParams {
  /** The conflict thread's id. */
  threadId: string;
  /** The thread's current status (drives when the resolved outcome is derived). */
  threadStatus?: CommentStatus;
  /** Whether the thread is expanded (the options fetch is deferred until it is). */
  isSelected: boolean;
  /** The thread's non-deleted comments, newest-last (scanned for the resolution stamp). */
  activeComments: LegacyComment[];
  /**
   * The resolve/getOptions/unresolve/getUndoAvailability callbacks; absent renders a read-only
   * card.
   */
  conflictResolution?: ConflictResolutionCallbacks;
}

/** What {@link useConflictResolution} returns to ConflictThread. */
export interface UseConflictResolutionResult {
  /** The card's action state, including the `'loading'` sentinel while options are in flight. */
  conflictOptions: ConflictCardActions;
  /** True while a resolve call is in flight. */
  isResolving: boolean;
  /** Applies a resolution; on success optimistically shows the chosen outcome (no result flash). */
  resolve: (resolution: ConflictResolution) => Promise<void>;
  /** How the conflict was resolved (status-aware); `undefined` while it is still unresolved. */
  resolvedResolution: ConflictResolutionOutcome | undefined;
  /** Whether to show the header resolve check (options are loaded AND actually resolvable). */
  showResolveCheck: boolean;
  /**
   * Whether the current user may undo this conflict's resolution. Only ever true for a resolved,
   * selected, verseText conflict; `false` otherwise (including while the availability check is in
   * flight, so the undo affordance never flashes on before it is confirmed).
   */
  canUnresolve: boolean;
  /** True while an unresolve call is in flight. */
  isUnresolving: boolean;
  /** Undoes the conflict's resolution. The reopened thread arrives via the data-update event. */
  unresolve: () => Promise<void>;
}

/**
 * Owns all conflict-resolution state and logic for a conflict thread: it fetches the resolution
 * options only once the thread is open (a `'loading'` sentinel renders a skeleton meanwhile, never
 * the read-only view), applies a resolution optimistically so a reject/merge shows the correct
 * result immediately instead of flashing the accepted text, derives the resolved outcome in a
 * status-aware way, gates the resolve check on real resolvability, and (symmetrically) fetches undo
 * availability for a resolved verseText conflict and runs the unresolve action.
 */
export function useConflictResolution({
  threadId,
  threadStatus,
  isSelected,
  activeComments,
  conflictResolution,
}: UseConflictResolutionParams): UseConflictResolutionResult {
  // Starts 'loading' and is fetched only when the thread is selected, so a card that isn't open
  // never spends a round-trip. 'loading' renders a skeleton, never the read-only "resolved" view.
  const [conflictOptions, setConflictOptions] = useState<ConflictCardActions>('loading');
  const [isResolving, setIsResolving] = useState(false);
  // Set on a successful resolve so the card shows the chosen result immediately, before the
  // fire-and-forget data update round-trips and flips threadStatus to 'Resolved'.
  const [optimisticOutcome, setOptimisticOutcome] = useState<
    ConflictResolutionOutcome | undefined
  >();
  // Undo (unresolve) state, alongside the resolve state above: whether the current user may undo
  // this conflict's resolution, and whether an unresolve call is in flight.
  const [canUnresolve, setCanUnresolve] = useState(false);
  const [isUnresolving, setIsUnresolving] = useState(false);

  const getOptions = conflictResolution?.getOptions;
  const resolveCallback = conflictResolution?.resolve;
  const getUndoAvailability = conflictResolution?.getUndoAvailability;
  const unresolveCallback = conflictResolution?.unresolve;

  // Undo is only ever meaningful for a resolved, selected, verseText conflict (the only conflict
  // type resolved via resolveConflict in the first place). Reading conflictType off the first
  // active comment mirrors derivedResolution's read of conflictResolutionAction below.
  const isVerseTextConflict = isVerseTextConflictNote(activeComments[0]);

  // Fetch the resolution options only when the thread is open; re-run on status change (resolve and
  // reopen both change availability). Degrades to 'none' on any failure so the skeleton never hangs.
  // A fresh resolvable result clears any stale optimistic outcome (a reopened, re-resolvable thread).
  useEffect(() => {
    let isCurrent = true;
    if (!isSelected) {
      setConflictOptions('loading');
      return undefined;
    }
    const check = async () => {
      let options: ConflictCardActions;
      try {
        options = getOptions ? await getOptions(threadId) : 'none';
      } catch {
        options = 'none';
      }
      if (!isCurrent) return;
      setConflictOptions(options);
      if (options !== 'none') setOptimisticOutcome(undefined);
    };
    check();
    return () => {
      isCurrent = false;
    };
  }, [isSelected, threadId, threadStatus, getOptions]);

  // Reentrancy guard read/written synchronously so a second click that lands before React re-renders
  // (and disables the button) can't fire a second resolve. `isResolving` state drives the disabled UI;
  // this ref is the source of truth within a single tick.
  const isResolvingRef = useRef(false);
  const resolve = useCallback(
    async (resolution: ConflictResolution) => {
      if (!resolveCallback || isResolvingRef.current) return;
      isResolvingRef.current = true;
      setIsResolving(true);
      try {
        const success = await resolveCallback(threadId, resolution);
        if (success) {
          // Show the chosen result now (optimistic) and lock the controls; the data-update refetch
          // confirms via threadStatus. Prevents the read-only view from flashing the accepted text.
          setOptimisticOutcome(resolutionToOutcome(resolution));
          setConflictOptions('none');
        }
      } catch {
        // A consumer's resolve should report failure by resolving to false, not by throwing. If it
        // throws anyway, swallow it here: resolve() is invoked from un-awaited onClicks, so an
        // uncaught rejection would surface as an unhandled promise rejection. The card simply stays
        // resolvable (success never applied) so the user can retry.
      } finally {
        // Always clear the busy state, even on a rejecting resolve, otherwise the card stays locked
        // in its isResolving state.
        isResolvingRef.current = false;
        setIsResolving(false);
      }
    },
    [resolveCallback, threadId],
  );

  // Fetch undo availability only for a resolved, selected, verseText conflict; re-run on status
  // change (an unresolve reopens the thread, which should stop offering undo). Degrades to false
  // on any failure so the affordance never shows for an unconfirmed capability.
  useEffect(() => {
    let isCurrent = true;
    if (threadStatus !== 'Resolved' || !isSelected || !isVerseTextConflict) {
      setCanUnresolve(false);
      return undefined;
    }
    const check = async () => {
      let available: boolean;
      try {
        available = getUndoAvailability ? await getUndoAvailability(threadId) : false;
      } catch {
        available = false;
      }
      if (isCurrent) setCanUnresolve(available);
    };
    check();
    return () => {
      isCurrent = false;
    };
  }, [threadStatus, isSelected, isVerseTextConflict, threadId, getUndoAvailability]);

  const unresolve = useCallback(async () => {
    if (!unresolveCallback) return;
    setIsUnresolving(true);
    try {
      await unresolveCallback(threadId);
      // Success re-opens the thread; the comment-list data-update event refreshes the card into
      // its actionable state, so no local option-state mutation is needed here (mirrors resolve's
      // reliance on the same event for the confirming refetch).
    } finally {
      // Always clear the busy state, even if a consumer's unresolve rejects (contract violation),
      // otherwise the card stays locked in its isUnresolving state.
      setIsUnresolving(false);
    }
  }, [unresolveCallback, threadId]);

  // The outcome an already-resolved conflict was resolved with, read off the MOST-RECENT resolution
  // comment's conflictResolutionAction. Only the newest resolution counts: a re-resolve leaves the
  // earlier resolution comment in place (reject -> reopen -> accept keeps the old 'replaced'
  // comment), and an accept stamps no action, so scanning for the first non-accept action found
  // would report the stale reject. Match on the resolution comment (status 'Resolved') instead;
  // absent action on it means accept. Only meaningful once the thread itself is 'Resolved' — while
  // still 'Todo' (a reopened conflict) this stays undefined so the collapsed summary and the card
  // don't contradict the live selector.
  const derivedResolution = useMemo<ConflictResolutionOutcome | undefined>(() => {
    if (threadStatus !== 'Resolved') return undefined;
    for (let i = activeComments.length - 1; i >= 0; i -= 1) {
      if (activeComments[i].status === 'Resolved') {
        return actionToOutcome(activeComments[i].conflictResolutionAction);
      }
    }
    return 'accept';
  }, [threadStatus, activeComments]);

  const resolvedResolution = derivedResolution ?? optimisticOutcome;

  const showResolveCheck = conflictOptions !== 'loading' && conflictOptions !== 'none';

  return {
    conflictOptions,
    isResolving,
    resolve,
    resolvedResolution,
    showResolveCheck,
    canUnresolve,
    isUnresolving,
    unresolve,
  };
}
