import { describe, it, expect, vi } from 'vitest';
import { BoxBase, LayoutBase, PanelBase } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { buildSimpleLayoutForProject, SIMPLE_LAYOUT_TAB_IDS } from './simple-layout.builder';
import { simpleLayout } from './simple-layout.data';

vi.mock('@renderer/components/web-view.component', () => ({
  TAB_TYPE_WEBVIEW: 'webView',
}));
vi.mock('../../../shared/services/logger.service');

const SCRIPTURE_EDITOR_WEB_VIEW_TYPE = 'platformScriptureEditor.react';

function visitTabs(layout: LayoutBase, visit: (tab: SavedTabInfo) => void): void {
  const isBoxBase = (node: BoxBase | PanelBase): node is BoxBase => 'children' in node;
  const isPanelBase = (node: BoxBase | PanelBase): node is PanelBase => 'tabs' in node;
  const visitNode = (node: BoxBase | PanelBase) => {
    if (isBoxBase(node)) node.children.forEach(visitNode);
    else if (isPanelBase(node))
      node.tabs.forEach((tab) => {
        // rc-dock's `TabBase` doesn't expose `data`, but every tab in `simpleLayout` is built as a
        // SavedTabInfo (mirrors the cast in `simple-layout.builder.ts`).
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        visit(tab as unknown as SavedTabInfo);
      });
  };
  if (layout.dockbox) visitNode(layout.dockbox);
}

function collectTabs(layout: LayoutBase): SavedTabInfo[] {
  const tabs: SavedTabInfo[] = [];
  visitTabs(layout, (tab) => tabs.push(tab));
  return tabs;
}

function countColumns(layout: LayoutBase): number {
  return layout.dockbox.children.length;
}

function panelTabCounts(layout: LayoutBase): number[] {
  const counts: number[] = [];
  const isBoxBase = (node: BoxBase | PanelBase): node is BoxBase => 'children' in node;
  const isPanelBase = (node: BoxBase | PanelBase): node is PanelBase => 'tabs' in node;
  const visitNode = (node: BoxBase | PanelBase) => {
    if (isBoxBase(node)) node.children.forEach(visitNode);
    else if (isPanelBase(node)) counts.push(node.tabs.length);
  };
  if (layout.dockbox) visitNode(layout.dockbox);
  return counts;
}

describe('simple-layout.builder', () => {
  describe('SIMPLE_LAYOUT_TAB_IDS', () => {
    it('contains exactly 4 IDs', () => {
      expect(SIMPLE_LAYOUT_TAB_IDS).toHaveLength(4);
    });

    it('all IDs are present in the static simpleLayout', () => {
      const staticIds: string[] = [];
      visitTabs(simpleLayout, (tab) => {
        if (tab.id) staticIds.push(tab.id);
      });
      SIMPLE_LAYOUT_TAB_IDS.forEach((id) => {
        expect(staticIds).toContain(id);
      });
    });

    it('all IDs are unique', () => {
      expect(new Set(SIMPLE_LAYOUT_TAB_IDS).size).toBe(SIMPLE_LAYOUT_TAB_IDS.length);
    });
  });

  describe('buildSimpleLayoutForProject', () => {
    it('returns a LayoutBase with the same column structure as simpleLayout', () => {
      const result = buildSimpleLayoutForProject('proj-1');
      expect(countColumns(result)).toBe(countColumns(simpleLayout));
    });

    it('returns a LayoutBase with the same per-panel tab counts as simpleLayout', () => {
      const result = buildSimpleLayoutForProject('proj-1');
      expect(panelTabCounts(result)).toEqual(panelTabCounts(simpleLayout));
    });

    it('every tab in the result has data.projectId === provided projectId', () => {
      const result = buildSimpleLayoutForProject('proj-1');
      const tabs = collectTabs(result);
      expect(tabs.length).toBeGreaterThan(0);
      tabs.forEach((tab) => {
        // The tab's data shape is dynamic — narrow only what we read here.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const data = tab.data as { projectId?: string };
        expect(data.projectId).toBe('proj-1');
      });
    });

    it('the scripture editor tab has data.state.isReadOnly === false', () => {
      const result = buildSimpleLayoutForProject('proj-1');
      const tabs = collectTabs(result);
      const editorTab = tabs.find((tab) => {
        // Narrow only the field we read.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const data = tab.data as { webViewType?: string };
        return data.webViewType === SCRIPTURE_EDITOR_WEB_VIEW_TYPE;
      });
      expect(editorTab).toBeDefined();
      // Narrow only the field we read.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const { state } = editorTab?.data as { state?: { isReadOnly?: boolean } };
      expect(state).toBeDefined();
      expect(state?.isReadOnly).toBe(false);
    });

    it('preserves the empty {} state shape on non-editor tabs', () => {
      const result = buildSimpleLayoutForProject('proj-1');
      const tabs = collectTabs(result);
      const nonEditorTabs = tabs.filter((tab) => {
        // Narrow only the field we read.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const data = tab.data as { webViewType?: string };
        return data.webViewType !== SCRIPTURE_EDITOR_WEB_VIEW_TYPE;
      });
      expect(nonEditorTabs.length).toBeGreaterThan(0);
      nonEditorTabs.forEach((tab) => {
        // Narrow only the field we read.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const data = tab.data as { state?: object };
        expect(data.state).toEqual({});
      });
    });

    it('returns a deep clone — mutating a tab in the result does not mutate simpleLayout', () => {
      const result = buildSimpleLayoutForProject('proj-1');
      const resultTabs = collectTabs(result);
      const staticTabs = collectTabs(simpleLayout);
      const firstResultTab = resultTabs[0];
      // Stash the original static state.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const staticData = staticTabs[0].data as { projectId?: string };
      const staticProjectIdBefore = staticData.projectId;
      // Mutate the result.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (firstResultTab.data as { projectId?: string }).projectId = 'mutated';
      // The static layout should be unchanged.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const staticDataAfter = staticTabs[0].data as { projectId?: string };
      expect(staticDataAfter.projectId).toBe(staticProjectIdBefore);
    });

    it('produces independent objects across calls with different projectIds', () => {
      const a = buildSimpleLayoutForProject('proj-a');
      const b = buildSimpleLayoutForProject('proj-b');
      expect(a).not.toBe(b);
      expect(a.dockbox).not.toBe(b.dockbox);
      const aTabs = collectTabs(a);
      const bTabs = collectTabs(b);
      aTabs.forEach((tab) => {
        // Narrow only the field we read.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        expect((tab.data as { projectId?: string }).projectId).toBe('proj-a');
      });
      bTabs.forEach((tab) => {
        // Narrow only the field we read.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        expect((tab.data as { projectId?: string }).projectId).toBe('proj-b');
      });
      // Mutating one should not affect the other. Narrow only the field we mutate.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      (aTabs[0].data as { projectId?: string }).projectId = 'mutated';
      // Narrow only the field we read.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      expect((bTabs[0].data as { projectId?: string }).projectId).toBe('proj-b');
    });
  });
});
