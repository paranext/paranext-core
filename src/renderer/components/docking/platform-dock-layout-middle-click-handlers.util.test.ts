import { createElement } from 'react';
import type { BoxData, PanelData, TabData } from 'rc-dock';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { installMiddleClickTabBarHandlers } from './platform-dock-layout-middle-click-handlers.util';

/**
 * Builds a simplified stand-in for the dock layout's DOM: a `root` holding rc-dock's `.dock-bar`
 * (`DockTabBar`) with tab headers — each one `[role="tab"]` element around a title (carrying
 * `data-tab-header-id`, like `PlatformTabTitle`) and a close button — plus the strip past the tabs
 * and some panel content outside the bar. A separate `.dock-dropdown` appended to `document.body`
 * stands in for rc-tabs' overflow dropdown (see the handlers module for why it renders there).
 *
 * A real header nests two `[role="tab"]` elements (rc-tabs' `.dock-tab-btn` around rc-dock's
 * `DragDropDiv`); the handlers work from either. The dock layout's middle-click contract test
 * checks these details against a real rc-dock render; this file also covers the dropdown, which
 * that test cannot render.
 */
function buildDockLayoutTree() {
  const root = document.createElement('div');
  const dockBar = document.createElement('div');
  dockBar.className = 'dock-bar';

  function buildTabHeader(id: string) {
    const header = document.createElement('div');
    header.setAttribute('role', 'tab');
    const title = document.createElement('div');
    title.className = 'platform-tab-title';
    title.dataset.tabHeaderId = id;
    const closeButton = document.createElement('div');
    closeButton.className = 'dock-tab-close-btn';
    header.appendChild(title);
    header.appendChild(closeButton);
    return { header, title, closeButton };
  }

  const closableTab = buildTabHeader('tab-1');
  const nonClosableTab = buildTabHeader('tab-2');
  const unknownClosabilityTab = buildTabHeader('tab-4');
  const missingTab = buildTabHeader('tab-missing');
  const panelIdTab = buildTabHeader('panel-1');
  const barRemainder = document.createElement('div');

  [closableTab, nonClosableTab, unknownClosabilityTab, missingTab, panelIdTab].forEach(
    ({ header }) => dockBar.appendChild(header),
  );
  dockBar.appendChild(barRemainder);
  root.appendChild(dockBar);

  const panelContent = document.createElement('div');
  root.appendChild(panelContent);
  document.body.appendChild(root);

  // Overflow dropdown portal: a sibling of `root` in the DOM, not a descendant of it — the same
  // relationship `rc-trigger`'s default `document.body` portal has to the dock layout's own root.
  const dropdown = document.createElement('div');
  dropdown.className = 'dock-dropdown';
  const dropdownTab = buildTabHeader('tab-3');
  dropdown.appendChild(dropdownTab.header);
  document.body.appendChild(dropdown);

  return {
    dockBar,
    barRemainder,
    panelContent,
    closableTab,
    nonClosableTab,
    unknownClosabilityTab,
    missingTab,
    panelIdTab,
    dropdownTab,
  };
}

function tab(id: string, closable: boolean | undefined): TabData {
  return { id, title: id, content: createElement('div'), closable };
}

const dockItems = new Map<string, PanelData | TabData | BoxData>([
  ['tab-1', tab('tab-1', true)],
  ['tab-2', tab('tab-2', false)],
  ['tab-3', tab('tab-3', true)],
  ['tab-4', tab('tab-4', undefined)],
  ['panel-1', { id: 'panel-1', tabs: [] }],
]);

/** Stands in for `DockLayout.find`, answering from {@link dockItems} */
function findTab(tabId: string) {
  return dockItems.get(tabId);
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

/** Installs the handlers on `document` and tracks the cleanup for `afterEach` to run. */
function install(onCloseTab: (tabId: string) => void = vi.fn()) {
  const removeHandlers = installMiddleClickTabBarHandlers(document, { findTab, onCloseTab });
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
      install();

      const notPrevented = dispatchMouseDown(tree.closableTab.title, 1);

      expect(notPrevented).toBe(false); // `dispatchEvent` returns false when defaultPrevented
      expect(onBubble).not.toHaveBeenCalled();
    });

    it('stops a middle-button press directly on the tab-bar remainder (past every tab)', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dockBar.addEventListener('mousedown', onBubble);
      install();

      dispatchMouseDown(tree.barRemainder, 1);

      expect(onBubble).not.toHaveBeenCalled();
    });

    it('stops a middle-button press on a tab header rendered inside rc-tabs’ overflow dropdown, even though the dropdown portals outside the dock layout root', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dropdownTab.header.addEventListener('mousedown', onBubble);
      install();

      const notPrevented = dispatchMouseDown(tree.dropdownTab.title, 1);

      expect(notPrevented).toBe(false);
      expect(onBubble).not.toHaveBeenCalled();
    });

    it('leaves a middle-button press outside any tab bar or dropdown unaffected', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.panelContent.addEventListener('mousedown', onBubble);
      install();

      const notPrevented = dispatchMouseDown(tree.panelContent, 1);

      expect(notPrevented).toBe(true);
      expect(onBubble).toHaveBeenCalledTimes(1);
    });

    it('leaves a left-button press on a tab header unaffected, so dragging still works', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dockBar.addEventListener('mousedown', onBubble);
      install();

      const notPrevented = dispatchMouseDown(tree.closableTab.title, 0);

      expect(notPrevented).toBe(true);
      expect(onBubble).toHaveBeenCalledTimes(1);
    });
  });

  describe('close on middle click', () => {
    it('closes a closable tab when the middle click lands on its title', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.closableTab.title, 1);

      expect(onCloseTab).toHaveBeenCalledExactlyOnceWith('tab-1');
    });

    it('closes a closable tab when the middle click lands on its close button, a DOM sibling of the title', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.closableTab.closeButton, 1);

      expect(onCloseTab).toHaveBeenCalledExactlyOnceWith('tab-1');
    });

    it('does nothing when the middle click lands on a non-closable tab', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.nonClosableTab.title, 1);

      expect(onCloseTab).not.toHaveBeenCalled();
    });

    it('does nothing when the dock layout gives the tab no closable flag, as rc-dock’s close button does', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.unknownClosabilityTab.title, 1);

      expect(onCloseTab).not.toHaveBeenCalled();
    });

    it('does nothing, without throwing, when the dock layout no longer has the tab', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      expect(() => dispatchAuxClick(tree.missingTab.title, 1)).not.toThrow();
      expect(onCloseTab).not.toHaveBeenCalled();
    });

    it('does nothing when the header’s id finds a panel rather than a tab', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.panelIdTab.title, 1);

      expect(onCloseTab).not.toHaveBeenCalled();
    });

    it('closes a closable tab rendered inside rc-tabs’ overflow dropdown, even though it portals outside the dock layout root', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.dropdownTab.title, 1);

      expect(onCloseTab).toHaveBeenCalledExactlyOnceWith('tab-3');
    });

    it('does nothing for a left-button auxclick', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.closableTab.title, 0);

      expect(onCloseTab).not.toHaveBeenCalled();
    });

    it('does nothing for a right-button auxclick', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.closableTab.title, 2);

      expect(onCloseTab).not.toHaveBeenCalled();
    });

    it('does nothing when the click event targets something with no tab-header ancestor — the real browser’s own behavior for a press that started on a tab but was released elsewhere, which retargets `auxclick` to the nearest common ancestor of the two', () => {
      const tree = buildDockLayoutTree();
      const onCloseTab = vi.fn();
      install(onCloseTab);

      dispatchAuxClick(tree.panelContent, 1);

      expect(onCloseTab).not.toHaveBeenCalled();
    });
  });

  describe('cleanup', () => {
    it('stops blocking drags and closing tabs once the returned cleanup function is called', () => {
      const tree = buildDockLayoutTree();
      const onBubble = vi.fn();
      tree.dockBar.addEventListener('mousedown', onBubble);
      const onCloseTab = vi.fn();
      const removeHandlers = install(onCloseTab);

      removeHandlers();
      dispatchMouseDown(tree.closableTab.title, 1);
      dispatchAuxClick(tree.closableTab.title, 1);

      expect(onBubble).toHaveBeenCalledTimes(1);
      expect(onCloseTab).not.toHaveBeenCalled();
    });
  });
});
