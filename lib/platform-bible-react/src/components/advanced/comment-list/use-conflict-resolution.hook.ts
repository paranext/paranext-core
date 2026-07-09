import { CommentStatus, LegacyComment } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ConflictResolutionCallbacks } from './comment-list.types';
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
  /** The resolve + getOptions callbacks; absent renders a read-only card. */
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
}

/**
 * Owns all conflict-resolution state and logic for a conflict thread: it fetches the resolution
 * options only once the thread is open (a `'loading'` sentinel renders a skeleton meanwhile, never
 * the read-only view), applies a resolution optimistically so a reject/merge shows the correct
 * result immediately instead of flashing the accepted text, derives the resolved outcome in a
 * status-aware way, and gates the resolve check on real resolvability.
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

  const getOptions = conflictResolution?.getOptions;
  const resolveCallback = conflictResolution?.resolve;

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

  const resolve = useCallback(
    async (resolution: ConflictResolution) => {
      if (!resolveCallback) return;
      setIsResolving(true);
      try {
        const success = await resolveCallback(threadId, resolution);
        if (success) {
          // Show the chosen result now (optimistic) and lock the controls; the data-update refetch
          // confirms via threadStatus. Prevents the read-only view from flashing the accepted text.
          setOptimisticOutcome(resolutionToOutcome(resolution));
          setConflictOptions('none');
        }
      } finally {
        // Always clear the busy state, even if a consumer's resolve rejects (contract violation),
        // otherwise the card stays locked in its isResolving state.
        setIsResolving(false);
      }
    },
    [resolveCallback, threadId],
  );

  // The outcome an already-resolved conflict was resolved with, read off the resolution comment's
  // conflictResolutionAction (last-to-first). Only meaningful once the thread is 'Resolved': while
  // still 'Todo' (e.g. a reopened reject whose 'replaced' comment persists) this stays undefined so
  // the collapsed summary and the card don't contradict the live selector.
  const derivedResolution = useMemo<ConflictResolutionOutcome | undefined>(() => {
    if (threadStatus !== 'Resolved') return undefined;
    for (let i = activeComments.length - 1; i >= 0; i -= 1) {
      const action = activeComments[i].conflictResolutionAction;
      if (action === 'replaced') return 'reject';
      if (action === 'merged') return 'merged';
    }
    return 'accept';
  }, [threadStatus, activeComments]);

  const resolvedResolution = derivedResolution ?? optimisticOutcome;

  const showResolveCheck = conflictOptions !== 'loading' && conflictOptions !== 'none';

  return { conflictOptions, isResolving, resolve, resolvedResolution, showResolveCheck };
}
