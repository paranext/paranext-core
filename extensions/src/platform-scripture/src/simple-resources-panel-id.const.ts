/**
 * Rc-dock panel id of Simple mode's Column 3 (Resources & Tools), as this extension sees it.
 *
 * Passed as a `tab` layout's `parentTabGroupId` to add a web view to Column 3 at runtime.
 * Extensions cannot import renderer source, so the value is mirrored from
 * `SIMPLE_PANEL_ID_RESOURCES` in `src/renderer/components/docking/simple-layout.data.ts`;
 * `simple-layout.data.test.ts` reads this file and fails if the two drift. A stale id would not
 * fail loudly: the dock logs a warning and falls back to its default tab placement, which can add a
 * new pane on top of an existing column.
 */
export const SIMPLE_RESOURCES_PANEL_ID = 'simple-panel-resources';
