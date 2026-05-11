/**
 * Shared constants for the Markers Checklist web view and its backing command handlers in main.ts.
 *
 * The web view subscribes to the `CHECKLIST_OPEN_SETTINGS_EVENT` network event to learn when the
 * user triggered the `platformScripture.openMarkersChecklistSettings` command (e.g. from the
 * tab-menu `Settings…` item). When the event fires, any mounted checklist web view flips its local
 * `isSettingsOpen` state to `true`.
 *
 * Using a network event (Option A from the UI-PKG-002/003/004 iteration plan) keeps the web view
 * the source of truth for its dialog's open/close state: the command handler just emits and
 * returns. Because event delivery is broadcast-style, if multiple checklist web views are open
 * simultaneously each of them will open its dialog — matching the PT9 Windows-per-tool affordance
 * and the per-web-view state isolation documented in `ui-alignment.md` § State Management.
 */
export const CHECKLIST_OPEN_SETTINGS_EVENT = 'platformScripture.openMarkersChecklistSettings';

/**
 * Network event that asks any mounted Markers Checklist web view to copy its currently visible data
 * to the clipboard (UX-2 finding #12, WP6).
 *
 * The outer Platform.Bible tab chrome dispatches menu commands via
 * `papi.commands.sendCommand(command, tabId)` — it does NOT route them back into the web view
 * directly. So the `platformScripture.copyMarkersChecklist` command handler in `main.ts` cannot
 * read the web view's live `visibleData`. Instead it emits this network event; the web view
 * subscribes via `papi.network.getNetworkEvent`, builds a tab-separated snapshot of its current
 * rows, writes the snapshot to `navigator.clipboard`, and surfaces a Sonner success toast via
 * `papi.notifications.send`.
 *
 * Mirrors the broadcast model used for `CHECKLIST_OPEN_SETTINGS_EVENT`: every mounted checklist web
 * view receives the event. In practice only the focused tab is visible to the user, so the extra
 * clipboard writes from any background tabs are harmless (last-writer-wins, identical payload in
 * the common single-tab case).
 */
export const CHECKLIST_COPY_REQUEST_EVENT = 'platformScripture.copyMarkersChecklist';
