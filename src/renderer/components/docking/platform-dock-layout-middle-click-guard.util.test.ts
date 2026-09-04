import { afterEach, describe, expect, it, vi } from 'vitest';
import { installMiddleClickDragGuard } from './platform-dock-layout-middle-click-guard.util';

/**
 * Builds a DOM tree standing in for the dock layout: a root (where the guard attaches, mirroring
 * `DockLayout.getRootElement()`), a `.dock-bar` (rc-dock's whole-tab-row `DragDropDiv`) containing
 * a nested "tab" `DragDropDiv`, and a sibling "panel content" area outside any `.dock-bar`. Bubble
 * listeners on the two `DragDropDiv` stand-ins record whether rc-dock's own drag-arming handlers
 * would have run.
 */
function buildDockLayoutTree() {
  const root = document.createElement('div');
  const dockBar = document.createElement('div');
  dockBar.className = 'dock-bar';
  const tabDragInitiator = document.createElement('div');
  const tabTitle = document.createElement('div');
  const panelContent = document.createElement('div');

  tabDragInitiator.appendChild(tabTitle);
  dockBar.appendChild(tabDragInitiator);
  root.appendChild(dockBar);
  root.appendChild(panelContent);
  document.body.appendChild(root);

  const onDockBarMouseDown = vi.fn();
  const onTabMouseDown = vi.fn();
  const onPanelContentMouseDown = vi.fn();
  dockBar.addEventListener('mousedown', onDockBarMouseDown);
  tabDragInitiator.addEventListener('mousedown', onTabMouseDown);
  panelContent.addEventListener('mousedown', onPanelContentMouseDown);

  return {
    root,
    dockBar,
    tabTitle,
    panelContent,
    onDockBarMouseDown,
    onTabMouseDown,
    onPanelContentMouseDown,
  };
}

function dispatchMouseDown(target: Element, button: number) {
  return target.dispatchEvent(
    new MouseEvent('mousedown', { bubbles: true, cancelable: true, button }),
  );
}

describe('installMiddleClickDragGuard', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('stops a middle-button press on a tab title from reaching rc-dock’s drag-arming ancestors', () => {
    const tree = buildDockLayoutTree();
    installMiddleClickDragGuard(tree.root);

    const notPrevented = dispatchMouseDown(tree.tabTitle, 1);

    expect(notPrevented).toBe(false); // `dispatchEvent` returns false when defaultPrevented
    expect(tree.onTabMouseDown).not.toHaveBeenCalled();
    expect(tree.onDockBarMouseDown).not.toHaveBeenCalled();
  });

  it('stops a middle-button press directly on the tab-bar remainder (past every tab)', () => {
    const tree = buildDockLayoutTree();
    installMiddleClickDragGuard(tree.root);

    // Pressed on `.dock-bar` itself, not inside the nested tab drag-initiator — the empty strip
    // past the "+" button, which is covered only by the outer whole-tab-group `DragDropDiv`.
    dispatchMouseDown(tree.dockBar, 1);

    expect(tree.onDockBarMouseDown).not.toHaveBeenCalled();
  });

  it('leaves a left-button press on a tab title unaffected, so dragging still works', () => {
    const tree = buildDockLayoutTree();
    installMiddleClickDragGuard(tree.root);

    const notPrevented = dispatchMouseDown(tree.tabTitle, 0);

    expect(notPrevented).toBe(true);
    expect(tree.onTabMouseDown).toHaveBeenCalledTimes(1);
    expect(tree.onDockBarMouseDown).toHaveBeenCalledTimes(1);
  });

  it('leaves a middle-button press outside any tab bar unaffected', () => {
    const tree = buildDockLayoutTree();
    installMiddleClickDragGuard(tree.root);

    const notPrevented = dispatchMouseDown(tree.panelContent, 1);

    expect(notPrevented).toBe(true);
    expect(tree.onPanelContentMouseDown).toHaveBeenCalledTimes(1);
  });

  it('stops intercepting once the returned cleanup function is called', () => {
    const tree = buildDockLayoutTree();
    const removeGuard = installMiddleClickDragGuard(tree.root);

    removeGuard();
    dispatchMouseDown(tree.tabTitle, 1);

    expect(tree.onTabMouseDown).toHaveBeenCalledTimes(1);
  });
});
