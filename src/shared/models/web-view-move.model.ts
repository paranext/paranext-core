/**
 * Where a failed web view move left the web view, and how that answer reaches whoever asked for the
 * move.
 */

import { getErrorMessage } from 'platform-bible-utils';

/**
 * Where a move that could not do what was asked left the web view.
 *
 * "The move failed" covers outcomes as far apart as "nothing about where it lives changed" and "it
 * is open in no window at all", and only the process that ran the move knows which happened. A
 * caller that reports the wrong one tells the user an action did nothing while their web view is
 * either somewhere they did not choose or gone entirely.
 */
export type WebViewMoveFailureDisposition =
  /** Reopened in the window it came from: nothing about where it lives changed */
  | 'reopened-in-source-window'
  /** Reopened in the focused window: it did move, just not to the window that was asked for */
  | 'reopened-in-focused-window'
  /** Nothing took it: it is open in no window, and only the log holds what it was */
  | 'not-reopened'
  /**
   * Where it is cannot be told: taking it out of the window it was in is the step that failed, and
   * that step can have closed it without handing anything back. Neither "nothing changed" nor "it
   * is gone" can be claimed, so a caller says as much rather than picking one
   */
  | 'possibly-closed';

/** Every disposition, so a reader can look for each one without a second list to keep in step */
const ALL_DISPOSITIONS: WebViewMoveFailureDisposition[] = [
  'reopened-in-source-window',
  'reopened-in-focused-window',
  'not-reopened',
  'possibly-closed',
];

/**
 * The fixed marker a disposition rides behind in a failed move's message. Never shown to a user —
 * it exists so a caller classifies a failure on a token that only ever means one thing, rather than
 * on the prose around it, which is free to be reworded.
 */
function buildDispositionMarker(disposition: WebViewMoveFailureDisposition): string {
  return `[webViewMoveFailure:${disposition}]`;
}

/**
 * Build the message of the error a failed move rejects with, carrying the disposition along with
 * it.
 *
 * The disposition travels inside the message because a request that fails across processes reaches
 * its caller as a code and a message and nothing else — the JSON-RPC error a thrown handler becomes
 * has no payload for anything richer. Producing and reading it through this one pair is what keeps
 * the two ends from drifting apart, the way a hand-copied marker on each side would.
 *
 * @param disposition Where this failure left the web view
 * @param message What went wrong, in the words the log should carry
 */
export function describeWebViewMoveFailure(
  disposition: WebViewMoveFailureDisposition,
  message: string,
): string {
  return `${buildDispositionMarker(disposition)} ${message}`;
}

/**
 * Read back where a failed move left the web view, from the error it rejected with.
 *
 * @returns The disposition the move named, or undefined for a failure that named none — every way a
 *   move can fail before it takes the web view out of its window, where nothing about where it
 *   lives has changed
 */
export function getWebViewMoveFailureDisposition(
  error: unknown,
): WebViewMoveFailureDisposition | undefined {
  const message = getErrorMessage(error);
  return ALL_DISPOSITIONS.find((disposition) =>
    message.includes(buildDispositionMarker(disposition)),
  );
}
