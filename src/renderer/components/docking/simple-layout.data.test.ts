import { vi } from 'vitest';
import { BoxData, PanelData } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { simpleLayout } from './simple-layout.data';

vi.mock('@renderer/components/web-view.component', () => ({
  TAB_TYPE_WEBVIEW: 'webView',
}));
vi.mock('../../../shared/services/logger.service');

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

    it('column 3 has exactly 2 tabs', () => {
      // Narrowing column to BoxData and its first child to PanelData to access tabs.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const col3Panel = (columns[2] as BoxData).children[0] as PanelData;
      expect(col3Panel.tabs).toHaveLength(2);
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

    it('contains the four expected webViewType strings', () => {
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
    });
  });
});
