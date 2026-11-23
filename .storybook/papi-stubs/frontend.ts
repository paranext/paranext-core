/**
 * Storybook stub for `@papi/frontend`.
 *
 * `@papi/frontend` is a runtime external injected by the Platform.Bible extension host - there is
 * no npm package for Storybook's webpack to resolve. Extension components that legitimately use
 * PAPI at runtime (e.g. `logger`, `papi.overlays`) would otherwise fail to bundle when pulled into
 * a story.
 *
 * These stubs provide just enough surface for stories to bundle and render without throwing. The
 * methods are inert no-ops; stories supply their own mock data and do not exercise real PAPI paths.
 * Types are inferred from the literals below - the stub is only loaded by Storybook's webpack at
 * build time and never participates in consumer type-checking (TS still resolves the real
 * papi.d.ts).
 */

const noop = () => {};
const asyncUndefined = async () => undefined;
const asyncDisposable = async () => ({ dispose: async () => true });

export const logger = {
  error: noop,
  warn: noop,
  info: noop,
  debug: noop,
  verbose: noop,
  log: noop,
  silly: noop,
};

const papi = {
  logger,
  overlays: {
    showPopover: async () => 'storybook-popover-id',
    dismissPopover: asyncUndefined,
    updatePopover: asyncUndefined,
  },
  networkObjects: {
    get: asyncUndefined,
  },
  networkObjectStatus: {
    waitForNetworkObject: asyncUndefined,
  },
  settings: {
    get: asyncUndefined,
    registerValidator: () => ({ dispose: async () => true }),
  },
  commands: {
    registerCommand: () => ({ dispose: async () => true }),
    sendCommand: asyncUndefined,
  },
  webViews: {
    openWebView: asyncUndefined,
    getOpenWebViewDefinition: asyncUndefined,
    onDidOpenWebView: () => noop,
    onDidUpdateWebView: () => noop,
    onDidCloseWebView: () => noop,
  },
  webViewProviders: {
    registerWebViewProvider: asyncDisposable,
  },
};

export default papi;
