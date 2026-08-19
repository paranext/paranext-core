// NOTE: 'card' is a built-in style. We can likely remove it when we create a full theme for
// Platform.
// Appears in DOM as `dock-style-card` and `dock-style-platform-bible`.
export const TAB_GROUP = 'card platform-bible';

// Simple-mode column groups. Different groups can't share a panel, so giving simple-mode columns
// distinct groups prevents tabs from being dragged between columns (rc-dock's tabLocked only blocks
// drag-to-create-new-panel, not drag-between-existing-panels). The 'card platform-bible' prefix
// preserves shared CSS styling — see the .dock-style-* selectors.
export const TAB_GROUP_RESOURCES = 'card platform-bible resources';

/**
 * Group for simple-mode columns whose tab bar should be invisible (home, editor). Tabs in this
 * group are locked and the dock-bar is hidden via CSS in `dock-layout-wrapper.component.scss`. The
 * `'platform-bible'` token keeps the shared `.dock-style-platform-bible` styling rules in play.
 */
export const HEADLESS_GROUP = 'headless platform-bible';
