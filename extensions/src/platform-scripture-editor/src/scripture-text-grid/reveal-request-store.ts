import { useRunWhenVisible } from 'platform-bible-react';
import { isString } from 'platform-bible-utils';
import { useCallback, useEffect, useSyncExternalStore } from 'react';
import type { RevealRequest } from './reveal-resource.utils';

/** How long a reveal request waits for the tab to be shown before it is dropped. */
export const REVEAL_REQUEST_MAX_AGE_MS = 5_000;

/** The newest request received and not yet taken by a visible view. */
let pendingRequest: { projectId: string; receivedAt: number } | undefined;
/** The request currently handed to the grid, until the grid reports it handled. */
let exposedRequest: RevealRequest | undefined;
let lastRequestId = 0;
let isListenerInstalled = false;
const subscribers = new Set<() => void>();

function notifySubscribers() {
  subscribers.forEach((subscriber) => subscriber());
}

function subscribe(subscriber: () => void) {
  subscribers.add(subscriber);
  return () => {
    subscribers.delete(subscriber);
  };
}

function getExposedRequest() {
  return exposedRequest;
}

function handleMessage({ data }: MessageEvent) {
  if (
    !data ||
    typeof data !== 'object' ||
    !('method' in data) ||
    data.method !== 'revealResource' ||
    !('projectId' in data) ||
    !isString(data.projectId)
  )
    return;
  pendingRequest = { projectId: data.projectId, receivedAt: Date.now() };
  notifySubscribers();
}

/**
 * Starts recording `revealResource` messages posted to `target`. Call it once at the top level of
 * the web view module, not from a component: the renderer buffers messages sent to a tab that has
 * not been shown yet and flushes them when its iframe loads, which can happen before any React
 * effect runs, so a listener registered in an effect would miss them. Calling it again is a no-op.
 *
 * Only the newest request is kept; a later one replaces an earlier one that nothing has taken yet.
 */
export function installRevealRequestListener(target: Window): void {
  if (isListenerInstalled) return;
  isListenerInstalled = true;
  target.addEventListener('message', handleMessage);
}

/**
 * Hands the grid the pending reveal request once this view is visible.
 *
 * Hidden case: revealing needs layout, which a hidden tab does not have. A request that arrives
 * while hidden waits (collapsing with any later one) and is taken when the view is next shown; one
 * that waited longer than {@link REVEAL_REQUEST_MAX_AGE_MS} is dropped, since the user has moved
 * on.
 *
 * @param isViewVisible Whether the web view is rendered; pass `useViewVisibility()`.
 * @returns The request to reveal (if any) and the callback the grid calls when it has handled it.
 */
export function useRevealRequest(isViewVisible: boolean): {
  revealRequest: RevealRequest | undefined;
  onRevealHandled: (requestId: number) => void;
} {
  const revealRequest = useSyncExternalStore(subscribe, getExposedRequest);

  const takePendingRequest = useRunWhenVisible(isViewVisible, () => {
    if (!pendingRequest) return;
    const { projectId, receivedAt } = pendingRequest;
    pendingRequest = undefined;
    if (Date.now() - receivedAt > REVEAL_REQUEST_MAX_AGE_MS) return;
    lastRequestId += 1;
    exposedRequest = { projectId, requestId: lastRequestId };
    notifySubscribers();
  });

  // Picks up a request that arrived before this view mounted, and every one that arrives after.
  useEffect(() => {
    takePendingRequest();
    return subscribe(takePendingRequest);
  }, [takePendingRequest]);

  const onRevealHandled = useCallback((requestId: number) => {
    if (exposedRequest?.requestId !== requestId) return;
    exposedRequest = undefined;
    notifySubscribers();
  }, []);

  return { revealRequest, onRevealHandled };
}

/** Empties the store and removes nothing from `window`; the listener stays installed. */
export function resetRevealRequestStoreForTesting(): void {
  pendingRequest = undefined;
  exposedRequest = undefined;
  lastRequestId = 0;
}
