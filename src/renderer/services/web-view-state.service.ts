import { deserialize, serialize } from 'platform-bible-utils';

const WEBVIEW_STATE_KEY = 'web-view-state';
const stateMap = new Map<string, Record<string, unknown>>();
const idsLookedUp = new Set<string>();

function loadIfNeeded(): void {
  // If we have any data or tried to look something up, we've already loaded
  if (stateMap.size > 0 || idsLookedUp.size > 0) return;

  const serializedState = localStorage.getItem(WEBVIEW_STATE_KEY);
  if (!serializedState) return;

  const entries: [[string, Record<string, unknown>]] = deserialize(serializedState);
  entries.forEach(([key, value]) => {
    if (key && value) stateMap.set(key, value);
  });
}

function save(): void {
  // If no one looked anything up, don't overwrite anything
  if (idsLookedUp.size <= 0) return;

  const stateToSave = serialize(Array.from(stateMap.entries()));
  localStorage.setItem(WEBVIEW_STATE_KEY, stateToSave);
}

function getRecord(id: string): Record<string, unknown> {
  loadIfNeeded();
  idsLookedUp.add(id);

  const savedState = stateMap.get(id);
  if (savedState) return savedState;

  const newState = {};
  stateMap.set(id, newState);
  return newState;
}

/**
 * Get the WebView state associated with the given ID.
 *
 * This function is only intended to be used at startup. getWebViewState is intended for WebViews to
 * call.
 *
 * @param id ID of the WebView
 * @returns State object of the given WebView
 */
export function getFullWebViewStateById(id: string): Record<string, unknown> {
  if (!id) throw new Error('id must be provided to get webview state');
  return getRecord(id);
}

/**
 * Set the WebView state associated with the given ID
 *
 * This function is only intended to be used at startup. setWebViewState is intended for WebViews to
 * call.
 *
 * @param id ID of the WebView
 * @param state State to set for the given WebView
 */
export function setFullWebViewStateById(id: string, state: Record<string, unknown>): void {
  if (!id || !state) throw new Error('id and state must be provided to set webview state');
  loadIfNeeded();
  idsLookedUp.add(id);
  stateMap.set(id, state);
  save();
}

/**
 * Delete the WebView state associated with the given ID
 *
 * @param id ID of the WebView
 */
export function deleteFullWebViewStateById(id: string): void {
  if (!id) throw new Error('id must be provided to delete webview state');
  loadIfNeeded();
  idsLookedUp.add(id);
  stateMap.delete(id);
  save();
}

/**
 * Purge any WebView state that hasn't been touched since the process has been running. Only call
 * this once all WebViews have been loaded.
 */
export function cleanupOldWebViewState(): void {
  if (stateMap.size <= 0 || idsLookedUp.size <= 0) return;
  stateMap.forEach((_, id) => {
    if (!idsLookedUp.has(id)) stateMap.delete(id);
  });
  save();
}
