import { deepClone } from 'platform-bible-utils';
import type { BoxData, LayoutBase, PanelData, TabData } from 'rc-dock';
import type { SavedTabInfo } from '@shared/models/docking-framework.model';
import type { DefaultLayoutSupplementEntry } from './default-layout-supplement.model';

function isBoxData(node: BoxData | PanelData): node is BoxData {
  return 'children' in node && Array.isArray(node.children);
}

function webViewTypeOf(tab: TabData): string | undefined {
  // Layout data files store SavedTabInfo under each tab; read its data.webViewType.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = (tab as unknown as SavedTabInfo).data as { webViewType?: string } | undefined;
  return data?.webViewType;
}

/**
 * Depth-first walk of a dock box tree, calling `visitPanel` on each leaf panel and returning the
 * first panel it yields (return `undefined` to keep looking). Backs both the anchor lookup and the
 * id collection below.
 *
 * Not reusing `findTabGroupById` (platform-dock-layout-storage.util.ts) is deliberate: it matches
 * by panel id, not by contained web view type, and importing it here would form an import cycle.
 */
function findPanel(
  box: BoxData,
  visitPanel: (panel: PanelData) => PanelData | undefined,
): PanelData | undefined {
  return box.children.reduce<PanelData | undefined>(
    (found, child) =>
      found ?? (isBoxData(child) ? findPanel(child, visitPanel) : visitPanel(child)),
    undefined,
  );
}

function findPanelByWebViewType(box: BoxData, anchor: string): PanelData | undefined {
  return findPanel(box, (panel) =>
    (panel.tabs ?? []).some((t) => webViewTypeOf(t) === anchor) ? panel : undefined,
  );
}

function collectTabIds(box: BoxData, ids: Set<string>): void {
  findPanel(box, (panel) => {
    (panel.tabs ?? []).forEach((t) => t.id && ids.add(t.id));
    // Always return undefined so the walk visits every panel instead of stopping at the first.
    return undefined;
  });
}

/**
 * Filter supplement entries down to those enabled for the current build. An entry with no
 * `flagSetting` is always included; an entry with a `flagSetting` is included only if `getFlag`
 * resolves that key to boolean `true`.
 *
 * A `getFlag` that rejects (e.g. the setting has not been contributed yet, or its extension is
 * disabled) is treated as "disabled" for that one entry and reported via `onFlagError`, so a single
 * bad flag can never reject the whole batch and take down layout loading. Side effects (the
 * settings read and logging) are injected, keeping this pure and unit-testable without the renderer
 * service graph.
 */
export async function filterEnabledSupplementEntries(
  entries: DefaultLayoutSupplementEntry[],
  getFlag: (flagSetting: string) => Promise<unknown>,
  onFlagError?: (entry: DefaultLayoutSupplementEntry, error: unknown) => void,
): Promise<DefaultLayoutSupplementEntry[]> {
  // Vanilla Platform.Bible ships an empty supplement. Bail out before any flag reads so the common
  // case does no work and never risks a rejected `getFlag`.
  if (entries.length === 0) return [];
  const resolved = await Promise.all(
    entries.map(async (entry) => {
      if (!entry.flagSetting) return entry;
      try {
        const value = await getFlag(entry.flagSetting);
        return value === true ? entry : undefined;
      } catch (error) {
        onFlagError?.(entry, error);
        return undefined;
      }
    }),
  );
  return resolved.filter((e): e is DefaultLayoutSupplementEntry => e !== undefined);
}

/**
 * Add each supplement entry's tab to the panel containing its `anchorWebViewType` — appended last,
 * or before the tab named by the entry's `insertBeforeWebViewType` when that tab is in the panel.
 * Pure and idempotent: returns a deep clone, never mutates `baseLayout`, and skips entries whose id
 * already exists or whose anchor is absent. `entries` should already be filtered by any
 * `flagSetting` (see {@link filterEnabledSupplementEntries} and the caller in
 * `web-view.service-host.ts`).
 */
export function mergeDefaultLayoutSupplement(
  baseLayout: LayoutBase,
  entries: DefaultLayoutSupplementEntry[],
  onPlacementAnomaly?: (entry: DefaultLayoutSupplementEntry, message: string) => void,
): LayoutBase {
  const layout: LayoutBase = deepClone(baseLayout);
  if (!layout.dockbox) return layout;
  // dockbox is a BoxData at runtime; LayoutBase types it as the rc-dock union
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dockbox = layout.dockbox as BoxData;
  const existingIds = new Set<string>();
  // Dedup across every box, not just the dockbox: rc-dock keeps floated/windowed/maximized tabs in
  // sibling boxes. A supplement tab the user moved out of the dockbox still exists, so scanning only
  // the dockbox would re-inject a duplicate that grows on each load and corrupts the saved layout.
  [dockbox, layout.floatbox, layout.windowbox, layout.maxbox].forEach((box) => {
    // Each optional box is a BoxData at runtime when present; LayoutBase types them as the rc-dock union.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (box) collectTabIds(box as BoxData, existingIds);
  });

  entries.forEach((entry) => {
    if (existingIds.has(entry.tab.id)) return;
    const panel = findPanelByWebViewType(dockbox, entry.anchorWebViewType);
    if (!panel) return;
    const tabs = panel.tabs ?? [];
    const insertAt = entry.insertBeforeWebViewType
      ? tabs.findIndex((t) => webViewTypeOf(t) === entry.insertBeforeWebViewType)
      : -1;
    // Our SavedTabInfo satisfies rc-dock TabData at runtime; the generic union prevents direct assign
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const tab = entry.tab as unknown as TabData;
    // Appending is the right fallback, but it is indistinguishable from a successful placement once
    // it has happened, and the two ways to reach it are not equally benign. An entry that asked to
    // be placed before a specific tab and did not find it has a stale or misspelled webViewType —
    // the JSON is hand-edited and reaches this code as an untyped property access, so a typo
    // compiles, lints, and silently reorders the column. Report it; "no request" stays silent.
    if (entry.insertBeforeWebViewType && insertAt < 0)
      onPlacementAnomaly?.(
        entry,
        `insertBeforeWebViewType '${entry.insertBeforeWebViewType}' was not found in the panel anchored by '${entry.anchorWebViewType}'; appending '${webViewTypeOf(tab)}' last instead`,
      );
    // Inserting at the head would change which tab the column opens on, not just the order: rc-dock
    // falls back to `tabs[0].id` for a panel with no `activeId` (Algorithm.js), and no panel in the
    // Simple-mode layout sets one. Pin the incumbent first tab as `activeId` before it stops being
    // first, so a supplement tab can take the leftmost position without also taking over as the
    // column's default view — an entry that wants to be the default should say so, not acquire it as
    // a side effect of ordering. Only the head insert can do this, so nothing else is touched.
    if (insertAt === 0 && panel.activeId === undefined && tabs[0]?.id) panel.activeId = tabs[0].id;
    // `findIndex` returning -1 covers both "no `insertBeforeWebViewType`" and "that tab isn't in this
    // panel" — both mean append.
    panel.tabs =
      insertAt < 0 ? [...tabs, tab] : [...tabs.slice(0, insertAt), tab, ...tabs.slice(insertAt)];
    existingIds.add(entry.tab.id);
  });

  return layout;
}
