type InstallOptions = {
  service: { adjust: (delta: number) => void; reset: () => void };
};

type AppZoomMessage = {
  type: 'app-zoom';
  action: 'adjust' | 'reset';
  delta: number;
};

function isAppZoomMessage(data: unknown): data is AppZoomMessage {
  if (!data || typeof data !== 'object') return false;
  if (Reflect.get(data, 'type') !== 'app-zoom') return false;
  const action = Reflect.get(data, 'action');
  if (action !== 'adjust' && action !== 'reset') return false;
  if (typeof Reflect.get(data, 'delta') !== 'number') return false;
  return true;
}

function findIframeForSource(source: MessageEventSource | null): HTMLIFrameElement | undefined {
  if (!source) return undefined;
  let found: HTMLIFrameElement | undefined;
  document.querySelectorAll('iframe').forEach((iframe) => {
    if (iframe.contentWindow === source) found = iframe;
  });
  return found;
}

export function installAppZoomInput({ service }: InstallOptions): () => void {
  function onKeyDown(e: KeyboardEvent): void {
    if (e.repeat) return;
    const isModifier = e.ctrlKey || e.metaKey;
    if (!isModifier || !e.shiftKey) return;

    if (e.code === 'Equal') {
      e.preventDefault();
      e.stopPropagation();
      service.adjust(+0.1);
    } else if (e.code === 'Minus') {
      e.preventDefault();
      e.stopPropagation();
      service.adjust(-0.1);
    }
  }

  function onMessage(e: MessageEvent): void {
    if (!isAppZoomMessage(e.data)) return;
    if (!findIframeForSource(e.source)) return;
    if (e.data.action === 'reset') {
      service.reset();
    } else {
      service.adjust(e.data.delta);
    }
  }

  // capture: true so this fires before per-view zoom handlers
  window.addEventListener('keydown', onKeyDown, { capture: true });
  window.addEventListener('message', onMessage);
  return () => {
    window.removeEventListener('keydown', onKeyDown, { capture: true });
    window.removeEventListener('message', onMessage);
  };
}
