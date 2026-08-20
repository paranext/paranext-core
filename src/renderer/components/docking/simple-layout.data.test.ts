import { vi } from 'vitest';
import { BoxData, PanelData } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { RC_DOCK_DIVIDER_MIN_WIDTH_RESERVE_PX, simpleLayout } from './simple-layout.data';
import { HEADLESS_GROUP, TAB_GROUP_RESOURCES } from './platform-dock-layout-positioning.util';

vi.mock('../../../shared/services/logger.service');
vi.mock('@renderer/services/theme.service-host', () => ({
  __esModule: true,
  localThemeService: {},
}));

describe('simple-layout.data', () => {
  describe('simpleLayout', () => {
    // Narrowing rc-dock's generic dockbox type to BoxData is necessary to inspect its children.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const columns = (simpleLayout.dockbox as BoxData).children;

    it('dockbox is horizontal with exactly 3 columns', () => {
      // Narrowing rc-dock's generic dockbox type to BoxData to read its mode.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      expect((simpleLayout.dockbox as BoxData).mode).toBe('horizontal');
      expect(columns).toHaveLength(3);
    });

    it('each column is a vertical box', () => {
      columns.forEach((col) => {
        // Narrowing BoxData|PanelData to BoxData to read its mode.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        expect((col as BoxData).mode).toBe('vertical');
      });
    });

    it('each column has at least one tab with a non-empty id', () => {
      columns.forEach((col) => {
        // Narrowing column to BoxData and its first child to PanelData to access tabs.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        expect(panel.tabs.length).toBeGreaterThanOrEqual(1);
        panel.tabs.forEach((tab) => {
          expect(tab.id).toBeTruthy();
        });
      });
    });

    it('column 3 has exactly 4 tabs', () => {
      // Narrowing column to BoxData and its first child to PanelData to access tabs.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const col3Panel = (columns[2] as BoxData).children[0] as PanelData;
      expect(col3Panel.tabs).toHaveLength(4);
    });

    it('all tab ids are unique across the layout', () => {
      const allIds: string[] = [];
      columns.forEach((col) => {
        // Narrowing column to BoxData and its first child to PanelData to iterate tabs.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        panel.tabs.forEach((tab) => allIds.push(tab.id ?? ''));
      });
      expect(new Set(allIds).size).toBe(allIds.length);
    });

    it('columns 1 and 2 use HEADLESS_GROUP; column 3 uses TAB_GROUP_RESOURCES', () => {
      const expectedGroups = [HEADLESS_GROUP, HEADLESS_GROUP, TAB_GROUP_RESOURCES];
      columns.forEach((col, index) => {
        // Narrowing column to BoxData and its first child to PanelData to read its group.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        expect(panel.group).toBe(expectedGroups[index]);
      });
    });

    it('contains the six expected webViewType strings', () => {
      const allWebViewTypes: string[] = [];
      columns.forEach((col) => {
        // Narrowing column to BoxData and its first child to PanelData to iterate tabs.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        panel.tabs.forEach((tab) => {
          // The layout data file casts tabs to SavedTabInfo[], so each tab is a SavedTabInfo at runtime even though rc-dock types it as TabData.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const data = (tab as unknown as SavedTabInfo).data as { webViewType?: string };
          if (data?.webViewType) allWebViewTypes.push(data.webViewType);
        });
      });
      expect(allWebViewTypes).toContain('platformScriptureEditor.modelText');
      expect(allWebViewTypes).toContain('platformScriptureEditor.react');
      expect(allWebViewTypes).toContain('platformScriptureEditor.bibleTexts');
      expect(allWebViewTypes).toContain('platformScriptureEditor.commentaries');
      expect(allWebViewTypes).toContain('legacyCommentManager.commentListPanel');
      expect(allWebViewTypes).toContain('platformScripture.find');
    });

    // Narrowing column to BoxData and its first child to PanelData to read panelLock.
    // rc-dock's Algorithm.fixPanelOrBox unconditionally resets box/panel minWidth to 0,
    // but then respects panelLock.minWidth as an override (Algorithm.js lines 566-569).
    // panelLock is the field that survives that fixup, so it is the one to assert on.
    const columnMinWidths = () =>
      columns.map((col) => {
        // rc-dock types a box child as the union BoxData | PanelData | TabData, with no
        // discriminant to narrow on. This layout is authored right here in simple-layout.data.ts,
        // so the shape is known statically; asserting it is the only way to read panelLock.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        return panel.panelLock?.minWidth ?? 0;
      });

    it('each column panel has a panelLock.minWidth so it cannot be resized to nothing', () => {
      columnMinWidths().forEach((minWidth) => {
        expect(minWidth).toBeGreaterThan(0);
      });
    });

    it('leaves the three columns plus their dividers narrower than the smallest window the app allows, so narrowing to the minimum cannot force a horizontal scrollbar', () => {
      // Mirrors `minWidth` on the BrowserWindow in src/main/main.ts. It cannot be imported —
      // main.ts pulls in Electron — so lowering that number will NOT fail this test. Change both.
      const WINDOW_MIN_WIDTH_PX = 900;

      // The reserve rc-dock actually budgets per divider, which is what decides whether the dock
      // overflows. Deliberately NOT the 2px the Simple-mode stylesheet paints: rc-dock hard-codes 4
      // in its own arithmetic, so using the visual width here makes 3 x 300 look like it fits (898)
      // while rc-dock demands 902 and the app grows a scrollbar.
      const minWidths = columnMinWidths();
      const dividerCount = minWidths.length - 1;
      const totalMinWidth =
        minWidths.reduce((sum, minWidth) => sum + minWidth, 0) +
        dividerCount * RC_DOCK_DIVIDER_MIN_WIDTH_RESERVE_PX;

      expect(totalMinWidth).toBeLessThanOrEqual(WINDOW_MIN_WIDTH_PX);
    });

    it('keeps each column close to the ~300px UX asked for, so the fit is not bought by shrinking columns', () => {
      // Guards the other direction from the invariant above: that test alone would pass if someone
      // "fixed" an overflow by dropping the columns to 100px each.
      columnMinWidths().forEach((minWidth) => {
        expect(minWidth).toBeGreaterThanOrEqual(290);
      });
    });

    it('keeps the editor column weighted wider than the two side columns', () => {
      // rc-dock renders each column as `flex: (size) (size * 1e6) (size)px` (DockBox.js), so `size`
      // is a proportional weight and the columns already rescale continuously with the window —
      // no JS resize handling involved. The weighting only stops mattering at the narrowest window,
      // where all three floors bind and the columns come out equal; above that the editor grows
      // twice as fast as its neighbours.
      const sizes = columns.map((col) => col.size);

      expect(sizes).toEqual([1, 2, 1]);
    });
  });
});
