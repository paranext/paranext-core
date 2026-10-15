import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  registerFrameForCrossFrameDismissal,
  WEB_VIEW_MENU_OPEN_ATTRIBUTE,
} from '@renderer/services/cross-frame-dismissal.util';
import { Unsubscriber } from 'platform-bible-utils';

/** Jsdom has no `PointerEvent`; Electron's Chromium does. Only the fields the module sets matter. */
class TestPointerEvent extends MouseEvent {
  readonly pointerType: string;

  readonly isPrimary: boolean;

  constructor(type: string, init: PointerEventInit = {}) {
    super(type, init);
    this.pointerType = init.pointerType ?? '';
    this.isPrimary = init.isPrimary ?? false;
  }
}

/** Adds the wrapper Radix renders around open popper content (menus, popovers, selects) */
function openPopperSurface(targetDocument: Document): HTMLElement {
  const wrapper = targetDocument.createElement('div');
  wrapper.setAttribute('data-radix-popper-content-wrapper', '');
  targetDocument.body.appendChild(wrapper);
  return wrapper;
}

/** Adds an open menu the way Radix renders one: a `role="menu"` inside the popper wrapper */
function openMenu(targetDocument: Document): HTMLElement {
  const wrapper = openPopperSurface(targetDocument);
  const menu = targetDocument.createElement('div');
  menu.setAttribute('role', 'menu');
  wrapper.appendChild(menu);
  return wrapper;
}

/** Adds the scripture editor's own right-click menu, which the editor portals to `body` */
function openEditorContextMenu(targetDocument: Document): HTMLElement {
  const menu = targetDocument.createElement('div');
  menu.className = 'typeahead-popover auto-embed-menu';
  targetDocument.body.appendChild(menu);
  return menu;
}

/** Records the outside presses Radix would see: `pointerdown` events on the document itself */
function recordDocumentPresses(targetDocument: Document): TestPointerEvent[] {
  const presses: TestPointerEvent[] = [];
  targetDocument.addEventListener('pointerdown', (event) => {
    if (event instanceof TestPointerEvent && event.target === targetDocument) presses.push(event);
  });
  return presses;
}

function pressOn(target: Element) {
  target.dispatchEvent(new TestPointerEvent('pointerdown', { bubbles: true, button: 0 }));
}

describe('registerFrameForCrossFrameDismissal', () => {
  let iframe: HTMLIFrameElement;
  let webViewWindow: Window;
  let unsubscribers: Unsubscriber[];

  beforeAll(() => {
    vi.stubGlobal('PointerEvent', TestPointerEvent);
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    iframe = document.createElement('iframe');
    document.body.appendChild(iframe);
    if (!iframe.contentWindow) throw new Error('jsdom did not create the iframe window');
    webViewWindow = iframe.contentWindow;
    unsubscribers = [
      registerFrameForCrossFrameDismissal(window),
      registerFrameForCrossFrameDismissal(webViewWindow),
    ];
  });

  afterEach(() => {
    unsubscribers.forEach((unsubscribe) => unsubscribe());
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('closes a web view menu when the user presses in the main document', () => {
    openPopperSurface(webViewWindow.document);
    const webViewPresses = recordDocumentPresses(webViewWindow.document);

    pressOn(document.body);

    expect(webViewPresses).toHaveLength(1);
  });

  it('closes a main-document menu when the user presses in a web view', () => {
    openPopperSurface(document);
    const mainPresses = recordDocumentPresses(document);

    pressOn(webViewWindow.document.body);

    expect(mainPresses).toHaveLength(1);
  });

  it("closes the scripture editor's right-click menu in a web view", () => {
    openEditorContextMenu(webViewWindow.document);
    const webViewPresses = recordDocumentPresses(webViewWindow.document);

    pressOn(document.body);

    expect(webViewPresses).toHaveLength(1);
  });

  it('closes menus in a sibling web view', () => {
    const siblingIframe = document.createElement('iframe');
    document.body.appendChild(siblingIframe);
    if (!siblingIframe.contentWindow) throw new Error('jsdom did not create the iframe window');
    unsubscribers.push(registerFrameForCrossFrameDismissal(siblingIframe.contentWindow));
    openPopperSurface(siblingIframe.contentWindow.document);
    const siblingPresses = recordDocumentPresses(siblingIframe.contentWindow.document);

    pressOn(webViewWindow.document.body);

    expect(siblingPresses).toHaveLength(1);
  });

  it('presses with the secondary button so Radix does not pull focus back to the trigger', () => {
    openPopperSurface(webViewWindow.document);
    const webViewPresses = recordDocumentPresses(webViewWindow.document);

    pressOn(document.body);

    expect(webViewPresses[0].button).toBe(2);
    expect(webViewPresses[0].pointerType).toBe('mouse');
  });

  it('leaves menus in the frame the user pressed in to Radix', () => {
    openPopperSurface(document);
    const mainPresses = recordDocumentPresses(document);

    pressOn(document.body);

    // Only the user's own press reaches the document, and its target is the body, not the document
    expect(mainPresses).toHaveLength(0);
  });

  it('dispatches nothing into a frame with no open surface', () => {
    const webViewPresses = recordDocumentPresses(webViewWindow.document);

    pressOn(document.body);

    expect(webViewPresses).toHaveLength(0);
  });

  it('does not cascade: closing one frame does not close the frame the user pressed in', () => {
    openPopperSurface(document);
    openPopperSurface(webViewWindow.document);
    const mainPresses = recordDocumentPresses(document);
    const webViewPresses = recordDocumentPresses(webViewWindow.document);

    pressOn(document.body);

    expect(webViewPresses).toHaveLength(1);
    expect(mainPresses).toHaveLength(0);
  });

  it('keeps web view menus open while the user works in an overlay rendered for a web view', () => {
    openPopperSurface(webViewWindow.document);
    const webViewPresses = recordDocumentPresses(webViewWindow.document);
    const palette = document.createElement('div');
    palette.setAttribute('data-overlay-command-palette', '');
    document.body.appendChild(palette);

    pressOn(palette);

    expect(webViewPresses).toHaveLength(0);
  });

  it('stops closing a frame once it is unregistered', () => {
    openPopperSurface(webViewWindow.document);
    const webViewPresses = recordDocumentPresses(webViewWindow.document);

    unsubscribers[1]();
    pressOn(document.body);

    expect(webViewPresses).toHaveLength(0);
  });

  describe('focus moving into an iframe', () => {
    it('closes main-document menus when focus moves into a web view without a press', () => {
      openPopperSurface(document);
      const mainPresses = recordDocumentPresses(document);
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(iframe);

      window.dispatchEvent(new FocusEvent('blur'));

      expect(mainPresses).toHaveLength(1);
    });

    it('closes nothing when the whole window loses focus', () => {
      openPopperSurface(document);
      const mainPresses = recordDocumentPresses(document);
      vi.spyOn(document, 'hasFocus').mockReturnValue(false);
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(iframe);

      window.dispatchEvent(new FocusEvent('blur'));

      expect(mainPresses).toHaveLength(0);
    });

    it('keeps a surface open when the focused iframe is embedded in it', () => {
      const surface = openPopperSurface(document);
      const embeddedIframe = document.createElement('iframe');
      surface.appendChild(embeddedIframe);
      const mainPresses = recordDocumentPresses(document);
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(embeddedIframe);

      window.dispatchEvent(new FocusEvent('blur'));

      expect(mainPresses).toHaveLength(0);
    });

    it('does not close menus in the web view that took focus', () => {
      openPopperSurface(webViewWindow.document);
      const webViewPresses = recordDocumentPresses(webViewWindow.document);
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);
      vi.spyOn(document, 'activeElement', 'get').mockReturnValue(iframe);

      window.dispatchEvent(new FocusEvent('blur'));

      expect(webViewPresses).toHaveLength(0);
    });
  });

  describe('marking the main document while a web view has a menu open', () => {
    function isMarked() {
      return document.documentElement.hasAttribute(WEB_VIEW_MENU_OPEN_ATTRIBUTE);
    }

    it('marks it while a web view menu is open and clears it once the menu closes', async () => {
      const menu = openMenu(webViewWindow.document);
      await vi.waitFor(() => expect(isMarked()).toBe(true));

      menu.remove();

      await vi.waitFor(() => expect(isMarked()).toBe(false));
    });

    it("marks it while the scripture editor's right-click menu is open", async () => {
      openEditorContextMenu(webViewWindow.document);

      await vi.waitFor(() => expect(isMarked()).toBe(true));
    });

    it('does not mark it for a web view tooltip, which opens on hover', async () => {
      const wrapper = openPopperSurface(webViewWindow.document);
      const tooltip = webViewWindow.document.createElement('div');
      tooltip.setAttribute('role', 'tooltip');
      wrapper.appendChild(tooltip);
      // Positive control: a menu in the same frame is noticed, so the tooltip had its chance
      const menu = openMenu(webViewWindow.document);
      await vi.waitFor(() => expect(isMarked()).toBe(true));

      menu.remove();

      await vi.waitFor(() => expect(isMarked()).toBe(false));
    });

    it('does not mark it for a menu open in the main document itself', async () => {
      openMenu(document);
      // Positive control, so the main-document menu had a mutation cycle to be noticed in
      const webViewMenu = openMenu(webViewWindow.document);
      await vi.waitFor(() => expect(isMarked()).toBe(true));

      webViewMenu.remove();

      await vi.waitFor(() => expect(isMarked()).toBe(false));
    });

    it('stays marked while another web view still has a menu open', async () => {
      const siblingIframe = document.createElement('iframe');
      document.body.appendChild(siblingIframe);
      if (!siblingIframe.contentWindow) throw new Error('jsdom did not create the iframe window');
      unsubscribers.push(registerFrameForCrossFrameDismissal(siblingIframe.contentWindow));
      const menu = openMenu(webViewWindow.document);
      openMenu(siblingIframe.contentWindow.document);
      await vi.waitFor(() => expect(isMarked()).toBe(true));

      menu.remove();
      // Let the removal's mutation callback run before asserting the mark survived it
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      expect(isMarked()).toBe(true);
    });

    it('clears the mark when a web view with an open menu is unregistered', async () => {
      openMenu(webViewWindow.document);
      await vi.waitFor(() => expect(isMarked()).toBe(true));

      unsubscribers[1]();

      expect(isMarked()).toBe(false);
    });
  });
});
