// Webview iframes forward Ctrl+/-/0 and Ctrl+wheel events to the parent via `postMessage`
// (see the iframe-side script in `web-view.service-host.ts`'s `imports` template). The message
// listener installed here resolves the source iframe's view-zoom key and applies the action.

type ZoomActions = {
  adjustZoom: (key: string, deltaSteps: number) => void;
  resetZoom: (key: string) => void;
};

type InstallOptions = {
  service: ZoomActions;
  /**
   * Returns the zoom key for whichever view should receive keyboard zoom actions, or `undefined` if
   * no view is focused. Implementations typically check the currently focused element first, then
   * fall back to a topmost open dialog.
   */
  resolveFocusedKey: () => string | undefined;
};

type ZoomMessage = {
  type: 'view-zoom';
  action: 'adjust' | 'reset';
  deltaSteps: number;
  webViewId: string;
};

const WHEEL_OPTIONS: AddEventListenerOptions = { capture: true, passive: false };

function isModifier(e: KeyboardEvent | WheelEvent): boolean {
  return e.ctrlKey || e.metaKey;
}

function findKeyFromElement(el: Element | undefined): string | undefined {
  if (!el) return undefined;
  const holder = el.closest('[data-view-type]');
  return holder?.getAttribute('data-view-type') ?? undefined;
}

function findIframeForSource(source: MessageEventSource | null): HTMLIFrameElement | undefined {
  if (!source) return undefined;
  const iframes = document.querySelectorAll('iframe');
  let found: HTMLIFrameElement | undefined;
  iframes.forEach((iframe) => {
    if (iframe.contentWindow === source) found = iframe;
  });
  return found;
}

function isZoomMessage(data: unknown): data is ZoomMessage {
  if (!data || typeof data !== 'object') return false;
  const type = Reflect.get(data, 'type');
  if (type !== 'view-zoom') return false;
  const action = Reflect.get(data, 'action');
  if (action !== 'adjust' && action !== 'reset') return false;
  const deltaSteps = Reflect.get(data, 'deltaSteps');
  if (typeof deltaSteps !== 'number') return false;
  const webViewId = Reflect.get(data, 'webViewId');
  if (typeof webViewId !== 'string') return false;
  return true;
}

/**
 * Install window-level keyboard, wheel, and iframe-message listeners that drive per-view zoom.
 * Returns an uninstaller.
 */
export function installViewZoomInput(opts: InstallOptions): () => void {
  const { service, resolveFocusedKey } = opts;

  function applyAction(key: string, action: 'adjust' | 'reset', deltaSteps: number) {
    if (action === 'reset') service.resetZoom(key);
    else service.adjustZoom(key, deltaSteps);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.repeat) return;
    if (!isModifier(e)) return;
    if (e.key === '=' || e.key === '+') {
      const key = resolveFocusedKey();
      if (!key) return;
      e.preventDefault();
      service.adjustZoom(key, +1);
    } else if (e.key === '-') {
      const key = resolveFocusedKey();
      if (!key) return;
      e.preventDefault();
      service.adjustZoom(key, -1);
    } else if (e.key === '0') {
      const key = resolveFocusedKey();
      if (!key) return;
      e.preventDefault();
      service.resetZoom(key);
    }
  }

  function onWheel(e: WheelEvent) {
    if (!isModifier(e)) return;
    // Always preventDefault on Ctrl+wheel even if no view container is found. Otherwise
    // Chromium's built-in page zoom kicks in for wheel events landing in chrome regions
    // (toolbar, dock splitter, etc.) and silently desyncs from the per-view zoom system.
    e.preventDefault();
    const target = e.target instanceof Element ? e.target : undefined;
    const key = findKeyFromElement(target);
    if (!key) return;
    service.adjustZoom(key, e.deltaY < 0 ? +1 : -1);
  }

  function onMessage(e: MessageEvent) {
    if (!isZoomMessage(e.data)) return;
    const iframe = findIframeForSource(e.source);
    if (!iframe) return;
    // Defense-in-depth: confirm the sender's claimed webViewId matches the iframe element's
    // data attribute. Stops a same-parent iframe from spoofing zoom for a sibling view.
    const declaredId = iframe.getAttribute('data-web-view-id');
    if (declaredId && declaredId !== e.data.webViewId) return;
    const key = findKeyFromElement(iframe);
    if (!key) return;
    applyAction(key, e.data.action, e.data.deltaSteps);
  }

  window.addEventListener('keydown', onKeyDown, true);
  window.addEventListener('wheel', onWheel, WHEEL_OPTIONS);
  window.addEventListener('message', onMessage);

  return () => {
    window.removeEventListener('keydown', onKeyDown, true);
    window.removeEventListener('wheel', onWheel, WHEEL_OPTIONS);
    window.removeEventListener('message', onMessage);
  };
}
