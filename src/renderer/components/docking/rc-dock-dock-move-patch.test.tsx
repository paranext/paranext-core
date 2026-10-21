// Imports rc-dock's `es/` build on purpose: vitest resolves `rc-dock` via `main` → `lib/`, but
// patch-package (patches/rc-dock+3.3.2.patch) patches only `es/`, the build webpack ships
// (`module` → `es/`). Importing `rc-dock` here would test the unpatched code.
import { DockLayout } from 'rc-dock/es/DockLayout';
import type { BoxData, LayoutData, PanelData, TabData } from 'rc-dock';
import { act, cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

const GROUP = 'group-a';

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

function renderDock(): DockLayout {
  const ref = createRef<DockLayout>();
  render(<DockLayout ref={ref} defaultLayout={createLayout()} groups={{ [GROUP]: {} }} />);
  if (!ref.current) throw new Error('DockLayout did not mount');
  return ref.current;
}

/** Every tab group in the dock box, depth first, as `id: [tab ids]` */
function describeTabGroups(dock: DockLayout): Record<string, string[]> {
  const groups: Record<string, string[]> = {};
  const visit = (node: BoxData | PanelData) => {
    if ('tabs' in node) groups[node.id ?? '?'] = node.tabs.map((t) => t.id ?? '?');
    else node.children.forEach(visit);
  };
  visit(dock.getLayout().dockbox);
  return groups;
}

function countTab(dock: DockLayout, tabId: string): number {
  return Object.values(describeTabGroups(dock))
    .flat()
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
