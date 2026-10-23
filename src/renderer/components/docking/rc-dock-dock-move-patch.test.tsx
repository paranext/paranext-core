// Imports rc-dock's `es/` build on purpose: vitest resolves `rc-dock` via `main` → `lib/`, but
// patch-package (patches/rc-dock+3.3.2.patch) patches only `es/`, the build webpack ships
// (`module` → `es/`). Importing `rc-dock` here would test the unpatched code.
import { DockLayout } from 'rc-dock/es/DockLayout';
import type { BoxData, LayoutData, PanelData, TabData, TabGroup } from 'rc-dock';
import { act, cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

const GROUP = 'group-a';
/** What `dockMove` takes as the target of a move that has none (maximize, front, remove, float) */
// rc-dock's `dockMove` types its target as `... | null`, so `undefined` does not type-check
// eslint-disable-next-line no-null/no-null
const NO_TARGET = null;

function tab(id: string): TabData {
  return { id, title: id, content: <div>{id}</div>, group: GROUP };
}

function panel(id: string, tabIds: string[]): PanelData {
  return { id, tabs: tabIds.map(tab), group: GROUP };
}

/**
 * Group `left` (tabs T, U) beside a middle column that stacks group `top` (V) over group `bottom`
 * (W, X). In this shape, rc-dock's edge drop resolves a drop in the bottom strip of `bottom` to the
 * root dock box.
 */
function createLayout(): LayoutData {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        panel('left', ['T', 'U']),
        { mode: 'vertical', children: [panel('top', ['V']), panel('bottom', ['W', 'X'])] },
      ],
    },
  };
}

function renderDock(groupConfig: TabGroup = {}): DockLayout {
  const ref = createRef<DockLayout>();
  render(<DockLayout ref={ref} defaultLayout={createLayout()} groups={{ [GROUP]: groupConfig }} />);
  if (!ref.current) throw new Error('DockLayout did not mount');
  return ref.current;
}

type LayoutBox = 'dockbox' | 'floatbox' | 'maxbox';

/** Every tab group in one of the layout's boxes, depth first, as `id: [tab ids]` */
function describeTabGroups(dock: DockLayout, box: LayoutBox = 'dockbox'): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  const visit = (node: BoxData | PanelData) => {
    if ('tabs' in node) groups[node.id ?? '?'] = node.tabs.map((t) => t.id ?? '?');
    else node.children.forEach(visit);
  };
  const root = dock.getLayout()[box];
  if (root) visit(root);
  return groups;
}

/** How many times a tab appears anywhere in the layout: docked, floating or maximized */
function countTab(dock: DockLayout, tabId: string): number {
  const boxes: LayoutBox[] = ['dockbox', 'floatbox', 'maxbox'];
  return boxes
    .flatMap((box) => Object.values(describeTabGroups(dock, box)).flat())
    .filter((id) => id === tabId).length;
}

function findPanel(dock: DockLayout, panelId: string): PanelData {
  const found = dock.find(panelId);
  if (!found || !('tabs' in found)) throw new Error(`No tab group '${panelId}'`);
  return found;
}

function findTab(dock: DockLayout, tabId: string): TabData {
  const found = dock.find(tabId);
  if (!found || 'tabs' in found || 'children' in found) throw new Error(`No tab '${tabId}'`);
  return found;
}

/**
 * Starts a drag the way rc-dock's `TabCache.onDragStart` does: the drag keeps the tab object it
 * found at that moment, and every drop target later moves that object.
 */
function startDrag(dock: DockLayout, tabId: string): TabData {
  return findTab(dock, tabId);
}

/**
 * Starts a whole-group drag the way rc-dock's `DockPanel.onPanelHeaderDragStart` does: the drag
 * keeps the tab group object it found at that moment.
 */
function startGroupDrag(dock: DockLayout, panelId: string): PanelData {
  return findPanel(dock, panelId);
}

/** Replaces a tab's object the way the app's `updateTabPartial`/`updateWebViewDefinition` do */
function replaceTab(dock: DockLayout, tabId: string) {
  act(() => {
    dock.updateTab(tabId, { ...tab(tabId), title: `${tabId} (updated)` }, false);
  });
}

function drop(dock: DockLayout, ...args: Parameters<DockLayout['dockMove']>) {
  act(() => {
    dock.dockMove(...args);
  });
}

describe('rc-dock patch: DockLayout.dockMove acts on the current layout, not the dragged object', () => {
  afterEach(cleanup);

  it('docks a tab replaced during the drag below the whole layout instead of losing it', () => {
    const dock = renderDock();
    const dragged = startDrag(dock, 'T');
    replaceTab(dock, 'T');

    drop(dock, dragged, dock.getLayout().dockbox, 'bottom');

    expect(countTab(dock, 'T')).toBe(1);
    expect(describeTabGroups(dock).left).toEqual(['U']);
  });

  it('moves a tab replaced during the drag into a group that also changed, without duplicating it', () => {
    const dock = renderDock();
    const dragged = startDrag(dock, 'T');
    replaceTab(dock, 'T');
    replaceTab(dock, 'W');

    drop(dock, dragged, findPanel(dock, 'bottom'), 'middle');

    expect(describeTabGroups(dock)).toEqual({ left: ['U'], top: ['V'], bottom: ['W', 'X', 'T'] });
  });

  it('leaves a tab replaced during the drag in place when it is dropped on its own header', () => {
    const dock = renderDock();
    const dragged = startDrag(dock, 'T');
    replaceTab(dock, 'T');

    drop(dock, dragged, findTab(dock, 'T'), 'after-tab');

    expect(describeTabGroups(dock).left).toEqual(['T', 'U']);
  });

  it('leaves a tab group replaced during the drag in place when it is dropped next to one of its own tabs', () => {
    const dock = renderDock();
    const dragged = startGroupDrag(dock, 'left');
    replaceTab(dock, 'T');

    drop(dock, dragged, findTab(dock, 'U'), 'after-tab');

    expect(describeTabGroups(dock)).toEqual({ left: ['T', 'U'], top: ['V'], bottom: ['W', 'X'] });
  });

  it('floats a tab group dropped on its own float drop target', () => {
    // rc-dock's float drop targets on a tab group's own panel pass that tab group as the target
    const dock = renderDock({ floatable: true });
    const dragged = startGroupDrag(dock, 'left');

    drop(dock, dragged, dragged, 'float');

    expect(describeTabGroups(dock, 'floatbox')).toEqual({ left: ['T', 'U'] });
    expect(describeTabGroups(dock)).toEqual({ top: ['V'], bottom: ['W', 'X'] });
  });

  it('moves a tab group replaced during the drag into another group', () => {
    const dock = renderDock();
    const dragged = startGroupDrag(dock, 'left');
    replaceTab(dock, 'T');

    drop(dock, dragged, findPanel(dock, 'top'), 'middle');

    expect(describeTabGroups(dock)).toEqual({ top: ['V', 'T', 'U'], bottom: ['W', 'X'] });
    expect(findTab(dock, 'T').title).toBe('T (updated)');
  });

  it('docks a tab group replaced during the drag below the whole layout without losing or duplicating it', () => {
    const dock = renderDock();
    const dragged = startGroupDrag(dock, 'left');
    replaceTab(dock, 'T');

    drop(dock, dragged, dock.getLayout().dockbox, 'bottom');

    expect(countTab(dock, 'T')).toBe(1);
    expect(countTab(dock, 'U')).toBe(1);
    expect(findTab(dock, 'T').title).toBe('T (updated)');
  });

  it('moves a tab into a group that changed after the drop target last rendered', () => {
    const dock = renderDock();
    const dragged = startDrag(dock, 'T');
    // rc-dock reads a drop target's handlers when the pointer enters it, so a target that closes
    // over its render-time panel (as `TabBarDropZone` does) can hand over a superseded object
    const dropTargetPanel = findPanel(dock, 'bottom');
    replaceTab(dock, 'W');

    drop(dock, dragged, dropTargetPanel, 'middle');

    expect(describeTabGroups(dock)).toEqual({ left: ['U'], top: ['V'], bottom: ['W', 'X', 'T'] });
    expect(findTab(dock, 'W').title).toBe('W (updated)');
  });

  it('keeps the newest version of a tab replaced during the drag', () => {
    const dock = renderDock();
    const dragged = startDrag(dock, 'T');
    replaceTab(dock, 'T');

    drop(dock, dragged, findPanel(dock, 'top'), 'middle');

    expect(findTab(dock, 'T').title).toBe('T (updated)');
  });

  it('maximizes and restores a tab group through an object replaced since it was found', () => {
    const dock = renderDock();
    const found = findPanel(dock, 'left');
    replaceTab(dock, 'T');

    drop(dock, found, NO_TARGET, 'maximize');

    expect(describeTabGroups(dock, 'maxbox')).toEqual({ left: ['T', 'U'] });
    expect(findTab(dock, 'T').title).toBe('T (updated)');

    drop(dock, found, NO_TARGET, 'maximize');

    expect(describeTabGroups(dock, 'maxbox')).toEqual({});
    expect(describeTabGroups(dock)).toEqual({ left: ['T', 'U'], top: ['V'], bottom: ['W', 'X'] });
  });

  it('closes a tab through an object replaced since it was found, keeping its neighbours current', () => {
    const dock = renderDock();
    const found = findTab(dock, 'T');
    replaceTab(dock, 'T');
    replaceTab(dock, 'U');

    drop(dock, found, NO_TARGET, 'remove');

    expect(countTab(dock, 'T')).toBe(0);
    expect(describeTabGroups(dock).left).toEqual(['U']);
    expect(findTab(dock, 'U').title).toBe('U (updated)');
  });

  it('floats a tab through an object replaced since it was found', () => {
    const dock = renderDock();
    const found = findTab(dock, 'T');
    replaceTab(dock, 'T');

    drop(dock, found, NO_TARGET, 'float', { left: 0, top: 0, width: 100, height: 100 });

    expect(countTab(dock, 'T')).toBe(1);
    expect(Object.values(describeTabGroups(dock, 'floatbox')).flat()).toEqual(['T']);
    expect(findTab(dock, 'T').title).toBe('T (updated)');
    expect(describeTabGroups(dock).left).toEqual(['U']);
  });

  it('brings a floating tab group to the front through an object replaced since it was found', () => {
    const dock = renderDock();
    const floatPosition = { left: 0, top: 0, width: 100, height: 100 };
    drop(dock, findTab(dock, 'T'), NO_TARGET, 'float', floatPosition);
    drop(dock, findTab(dock, 'W'), NO_TARGET, 'float', floatPosition);
    const found = findTab(dock, 'T').parent;
    if (!found) throw new Error('T has no tab group');
    replaceTab(dock, 'T');

    drop(dock, found, NO_TARGET, 'front');

    const zOf = (tabId: string) => findTab(dock, tabId).parent?.z ?? 0;
    expect(zOf('T')).toBeGreaterThan(zOf('W'));
    expect(countTab(dock, 'T')).toBe(1);
    expect(findTab(dock, 'T').title).toBe('T (updated)');
  });

  it('still adds a tab that is not in the layout yet', () => {
    const dock = renderDock();

    drop(dock, tab('N'), findPanel(dock, 'top'), 'middle');

    expect(describeTabGroups(dock).top).toEqual(['V', 'N']);
  });

  it('still moves a tab that did not change during the drag', () => {
    const dock = renderDock();
    const dragged = startDrag(dock, 'T');

    drop(dock, dragged, findPanel(dock, 'bottom'), 'middle');

    expect(describeTabGroups(dock)).toEqual({ left: ['U'], top: ['V'], bottom: ['W', 'X', 'T'] });
  });
});
