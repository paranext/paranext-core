import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void): () => void {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

/**
 * Tracks browser connectivity via `navigator.onLine`, re-rendering on the `online`/`offline`
 * events.
 *
 * `navigator.onLine === false` reliably means the machine is offline; `true` means it has a network
 * connection (which may still lack real internet access). Use it only to surface a definite-offline
 * hint, not to assert that the user is online.
 */
export function useIsOnline(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true,
  );
}

export default useIsOnline;
