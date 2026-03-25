/**
 * TAB CONFIGURATION — Default tab-to-panel assignments for Simple Mode (Study & Draft workflow).
 *
 * Defines which tabs appear on which panel by default. Only the Study & Draft workflow is
 * implemented.
 */

import type { TabGroupId, TabId } from './tab-registry';
import { getTabDef } from './tab-registry';

// ─── TabItem — the runtime tab assignment used by panels ──────────────────────

export type TabPanel = 'resources' | 'tools' | 'extra';

export interface TabItem {
  id: string;
  label: string;
  panel: TabPanel;
  visible: boolean;
  group: TabGroupId;
}

// ─── Per-tab assignment spec ──────────────────────────────────────────────────

interface TabAssignment {
  id: TabId;
  panel: TabPanel;
  visible: boolean;
}

/** Convert a TabAssignment to a full TabItem using the registry. */
function toTabItem(a: TabAssignment): TabItem {
  const def = getTabDef(a.id);
  return {
    id: a.id,
    label: def?.labelKey ?? a.id,
    panel: a.panel,
    visible: a.visible,
    group: def?.group ?? 'tools',
  };
}

// ─── Study & Draft default tab assignments ────────────────────────────────────

const STUDY_DRAFT_TABS: TabAssignment[] = [
  // Scripture resources panel
  { id: 'reference', panel: 'resources', visible: true },
  { id: 'bible', panel: 'resources', visible: true },
  { id: 'text-collection', panel: 'resources', visible: true },
  { id: 'source', panel: 'resources', visible: true },
  // Tools panel
  { id: 'comments', panel: 'tools', visible: true },
  { id: 'search', panel: 'tools', visible: true },
  { id: 'dictionary', panel: 'tools', visible: true },
  { id: 'terms', panel: 'tools', visible: true },
  { id: 'parallel-passages', panel: 'tools', visible: true },
  { id: 'ai', panel: 'tools', visible: true },
];

// ─── Public API ───────────────────────────────────────────────────────────────

/** Get the default tab arrangement for Study & Draft. */
export function getDefaultTabs(): TabItem[] {
  return STUDY_DRAFT_TABS.map(toTabItem);
}

/** Get the set of tab IDs that are visible by default. */
export function getDefaultVisibleIds(): Set<string> {
  const defaults = getDefaultTabs();
  return new Set(defaults.filter((t) => t.visible).map((t) => t.id));
}

/**
 * Get tab metadata for a tab ID. Used when adding tabs dynamically (e.g., in the extra panel tab
 * chooser).
 */
export function getTabMeta(tabId: string): { label: string; group: TabGroupId } {
  const def = getTabDef(tabId);
  if (def) {
    return { label: def.labelKey, group: def.group };
  }
  return {
    label: tabId.charAt(0).toUpperCase() + tabId.slice(1).replace(/-/g, ' '),
    group: 'tools',
  };
}

/** Resolve a complete TabItem from a tab ID and target panel. */
export function resolveTabItem(tabId: string, panel: TabPanel, visible: boolean = true): TabItem {
  const meta = getTabMeta(tabId);
  return {
    id: tabId,
    label: meta.label,
    panel,
    visible,
    group: meta.group,
  };
}
