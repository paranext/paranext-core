import { describe, it, expect, vi } from 'vitest';
import { LayoutBase } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import {
  buildSimpleLayoutForProject,
  SIMPLE_LAYOUT_TAB_IDS,
  VISIBLE_SIMPLE_LAYOUT_TAB_IDS,
  visitPanels,
  visitTabs,
} from './simple-layout.builder';
import { simpleLayout } from './simple-layout.data';

vi.mock('@renderer/components/web-view.component', () => ({
  TAB_TYPE_WEBVIEW: 'webView',
}));
vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
}));

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
  visitPanels(layout, (panel) => counts.push(panel.tabs.length));
  return counts;
}

describe('simple-layout.builder', () => {
  describe('SIMPLE_LAYOUT_TAB_IDS', () => {
    it('contains exactly as many IDs as simpleLayout has tabs', () => {
      const staticIds: string[] = [];
      visitTabs(simpleLayout, (tab) => {
        if (tab.id) staticIds.push(tab.id);
      });
      expect(SIMPLE_LAYOUT_TAB_IDS).toHaveLength(staticIds.length);
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

  describe('VISIBLE_SIMPLE_LAYOUT_TAB_IDS', () => {
    it('contains exactly one ID per panel in simpleLayout (the first/default-active tab)', () => {
      const expectedIds: string[] = [];
      visitPanels(simpleLayout, (panel) => {
        const firstTab = panel.tabs[0];
        if (firstTab?.id) expectedIds.push(firstTab.id);
      });
      expect(VISIBLE_SIMPLE_LAYOUT_TAB_IDS).toEqual(expectedIds);
    });

    it('is a strict subset of SIMPLE_LAYOUT_TAB_IDS, smaller since Column 3 stacks other tabs behind the visible one', () => {
      VISIBLE_SIMPLE_LAYOUT_TAB_IDS.forEach((id) => {
        expect(SIMPLE_LAYOUT_TAB_IDS).toContain(id);
      });
      expect(VISIBLE_SIMPLE_LAYOUT_TAB_IDS.length).toBeLessThan(SIMPLE_LAYOUT_TAB_IDS.length);
    });

    it('excludes the Column 3 tabs stacked behind the default-active one', () => {
      const staticTabs: SavedTabInfo[] = [];
      visitTabs(simpleLayout, (tab) => staticTabs.push(tab));
      const hiddenIds = staticTabs
        .filter((tab) => tab.id && !VISIBLE_SIMPLE_LAYOUT_TAB_IDS.includes(tab.id))
        .map((tab) => tab.id);
      expect(hiddenIds.length).toBeGreaterThan(1);
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

    it('preserves the empty {} state shape on every tab', () => {
      const result = buildSimpleLayoutForProject('proj-1');
      const tabs = collectTabs(result);
      expect(tabs.length).toBeGreaterThan(0);
      tabs.forEach((tab) => {
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
