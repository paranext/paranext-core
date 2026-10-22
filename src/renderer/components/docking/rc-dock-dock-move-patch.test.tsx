// @vitest-environment jsdom
// Imports rc-dock's `es/` build on purpose: vitest resolves `rc-dock` via `main` → `lib/`, but
// patch-package (patches/rc-dock+3.3.2.patch) patches only `es/`, the build webpack ships
// (`module` → `es/`). Importing `rc-dock` here would test the unpatched code.
import { DockLayout } from 'rc-dock/es/DockLayout';
import type { BoxData, LayoutData, PanelData, TabData } from 'rc-dock';
import { act, cleanup, render } from '@testing-library/react';
import { createRef } from 'react';
import { afterEach, describe, expect, it } from 'vitest';

function createTab(id: string): TabData {
  return { id, title: id, content: <div>{id}</div> };
}

/** Two tab groups side by side: `home` and `project` on the left, `checks` on the right */
function sideBySideLayout(): LayoutData {
  return {
    dockbox: {
      mode: 'horizontal',
      children: [
        { id: 'left-group', tabs: [createTab('home'), createTab('project')] },
        { id: 'right-group', tabs: [createTab('checks')] },
      ],
    },
  };
}

function renderDock(): DockLayout {
  const dockLayoutRef = createRef<DockLayout>();
  render(
    <DockLayout
      ref={dockLayoutRef}
      defaultLayout={sideBySideLayout()}
      style={{ width: 1200, height: 800 }}
    />,
  );
  if (!dockLayoutRef.current) throw new Error('DockLayout did not mount');
  return dockLayoutRef.current;
}

function findTab(dockLayout: DockLayout, id: string): TabData {
  const tab = dockLayout.find(id);
  if (!tab || !('title' in tab)) throw new Error(`No tab '${id}' in the layout`);
  return tab;
}

function findTabGroup(dockLayout: DockLayout, id: string): PanelData {
  const tabGroup = dockLayout.find(id);
  if (!tabGroup || !('tabs' in tabGroup)) throw new Error(`No tab group '${id}' in the layout`);
  return tabGroup;
}

/**
 * Replaces the tab the way the app's title, focus and web view state updates do: rc-dock swaps in a
 * new tab object and new copies of every tab group and box above it
 */
function updateTitle(dockLayout: DockLayout, id: string, title: string): void {
  act(() => {
    dockLayout.updateTab(id, { ...findTab(dockLayout, id), title }, false);
  });
}

/** A layout node reduced to its structure: a tab group becomes its tab ids, a box its mode */
type LayoutShape = string[] | { mode: string; children: LayoutShape[] };

function shapeOf(node: PanelData | BoxData): LayoutShape {
  if ('tabs' in node) return node.tabs.map((tab) => tab.id ?? '');
  return { mode: node.mode ?? '', children: node.children.map((child) => shapeOf(child)) };
}

afterEach(() => {
  cleanup();
});

describe('patched rc-dock dockMove with objects the layout has since replaced', () => {
  // Pins the patch: a drag holds the tab object it picked up, and the tab is updated while it is
  // dragged (common right after it opens). Unpatched, the drop removes the tab and adds nothing.
  it('docks a tab updated mid-drag at the bottom of the dock area', () => {
    const dockLayout = renderDock();
    const draggedTab = findTab(dockLayout, 'project');

    updateTitle(dockLayout, 'project', 'Project (loaded)');
    act(() => {
      dockLayout.dockMove(draggedTab, dockLayout.getLayout().dockbox, 'bottom');
    });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'vertical',
      children: [{ mode: 'horizontal', children: [['home'], ['checks']] }, ['project']],
    });
    expect(findTab(dockLayout, 'project').title).toBe('Project (loaded)');
  });

  // Pins the patch: the same mid-drag update, dropped on the bottom edge of the tab's own tab
  // group. Unpatched, the tab ends up both in its old tab group and in the new one.
  it('docks a tab updated mid-drag below its own tab group exactly once', () => {
    const dockLayout = renderDock();
    const draggedTab = findTab(dockLayout, 'project');

    updateTitle(dockLayout, 'project', 'Project (loaded)');
    act(() => {
      dockLayout.dockMove(draggedTab, findTabGroup(dockLayout, 'left-group'), 'bottom');
    });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [{ mode: 'vertical', children: [['home'], ['project']] }, ['checks']],
    });
  });

  // Pins the patch: dropped next to another tab, the dragged tab keeps the update it got mid-drag.
  // Unpatched, the layout is rebuilt from the replaced tab group, which reverts the update.
  it('keeps a mid-drag update when dropped next to another tab', () => {
    const dockLayout = renderDock();
    const draggedTab = findTab(dockLayout, 'project');

    updateTitle(dockLayout, 'project', 'Project (loaded)');
    act(() => {
      dockLayout.dockMove(draggedTab, findTab(dockLayout, 'home'), 'before-tab');
    });

    expect(shapeOf(findTabGroup(dockLayout, 'left-group'))).toEqual(['project', 'home']);
    expect(findTab(dockLayout, 'project').title).toBe('Project (loaded)');
  });

  // Pins the patch: rc-dock refuses a drop of a tab onto itself by comparing objects, which a tab
  // updated mid-drag gets past. Unpatched, and with the swap alone, the tab shows up twice.
  it('ignores a tab updated mid-drag and dropped onto itself', () => {
    const dockLayout = renderDock();
    const draggedTab = findTab(dockLayout, 'project');

    updateTitle(dockLayout, 'project', 'Project (loaded)');
    act(() => {
      dockLayout.dockMove(draggedTab, findTab(dockLayout, 'project'), 'after-tab');
    });

    expect(shapeOf(findTabGroup(dockLayout, 'left-group'))).toEqual(['home', 'project']);
  });

  // Pins the patch: the same for a whole tab group dragged by its header onto itself.
  it('ignores a tab group updated mid-drag and dropped onto itself', () => {
    const dockLayout = renderDock();
    const draggedTabGroup = findTabGroup(dockLayout, 'right-group');

    updateTitle(dockLayout, 'checks', 'Checks (loaded)');
    act(() => {
      dockLayout.dockMove(draggedTabGroup, findTabGroup(dockLayout, 'right-group'), 'middle');
    });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'horizontal',
      children: [['home', 'project'], ['checks']],
    });
  });

  // Pins the patch's target half: a drop target rendered before another tab in its group was
  // updated. Unpatched, the layout is rebuilt from the replaced tab group, which shows the dragged
  // tab twice and reverts the update.
  it('docks onto a tab group replaced since the drop target last rendered', () => {
    const dockLayout = renderDock();
    const dropTarget = findTabGroup(dockLayout, 'left-group');

    updateTitle(dockLayout, 'project', 'Project (loaded)');
    act(() => {
      dockLayout.dockMove(findTab(dockLayout, 'checks'), dropTarget, 'bottom');
    });

    expect(shapeOf(dockLayout.getLayout().dockbox)).toEqual({
      mode: 'vertical',
      children: [['home', 'project'], ['checks']],
    });
    expect(findTab(dockLayout, 'project').title).toBe('Project (loaded)');
  });

  // Guards the patch's pass-through, not the fix: a brand-new tab is not in the layout yet, so
  // there is nothing to swap it for and it must be added as given. Passes unpatched too.
  it('still adds a brand-new tab as given', () => {
    const dockLayout = renderDock();

    act(() => {
      dockLayout.dockMove(createTab('new'), findTabGroup(dockLayout, 'right-group'), 'middle');
    });

    expect(shapeOf(findTabGroup(dockLayout, 'right-group'))).toEqual(['checks', 'new']);
  });
});
