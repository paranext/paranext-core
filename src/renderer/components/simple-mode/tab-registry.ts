/**
 * TAB REGISTRY — Single source of truth for all Simple Mode tab metadata.
 *
 * Every tab in Simple Mode is defined here exactly once. The registry provides tab IDs, labels,
 * icons, and group membership used by the resources panel tab bar, the "add extra panel" dropdown,
 * and the "choose extra panel tabs" dropdown.
 */

import {
  BookOpenText,
  BookOpen,
  Library,
  FileText,
  BookA,
  MessageSquare,
  Search,
  Sparkles,
  GitCompare,
  type LucideIcon,
} from 'lucide-react';

// ─── Tab Group definitions ────────────────────────────────────────────────────

export type TabGroupId = 'scripture' | 'tools';

/**
 * Ordered list of tab group IDs. Determines the display order of groups when tabs from multiple
 * groups appear in the same panel.
 */
export const TAB_GROUP_ORDER: TabGroupId[] = ['scripture', 'tools'];

export interface TabGroupDef {
  label: string;
  tabIds: string[];
}

/**
 * Tab groups with their ordered tab membership. The order of tabIds within each group determines
 * the display order of tabs within that group.
 */
export const TAB_GROUPS: Record<TabGroupId, TabGroupDef> = {
  scripture: {
    label: 'Resources',
    tabIds: ['reference', 'bible', 'text-collection', 'source'],
  },
  tools: {
    label: 'Tools',
    tabIds: ['comments', 'search', 'dictionary', 'terms', 'parallel-passages', 'ai'],
  },
};

// ─── Tab ID type ──────────────────────────────────────────────────────────────

export type TabId =
  | 'reference'
  | 'bible'
  | 'text-collection'
  | 'source'
  | 'comments'
  | 'search'
  | 'dictionary'
  | 'terms'
  | 'parallel-passages'
  | 'ai';

// ─── Tab Definition ───────────────────────────────────────────────────────────

export interface TabDefinition {
  id: TabId;
  labelKey: string;
  group: TabGroupId;
  /** Lucide icon component. Undefined for tabs that use custom rendering. */
  icon?: LucideIcon;
  /**
   * When set, the tab uses a custom icon renderer instead of a Lucide icon. 'aleph' = Hebrew Aleph
   * character, 'triquetra' = Triquetra SVG image.
   */
  customIcon?: 'aleph' | 'triquetra';
}

/**
 * TAB_REGISTRY — Complete catalog of every tab in Simple Mode.
 *
 * Keyed by TabId. This is the ONLY place tab metadata is defined.
 */
export const TAB_REGISTRY: Record<TabId, TabDefinition> = {
  // ── Scripture group ──
  reference: {
    id: 'reference',
    labelKey: 'Reference Text',
    group: 'scripture',
    icon: BookOpenText,
  },
  bible: {
    id: 'bible',
    labelKey: 'Bible Texts',
    group: 'scripture',
    icon: BookOpen,
  },
  'text-collection': {
    id: 'text-collection',
    labelKey: 'Text Collection',
    group: 'scripture',
    icon: Library,
  },
  source: {
    id: 'source',
    labelKey: 'Source Language Tools',
    group: 'scripture',
    customIcon: 'aleph',
  },

  // ── Tools group ──
  comments: {
    id: 'comments',
    labelKey: 'Comments',
    group: 'tools',
    icon: MessageSquare,
  },
  search: {
    id: 'search',
    labelKey: 'Find in texts',
    group: 'tools',
    icon: Search,
  },
  dictionary: {
    id: 'dictionary',
    labelKey: 'Dictionary',
    group: 'tools',
    icon: BookA,
  },
  terms: {
    id: 'terms',
    labelKey: 'Biblical Terms',
    group: 'tools',
    customIcon: 'triquetra',
  },
  'parallel-passages': {
    id: 'parallel-passages',
    labelKey: 'Parallel Passages',
    group: 'tools',
    icon: GitCompare,
  },
  ai: {
    id: 'ai',
    labelKey: 'Ask AI',
    group: 'tools',
    icon: Sparkles,
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Get the TabDefinition for a given ID. Returns undefined if not found. */
export function getTabDef(id: string): TabDefinition | undefined {
  return TAB_REGISTRY[id as TabId];
}

/** Get the group for a tab ID. */
export function getTabGroup(id: string): TabGroupId | undefined {
  return getTabDef(id)?.group;
}

/** Get all tab IDs in display order (respecting group order and tab order within groups). */
export function getAllTabIdsOrdered(): TabId[] {
  const result: TabId[] = [];
  for (const groupId of TAB_GROUP_ORDER) {
    const group = TAB_GROUPS[groupId];
    for (const tabId of group.tabIds) {
      result.push(tabId as TabId);
    }
  }
  return result;
}

/** Sort an array of tab IDs by the canonical order (group order → tab order within group). */
export function sortTabIds(ids: string[]): string[] {
  const ordered = getAllTabIdsOrdered();
  const orderMap = new Map(ordered.map((id, i) => [id, i]));
  return [...ids].sort((a, b) => (orderMap.get(a) ?? 999) - (orderMap.get(b) ?? 999));
}

/**
 * Compute divider indices for a list of tabs — returns the set of indices after which a group
 * divider should be rendered (i.e. the last tab before a group boundary).
 */
export function computeGroupDividerIndices(tabIds: string[]): Set<number> {
  const indices = new Set<number>();
  for (let i = 1; i < tabIds.length; i++) {
    const prevGroup = getTabGroup(tabIds[i - 1]);
    const currGroup = getTabGroup(tabIds[i]);
    if (prevGroup && currGroup && prevGroup !== currGroup) {
      indices.add(i - 1);
    }
  }
  return indices;
}
