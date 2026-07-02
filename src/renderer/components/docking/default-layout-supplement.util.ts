import { BoxData, LayoutBase, PanelData, TabData } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { DefaultLayoutSupplementEntry } from './default-layout-supplement.model';

function isBoxData(node: BoxData | PanelData): node is BoxData {
  return 'children' in node && Array.isArray(node.children);
}

function webViewTypeOf(tab: TabData): string | undefined {
  // Layout data files store SavedTabInfo under each tab; read its data.webViewType.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const data = (tab as unknown as SavedTabInfo).data as { webViewType?: string } | undefined;
  return data?.webViewType;
}

function findPanelByWebViewType(box: BoxData, anchor: string): PanelData | undefined {
  return box.children.reduce<PanelData | undefined>((found, child) => {
    if (found) return found;
    if (isBoxData(child)) return findPanelByWebViewType(child, anchor);
    const panel = child;
    return (panel.tabs ?? []).some((t) => webViewTypeOf(t) === anchor) ? panel : undefined;
  }, undefined);
}

function collectTabIds(box: BoxData, ids: Set<string>): void {
  box.children.forEach((child) => {
    if (isBoxData(child)) collectTabIds(child, ids);
    else (child.tabs ?? []).forEach((t) => t.id && ids.add(t.id));
  });
}

/**
 * Append each supplement entry's tab to the panel containing its `anchorWebViewType`. Pure and
 * idempotent: returns a deep clone, never mutates `baseLayout`, and skips entries whose id already
 * exists or whose anchor is absent. `entries` should already be filtered by any `flagSetting` (see
 * the caller in `web-view.service-host.ts`).
 */
export function mergeDefaultLayoutSupplement(
  baseLayout: LayoutBase,
  entries: DefaultLayoutSupplementEntry[],
): LayoutBase {
  const layout: LayoutBase = structuredClone(baseLayout);
  if (!layout.dockbox) return layout;
  // dockbox is a BoxData at runtime; LayoutBase types it as the rc-dock union
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const dockbox = layout.dockbox as BoxData;
  const existingIds = new Set<string>();
  collectTabIds(dockbox, existingIds);

  entries.forEach((entry) => {
    if (existingIds.has(entry.tab.id)) return;
    const panel = findPanelByWebViewType(dockbox, entry.anchorWebViewType);
    if (!panel) return;
    // Our SavedTabInfo satisfies rc-dock TabData at runtime; the generic union prevents direct assign
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    panel.tabs = [...(panel.tabs ?? []), entry.tab as unknown as TabData];
    existingIds.add(entry.tab.id);
  });

  return layout;
}
