import { vi } from 'vitest';
import {
  getContentZoomBootstrapScript,
  getContentZoomStyleElement,
} from './web-view-content-zoom.bootstrap-script';

export type PapiLike = {
  commands: { sendCommand: ReturnType<typeof vi.fn> };
  logger: { warn: ReturnType<typeof vi.fn> };
};

export type Bound = {
  adjustContentZoomById: ReturnType<typeof vi.fn>;
  resetContentZoomById: ReturnType<typeof vi.fn>;
  reportContentZoomAreasById: ReturnType<typeof vi.fn>;
  reportContentZoomActiveAreaById: ReturnType<typeof vi.fn>;
};

/**
 * Installs the bootstrap script into the current jsdom document exactly as it runs inside a web
 * view: injected as source text and evaluated, not imported as a module. Shared by the bootstrap
 * script's own behavior tests (`web-view-content-zoom.bootstrap-script.test.ts`) and the
 * chrome-keys/bootstrap chord-rule parity test (`web-view-content-zoom.chord-parity.test.ts`),
 * which drives this installation alongside `registerContentZoomChromeKeys` and compares the action
 * each one takes for the same keystroke.
 */
export function install(
  webViewId: string,
  html: string,
  bound?: Partial<Bound>,
  levels: { [areaId: string]: number } = {},
): { papi: PapiLike; bound: Bound } {
  document.head.innerHTML = getContentZoomStyleElement('n', 1, levels);
  document.body.innerHTML = html;
  const papi: PapiLike = {
    commands: { sendCommand: vi.fn(async () => undefined) },
    logger: { warn: vi.fn() },
  };
  const allBound: Bound = {
    adjustContentZoomById: vi.fn(),
    resetContentZoomById: vi.fn(),
    reportContentZoomAreasById: vi.fn(),
    reportContentZoomActiveAreaById: vi.fn(),
    ...bound,
  };
  Object.assign(window, { papi, webViewId, __platformContentZoom: undefined, ...allBound });
  // Exercises the bootstrap exactly as it runs inside a web view: injected as source text and
  // evaluated, not imported as a module.
  // eslint-disable-next-line no-new-func
  new Function(getContentZoomBootstrapScript(webViewId))();
  return { papi, bound: allBound };
}

declare global {
  interface Window {
    __platformContentZoom?: {
      showIndicator: (areaId: string, text: string) => void;
      destroy: () => void;
      activeArea?: string;
    };
  }
}
