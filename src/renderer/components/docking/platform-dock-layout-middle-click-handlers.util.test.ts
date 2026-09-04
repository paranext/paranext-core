import { afterEach, describe, expect, it, vi } from 'vitest';
import { installMiddleClickTabBarHandlers } from './platform-dock-layout-middle-click-handlers.util';

/**
 * Builds a DOM tree standing in for what rc-dock/rc-tabs actually render: a `root` (where the
 * handlers attach, mirroring `DockLayout.getRootElement()`) containing a `.dock-bar` (rc-tabs' own
 * tab-row `DragDropDiv`) with two tab headers — each a `[role="tab"]` `DragDropDiv` wrapping a
 * title div (carrying `data-tab-id`/`data-tab-closable`, mirroring `PlatformTabTitle`'s own root)
 * and a close-button div as DOM siblings — plus an unclaimed strip past them (the "+" button/empty
 * remainder, covered only by `.dock-bar` itself) and a sibling panel-content area outside any tab
 * bar. Also builds a SEPARATE tree appended directly to `document.body`, sibling to `root` rather
 * than nested inside it, standing in for rc-tabs' "more" overflow dropdown — which `rc-trigger`
 * portals to `document.body` (see the handlers module's own doc comment for why).
 */
function buildDockLayoutTree() {
  const root = document.createElement('div');
  const dockBar = document.createElement('div');
  dockBar.className = 'dock-bar';

  function buildTabHeader(id: string, closable: boolean) {
    const header = document.createElement('div');
    header.setAttribute('role', 'tab');
    const title = document.createElement('div');
    title.className = 'platform-tab-title';
    title.dataset.tabId = id;
    title.dataset.tabClosable = String(closable);
    const closeButton = document.createElement('div');
    closeButton.className = 'dock-tab-close-btn';
    header.appendChild(title);
    header.appendChild(closeButton);
    return { header, title, closeButton };
  }

  const closableTab = buildTabHeader('tab-1', true);
  const nonClosableTab = buildTabHeader('tab-2', false);
  const barRemainder = document.createElement('div');

  dockBar.appendChild(closableTab.header);
  dockBar.appendChild(nonClosableTab.header);
  dockBar.appendChild(barRemainder);
  root.appendChild(dockBar);

  const panelContent = document.createElement('div');
  root.appendChild(panelContent);
  document.body.appendChild(root);

  // Overflow dropdown portal: a sibling of `root` in the DOM, not a descendant of it — the same
  // relationship `rc-trigger`'s default `document.body` portal has to the dock layout's own root.
  const dropdown = document.createElement('div');
  dropdown.className = 'dock-dropdown';
  const dropdownTab = buildTabHeader('tab-3', true);
  dropdown.appendChild(dropdownTab.header);
  document.body.appendChild(dropdown);

  return {
    root,
    dockBar,
    barRemainder,
    panelContent,
    closableTab,
    nonClosableTab,
    dropdownTab,
  };
}

function dispatchMouseDown(target: Element, button: number) {
  return target.dispatchEvent(
    new MouseEvent('mousedown', { bubbles: true, cancelable: true, button }),
  );
}

function dispatchAuxClick(target: Element, button: number) {
  return target.dispatchEvent(
    new MouseEvent('auxclick', { bubbles: true, cancelable: true, button }),
  );
}

/**
 * Every `installMiddleClickTabBarHandlers` call an `it` makes, tracked so `afterEach` can uninstall
 * it — otherwise a listener a test forgets to clean up stays attached to the real, shared
 * `document` (jsdom doesn't reset it between tests, only `document.body.innerHTML` below does) and
 * would go on intercepting every later test's events.
 */
let installedCleanups: (() => void)[] = [];

/** Calls `installMiddleClickTabBarHandlers` and tracks the cleanup for `afterEach` to run. */
function install(...args: Parameters<typeof installMiddleClickTabBarHandlers>) {
  const removeHandlers = installMiddleClickTabBarHandlers(...args);
  installedCleanups.push(removeHandlers);
  return removeHandlers;
}

describe('installMiddleClickTabBarHandlers', () => {
  afterEach(() => {
    installedCleanups.forEach((removeHandlers) => removeHandlers());
    installedCleanups = [];
    document.body.innerHTML = '';
  });

  describe('drag-blocking', () => {
    it('stops a middle-button press on a tab header in the main tab bar from bubbling to rc-dock’s drag-arming ancestors', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dockBar.addEventListener('mousedown', onBubble);
      install(tree.root, { onTabMiddleClick: vi.fn() });

      const notPrevented = dispatchMouseDown(tree.closableTab.title, 1);

      expect(notPrevented).toBe(false); // `dispatchEvent` returns false when defaultPrevented
      expect(onBubble).not.toHaveBeenCalled();
    });

    it('stops a middle-button press directly on the tab-bar remainder (past every tab)', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dockBar.addEventListener('mousedown', onBubble);
      install(tree.root, { onTabMiddleClick: vi.fn() });

      dispatchMouseDown(tree.barRemainder, 1);

      expect(onBubble).not.toHaveBeenCalled();
    });

    it('stops a middle-button press on a tab header rendered inside rc-tabs’ overflow dropdown, even though the dropdown portals outside the dock layout root', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dropdownTab.header.addEventListener('mousedown', onBubble);
      install(tree.root, { onTabMiddleClick: vi.fn() });

      const notPrevented = dispatchMouseDown(tree.dropdownTab.title, 1);

      expect(notPrevented).toBe(false);
      expect(onBubble).not.toHaveBeenCalled();
    });

    it('leaves a middle-button press outside any tab bar or dropdown unaffected', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.panelContent.addEventListener('mousedown', onBubble);
      install(tree.root, { onTabMiddleClick: vi.fn() });

      const notPrevented = dispatchMouseDown(tree.panelContent, 1);

      expect(notPrevented).toBe(true);
      expect(onBubble).toHaveBeenCalledTimes(1);
    });

    it('leaves a left-button press on a tab header unaffected, so dragging still works', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dockBar.addEventListener('mousedown', onBubble);
      install(tree.root, { onTabMiddleClick: vi.fn() });

      const notPrevented = dispatchMouseDown(tree.closableTab.title, 0);

      expect(notPrevented).toBe(true);
      expect(onBubble).toHaveBeenCalledTimes(1);
    });
  });

  describe('close on middle click', () => {
    it('closes a closable tab when the middle click lands on its title', () => {
      const tree = buildDockLayoutTree();
      const onTabMiddleClick = vi.fn();
      install(tree.root, { onTabMiddleClick });

      dispatchAuxClick(tree.closableTab.title, 1);

      expect(onTabMiddleClick).toHaveBeenCalledExactlyOnceWith('tab-1');
    });

    it('closes a closable tab when the middle click lands on its close button, a DOM sibling of the title', () => {
      const tree = buildDockLayoutTree();
      const onTabMiddleClick = vi.fn();
      install(tree.root, { onTabMiddleClick });

      dispatchAuxClick(tree.closableTab.closeButton, 1);

      expect(onTabMiddleClick).toHaveBeenCalledExactlyOnceWith('tab-1');
    });

    it('does nothing when the middle click lands on a non-closable tab', () => {
      const tree = buildDockLayoutTree();
      const onTabMiddleClick = vi.fn();
      install(tree.root, { onTabMiddleClick });

      dispatchAuxClick(tree.nonClosableTab.title, 1);

      expect(onTabMiddleClick).not.toHaveBeenCalled();
    });

    it('closes a closable tab rendered inside rc-tabs’ overflow dropdown, even though it portals outside the dock layout root', () => {
      const tree = buildDockLayoutTree();
      const onTabMiddleClick = vi.fn();
      install(tree.root, { onTabMiddleClick });

      dispatchAuxClick(tree.dropdownTab.title, 1);

      expect(onTabMiddleClick).toHaveBeenCalledExactlyOnceWith('tab-3');
    });

    it('does nothing for a left-button auxclick', () => {
      const tree = buildDockLayoutTree();
      const onTabMiddleClick = vi.fn();
      install(tree.root, { onTabMiddleClick });

      dispatchAuxClick(tree.closableTab.title, 0);

      expect(onTabMiddleClick).not.toHaveBeenCalled();
    });

    it('does nothing for a right-button auxclick', () => {
      const tree = buildDockLayoutTree();
      const onTabMiddleClick = vi.fn();
      install(tree.root, { onTabMiddleClick });

      dispatchAuxClick(tree.closableTab.title, 2);

      expect(onTabMiddleClick).not.toHaveBeenCalled();
    });

    it('does nothing when the click event targets something with no tab-header ancestor — the real browser’s own behavior for a press that started on a tab but was released elsewhere, which retargets `auxclick` to the nearest common ancestor of the two', () => {
      const tree = buildDockLayoutTree();
      const onTabMiddleClick = vi.fn();
      install(tree.root, { onTabMiddleClick });

      dispatchAuxClick(tree.panelContent, 1);

      expect(onTabMiddleClick).not.toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('stops blocking drags and closing tabs once the returned cleanup function is called', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dockBar.addEventListener('mousedown', onBubble);
      const onTabMiddleClick = vi.fn();
      const removeHandlers = install(tree.root, { onTabMiddleClick });

      removeHandlers();
      dispatchMouseDown(tree.closableTab.title, 1);
      dispatchAuxClick(tree.closableTab.title, 1);

      expect(onBubble).toHaveBeenCalledTimes(1);
      expect(onTabMiddleClick).not.toHaveBeenCalled();
    });
  });
});
