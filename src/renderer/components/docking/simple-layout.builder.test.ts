import { describe, it, expect, vi } from 'vitest';
import { LayoutBase } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import {
  applyProjectIdToTabs,
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

// Hardcoded from `simple-layout.data.ts` rather than re-derived via `visitTabs`/`visitPanels` (the
// functions under test below) — re-deriving the expectation with the same code under test would
// make a bug in that code invisible to these tests, since both sides would agree.
const MODEL_TEXT_TAB_ID = '0a23566d-1b2c-4dd2-8d3d-cda54b598cd2';
const SCRIPTURE_EDITOR_TAB_ID = '3cf575f0-2cc2-464b-8765-b588f216dfce';
const BIBLE_TEXTS_TAB_ID = '27616073-bf60-4f2b-9518-922d1a7d3601';
const COMMENTARIES_TAB_ID = '6c950d23-f8d7-4482-a384-93ea0481698b';
const COMMENT_LIST_PANEL_TAB_ID = 'c7e4a8b2-3d91-4f06-8e5a-1b2c9d0e7f83';
const FIND_TAB_ID = 'f1e2d3c4-b5a6-4789-9c0d-1e2f3a4b5c6d';

describe('simple-layout.builder', () => {
  describe('SIMPLE_LAYOUT_TAB_IDS', () => {
    it('contains every tab id in simpleLayout, in traversal order', () => {
      expect(SIMPLE_LAYOUT_TAB_IDS).toEqual([
        MODEL_TEXT_TAB_ID,
        SCRIPTURE_EDITOR_TAB_ID,
        BIBLE_TEXTS_TAB_ID,
        COMMENTARIES_TAB_ID,
        COMMENT_LIST_PANEL_TAB_ID,
        FIND_TAB_ID,
      ]);
    });

    it('all IDs are unique', () => {
      expect(new Set(SIMPLE_LAYOUT_TAB_IDS).size).toBe(SIMPLE_LAYOUT_TAB_IDS.length);
    });
  });

  describe('VISIBLE_SIMPLE_LAYOUT_TAB_IDS', () => {
    it('contains exactly one ID per panel in simpleLayout (the first/default-active tab)', () => {
      expect(VISIBLE_SIMPLE_LAYOUT_TAB_IDS).toEqual([
        MODEL_TEXT_TAB_ID,
        SCRIPTURE_EDITOR_TAB_ID,
        BIBLE_TEXTS_TAB_ID,
      ]);
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
      // Hardcoded (Column 1: Model Text, Column 2: Scripture Editor, Column 3: Resources & Tools)
      // rather than compared against `panelTabCounts(simpleLayout)` — that would re-derive the
      // expectation with `visitPanels`, the function under test.
      expect(panelTabCounts(result)).toEqual([1, 1, 4]);
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

  describe('visitPanels', () => {
    it('visits panels in floatbox, windowbox, and maxbox, not just dockbox', () => {
      const layout: LayoutBase = {
        dockbox: { mode: 'horizontal', children: [{ tabs: [{ id: 'dockbox-tab' }] }] },
        floatbox: { mode: 'horizontal', children: [{ tabs: [{ id: 'floatbox-tab' }] }] },
        windowbox: { mode: 'horizontal', children: [{ tabs: [{ id: 'windowbox-tab' }] }] },
        maxbox: { mode: 'horizontal', children: [{ tabs: [{ id: 'maxbox-tab' }] }] },
      };
      const visitedIds: (string | undefined)[] = [];
      visitPanels(layout, (panel) => visitedIds.push(panel.tabs[0]?.id));
      expect(visitedIds).toEqual(['dockbox-tab', 'floatbox-tab', 'windowbox-tab', 'maxbox-tab']);
    });

    it('visits a node as both box and panel when it carries both children and tabs (corrupted/hand-edited data)', () => {
      // rc-dock's own types make `children` and `tabs` mutually exclusive, but saved-layout JSON is
      // untrusted, hand-editable data (see the module-level comment on this function) — a node that
      // carries both must not have one branch silently swallow the other. The fixture deliberately
      // doesn't match rc-dock's real types, hence the single cast below rather than typed literals.
      const ambiguousNode = {
        children: [{ tabs: [{ id: 'nested-tab' }] }],
        tabs: [{ id: 'ambiguous-node-tab' }],
      };
      const layout = { dockbox: { mode: 'horizontal', children: [ambiguousNode] } };
      const visitedIds: (string | undefined)[] = [];
      // The fixture deliberately doesn't match rc-dock's real types (see comment above) — a single
      // cast here is simpler than typed literals for a fixture built to violate the real shape.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      visitPanels(layout as unknown as LayoutBase, (panel) => visitedIds.push(panel.tabs[0]?.id));
      // The box branch (recursing into `children`) runs before the panel branch (visiting the node
      // itself), so the nested child is visited first.
      expect(visitedIds).toEqual(['nested-tab', 'ambiguous-node-tab']);
    });
  });

  describe('applyProjectIdToTabs', () => {
    /**
     * A one-panel-per-tab layout carrying the given saved tabs. rc-dock's `TabBase` has no `data`,
     * but every tab in a saved layout is a `SavedTabInfo` — the same round-trip `visitTabs` makes,
     * done once here so the fixtures below stay literal.
     */
    function layoutWithTabs(...tabs: SavedTabInfo[]): LayoutBase {
      // `TabBase` declares no `data`, so a saved tab can only be placed into a layout literal
      // through the same cast `visitTabs` uses to read it back out.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return {
        dockbox: { mode: 'horizontal', children: tabs.map((tab) => ({ tabs: [tab] })) },
      } as unknown as LayoutBase;
    }

    it('writes projectId into every tab that carries a data payload', () => {
      const layout = layoutWithTabs(
        { id: 'tab-a', tabType: 'webView', data: { webViewType: 'a.b' } },
        { id: 'tab-b', tabType: 'webView', data: { webViewType: 'c.d', state: {} } },
      );

      const result = applyProjectIdToTabs(layout, 'proj-1');

      const tabs = collectTabs(result);
      expect(tabs).toHaveLength(2);
      tabs.forEach((tab) => {
        // Narrow only the field we read.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        expect((tab.data as { projectId?: string }).projectId).toBe('proj-1');
      });
    });

    it('does not mutate the layout it was given', () => {
      const layout = layoutWithTabs({
        id: 'tab-a',
        tabType: 'webView',
        data: { webViewType: 'a.b' },
      });

      applyProjectIdToTabs(layout, 'proj-1');

      // Narrow only the field we read.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      expect((collectTabs(layout)[0].data as { projectId?: string }).projectId).toBeUndefined();
    });

    it('leaves a tab with no data payload untouched', () => {
      const layout = layoutWithTabs({ id: 'tab-a', tabType: 'webView' });

      const result = applyProjectIdToTabs(layout, 'proj-1');

      expect(collectTabs(result)[0].data).toBeUndefined();
    });

    it('is what buildSimpleLayoutForProject bakes into the static layout', () => {
      // Both paths must produce the same baked layout: the static one goes through
      // `buildSimpleLayoutForProject`, and supplement tabs merged in afterward are baked by calling
      // this directly.
      expect(applyProjectIdToTabs(simpleLayout, 'proj-1')).toEqual(
        buildSimpleLayoutForProject('proj-1'),
      );
    });
  });
});
