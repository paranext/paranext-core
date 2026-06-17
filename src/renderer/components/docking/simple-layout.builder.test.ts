import { BoxBase, PanelBase } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { buildSimpleLayoutForProject, SIMPLE_LAYOUT_TAB_IDS } from './simple-layout.builder';
import { SIMPLE_LAYOUT_TAB_ID } from './simple-layout.tab-ids';

const PROJECT_ID = 'test-project-id-1234';

function isBoxBase(node: BoxBase | PanelBase): node is BoxBase {
  return 'children' in node;
}

function asBoxBase(node: BoxBase | PanelBase): BoxBase {
  if (!isBoxBase(node)) throw new Error('Expected BoxBase node with children');
  return node;
}

function isPanelBase(node: BoxBase | PanelBase): node is PanelBase {
  return 'tabs' in node;
}

function asPanelBase(node: BoxBase | PanelBase): PanelBase {
  if (!isPanelBase(node)) throw new Error('Expected PanelBase node with tabs');
  return node;
}

function getColumns(layout: ReturnType<typeof buildSimpleLayoutForProject>): BoxBase[] {
  if (!layout.dockbox) throw new Error('Expected layout.dockbox to be defined');
  return layout.dockbox.children.map(asBoxBase);
}

function getTabs(layout: ReturnType<typeof buildSimpleLayoutForProject>): SavedTabInfo[] {
  const collected: SavedTabInfo[] = [];
  const columns = getColumns(layout);
  columns.forEach((col) => {
    const panel = asPanelBase(col.children[0]);
    panel.tabs.forEach((tab) => {
      // The builder produces SavedTabInfo entries internally but rc-dock's TabBase type
      // doesn't expose that — round-trip via unknown to recover the original shape.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      collected.push(tab as unknown as SavedTabInfo);
    });
  });
  return collected;
}

function getTabData(tab: SavedTabInfo): { projectId?: string; webViewType?: string } {
  // SavedTabInfo.data is typed `unknown`; the builder writes a plain object literal so
  // the runtime shape is controlled and safe to narrow here in tests.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return tab.data as { projectId?: string; webViewType?: string };
}

function getEditorState(tab: SavedTabInfo): { state?: { isReadOnly?: boolean } } {
  // SavedTabInfo.data is typed `unknown`; the builder writes a plain object literal so
  // the runtime shape is controlled and safe to narrow here in tests.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return tab.data as { state?: { isReadOnly?: boolean } };
}

describe('simple-layout.builder', () => {
  describe('buildSimpleLayoutForProject', () => {
    const layout = buildSimpleLayoutForProject(PROJECT_ID);
    const columns = getColumns(layout);

    it('produces a horizontal dockbox with exactly 3 columns', () => {
      expect(layout.dockbox?.mode).toBe('horizontal');
      expect(columns).toHaveLength(3);
    });

    it('contains all four expected tab IDs', () => {
      const tabs = getTabs(layout);
      const ids = tabs.map((t) => t.id);
      expect(ids).toContain(SIMPLE_LAYOUT_TAB_ID.modelText);
      expect(ids).toContain(SIMPLE_LAYOUT_TAB_ID.scriptureEditor);
      expect(ids).toContain(SIMPLE_LAYOUT_TAB_ID.bibleTexts);
      expect(ids).toContain(SIMPLE_LAYOUT_TAB_ID.commentaries);
    });

    it('bakes the projectId into every tab', () => {
      const tabs = getTabs(layout);
      expect(tabs).toHaveLength(4);
      tabs.forEach((tab) => {
        expect(getTabData(tab).projectId).toBe(PROJECT_ID);
      });
    });

    it('uses webView as the tabType for every tab', () => {
      const tabs = getTabs(layout);
      tabs.forEach((tab) => {
        expect(tab.tabType).toBe('webView');
      });
    });

    it('contains the four expected webViewType strings', () => {
      const tabs = getTabs(layout);
      const webViewTypes = tabs.map((t) => getTabData(t).webViewType);
      expect(webViewTypes).toContain('platformScriptureEditor.modelText');
      expect(webViewTypes).toContain('platformScriptureEditor.react');
      expect(webViewTypes).toContain('platformScriptureEditor.bibleTexts');
      expect(webViewTypes).toContain('platformScriptureEditor.commentaries');
    });

    it('sets isReadOnly: false on the scripture editor tab state', () => {
      const tabs = getTabs(layout);
      const editorTab = tabs.find((t) => t.id === SIMPLE_LAYOUT_TAB_ID.scriptureEditor);
      expect(editorTab).toBeDefined();
      if (!editorTab) return;
      expect(getEditorState(editorTab).state?.isReadOnly).toBe(false);
    });

    it('produces unique tab IDs across the layout', () => {
      const tabs = getTabs(layout);
      const ids = tabs.map((t) => t.id ?? '');
      expect(new Set(ids).size).toBe(ids.length);
    });

    it('exposes SIMPLE_LAYOUT_TAB_IDS containing the four UUIDs', () => {
      expect(SIMPLE_LAYOUT_TAB_IDS).toHaveLength(4);
      expect(SIMPLE_LAYOUT_TAB_IDS).toContain(SIMPLE_LAYOUT_TAB_ID.modelText);
      expect(SIMPLE_LAYOUT_TAB_IDS).toContain(SIMPLE_LAYOUT_TAB_ID.scriptureEditor);
      expect(SIMPLE_LAYOUT_TAB_IDS).toContain(SIMPLE_LAYOUT_TAB_ID.bibleTexts);
      expect(SIMPLE_LAYOUT_TAB_IDS).toContain(SIMPLE_LAYOUT_TAB_ID.commentaries);
    });
  });
});
