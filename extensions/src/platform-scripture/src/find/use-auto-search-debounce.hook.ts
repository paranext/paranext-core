import { useCallback, useEffect, useMemo, useRef } from 'react';
import { DEBOUNCE_CANCELED_ERROR_MESSAGE, debounce, getErrorMessage } from 'platform-bible-utils';
import { logger } from '@papi/frontend';

/** What {@link useAutoSearchDebounce} hands back to the caller. */
export type AutoSearchDebounce = {
  /**
   * Ask for a search once the user stops changing the term or filters. Repeat calls within the
   * delay collapse into one search.
   */
  requestAutoSearch: () => void;
  /**
   * Abandon a queued auto-search because a search is starting right now for another reason (the
   * user pressed Enter, a project switch is re-running the term, a restored term is being
   * searched). A no-op when nothing is queued.
   */
  cancelPendingAutoSearch: () => void;
};

/**
 * Owns the debounced auto-search and the one way to call it off.
 *
 * Deduplication must be expressed as cancelling the queued search, never as a flag telling the next
 * search to stand down. Cancelling is scoped to what is pending at the instant it is called, so it
 * can only ever suppress the genuinely redundant search. A flag is a message that travels forward
 * in time until something consumes it: a search that starts with nothing queued leaves it armed,
 * and the next search to arrive — one the user asked for — is the one that stands down.
 *
 * @param startSearch Starts a search. Always invoked at its latest identity, so callers need not
 *   memoize it.
 * @param delayMs How long to wait after the last request before searching.
 * @returns Stable callbacks — safe to list in effect dependencies.
 */
export function useAutoSearchDebounce(
  startSearch: () => void,
  delayMs: number,
): AutoSearchDebounce {
  const startSearchRef = useRef(startSearch);
  startSearchRef.current = startSearch;

  const debouncedStartSearch = useMemo(
    () => debounce(() => startSearchRef.current(), delayMs),
    [delayMs],
  );

  const requestAutoSearch = useCallback(() => {
    // Cancelling rejects the pending invocation's promise, so this fire-and-forget call must handle
    // it or every deduplicated search becomes an unhandled rejection.
    debouncedStartSearch().catch((error) => {
      const message = getErrorMessage(error);
      if (message !== DEBOUNCE_CANCELED_ERROR_MESSAGE)
        logger.warn(`Find: auto-search failed to start: ${message}`);
    });
  }, [debouncedStartSearch]);

  const cancelPendingAutoSearch = useCallback(
    () => debouncedStartSearch.cancel(),
    [debouncedStartSearch],
  );

  // A search queued for a view that is going away has nothing left to render into.
  useEffect(() => cancelPendingAutoSearch, [cancelPendingAutoSearch]);

  return useMemo(
    () => ({ requestAutoSearch, cancelPendingAutoSearch }),
    [requestAutoSearch, cancelPendingAutoSearch],
  );
}

export default useAutoSearchDebounce;
