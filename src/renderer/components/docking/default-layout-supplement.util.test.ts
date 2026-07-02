import { BoxData, LayoutBase, PanelData } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { mergeDefaultLayoutSupplement } from './default-layout-supplement.util';
import { DefaultLayoutSupplementEntry } from './default-layout-supplement.model';

function baseLayout(): LayoutBase {
  // Narrowing this object literal to LayoutBase; the literal's nested shape satisfies the type.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const layout = {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          mode: 'vertical',
          children: [
            {
              tabs: [
                {
                  id: 'anchor-tab',
                  tabType: 'webView',
                  data: { webViewType: 'platformScriptureEditor.bibleTexts', id: 'anchor-tab' },
                },
              ],
            },
          ],
        },
      ],
    },
  } as unknown as LayoutBase;
  /* eslint-enable no-type-assertion/no-type-assertion */
  return layout;
}

const gridEntry: DefaultLayoutSupplementEntry = {
  anchorWebViewType: 'platformScriptureEditor.bibleTexts',
  tab: {
    id: 'scripture-text-grid-tab',
    tabType: 'webView',
    data: {
      webViewType: 'platformScriptureEditor.scriptureTextGrid',
      id: 'scripture-text-grid-tab',
      contentType: 'react',
      state: {},
    },
  },
};

function tabsInFirstPanel(layout: LayoutBase): SavedTabInfo[] {
  // Traversing the known-fixed layout shape used in tests; casts match the actual runtime structure.
  /* eslint-disable no-type-assertion/no-type-assertion */
  const col = (layout.dockbox as BoxData).children[0] as BoxData;
  const panel = col.children[0] as PanelData;
  return panel.tabs as unknown as SavedTabInfo[];
  /* eslint-enable no-type-assertion/no-type-assertion */
}

describe('mergeDefaultLayoutSupplement', () => {
  it('appends the supplement tab to the panel containing the anchor', () => {
    const merged = mergeDefaultLayoutSupplement(baseLayout(), [gridEntry]);
    expect(tabsInFirstPanel(merged).map((t) => t.id)).toEqual([
      'anchor-tab',
      'scripture-text-grid-tab',
    ]);
  });
  it('does not mutate the input layout', () => {
    const input = baseLayout();
    mergeDefaultLayoutSupplement(input, [gridEntry]);
    expect(tabsInFirstPanel(input).map((t) => t.id)).toEqual(['anchor-tab']);
  });
  it('is idempotent: does not add a tab whose id already exists', () => {
    const once = mergeDefaultLayoutSupplement(baseLayout(), [gridEntry]);
    const twice = mergeDefaultLayoutSupplement(once, [gridEntry]);
    expect(tabsInFirstPanel(twice).map((t) => t.id)).toEqual([
      'anchor-tab',
      'scripture-text-grid-tab',
    ]);
  });
  it('skips an entry whose anchor webViewType is not present', () => {
    const orphan: DefaultLayoutSupplementEntry = {
      ...gridEntry,
      anchorWebViewType: 'does.not.exist',
    };
    const merged = mergeDefaultLayoutSupplement(baseLayout(), [orphan]);
    expect(tabsInFirstPanel(merged).map((t) => t.id)).toEqual(['anchor-tab']);
  });
  it('returns the layout unchanged for an empty supplement', () => {
    const merged = mergeDefaultLayoutSupplement(baseLayout(), []);
    expect(tabsInFirstPanel(merged).map((t) => t.id)).toEqual(['anchor-tab']);
  });
});
