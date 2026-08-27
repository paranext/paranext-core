import { beforeEach, describe, expect, test } from 'vitest';
import { TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import type { LayoutInfo, SavedTabInfo } from '@shared/models/docking-framework.model';
import withWindowScopedWebViewIds, {
  withWindowScopedWebViewIdInTab,
} from '@renderer/components/docking/window-scoped-web-view-ids.util';

// `LayoutInfo` is deliberately opaque in the shared model, so building a fixture and reading a tab
// back out of a result both have to cross that boundary. Restructuring to avoid the assertions
// would mean asserting on something other than the ids this transform exists to rewrite.
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

describe('withWindowScopedWebViewIds', () => {
  beforeEach(() => {
    globalThis.windowId = '2';
  });

  test('scopes a shared layout’s web view id to this window', () => {
    const scoped = withWindowScopedWebViewIds(layoutWithWebView('abc-123'));

    expect(readWebViewTab(scoped).id).toBe('abc-123-w2');
  });

  test('keeps the id repeated inside the tab data in agreement with the tab id', () => {
    const scoped = withWindowScopedWebViewIds(layoutWithWebView('abc-123'));

    const tab = readWebViewTab(scoped);
    expect(tab.data.id).toBe(tab.id);
  });

  test('gives two windows different ids for the same shared layout', () => {
    const shared = layoutWithWebView('abc-123');

    globalThis.windowId = '1';
    const inWindow1 = readWebViewTab(withWindowScopedWebViewIds(shared)).id;
    globalThis.windowId = '2';
    const inWindow2 = readWebViewTab(withWindowScopedWebViewIds(shared)).id;

    expect(inWindow1).not.toBe(inWindow2);
  });

  test('does not mutate the layout it is given, which is a constant every window reads', () => {
    const shared = layoutWithWebView('abc-123');

    withWindowScopedWebViewIds(shared);

    expect(readWebViewTab(shared).id).toBe('abc-123');
  });

  test('replaces an existing window suffix rather than stacking another one', () => {
    // Layouts are re-scoped on every load, including one this window saved with scoped ids already
    const alreadyScoped = layoutWithWebView('abc-123-w1');

    const scoped = withWindowScopedWebViewIds(alreadyScoped);

    expect(readWebViewTab(scoped).id).toBe('abc-123-w2');
  });

  test('re-scoping is stable, so repeated loads do not drift the id', () => {
    const once = withWindowScopedWebViewIds(layoutWithWebView('abc-123'));
    const twice = withWindowScopedWebViewIds(once);

    expect(readWebViewTab(twice).id).toBe(readWebViewTab(once).id);
  });

  test('sends the same legacy layout to different ids in different windows', () => {
    // Two windows can each migrate the same pre-multi-window layout from the undeleted legacy
    // storage key, so identical input has to come out per-window distinct
    const legacy = layoutWithWebView('abc-123');

    globalThis.windowId = '1';
    const inWindow1 = readWebViewTab(withWindowScopedWebViewIds(legacy)).id;
    globalThis.windowId = '2';
    const inWindow2 = readWebViewTab(withWindowScopedWebViewIds(legacy)).id;

    expect(inWindow1).not.toBe(inWindow2);
  });

  test('does not modify the saved data inside the layout it is given', () => {
    const shared = layoutWithWebView('abc-123');

    withWindowScopedWebViewIds(shared);

    expect(readWebViewTab(shared).data.id).toBe('abc-123');
  });

  test('keeps a panel’s active tab pointing at the tab that was active', () => {
    // rc-dock falls back to the panel's leftmost tab when `activeId` matches none of its tabs, so an
    // unrewritten `activeId` silently moves the user off the tab they left open
    const layout = layoutWithPanel([webViewTab('first'), webViewTab('second')], 'second');

    const scoped = withWindowScopedWebViewIds(layout);

    const panel = readPanel(scoped);
    expect(panel.activeId).toBe('second-w2');
    expect(panel.tabs.some((tab) => tab.id === panel.activeId)).toBe(true);
  });

  test('rewrites the active tab id of a layout saved by another window', () => {
    const layout = layoutWithPanel([webViewTab('first-w1'), webViewTab('second-w1')], 'second-w1');

    const scoped = withWindowScopedWebViewIds(layout);

    expect(readPanel(scoped).activeId).toBe('second-w2');
  });

  test('leaves an active tab id alone when that tab is not a web view', () => {
    const toolTab = { id: 'some-tool', tabType: 'tool' } as unknown as SavedTabInfo;
    const layout = layoutWithPanel([toolTab, webViewTab('a-web-view')], 'some-tool');

    const scoped = withWindowScopedWebViewIds(layout);

    expect(readPanel(scoped).activeId).toBe('some-tool');
  });

  test('leaves tabs that are not web views alone', () => {
    const layout = {
      dockbox: { mode: 'horizontal', children: [{ tabs: [{ id: 'some-tool', tabType: 'tool' }] }] },
    } as unknown as LayoutInfo;

    const scoped = withWindowScopedWebViewIds(layout);

    const base = scoped as unknown as { dockbox: { children: { tabs: { id: string }[] }[] } };
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

    const scoped = withWindowScopedWebViewIds(layout);

    const base = scoped as unknown as {
      dockbox: { children: { children: { tabs: { id: string }[] }[] }[] };
    };
    expect(base.dockbox.children[0].children[0].tabs[0].id).toBe('deep-1-w2');
  });
});

/** Read a transformed tab back, crossing the same opaque-data boundary the fixture crossed */
function readIds(tab: SavedTabInfo) {
  const concrete = tab as unknown as { id: string; data?: { id: string } };
  return { id: concrete.id, dataId: concrete.data?.id };
}

describe('withWindowScopedWebViewIdInTab', () => {
  beforeEach(() => {
    globalThis.windowId = '2';
  });

  test('scopes a supplement tab’s id, which is otherwise identical in every window', () => {
    expect(readIds(withWindowScopedWebViewIdInTab(webViewTab('supplement-tab'))).id).toBe(
      'supplement-tab-w2',
    );
  });

  test('keeps the id repeated inside the tab data in agreement with the tab id', () => {
    const scoped = readIds(withWindowScopedWebViewIdInTab(webViewTab('supplement-tab')));

    expect(scoped.dataId).toBe(scoped.id);
  });

  test('replaces an existing window suffix rather than stacking another one', () => {
    const scoped = withWindowScopedWebViewIdInTab(webViewTab('supplement-tab-w1'));

    expect(readIds(scoped).id).toBe('supplement-tab-w2');
  });

  test('re-scoping is stable, so repeated loads do not drift the id', () => {
    const once = withWindowScopedWebViewIdInTab(webViewTab('supplement-tab'));
    const twice = withWindowScopedWebViewIdInTab(once);

    expect(readIds(twice).id).toBe(readIds(once).id);
  });

  test('does not mutate the tab it is given, which comes from a module every load reads', () => {
    const supplementTab = webViewTab('supplement-tab');

    withWindowScopedWebViewIdInTab(supplementTab);

    expect(readIds(supplementTab).id).toBe('supplement-tab');
  });

  test('leaves a tab that is not a web view alone', () => {
    const toolTab = { id: 'some-tool', tabType: 'tool' } as unknown as SavedTabInfo;

    expect(readIds(withWindowScopedWebViewIdInTab(toolTab)).id).toBe('some-tool');
  });
});
