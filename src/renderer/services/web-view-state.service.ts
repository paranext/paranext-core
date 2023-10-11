const WEBVIEW_STATE_KEY = 'web-view-state';
const stateMap = new Map<string, Record<string, string>>();
const idsLookedUp = new Set<string>();

function loadIfNeeded(): void {
  // If we have any data or tried to look something up, we've already loaded
  if (stateMap.size > 0 || idsLookedUp.size > 0) return;

  const serializedState = localStorage.getItem(WEBVIEW_STATE_KEY);
  if (!serializedState) return;

  const entries = JSON.parse(serializedState) as [[string, Record<string, string>]];
  entries.forEach((item) => {
    if (item[0] && item[1]) stateMap.set(item[0], item[1]);
  });
}

function save(): void {
  // If no one looked anything up, don't overwrite anything
  if (idsLookedUp.size <= 0) return;

  const stateToSave = JSON.stringify(Array.from(stateMap.entries()));
  localStorage.setItem(WEBVIEW_STATE_KEY, stateToSave);
}

/** Get the web view state object associated with the given ID */
export function getWebViewState(id: string): Record<string, string> {
  loadIfNeeded();
  idsLookedUp.add(id);

  const savedState = stateMap.get(id);
  if (savedState) return savedState;

  const newState = {};
  stateMap.set(id, newState);
  return newState;
}

/** Set the web view state object associated with the given ID
 *  To avoid breaking references to existing state, call `getWebViewState` and modify the returned state object instead of setting a new state object
 */
export function setWebViewState(id: string, state: Record<string, string>): void {
  if (!id || !state) throw new Error('id and state must exist to set webview state');
  loadIfNeeded();
  idsLookedUp.add(id);

  stateMap.set(id, state);
  save();
}

/** Purge any web view state that hasn't been touched since the process has been running.
 *  Only call this once all web views have been loaded.
 */
export function cleanupOldWebViewState(): void {
  if (stateMap.size <= 0 || idsLookedUp.size <= 0) return;
  stateMap.forEach((_, id) => {
    if (!idsLookedUp.has(id)) stateMap.delete(id);
  });
  save();
}
