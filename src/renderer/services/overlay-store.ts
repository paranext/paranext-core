/**
 * Simple overlay store using a Map and listeners pattern. Manages active overlay entries (context
 * menus, modal dialogs, popovers) and notifies subscribers on changes.
 */

import { OverlayEntry, PopoverContent } from '@shared/models/overlay.service-model';

/** Map of overlay id to overlay entry */
const overlays = new Map<string, OverlayEntry>();

/** Set of listeners notified on any store change */
const listeners = new Set<() => void>();

/** Notify all subscribed listeners */
function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

/** Add an overlay entry to the store */
export function addOverlay(entry: OverlayEntry): void {
  overlays.set(entry.id, entry);
  notifyListeners();
}

/** Remove an overlay by id and return it, or undefined if not found */
export function removeOverlay(id: string): OverlayEntry | undefined {
  const entry = overlays.get(id);
  if (entry) {
    overlays.delete(id);
    notifyListeners();
  }
  return entry;
}

/** Get all active overlays as an array */
export function getOverlays(): OverlayEntry[] {
  return Array.from(overlays.values());
}

/** Get all overlays for a specific webViewId */
export function getOverlaysByWebView(webViewId: string): OverlayEntry[] {
  return Array.from(overlays.values()).filter((entry) => entry.webViewId === webViewId);
}

/** Remove all overlays for a specific webViewId */
export function removeOverlaysByWebView(webViewId: string): void {
  let changed = false;
  overlays.forEach((entry, id) => {
    if (entry.webViewId === webViewId) {
      overlays.delete(id);
      changed = true;
    }
  });
  if (changed) notifyListeners();
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

/** Removes all overlays from the store and notifies listeners. Exported for use in tests. */
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
  entry.content = content;
  notifyListeners();
  return true;
}
