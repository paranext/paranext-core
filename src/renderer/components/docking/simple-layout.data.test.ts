import { vi } from 'vitest';
import { BoxData, PanelData } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import {
  simpleLayout,
  SIMPLE_PANEL_ID_MODEL_TEXT,
  SIMPLE_PANEL_ID_PROJECT,
  SIMPLE_PANEL_ID_RESOURCES,
} from './simple-layout.data';
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

    it('every fixed tab declares isClosable: false so none is closable before its provider responds', () => {
      // `loadWebViewTab` seeds TabInfo.isClosable from this saved data (web-view.component.tsx), and
      // `createRCDockTabFromTabInfo` defaults a missing value to closable (`isClosable ?? true`). So
      // a tab that omits this renders WITH a close button for the whole async provider round-trip at
      // startup. Closing the Find tab in that window strands the feature: the next Ctrl+F falls
      // through to the create branch and builds a fourth column beside the editor, and Simple mode
      // never persists layout, so it stays broken for the session.
      columns.forEach((col) => {
        // Narrowing column to BoxData and its first child to PanelData to iterate tabs.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        panel.tabs.forEach((tab) => {
          // The layout data file casts tabs to SavedTabInfo[], so each tab is a SavedTabInfo at
          // runtime even though rc-dock types it as TabData.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          const data = (tab as unknown as SavedTabInfo).data as { isClosable?: boolean };
          expect(data.isClosable).toBe(false);
        });
      });
    });

    it('each column panel has the expected onboarding-tour panel ID', () => {
      // The onboarding tour targets [data-dockid="<id>"] to spotlight each column.
      // rc-dock propagates PanelData.id to the DOM as data-dockid, so these IDs must stay in sync
      // with SIMPLE_PANEL_ID_* exports — if they drift the tour's querySelector finds nothing.
      const expectedIds = [
        SIMPLE_PANEL_ID_MODEL_TEXT,
        SIMPLE_PANEL_ID_PROJECT,
        SIMPLE_PANEL_ID_RESOURCES,
      ];
      columns.forEach((col, index) => {
        // Narrowing column to BoxData and its first child to PanelData to read its id.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        expect(panel.id).toBe(expectedIds[index]);
      });
    });

    it('each column panel has panelLock.minWidth of 300 so it cannot be resized to nothing', () => {
      columns.forEach((col) => {
        // Narrowing column to BoxData and its first child to PanelData to read panelLock.
        // rc-dock's Algorithm.fixPanelOrBox unconditionally resets box/panel minWidth to 0,
        // but then respects panelLock.minWidth as an override (Algorithm.js lines 566-569).
        // This test verifies the constraint is set on panelLock, the field that survives fixup.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const panel = (col as BoxData).children[0] as PanelData;
        expect(panel.panelLock?.minWidth).toBe(300);
      });
    });
  });
});
