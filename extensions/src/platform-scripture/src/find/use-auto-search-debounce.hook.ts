import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  DEBOUNCE_CANCELED_ERROR_MESSAGE,
  DebouncedFunction,
  debounce,
  getErrorMessage,
} from 'platform-bible-utils';
import type { FindLogger } from './search-result.component';

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
 * @param delayMs How long to wait after the last request before searching. Read once, when the
 *   debounce is created.
 * @param logger Receives a warning when a search fails to start. Passed in rather than imported
 *   from `@papi/frontend` so this module — like the rest of `find/` — stays free of the runtime
 *   `@papi` import, which the test environment only mocks a default export for.
 * @returns Stable callbacks — safe to list in effect dependencies.
 */
export function useAutoSearchDebounce(
  startSearch: () => void,
  delayMs: number,
  logger?: FindLogger,
): AutoSearchDebounce {
  const startSearchRef = useRef(startSearch);
  startSearchRef.current = startSearch;
  const loggerRef = useRef(logger);
  loggerRef.current = logger;

  // A ref, not `useMemo`: this object owns a live timer, and React documents a memo value as a
  // discardable hint. Were it evicted, a timer armed on the discarded instance would still fire
  // while `cancelPendingAutoSearch` cancelled the replacement — the duplicate search this hook
  // exists to prevent. A ref guarantees exactly one instance for the life of the component.
  const debouncedStartSearchRef = useRef<DebouncedFunction<() => void> | undefined>(undefined);
  if (!debouncedStartSearchRef.current)
    debouncedStartSearchRef.current = debounce(() => startSearchRef.current(), delayMs);
  const debouncedStartSearch = debouncedStartSearchRef.current;

  const requestAutoSearch = useCallback(() => {
    // Cancelling rejects the pending invocation's promise, so this fire-and-forget call must handle
    // it or every deduplicated search becomes an unhandled rejection.
    debouncedStartSearch().catch((error) => {
      const message = getErrorMessage(error);
      if (message !== DEBOUNCE_CANCELED_ERROR_MESSAGE)
        loggerRef.current?.warn(`Find: auto-search failed to start: ${message}`);
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
