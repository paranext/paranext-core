// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { closeOwnDockTab } from './close-own-dock-tab.util';

/*
 * A web view closes its own tab by clicking that tab's close button in the host page. The markup
 * here follows what rc-dock renders for a tab: `.dock-tab > .dock-tab-btn` holding the platform's
 * tab title and the tab's own close button.
 */

/** Adds a tab for `webViewId` to `panel` and returns a spy on its close button. */
function addTab(panel: Element, webViewId: string, { isActive = false, isClosable = true } = {}) {
  const doc = panel.ownerDocument;
  const tab = doc.createElement('div');
  tab.className = isActive ? 'dock-tab dock-tab-active' : 'dock-tab';
  const tabButton = doc.createElement('div');
  tabButton.className = 'dock-tab-btn';
  const title = doc.createElement('div');
  title.className = 'platform-tab-title';
  title.setAttribute('data-web-view-id', webViewId);
  tabButton.appendChild(title);
  const onClose = vi.fn();
  if (isClosable) {
    const closeButton = doc.createElement('div');
    closeButton.className = 'dock-tab-close-btn';
    closeButton.addEventListener('click', onClose);
    tabButton.appendChild(closeButton);
  }
  tab.appendChild(tabButton);
  panel.appendChild(tab);
  return onClose;
}

/**
 * Adds a dock panel to `doc` and returns it. The panel is docked unless `boxClass` names one of
 * rc-dock's other boxes: `dock-fbox` (floating), `dock-mbox` (maximized) or `dock-wbox` (its own
 * window).
 */
function addPanel(doc: Document, boxClass?: string) {
  const panel = doc.createElement('div');
  panel.className = 'dock-panel';
  if (boxClass) {
    const box = doc.createElement('div');
    box.className = `dock-box ${boxClass}`;
    box.appendChild(panel);
    doc.body.appendChild(box);
  } else doc.body.appendChild(panel);
  return panel;
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.unstubAllGlobals();
});

describe('closeOwnDockTab', () => {
  it("closes this web view's tab, not the active one", () => {
    const panel = addPanel(document);
    const onCloseHome = addTab(panel, 'home-1');
    const onCloseOther = addTab(panel, 'other-1', { isActive: true });

    expect(closeOwnDockTab('home-1', () => document)).toBe('closed');

    expect(onCloseHome).toHaveBeenCalledTimes(1);
    expect(onCloseOther).not.toHaveBeenCalled();
  });

  it("ignores the web view's own iframe, which carries the same id", () => {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('data-web-view-id', 'home-1');
    document.body.appendChild(iframe);
    const panel = addPanel(document);
    const onCloseHome = addTab(panel, 'home-1');
    addTab(panel, 'other-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('closed');
    expect(onCloseHome).toHaveBeenCalledTimes(1);
  });

  it('skips a dropdown copy of the title', () => {
    // rc-tabs' overflow menu renders the whole tab element, close button and all, outside any
    // `.dock-tab`.
    const dropdownItem = document.createElement('li');
    dropdownItem.className = 'dock-dropdown-menu-item';
    const titleCopy = document.createElement('div');
    titleCopy.className = 'platform-tab-title';
    titleCopy.setAttribute('data-web-view-id', 'home-1');
    const closeCopy = document.createElement('div');
    closeCopy.className = 'dock-tab-close-btn';
    const onCloseCopy = vi.fn();
    closeCopy.addEventListener('click', onCloseCopy);
    dropdownItem.append(titleCopy, closeCopy);
    document.body.appendChild(dropdownItem);
    const panel = addPanel(document);
    const onCloseHome = addTab(panel, 'home-1');
    addTab(panel, 'other-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('closed');

    expect(onCloseHome).toHaveBeenCalledTimes(1);
    expect(onCloseCopy).not.toHaveBeenCalled();
  });

  it('reports tabNotFound when no tab carries the id', () => {
    const panel = addPanel(document);
    const onCloseOther = addTab(panel, 'other-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('tabNotFound');
    expect(onCloseOther).not.toHaveBeenCalled();
  });

  it('reports tabNotFound when the tab has no close button', () => {
    const panel = addPanel(document);
    addTab(panel, 'home-1', { isClosable: false });
    addTab(panel, 'other-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('tabNotFound');
  });

  it("reports onlyTabInDock, and clicks nothing, when it is the dock's only tab", () => {
    // Closing the last tab empties the dock, which docks a fresh Home or closes the window.
    const onCloseHome = addTab(addPanel(document), 'home-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('onlyTabInDock');
    expect(onCloseHome).not.toHaveBeenCalled();
  });

  it('counts a tab docked in another panel as another tab', () => {
    const onCloseHome = addTab(addPanel(document), 'home-1');
    addTab(addPanel(document), 'editor-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('closed');
    expect(onCloseHome).toHaveBeenCalledTimes(1);
  });

  it.each([
    ['floats', 'dock-fbox'],
    ['is maximized', 'dock-mbox'],
    ['has its own window', 'dock-wbox'],
  ])('reports onlyTabInDock when the only other tab %s', (_, boxClass) => {
    // The dock refills itself with a fresh Home once its last docked tab closes, whatever is
    // left outside it.
    const onCloseHome = addTab(addPanel(document), 'home-1');
    addTab(addPanel(document, boxClass), 'editor-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('onlyTabInDock');
    expect(onCloseHome).not.toHaveBeenCalled();
  });

  it('closes a floating tab while another tab is docked', () => {
    const onCloseHome = addTab(addPanel(document, 'dock-fbox'), 'home-1');
    addTab(addPanel(document), 'editor-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('closed');
    expect(onCloseHome).toHaveBeenCalledTimes(1);
  });

  it('reports onlyTabInDock for a floating tab when no tab is docked', () => {
    const onCloseHome = addTab(addPanel(document, 'dock-fbox'), 'home-1');

    expect(closeOwnDockTab('home-1', () => document)).toBe('onlyTabInDock');
    expect(onCloseHome).not.toHaveBeenCalled();
  });

  it('reports tabNotFound when the host document cannot be reached', () => {
    const panel = addPanel(document);
    const onCloseHome = addTab(panel, 'home-1');
    addTab(panel, 'other-1');

    expect(closeOwnDockTab('home-1', () => undefined)).toBe('tabNotFound');
    expect(onCloseHome).not.toHaveBeenCalled();
  });

  it('reports tabNotFound when reading the host page throws', () => {
    const panel = addPanel(document);
    const onCloseHome = addTab(panel, 'home-1');
    addTab(panel, 'other-1');
    // A cross-origin `top` throws on `document` access.
    vi.stubGlobal('top', {
      get document(): Document {
        throw new Error('Blocked a frame from accessing a cross-origin frame');
      },
    });

    expect(closeOwnDockTab('home-1')).toBe('tabNotFound');
    expect(onCloseHome).not.toHaveBeenCalled();
  });

  it('reads the host page from the top window by default', () => {
    const panel = addPanel(document);
    const onCloseHome = addTab(panel, 'home-1');
    addTab(panel, 'other-1');
    vi.stubGlobal('top', { document });

    expect(closeOwnDockTab('home-1')).toBe('closed');
    expect(onCloseHome).toHaveBeenCalledTimes(1);
  });

  it('works on a document from another realm', () => {
    // The host page's elements are not instances of the web view's own HTMLElement.
    const frame = document.createElement('iframe');
    document.body.appendChild(frame);
    const hostDocument = frame.contentDocument;
    if (!hostDocument) throw new Error('jsdom gave the iframe no document');
    const panel = addPanel(hostDocument);
    const onCloseHome = addTab(panel, 'home-1');
    addTab(panel, 'other-1');
    expect(panel instanceof HTMLElement).toBe(false);

    expect(closeOwnDockTab('home-1', () => hostDocument)).toBe('closed');
    expect(onCloseHome).toHaveBeenCalledTimes(1);
  });
});
