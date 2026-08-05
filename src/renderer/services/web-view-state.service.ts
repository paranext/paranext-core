import { stripWindowScopeFromWebViewId } from '@renderer/components/docking/window-scoped-web-view-ids.util';
import { deserialize, serialize } from 'platform-bible-utils';
import localWindowStorage from './local-storage.service';

const WEBVIEW_STATE_KEY = 'web-view-state';
/**
 * State for every web view, keyed on the id its web view was minted with.
 *
 * The docking layout scopes web view ids to the window that loaded them, so the same web view is
 * addressed as `<id>` while it is being created and as `<id>-w<window>` once a layout carrying it
 * has been reloaded. Storage is already per window — `localWindowStorage` prefixes every key with
 * the window id — so this store drops the window scope from the ids it is handed and keys purely on
 * the minted id. Keying on the scoped id instead would file a web view's state under one key and
 * then look for it under another, both across a restart and whenever a window comes back with a
 * different id.
 */
const stateMap = new Map<string, Record<string, unknown>>();
const idsLookedUp = new Set<string>();

function loadIfNeeded(): void {
  // If we have any data or tried to look something up, we've already loaded
  if (stateMap.size > 0 || idsLookedUp.size > 0) return;

  const serializedState = localWindowStorage.getItem(WEBVIEW_STATE_KEY);
  if (!serializedState) return;

  const entries: [[string, Record<string, unknown>]] = deserialize(serializedState);
  entries.forEach(([key, value]) => {
    // Drop the window scope off stored keys too, so every key in the map is comparable to every id
    // looked up and `cleanupOldWebViewState` can tell "stale" from "stored under another spelling"
    if (key && value) stateMap.set(stripWindowScopeFromWebViewId(key), value);
  });
}

function save(): void {
  // If no one looked anything up, don't overwrite anything
  if (idsLookedUp.size <= 0) return;

  const stateToSave = serialize(Array.from(stateMap.entries()));
  localWindowStorage.setItem(WEBVIEW_STATE_KEY, stateToSave);
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
  return getRecord(stripWindowScopeFromWebViewId(id));
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
  const mintedId = stripWindowScopeFromWebViewId(id);
  loadIfNeeded();
  idsLookedUp.add(mintedId);
  stateMap.set(mintedId, state);
  save();
}

/**
 * Delete the WebView state associated with the given ID
 *
 * @param id ID of the WebView
 */
export function deleteFullWebViewStateById(id: string): void {
  if (!id) throw new Error('id must be provided to delete webview state');
  const mintedId = stripWindowScopeFromWebViewId(id);
  loadIfNeeded();
  idsLookedUp.add(mintedId);
  stateMap.delete(mintedId);
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
