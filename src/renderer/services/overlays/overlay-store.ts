/**
 * Simple overlay store using a Map and listeners pattern. Manages active overlay entries (context
 * menus, modal dialogs, popovers) and notifies subscribers on changes.
 */

import type { PlatformError } from 'platform-bible-utils';
import { OverlayEntry, OverlayResolveType, PopoverContent } from './overlay.service-model';

/** Map of overlay id to overlay entry */
const overlays = new Map<string, OverlayEntry>();

/** Set of listeners notified on any store change */
const listeners = new Set<() => void>();

/** Notify all subscribed listeners */
function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

/**
 * Add an overlay entry to the store
 *
 * @param entry The overlay entry to add
 * @throws Error if an overlay with the same id already exists
 */
export function addOverlay(entry: OverlayEntry): void {
  if (overlays.has(entry.id))
    throw new Error(`Overlay with id ${entry.id} already exists. Cannot add duplicate.`);
  overlays.set(entry.id, entry);
  notifyListeners();
}

/**
 * Resolves an overlay's promise with the given result and removes it from the store. Returns true
 * if the overlay was found and settled, false if not found.
 *
 * @param id The id of the overlay to resolve and remove
 * @param expectedType The expected type of the overlay (e.g. 'contextMenu', 'popover', 'modal')
 * @param result The value to resolve the overlay's promise with
 * @returns True if the overlay was found and resolved, false if not found
 * @throws Error if the overlay exists but its type does not match `expectedType`
 */
export function resolveAndRemoveOverlay<T extends keyof OverlayResolveType>(
  id: string,
  expectedType: T,
  result: OverlayResolveType[T],
): boolean {
  const entry = overlays.get(id);
  if (!entry) return false;
  if (entry.type !== expectedType)
    throw new Error(`Overlay type mismatch: expected ${expectedType}, got ${entry.type}`);
  // OverlayEntry resolve types are not compatible, so we need to assert
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  (entry as { resolve: (value: unknown) => void }).resolve(result);
  overlays.delete(id);
  notifyListeners();
  return true;
}

/**
 * Rejects an overlay's promise with the given error and removes it from the store. Returns true if
 * the overlay was found and settled, false if not found.
 *
 * @param id The id of the overlay to reject and remove
 * @param error The error to reject the overlay's promise with
 * @returns True if the overlay was found and rejected, false if not found
 */
export function rejectAndRemoveOverlay(id: string, error: PlatformError): boolean {
  const entry = overlays.get(id);
  if (!entry) return false;
  entry.reject(error);
  overlays.delete(id);
  notifyListeners();
  return true;
}

/** Get all active overlays as an array */
export function getOverlays(): OverlayEntry[] {
  return Array.from(overlays.values());
}

/**
 * Get all overlays for a specific webViewId
 *
 * @param webViewId The web view id to filter overlays by
 * @returns An array of overlay entries associated with the given web view id
 */
export function getOverlaysByWebView(webViewId: string): OverlayEntry[] {
  return Array.from(overlays.values()).filter((entry) => entry.webViewId === webViewId);
}

/** Subscribe to store changes. Returns an unsubscribe function. */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Get a specific overlay by id, or undefined if not found */
export function getOverlayById(id: string): OverlayEntry | undefined {
  return overlays.get(id);
}

/** Removes all overlays from the store and notifies listeners. Only exported for use in tests. */
export function clearAllOverlays(): void {
  if (overlays.size === 0) return;
  overlays.clear();
  notifyListeners();
}

/**
 * Updates the content of a popover overlay and notifies subscribers.
 *
 * @param id The overlay id to update
 * @param content The new popover content
 * @returns True if the overlay was found and updated, false otherwise
 */
export function updateOverlayContent(id: string, content: PopoverContent): boolean {
  const entry = overlays.get(id);
  if (!entry || entry.type !== 'popover') return false;
  overlays.set(id, { ...entry, content });
  notifyListeners();
  return true;
}
