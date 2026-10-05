// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import DockLayout, { BoxData, LayoutData, PanelData } from 'rc-dock';
import type { Layout, PanelDirection, SavedTabInfo } from '@shared/models/docking-framework.model';
import { TAB_TYPE_BUTTONS } from '@renderer/testing/test-buttons-panel.component';
import { resetActivationLatchForTesting } from '@renderer/services/window-activation.util';
import { isPanel, isTab } from './docking-framework-internal.model';
import { addTabToDock, loadTab } from './platform-dock-layout-storage.util';

// Rendering a real dock renders the app's own tab titles, whose hooks and services reach PAPI. These
// are the same boundary stand-ins `platform-dock-layout-middle-click.dom-contract.test.tsx` uses.
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
  mergeUpdatablePropertiesIntoWebViewDefinitionIfChangesArePresent: vi.fn(),
  saveTabInfoBase: vi.fn(),
}));

vi.mock('@shared/services/window.service', () => ({
  windowService: { dataProviderName: 'platform.windowServiceDataProvider', setFocus: vi.fn() },
}));

vi.mock('../../../shared/services/logger.service');

vi.mock('@renderer/services/theme.service', () => ({
  __esModule: true,
  localThemeService: {},
}));

// Every tab here is the `buttons` tab type with plain-text content. The real buttons panel
// subscribes to PAPI data, and only where tabs land is under test.
vi.mock('@renderer/testing/test-buttons-panel.component', () => ({
  TAB_TYPE_BUTTONS: 'buttons',
  loadButtonsTab: (savedTabInfo: SavedTabInfo) => ({
    ...savedTabInfo,
    tabTitle: savedTabInfo.id,
    content: savedTabInfo.id,
  }),
}));

/** Any on-screen spot for the floating tab group; rc-dock only needs one */
const FLOAT_POSITION: Pick<PanelData, 'x' | 'y' | 'w' | 'h'> = { x: 100, y: 80, w: 400, h: 300 };

/** A tab group (rc-dock panel) holding one tab per id, materialized the way the app does */
function tabGroup(
  id: string,
  tabIds: string[],
  extra: Partial<Pick<PanelData, 'group' | 'x' | 'y' | 'w' | 'h'>> = {},
): PanelData {
  return {
    id,
    tabs: tabIds.map((tabId) => loadTab({ id: tabId, tabType: TAB_TYPE_BUTTONS })),
    ...extra,
  };
}

/** One docked tab group and one floating tab group: the layout a user has after floating a tab */
function dockedAndFloatingLayout(): LayoutData {
  return {
    dockbox: { mode: 'horizontal', children: [tabGroup('docked-group', ['project-a'])] },
    floatbox: {
      mode: 'float',
      children: [tabGroup('floating-group', ['project-f'], FLOAT_POSITION)],
    },
  };
}

/** Renders a real rc-dock dock holding `layout`, loading its tabs through the app's own loader */
function renderDock(layout: LayoutData): DockLayout {
  const dockLayoutRef = createRef<DockLayout>();
  render(
    <DockLayout
      ref={dockLayoutRef}
      defaultLayout={layout}
      loadTab={loadTab}
      style={{ width: 1200, height: 800 }}
    />,
  );
  if (!dockLayoutRef.current) throw new Error('DockLayout did not mount');
  return dockLayoutRef.current;
}

/** Opens a new tab the way a web view open does: added to the dock and brought to the front */
function openPanel(dockLayout: DockLayout, tabId: string, layout: Layout): void {
  act(() => {
    addTabToDock({ id: tabId, tabType: TAB_TYPE_BUTTONS }, layout, true, dockLayout);
  });
}

/** Maximizes a tab group the way rc-dock's own maximize button does */
function maximize(dockLayout: DockLayout, tabGroupId: string): void {
  const group = dockLayout.find(tabGroupId);
  if (!isPanel(group)) throw new Error(`No tab group '${tabGroupId}' in the layout`);
  act(() => {
    // Null required by the external API
    // eslint-disable-next-line no-null/no-null
    dockLayout.dockMove(group, null, 'maximize');
  });
}

/**
 * A layout node reduced to its structure: a tab group becomes its tab ids, a box its mode and
 * children
 */
type LayoutShape = string[] | { mode: string; children: LayoutShape[] };

function shapeOf(node: PanelData | BoxData): LayoutShape {
  if ('tabs' in node) return node.tabs.map((tab) => tab.id ?? '');
  return { mode: node.mode, children: node.children.map((child) => shapeOf(child)) };
}

/** One of rc-dock's root boxes other than the dock box, which rc-dock always creates */
function rootBox(dockLayout: DockLayout, key: 'floatbox' | 'maxbox'): BoxData {
  const box = dockLayout.getLayout()[key];
  if (!box) throw new Error(`rc-dock always creates a ${key}`);
  return box;
}

/** The tab group holding the tab with this id */
function tabGroupOf(dockLayout: DockLayout, tabId: string): PanelData {
  const tab = dockLayout.find(tabId);
  if (!isTab(tab) || !tab.parent) throw new Error(`Tab '${tabId}' is not in a tab group`);
  return tab.parent;
}

let previousWasWindowCreatedWithoutActivation: boolean | undefined;

beforeEach(() => {
  resetActivationLatchForTesting();
  previousWasWindowCreatedWithoutActivation = globalThis.wasWindowCreatedWithoutActivation;
  globalThis.wasWindowCreatedWithoutActivation = false;
});

afterEach(() => {
  cleanup();
  globalThis.wasWindowCreatedWithoutActivation = previousWasWindowCreatedWithoutActivation;
});

describe('opening a tab as a panel beside a tab group that is not docked', () => {
  it('docks the new tab as a tab group at the right edge and leaves the floating group floating', () => {
    const dockLayout = renderDock(dockedAndFloatingLayout());

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-f' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['find']],
    });
    expect(shapeOf(rootBox(dockLayout, 'floatbox'))).toEqual({
      mode: 'float',
      children: [['project-f']],
    });
    // rc-dock's floating layer draws only the tab groups directly inside it, so the DOM is what
    // shows both groups are actually on screen
    expect(document.querySelector('.dock-fbox [data-dockid="floating-group"]')).not.toBeNull();
    const findGroupId = tabGroupOf(dockLayout, 'find').id ?? '';
    expect(document.querySelector(`[data-dockid="${findGroupId}"]`)).not.toBeNull();
    expect(document.querySelector(`.dock-fbox [data-dockid="${findGroupId}"]`)).toBeNull();
  });

  it.each<PanelDirection>(['left', 'top', 'bottom'])(
    'docks it at the right edge whichever side (%s) was asked for',
    (direction) => {
      const dockLayout = renderDock(dockedAndFloatingLayout());

      openPanel(dockLayout, 'find', { type: 'panel', direction, targetTabId: 'project-f' });

      expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
        mode: 'horizontal',
        children: [['project-a'], ['find']],
      });
      expect(shapeOf(rootBox(dockLayout, 'floatbox'))).toEqual({
        mode: 'float',
        children: [['project-f']],
      });
    },
  );

  it('docks it at the right edge when the target tab group is maximized', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [tabGroup('docked-group', ['project-a']), tabGroup('other-group', ['notes'])],
      },
    });
    maximize(dockLayout, 'docked-group');

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'bottom', targetTabId: 'project-a' });

    // Bringing the new tab to the front un-maximizes the group, which returns to its own spot
    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['notes'], ['find']],
    });
    expect(rootBox(dockLayout, 'maxbox').children).toHaveLength(0);
  });

  it('makes the new tab group the only docked one when every tab group floats', () => {
    // rc-dock keeps an empty stand-in tab group in an otherwise empty dock box; it must not linger
    // beside the new group. No target and no direction: the defaults pick the most recently added
    // tab (here the only one, floating) and the right side
    const dockLayout = renderDock({
      dockbox: { mode: 'horizontal', children: [] },
      floatbox: {
        mode: 'float',
        children: [tabGroup('floating-group', ['project-f'], FLOAT_POSITION)],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['find']],
    });
    expect(shapeOf(rootBox(dockLayout, 'floatbox'))).toEqual({
      mode: 'float',
      children: [['project-f']],
    });
  });

  it('puts a dock box laid out top-to-bottom beside the new group so the group still lands at the right edge', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'vertical',
        children: [tabGroup('upper-group', ['project-a']), tabGroup('lower-group', ['notes'])],
      },
      floatbox: {
        mode: 'float',
        children: [tabGroup('floating-group', ['project-f'], FLOAT_POSITION)],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-f' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [{ mode: 'vertical', children: [['project-a'], ['notes']] }, ['find']],
    });
  });
});
