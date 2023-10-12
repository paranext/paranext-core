const WEBVIEW_STATE_KEY = 'web-view-state';
const stateMap = new Map<string, Record<string, string>>();
const idsLookedUp = new Set<string>();

function loadIfNeeded(): void {
  // If we have any data or tried to look something up, we've already loaded
  if (stateMap.size > 0 || idsLookedUp.size > 0) return;

  const serializedState = localStorage.getItem(WEBVIEW_STATE_KEY);
  if (!serializedState) return;

  const entries = JSON.parse(serializedState) as [[string, Record<string, string>]];
  entries.forEach(([key, value]) => {
    if (key && value) stateMap.set(key, value);
  });
}

function save(): void {
  // If no one looked anything up, don't overwrite anything
  if (idsLookedUp.size <= 0) return;

  const stateToSave = JSON.stringify(Array.from(stateMap.entries()));
  localStorage.setItem(WEBVIEW_STATE_KEY, stateToSave);
}

function getRecord(id: string): Record<string, string> {
  loadIfNeeded();
  idsLookedUp.add(id);

  const savedState = stateMap.get(id);
  if (savedState) return savedState;

  const newState = {};
  stateMap.set(id, newState);
  return newState;
}

/**
 * Get the web view state associated with the given ID
 * This function is only intended to be used at startup. getWebViewState is intended for web views to call.
 * @param id ID of the web view
 * @returns state object of the given web view
 */
export function getFullWebViewStateById(id: string): Record<string, string> {
  if (!id) throw new Error('id must be provided to get webview state');
  return getRecord(id);
}

/**
 * Set the web view state associated with the given ID
 * This function is only intended to be used at startup. setWebViewState is intended for web views to call.
 * @param id ID of the web view
 * @param state State to set for the given web view
 */
export function setFullWebViewStateById(id: string, state: Record<string, string>): void {
  if (!id || !state) throw new Error('id and state must be provided to set webview state');
  loadIfNeeded();
  idsLookedUp.add(id);
  stateMap.set(id, state);
  save();
}

/**
 * Get the web view state associated with the given ID
 * @param id ID of the web view
 * @param stateKey Key used to retrieve the state value
 * @returns string (if it exists) containing the state for the given key of the given web view
 */
export function getWebViewStateById<T>(id: string, stateKey: string): T | undefined {
  if (!id || !stateKey) throw new Error('id and stateKey must be provided to get webview state');
  const state: Record<string, string> = getRecord(id);
  const stateValue: string | undefined = state[stateKey];
  return stateValue ? (JSON.parse(stateValue) as T) : undefined;
}

/**
 * Set the web view state object associated with the given ID
 * @param id ID of the web view
 * @param stateKey Key for the associated state
 * @param stateValue Value of the state for the given key of the given web view - must work with JSON.stringify/parse
 */
export function setWebViewStateById<T>(id: string, stateKey: string, stateValue: T): void {
  if (!id || !stateKey) throw new Error('id and stateKey must be provided to set webview state');
  const stringifiedValue = JSON.stringify(stateValue);
  try {
    const roundTripped = JSON.parse(stringifiedValue);
    const roundTrippedStringified = JSON.stringify(roundTripped);
    if (stringifiedValue !== roundTrippedStringified) {
      throw new Error(`roundtrip failure`);
    }
  } catch (err) {
    throw new Error(`"${stateKey}" value cannot round trip with JSON.stringify and JSON.parse.`);
  }

  const state: Record<string, string> = getRecord(id);
  state[stateKey] = stringifiedValue;
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
