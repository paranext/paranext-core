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
