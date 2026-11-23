// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import DockLayout, { DragDropDiv, LayoutData, TabBase, TabData } from 'rc-dock';
import { resetActivationLatchForTesting } from '@renderer/services/window-activation.util';
import { installMiddleClickTabBarHandlers } from './platform-dock-layout-middle-click-handlers.util';
import { focusTab } from './platform-dock-layout-storage.util';
import { createRCDockTabFromTabInfo } from './platform-dock-tab.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [{}]),
  useData: vi.fn(() => ({ Focus: () => [undefined, vi.fn()] })),
  useDataProvider: vi.fn(() => undefined),
}));

vi.mock('@shared/services/menu-data.service', () => ({
  menuDataService: {
    dataProviderName: 'platform.menuDataServiceDataProvider',
    getWebViewMenu: vi.fn(async () => undefined),
  },
}));

vi.mock('@renderer/hooks/use-last-selected-scripture-navigable-web-view-id.hook', () => ({
  useLastSelectedScriptureNavigableWebViewId: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-last-focused-tab-id.hook', () => ({
  useLastFocusedTabId: vi.fn(() => undefined),
}));

vi.mock('@renderer/hooks/use-is-focused-window.hook', () => ({
  useIsFocusedWindow: vi.fn(() => true),
}));

// Power mode: Simple mode marks the title's children `drag-ignore`, which rc-dock skips before
// arming a drag, so a left press there would arm nothing and prove nothing about the middle button.
// Both hooks: the dock layout asks `useIsPowerMode`, the tab title asks `useInterfaceMode` for the
// settled mode, and an unmocked `useInterfaceMode` would reach the real `useSetting`.
vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

vi.mock('@renderer/hooks/use-interface-mode.hook', () => ({
  useInterfaceMode: vi.fn(() => ['power', vi.fn(), true]),
}));

vi.mock('@renderer/services/web-view.service-shard', () => ({
  floatTab: vi.fn(),
  updateTabPartialSync: vi.fn(),
  getOpenTabCountSync: vi.fn(() => 3),
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: { dataProviderName: 'platform.windowServiceDataProvider', setFocus: vi.fn() },
}));

vi.mock('../../../shared/services/logger.service');

vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

const CLOSABLE_TAB_ID = 'tab-a';

/** Materializes each saved tab the way the app does, so the real title and panel render */
function loadTab(tab: TabBase): TabData {
  const id = tab.id ?? '';
  return createRCDockTabFromTabInfo({
    id,
    tabType: 'test',
    tabTitle: id,
    content: (
      <div>
        <button type="button">content</button>
      </div>
    ),
    isClosable: id !== 'tab-c',
  });
}

const defaultLayout: LayoutData = {
  dockbox: {
    mode: 'horizontal',
    children: [
      {
        tabs: [CLOSABLE_TAB_ID, 'tab-b', 'tab-c'].map((id) => loadTab({ id })),
        activeId: CLOSABLE_TAB_ID,
      },
    ],
  },
};

/**
 * Pins the rc-dock DOM details that tab focus and middle-click close depend on — `role="tab"` on
 * the element wrapping each header, the `.dock-bar` class, drags armed from `DragDropDiv`, and the
 * close button following `closable` — against a real `DockLayout` rendering the app's own
 * `PlatformTabTitle` and `PlatformPanel`, so an rc-dock upgrade that changes them fails here
 * instead of silently disabling the feature.
 *
 * The overflow dropdown rc-tabs renders is not covered: jsdom has no layout, so no tab ever
 * overflows. The middle-click util's own tests cover it with a hand-built stand-in.
 */
describe('PlatformDockLayout tab DOM contract', () => {
  let dockLayout: DockLayout;

  beforeEach(() => {
    const dockLayoutRef = createRef<DockLayout>();
    render(
      <DockLayout
        ref={dockLayoutRef}
        defaultLayout={defaultLayout}
        loadTab={loadTab}
        style={{ width: 1200, height: 800 }}
      />,
    );
    if (!dockLayoutRef.current) throw new Error('DockLayout did not mount');
    dockLayout = dockLayoutRef.current;
  });

  afterEach(() => {
    cleanup();
  });

  describe('focus lookup by tab id', () => {
    let previousWasWindowCreatedWithoutActivation: boolean | undefined;

    beforeEach(() => {
      resetActivationLatchForTesting();
      previousWasWindowCreatedWithoutActivation = globalThis.wasWindowCreatedWithoutActivation;
      globalThis.wasWindowCreatedWithoutActivation = false;
    });

    afterEach(() => {
      globalThis.wasWindowCreatedWithoutActivation = previousWasWindowCreatedWithoutActivation;
    });

    it('marks only tab panels with data-tab-id, once per rendered tab', () => {
      const marked = Array.from(document.querySelectorAll<HTMLElement>('[data-tab-id]'));
      const ids = marked.map((element) => element.dataset.tabId);

      expect(marked.every((element) => element.matches('.platform-panel'))).toBe(true);
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.filter((id) => id === CLOSABLE_TAB_ID)).toHaveLength(1);
      expect(document.querySelector('.dock-bar [data-tab-id]')).toBeNull();
    });

    it('focuses the tab’s panel content, not its header, when a tab with no remembered focus is focused', () => {
      act(() => {
        focusTab(dockLayout, CLOSABLE_TAB_ID);
      });

      const { activeElement } = document;
      expect(activeElement?.closest('.dock-bar')).toBeNull();
      expect(activeElement?.closest<HTMLElement>('.platform-panel')?.dataset.tabId).toBe(
        CLOSABLE_TAB_ID,
      );
    });
  });

  describe('middle click', () => {
    let onCloseTab: ReturnType<typeof vi.fn<(tabId: string) => void>>;
    let dragStartSpy: ReturnType<typeof vi.spyOn>;
    let removeHandlers: () => void;

    beforeEach(() => {
      onCloseTab = vi.fn<(tabId: string) => void>();
      dragStartSpy = vi.spyOn(DragDropDiv.prototype, 'onDragStart').mockImplementation(() => {});
      removeHandlers = installMiddleClickTabBarHandlers(document, {
        findTab: (tabId) => dockLayout.find(tabId),
        onCloseTab,
      });
    });

    afterEach(() => {
      removeHandlers();
      dragStartSpy.mockRestore();
    });

    /** The title `PlatformTabTitle` renders for a tab */
    function titleOf(tabId: string) {
      const title = document.querySelector(`[data-tab-header-id="${tabId}"]`);
      if (!title) throw new Error(`No tab header rendered for ${tabId}`);
      return title;
    }

    /** The `role="tab"` element rc-dock wraps around a tab's title, close button and hit area */
    function headerOf(tabId: string) {
      const header = titleOf(tabId).closest('[role="tab"]');
      if (!header) throw new Error(`No role="tab" ancestor for ${tabId}`);
      return header;
    }

    function partOf(tabId: string, selector: string) {
      const part = headerOf(tabId).querySelector(selector);
      if (!part) throw new Error(`No ${selector} rendered for ${tabId}`);
      return part;
    }

    function tabBar() {
      const bar = document.querySelector('.dock-bar');
      if (!bar) throw new Error('No .dock-bar rendered');
      return bar;
    }

    function pressOn(target: Element, button: number) {
      return target.dispatchEvent(
        new MouseEvent('mousedown', { bubbles: true, cancelable: true, button }),
      );
    }

    function middleClickOn(target: Element) {
      target.dispatchEvent(
        new MouseEvent('auxclick', { bubbles: true, cancelable: true, button: 1 }),
      );
    }

    it('arms a drag on a left press on a tab title, so the drag spy can see one', () => {
      pressOn(titleOf(CLOSABLE_TAB_ID), 0);

      expect(dragStartSpy).toHaveBeenCalled();
    });

    it.each([
      ['tab title', () => titleOf(CLOSABLE_TAB_ID)],
      ['close button', () => partOf(CLOSABLE_TAB_ID, '.dock-tab-close-btn')],
      ['tab bar', tabBar],
    ])('arms no drag, and prevents the default, on a middle press on the %s', (_, getTarget) => {
      const notPrevented = pressOn(getTarget(), 1);

      expect(notPrevented).toBe(false);
      expect(dragStartSpy).not.toHaveBeenCalled();
    });

    it.each([
      ['tab title', () => titleOf(CLOSABLE_TAB_ID)],
      ['close button', () => partOf(CLOSABLE_TAB_ID, '.dock-tab-close-btn')],
      ['hit area', () => partOf(CLOSABLE_TAB_ID, '.dock-tab-hit-area')],
    ])('closes a closable tab on a middle click on its %s', (_, getTarget) => {
      middleClickOn(getTarget());

      expect(onCloseTab).toHaveBeenCalledExactlyOnceWith(CLOSABLE_TAB_ID);
    });

    it('does not close a tab rc-dock marks non-closable, which also gets no close button', () => {
      middleClickOn(titleOf('tab-c'));

      expect(onCloseTab).not.toHaveBeenCalled();
      expect(headerOf('tab-c').querySelector('.dock-tab-close-btn')).toBeNull();
    });

    it('closes nothing on a middle click in panel content', () => {
      const content = document.querySelector('.platform-panel button');
      if (!content) throw new Error('No panel content rendered');

      middleClickOn(content);

      expect(onCloseTab).not.toHaveBeenCalled();
    });
  });
});
