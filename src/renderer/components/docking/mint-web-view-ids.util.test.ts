import { describe, expect, test } from 'vitest';
import { TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import type { LayoutInfo, SavedTabInfo } from '@shared/models/docking-framework.model';
import mintFreshWebViewIds, {
  mintFreshWebViewIdInTab,
} from '@renderer/components/docking/mint-web-view-ids.util';

// `LayoutInfo` is deliberately opaque in the shared model, so building a fixture and reading a tab
// back out of a result both have to cross that boundary. Restructuring to avoid the assertions
// would mean asserting on something other than the ids this transform exists to mint.
/* eslint-disable no-type-assertion/no-type-assertion */

/** Tab shaped like a saved web view tab: id repeated inside `data` */
function webViewTab(id: string): SavedTabInfo {
  return {
    id,
    tabType: TAB_TYPE_WEBVIEW,
    data: { id, webViewType: 'test.webView', state: {} },
  } as unknown as SavedTabInfo;
}

/** Layout shaped like `simpleLayout`: a web view tab whose id is repeated inside `data` */
function layoutWithWebView(id: string): LayoutInfo {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        {
          tabs: [
            { id, tabType: TAB_TYPE_WEBVIEW, data: { id, webViewType: 'test.webView', state: {} } },
          ],
        },
      ],
    },
  } as unknown as LayoutInfo;
}

/** Pull the first web view tab back out of a transformed layout */
function readWebViewTab(layout: LayoutInfo) {
  const base = layout as unknown as {
    dockbox: { children: { tabs: { id: string; data: { id: string } }[] }[] };
  };
  return base.dockbox.children[0].tabs[0];
}

/** Layout with one panel holding the given tabs and remembering `activeId` as its active tab */
function layoutWithPanel(tabs: SavedTabInfo[], activeId: string): LayoutInfo {
  return {
    dockbox: { mode: 'horizontal', children: [{ tabs, activeId }] },
  } as unknown as LayoutInfo;
}

/** Read the only panel back out of a transformed layout */
function readPanel(layout: LayoutInfo) {
  const base = layout as unknown as {
    dockbox: { children: { tabs: { id: string }[]; activeId?: string }[] };
  };
  return base.dockbox.children[0];
}

describe('mintFreshWebViewIds', () => {
  test('replaces a baked layout’s web view id with a freshly minted one', () => {
    const minted = mintFreshWebViewIds(layoutWithWebView('abc-123'));

    expect(readWebViewTab(minted.layout).id).not.toBe('abc-123');
  });

  test('keeps the id repeated inside the tab data in agreement with the tab id', () => {
    const minted = mintFreshWebViewIds(layoutWithWebView('abc-123'));

    const tab = readWebViewTab(minted.layout);
    expect(tab.data.id).toBe(tab.id);
  });

  test('gives two materializations of the same baked layout different ids', () => {
    const shared = layoutWithWebView('abc-123');

    const first = readWebViewTab(mintFreshWebViewIds(shared).layout).id;
    const second = readWebViewTab(mintFreshWebViewIds(shared).layout).id;

    expect(first).not.toBe(second);
  });

  test('does not mutate the layout it is given, which is a constant every window reads', () => {
    const shared = layoutWithWebView('abc-123');

    mintFreshWebViewIds(shared);

    expect(readWebViewTab(shared).id).toBe('abc-123');
  });

  test('does not modify the saved data inside the layout it is given', () => {
    const shared = layoutWithWebView('abc-123');

    mintFreshWebViewIds(shared);

    expect(readWebViewTab(shared).data.id).toBe('abc-123');
  });

  test('records the baked id against the minted id in the returned map', () => {
    const { layout, mintedIds } = mintFreshWebViewIds(layoutWithWebView('abc-123'));

    expect(mintedIds.get('abc-123')).toBe(readWebViewTab(layout).id);
  });

  test('keeps a panel’s active tab pointing at the tab that was active', () => {
    // rc-dock falls back to the panel's leftmost tab when `activeId` matches none of its tabs, so an
    // unrewritten `activeId` silently moves the user off the tab they left open
    const layout = layoutWithPanel([webViewTab('first'), webViewTab('second')], 'second');

    const minted = mintFreshWebViewIds(layout);

    const panel = readPanel(minted.layout);
    expect(panel.activeId).toBe(minted.mintedIds.get('second'));
    expect(panel.tabs.some((tab) => tab.id === panel.activeId)).toBe(true);
  });

  test('leaves an active tab id alone when that tab is not a web view', () => {
    const toolTab = { id: 'some-tool', tabType: 'tool' } as unknown as SavedTabInfo;
    const layout = layoutWithPanel([toolTab, webViewTab('a-web-view')], 'some-tool');

    const minted = mintFreshWebViewIds(layout);

    expect(readPanel(minted.layout).activeId).toBe('some-tool');
  });

  test('leaves tabs that are not web views alone', () => {
    const layout = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [{ id: 'some-tool', tabType: 'tool' }] }] },
    } as unknown as LayoutInfo;

    const minted = mintFreshWebViewIds(layout);

    const base = minted.layout as unknown as {
      dockbox: { children: { tabs: { id: string }[] }[] };
    };
    expect(base.dockbox.children[0].tabs[0].id).toBe('some-tool');
  });

  test('reaches web views nested deeper in the box tree', () => {
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
                    id: 'deep-1',
                    tabType: TAB_TYPE_WEBVIEW,
                    data: { id: 'deep-1', webViewType: 'test.webView', state: {} },
                  },
                ],
              },
            ],
          },
        ],
      },
    } as unknown as LayoutInfo;

    const minted = mintFreshWebViewIds(layout);

    const base = minted.layout as unknown as {
      dockbox: { children: { children: { tabs: { id: string }[] }[] }[] };
    };
    expect(base.dockbox.children[0].children[0].tabs[0].id).not.toBe('deep-1');
  });
});

/** Read a transformed tab back, crossing the same opaque-data boundary the fixture crossed */
function readIds(tab: SavedTabInfo) {
  const concrete = tab as unknown as { id: string; data?: { id: string } };
  return { id: concrete.id, dataId: concrete.data?.id };
}

describe('mintFreshWebViewIdInTab', () => {
  test('mints a fresh id for a supplement tab, which is otherwise identical in every window', () => {
    expect(readIds(mintFreshWebViewIdInTab(webViewTab('supplement-tab'))).id).not.toBe(
      'supplement-tab',
    );
  });

  test('keeps the id repeated inside the tab data in agreement with the tab id', () => {
    const minted = readIds(mintFreshWebViewIdInTab(webViewTab('supplement-tab')));

    expect(minted.dataId).toBe(minted.id);
  });

  test('mints a different id each time', () => {
    const first = readIds(mintFreshWebViewIdInTab(webViewTab('supplement-tab'))).id;
    const second = readIds(mintFreshWebViewIdInTab(webViewTab('supplement-tab'))).id;

    expect(first).not.toBe(second);
  });

  test('does not mutate the tab it is given, which comes from a module every load reads', () => {
    const supplementTab = webViewTab('supplement-tab');

    mintFreshWebViewIdInTab(supplementTab);

    expect(readIds(supplementTab).id).toBe('supplement-tab');
  });

  test('leaves a tab that is not a web view alone', () => {
    const toolTab = { id: 'some-tool', tabType: 'tool' } as unknown as SavedTabInfo;

    expect(readIds(mintFreshWebViewIdInTab(toolTab)).id).toBe('some-tool');
  });
});
