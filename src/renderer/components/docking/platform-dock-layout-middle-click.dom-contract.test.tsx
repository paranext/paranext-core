// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import DockLayout, { LayoutData, TabBase, TabData } from 'rc-dock';
import { resetActivationLatchForTesting } from '@renderer/services/window-activation.util';
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
vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
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
        tabs: [{ id: CLOSABLE_TAB_ID }, { id: 'tab-b' }, { id: 'tab-c' }],
        activeId: CLOSABLE_TAB_ID,
      },
    ],
  },
};

/**
 * Pins the rc-dock DOM details the tab headers and panels depend on against a real `DockLayout`
 * rendering the app's own `PlatformTabTitle` and `PlatformPanel`, so an rc-dock upgrade that moves
 * them fails here instead of silently.
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
    beforeEach(() => {
      resetActivationLatchForTesting();
      globalThis.wasWindowCreatedWithoutActivation = false;
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
});
