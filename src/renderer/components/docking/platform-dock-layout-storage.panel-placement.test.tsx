// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render } from '@testing-library/react';
import { persistDirection } from 'platform-bible-react/experimental';
import { createRef } from 'react';
import DockLayout, { BoxData, LayoutData, PanelData } from 'rc-dock';
import type {
  Layout,
  PanelDirection,
  SavedTabInfo,
  TabInfo,
} from '@shared/models/docking-framework.model';
import { TAB_TYPE_BUTTONS } from '@renderer/testing/test-buttons-panel.component';
import { resetActivationLatchForTesting } from '@renderer/services/window-activation.util';
import { isPanel, isTab } from './docking-framework-internal.model';
import { HEADLESS_GROUP, TAB_GROUP_RESOURCES } from './dock-tab-group.util';
import { SIMPLE_COLUMN_MIN_WIDTH_PX } from './simple-layout.data';
import { DOCK_SPAN_TOLERANCE, getExtentInDock, getSpanInDock } from './dock-layout-geometry.util';
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

// A tab pinned in one of Simple mode's fixed columns gets that column's rc-dock group from
// `getTabGroup`, which reads the web view's type and pin state. The tabs here are plain test tabs, so
// their ids stand in for that: `headless-*` tabs belong to the model-text and editor columns and
// `resources-*` tabs to Column 3. Every other tab keeps the real group.
vi.mock('./platform-dock-layout-positioning.util', async (importOriginal) => {
  const original = await importOriginal<typeof import('./platform-dock-layout-positioning.util')>();
  const { HEADLESS_GROUP: headlessGroup, TAB_GROUP_RESOURCES: resourcesGroup } = await import(
    './dock-tab-group.util'
  );
  return {
    ...original,
    getTabGroup: (tabInfo: TabInfo) => {
      if (tabInfo.id.startsWith('headless-')) return headlessGroup;
      if (tabInfo.id.startsWith('resources-')) return resourcesGroup;
      return original.getTabGroup(tabInfo);
    },
  };
});

/** Any on-screen spot for the floating tab group; rc-dock only needs one */
const FLOAT_POSITION: Pick<PanelData, 'x' | 'y' | 'w' | 'h'> = { x: 100, y: 80, w: 400, h: 300 };

/** A tab group (rc-dock panel) holding one tab per id, materialized the way the app does */
function tabGroup(
  id: string,
  tabIds: string[],
  extra: Partial<Pick<PanelData, 'group' | 'size' | 'panelLock' | 'x' | 'y' | 'w' | 'h'>> = {},
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

/**
 * Simple mode's three fixed columns as rc-dock holds them once loaded: one locked tab group per
 * column, weighted 1 | 2 | `resourcesColumnSize`, each tab in its column's rc-dock group
 */
function simpleShapedLayout(resourcesColumnSize = 1): LayoutData {
  const panelLock = { minWidth: SIMPLE_COLUMN_MIN_WIDTH_PX };
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        tabGroup('model-column', ['headless-model'], { group: HEADLESS_GROUP, panelLock, size: 1 }),
        tabGroup('editor-column', ['headless-editor'], {
          group: HEADLESS_GROUP,
          panelLock,
          size: 2,
        }),
        tabGroup('resources-column', ['resources-bible'], {
          group: TAB_GROUP_RESOURCES,
          panelLock,
          size: resourcesColumnSize,
        }),
      ],
    },
  };
}

/**
 * Docked tab groups laid out in `dockMode`, plus one floating tab group `floating-group` holding
 * `project-f` at `floatPosition`
 */
function layoutWithFloatingTarget(
  docked: (PanelData | BoxData)[],
  floatPosition: Partial<Pick<PanelData, 'x' | 'y' | 'w' | 'h'>> = FLOAT_POSITION,
  dockMode: 'horizontal' | 'vertical' = 'horizontal',
): LayoutData {
  return {
    dockbox: { mode: dockMode, children: docked },
    floatbox: {
      mode: 'float',
      children: [tabGroup('floating-group', ['project-f'], floatPosition)],
    },
  };
}

/** Gives the dock the pixel size jsdom cannot lay out */
function stubLayoutSize(dockLayout: DockLayout, width: number, height: number): void {
  vi.spyOn(dockLayout, 'getLayoutSize').mockReturnValue({ width, height });
}

/** The floating tab group's position and stacking order */
function floatGeometry(dockLayout: DockLayout) {
  const { x, y, w, h, z } = tabGroupOf(dockLayout, 'project-f');
  return { x, y, w, h, z };
}

/** A panel opened beside the floating target `project-f` */
const BESIDE_FLOATING_TARGET: Layout = {
  type: 'panel',
  direction: 'right',
  targetTabId: 'project-f',
};

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
    // beside the new group. No target and no direction: the target defaults to the previously added
    // tab when this dock holds it and otherwise to the first tab found (here the only one,
    // floating), and the side defaults to the right
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

describe('the tab group opened beside a tab group that is not docked', () => {
  it('is as wide as the average tab group already docked, even after a divider drag', () => {
    // A divider drag rewrites the groups' sizes but never the dock box's own
    const dockLayout = renderDock(
      layoutWithFloatingTarget([
        tabGroup('left-group', ['project-a'], { size: 900 }),
        tabGroup('right-group', ['notes'], { size: 492 }),
      ]),
    );

    openPanel(dockLayout, 'find', BESIDE_FLOATING_TARGET);

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['notes'], ['find']],
    });
    expect(getExtentInDock(tabGroupOf(dockLayout, 'find'), 'horizontal')).toBeCloseTo(1 / 3, 6);
  });

  it('gives each further open an equal share instead of a narrower sliver', () => {
    const dockLayout = renderDock(
      layoutWithFloatingTarget([
        tabGroup('left-group', ['project-a'], { size: 900 }),
        tabGroup('right-group', ['notes'], { size: 492 }),
      ]),
    );
    const findIds = ['find-1', 'find-2', 'find-3', 'find-4'];

    findIds.forEach((findId, index) => {
      openPanel(dockLayout, findId, BESIDE_FLOATING_TARGET);
      // Before this open the dock held 2 + index top-level tab groups
      expect(getExtentInDock(tabGroupOf(dockLayout, findId), 'horizontal')).toBeCloseTo(
        1 / (3 + index),
        6,
      );
    });
    const firstSize = tabGroupOf(dockLayout, 'find-1').size ?? 0;
    findIds.forEach((findId) =>
      expect(tabGroupOf(dockLayout, findId).size).toBeCloseTo(firstSize, 6),
    );
  });

  it('takes rc-dock’s 30% beside a dock box laid out top to bottom, then an average share', () => {
    const dockLayout = renderDock(
      layoutWithFloatingTarget(
        [tabGroup('upper-group', ['project-a']), tabGroup('lower-group', ['notes'])],
        FLOAT_POSITION,
        'vertical',
      ),
    );

    openPanel(dockLayout, 'find-1', BESIDE_FLOATING_TARGET);
    expect(getExtentInDock(tabGroupOf(dockLayout, 'find-1'), 'horizontal')).toBeCloseTo(0.3, 6);

    openPanel(dockLayout, 'find-2', BESIDE_FLOATING_TARGET);
    expect(getExtentInDock(tabGroupOf(dockLayout, 'find-2'), 'horizontal')).toBeCloseTo(1 / 3, 6);
  });

  it('moves a floating target that covers it aside, keeping its tabs, top and height', () => {
    // A 1904px dock with the float parked over the right edge: the new group takes the right half
    const dockLayout = renderDock(
      layoutWithFloatingTarget([tabGroup('docked-group', ['project-a'])], {
        x: 1304,
        y: 80,
        w: 600,
        h: 300,
      }),
    );
    stubLayoutSize(dockLayout, 1904, 1000);

    openPanel(dockLayout, 'find', BESIDE_FLOATING_TARGET);

    const floatingGroup = tabGroupOf(dockLayout, 'project-f');
    expect(floatingGroup.id).toBe('floating-group');
    expect(floatingGroup.tabs.map((tab) => tab.id)).toEqual(['project-f']);
    expect(floatingGroup.activeId).toBe('project-f');
    expect(shapeOf(rootBox(dockLayout, 'floatbox'))).toEqual({
      mode: 'float',
      children: [['project-f']],
    });
    expect(floatingGroup.x).toBeCloseTo(352, 6);
    expect(floatingGroup.w).toBe(600);
    expect(floatingGroup.y).toBe(80);
    expect(floatingGroup.h).toBe(300);
    // The float's rectangle no longer meets the new group's, which spans the full dock height
    const [newGroupStart] = getSpanInDock(tabGroupOf(dockLayout, 'find'), 'horizontal');
    expect((floatingGroup.x ?? 0) + (floatingGroup.w ?? 0)).toBeLessThanOrEqual(
      newGroupStart * 1904 + DOCK_SPAN_TOLERANCE,
    );
  });

  it('leaves a floating target that does not cover it where it is', () => {
    const dockLayout = renderDock(
      layoutWithFloatingTarget([tabGroup('docked-group', ['project-a'])]),
    );
    stubLayoutSize(dockLayout, 1904, 1000);
    const before = floatGeometry(dockLayout);

    openPanel(dockLayout, 'find', BESIDE_FLOATING_TARGET);

    expect(floatGeometry(dockLayout)).toEqual(before);
  });

  it('narrows a floating target too wide to fit beside it', () => {
    const dockLayout = renderDock(
      layoutWithFloatingTarget([tabGroup('docked-group', ['project-a'])], {
        x: 0,
        y: 80,
        w: 1904,
        h: 300,
      }),
    );
    stubLayoutSize(dockLayout, 1904, 1000);

    openPanel(dockLayout, 'find', BESIDE_FLOATING_TARGET);

    const { x, w } = floatGeometry(dockLayout);
    expect(x).toBeCloseTo(0, 6);
    expect(w).toBeCloseTo(952, 6);
  });

  it('leaves the floating target alone while the dock has no size yet', () => {
    const dockLayout = renderDock(
      layoutWithFloatingTarget([tabGroup('docked-group', ['project-a'])], {
        x: 1304,
        y: 80,
        w: 600,
        h: 300,
      }),
    );
    const before = floatGeometry(dockLayout);

    openPanel(dockLayout, 'find', BESIDE_FLOATING_TARGET);

    expect(floatGeometry(dockLayout)).toEqual(before);
  });

  it('leaves a covering float alone when the new tab group fills the docked area', () => {
    // Every tab group floats, so there is nowhere beside the new group to move the float to
    const dockLayout = renderDock(layoutWithFloatingTarget([], { x: 1304, y: 80, w: 600, h: 300 }));
    stubLayoutSize(dockLayout, 1904, 1000);
    const before = floatGeometry(dockLayout);

    openPanel(dockLayout, 'find', BESIDE_FLOATING_TARGET);

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['find']],
    });
    expect(floatGeometry(dockLayout)).toEqual(before);
  });

  it('docks at the edge and leaves a floating target that has no position yet', () => {
    const dockLayout = renderDock(
      layoutWithFloatingTarget([tabGroup('docked-group', ['project-a'])], {}),
    );
    stubLayoutSize(dockLayout, 1904, 1000);

    openPanel(dockLayout, 'find', BESIDE_FLOATING_TARGET);

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['find']],
    });
    expect(floatGeometry(dockLayout).x).toBeUndefined();
  });
});

describe('opening a tab as a panel beside a docked tab group', () => {
  it('adds the tab to the tab group already on that side, as its active tab', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [tabGroup('target-group', ['project-a']), tabGroup('right-group', ['notes'])],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['notes', 'find']],
    });
    expect(tabGroupOf(dockLayout, 'find').id).toBe('right-group');
    expect(tabGroupOf(dockLayout, 'find').activeId).toBe('find');
  });

  it('adds a new tab group on that side when the target is already at that edge', () => {
    const dockLayout = renderDock({
      dockbox: { mode: 'horizontal', children: [tabGroup('only-group', ['project-a'])] },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['find']],
    });
  });

  it('treats a tab group in a dock box saved without a mode as docked', () => {
    // rc-dock never sets the dock box's mode and draws a box without one as a row. A layout read
    // from disk may lack it, and that must not make every docked target look floating.
    const layout: LayoutData = {
      dockbox: {
        mode: 'horizontal',
        children: [tabGroup('target-group', ['project-a']), tabGroup('right-group', ['notes'])],
      },
    };
    // rc-dock's type requires `mode`, so it is removed after the layout is built
    Reflect.deleteProperty(layout.dockbox, 'mode');
    const dockLayout = renderDock(layout);

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    // rc-dock splits beside a group in a box without a mode by wrapping the two in a new row; what
    // matters is that the tab lands beside its target rather than at the far edge of the dock
    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: undefined,
      children: [{ mode: 'horizontal', children: [['project-a'], ['find']] }, ['notes']],
    });
  });

  it.each<[PanelDirection, string, string[][]]>([
    ['bottom', 'project-a', [['project-a'], ['notes', 'find']]],
    ['top', 'notes', [['project-a', 'find'], ['notes']]],
  ])('joins the tab group %s of the target in a column', (direction, targetTabId, expected) => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'vertical',
        children: [tabGroup('upper-group', ['project-a']), tabGroup('lower-group', ['notes'])],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction, targetTabId });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'vertical',
      children: expected,
    });
  });

  it('adds a new tab group below a target with nothing below it', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [tabGroup('left-group', ['project-a']), tabGroup('right-group', ['notes'])],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'bottom', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [{ mode: 'vertical', children: [['project-a'], ['find']] }, ['notes']],
    });
  });

  it('looks past the column the target is in to the tab group beyond it', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            mode: 'vertical',
            children: [tabGroup('upper-left', ['project-a']), tabGroup('lower-left', ['notes'])],
          },
          tabGroup('side-group', ['project-b']),
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [{ mode: 'vertical', children: [['project-a'], ['notes']] }, ['project-b', 'find']],
    });
  });

  it('joins the top tab group of a column it reaches from the side', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [
          tabGroup('left-group', ['project-a']),
          {
            mode: 'vertical',
            children: [tabGroup('upper-right', ['notes']), tabGroup('lower-right', ['project-b'])],
          },
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], { mode: 'vertical', children: [['notes', 'find'], ['project-b']] }],
    });
  });

  it('joins the nearest tab group of a row it reaches along the row', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            mode: 'horizontal',
            children: [tabGroup('far-group', ['notes']), tabGroup('near-group', ['project-b'])],
          },
          {
            mode: 'vertical',
            children: [tabGroup('target-group', ['project-a']), tabGroup('below-group', ['other'])],
          },
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'left', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [
        { mode: 'horizontal', children: [['notes'], ['project-b', 'find']] },
        { mode: 'vertical', children: [['project-a'], ['other']] },
      ],
    });
  });

  it('adds a new tab group rather than joining a fixed column of another rc-dock group', () => {
    // Column 3 is widened so its width alone would not stop the join
    const dockLayout = renderDock(simpleShapedLayout(3));

    openPanel(dockLayout, 'find', {
      type: 'panel',
      direction: 'right',
      targetTabId: 'headless-editor',
    });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['headless-model'], ['headless-editor'], ['find'], ['resources-bible']],
    });
  });

  it('never adds a tab to the editor column of Simple mode, whose tab bar is hidden', () => {
    const dockLayout = renderDock(simpleShapedLayout());

    openPanel(dockLayout, 'headless-new', {
      type: 'panel',
      direction: 'right',
      targetTabId: 'headless-model',
    });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['headless-model'], ['headless-new'], ['headless-editor'], ['resources-bible']],
    });
  });

  it('never adds a tab to Simple mode’s Column 3, however wide it is', () => {
    const dockLayout = renderDock(simpleShapedLayout(3));

    openPanel(dockLayout, 'resources-find', {
      type: 'panel',
      direction: 'right',
      targetTabId: 'headless-editor',
    });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['headless-model'], ['headless-editor'], ['resources-find'], ['resources-bible']],
    });
  });

  it('adds a new tab group rather than joining a neighbour narrower than that group would be', () => {
    // [Editor 1000 | Comments 250]: joining would give the new tab 20% of the dock and hide Comments;
    // a group of its own gets 1000 / 2250 of it
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [
          tabGroup('target-group', ['project-a'], { size: 1000 }),
          tabGroup('right-group', ['notes'], { size: 250 }),
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['find'], ['notes']],
    });
    expect(getExtentInDock(tabGroupOf(dockLayout, 'find'), 'horizontal')).toBeCloseTo(4 / 9, 6);
  });

  it('adds a new tab group rather than joining a neighbour shorter than that group would be', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'vertical',
        children: [
          tabGroup('upper-group', ['project-a'], { size: 1000 }),
          tabGroup('strip-group', ['notes'], { size: 250 }),
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'bottom', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'vertical',
      children: [['project-a'], ['find'], ['notes']],
    });
  });

  it('joins a neighbour exactly as wide as a new group beside the target would be', () => {
    // The target's column is laid out top to bottom, so rc-dock would halve the target's 2/3: 1/3,
    // the neighbour's width exactly
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            mode: 'vertical',
            size: 200,
            children: [tabGroup('target-group', ['project-a']), tabGroup('below-group', ['other'])],
          },
          tabGroup('right-group', ['notes'], { size: 100 }),
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [{ mode: 'vertical', children: [['project-a'], ['other']] }, ['notes', 'find']],
    });
  });

  /** Two columns of two tab groups: A above B on the left, C above D on the right */
  function twoByTwoLayout(): LayoutData {
    return {
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            mode: 'vertical',
            children: [tabGroup('a-group', ['project-a']), tabGroup('b-group', ['project-b'])],
          },
          {
            mode: 'vertical',
            children: [tabGroup('c-group', ['notes']), tabGroup('d-group', ['other'])],
          },
        ],
      },
    };
  }

  it.each<[PanelDirection, string, LayoutShape]>([
    [
      'right',
      'project-b',
      {
        mode: 'horizontal',
        children: [
          { mode: 'vertical', children: [['project-a'], ['project-b']] },
          { mode: 'vertical', children: [['notes'], ['other', 'find']] },
        ],
      },
    ],
    [
      'left',
      'other',
      {
        mode: 'horizontal',
        children: [
          { mode: 'vertical', children: [['project-a'], ['project-b', 'find']] },
          { mode: 'vertical', children: [['notes'], ['other']] },
        ],
      },
    ],
  ])(
    'joins the tab group beside the target, not the diagonal one (%s of %s)',
    (direction, targetTabId, expected) => {
      const dockLayout = renderDock(twoByTwoLayout());

      openPanel(dockLayout, 'find', { type: 'panel', direction, targetTabId });

      expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual(expected);
    },
  );

  it.each<[PanelDirection, string, LayoutShape]>([
    [
      'bottom',
      'project-b',
      {
        mode: 'vertical',
        children: [
          { mode: 'horizontal', children: [['project-a'], ['project-b']] },
          { mode: 'horizontal', children: [['notes'], ['other', 'find']] },
        ],
      },
    ],
    [
      'top',
      'other',
      {
        mode: 'vertical',
        children: [
          { mode: 'horizontal', children: [['project-a'], ['project-b', 'find']] },
          { mode: 'horizontal', children: [['notes'], ['other']] },
        ],
      },
    ],
  ])(
    'joins the tab group beside the target in rows, not the diagonal one (%s of %s)',
    (direction, targetTabId, expected) => {
      // Two rows of two tab groups: A beside B on top, C beside D below
      const dockLayout = renderDock({
        dockbox: {
          mode: 'vertical',
          children: [
            {
              mode: 'horizontal',
              children: [tabGroup('a-group', ['project-a']), tabGroup('b-group', ['project-b'])],
            },
            {
              mode: 'horizontal',
              children: [tabGroup('c-group', ['notes']), tabGroup('d-group', ['other'])],
            },
          ],
        },
      });

      openPanel(dockLayout, 'find', { type: 'panel', direction, targetTabId });

      expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual(expected);
    },
  );

  it('joins the tab group across from the target that overlaps it most', () => {
    // Left column: A (3/4 of the height) above B; right column: C (1/4) above D. A faces D for half
    // the height and C for only a quarter
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            mode: 'vertical',
            children: [
              tabGroup('a-group', ['project-a'], { size: 300 }),
              tabGroup('b-group', ['project-b'], { size: 100 }),
            ],
          },
          {
            mode: 'vertical',
            children: [
              tabGroup('c-group', ['notes'], { size: 100 }),
              tabGroup('d-group', ['other'], { size: 300 }),
            ],
          },
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(tabGroupOf(dockLayout, 'find').id).toBe('d-group');
  });

  it('adds a new tab group rather than joining an unlocked, wide neighbour of another rc-dock group', () => {
    // The neighbour has tabs, is not locked and is as wide as the target, so only its rc-dock group
    // (the new tab is of the default group) keeps the tab out of it
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [
          tabGroup('target-group', ['project-a'], { size: 1 }),
          tabGroup('right-group', ['headless-notes'], { group: HEADLESS_GROUP, size: 1 }),
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['find'], ['headless-notes']],
    });
  });

  it('adds a new tab group rather than joining the stand-in for a maximized tab group', () => {
    // While a group is maximized, rc-dock keeps an empty stand-in in its place and later restores the
    // group over it, so a tab added to the stand-in would be lost
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [tabGroup('target-group', ['project-a']), tabGroup('right-group', ['notes'])],
      },
    });
    maximize(dockLayout, 'right-group');

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['find'], ['notes']],
    });
  });
});

describe('opening a tab as a panel in a right-to-left UI', () => {
  it('joins the tab group beside the target, not the diagonal one, in a right-to-left UI', () => {
    // Asking for the right means rc-dock's left here: from D that is B, beside it, not A
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [
          {
            mode: 'vertical',
            children: [tabGroup('a-group', ['project-a']), tabGroup('b-group', ['project-b'])],
          },
          {
            mode: 'vertical',
            children: [tabGroup('c-group', ['notes']), tabGroup('d-group', ['other'])],
          },
        ],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'other' });

    expect(tabGroupOf(dockLayout, 'find').id).toBe('b-group');
  });

  beforeEach(() => {
    persistDirection('rtl');
  });

  afterEach(() => {
    persistDirection('ltr');
  });

  it.each<PanelDirection>(['right', 'left', 'top', 'bottom'])(
    'docks a tab opened beside a floating tab group at the left edge (%s)',
    (direction) => {
      const dockLayout = renderDock(dockedAndFloatingLayout());

      openPanel(dockLayout, 'find', { type: 'panel', direction, targetTabId: 'project-f' });

      expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
        mode: 'horizontal',
        children: [['find'], ['project-a']],
      });
      expect(shapeOf(rootBox(dockLayout, 'floatbox'))).toEqual({
        mode: 'float',
        children: [['project-f']],
      });
    },
  );

  it('moves a covering floating target to the right of the new tab group at the left edge', () => {
    const dockLayout = renderDock(
      layoutWithFloatingTarget([tabGroup('docked-group', ['project-a'])]),
    );
    stubLayoutSize(dockLayout, 1904, 1000);

    openPanel(dockLayout, 'find', BESIDE_FLOATING_TARGET);

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['find'], ['project-a']],
    });
    const { x, w } = floatGeometry(dockLayout);
    expect(x).toBeCloseTo(952, 6);
    expect(w).toBe(400);
  });

  it('joins the tab group on the left when asked for the right', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [tabGroup('left-group', ['notes']), tabGroup('target-group', ['project-a'])],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['notes', 'find'], ['project-a']],
    });
  });

  it('adds a new tab group on the left when asked for the right and nothing is there', () => {
    const dockLayout = renderDock({
      dockbox: { mode: 'horizontal', children: [tabGroup('only-group', ['project-a'])] },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'right', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['find'], ['project-a']],
    });
  });

  it('joins the tab group on the right when asked for the left', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'horizontal',
        children: [tabGroup('target-group', ['project-a']), tabGroup('right-group', ['notes'])],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'left', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['project-a'], ['notes', 'find']],
    });
  });

  it('leaves top and bottom as they are', () => {
    const dockLayout = renderDock({
      dockbox: {
        mode: 'vertical',
        children: [tabGroup('upper-group', ['project-a']), tabGroup('lower-group', ['notes'])],
      },
    });

    openPanel(dockLayout, 'find', { type: 'panel', direction: 'bottom', targetTabId: 'project-a' });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'vertical',
      children: [['project-a'], ['notes', 'find']],
    });
  });
});
