import { dataProviderService } from '@shared/services/data-provider.service';
import { sendCommand } from '@shared/services/command.service';
import { createSyncProxyForAsyncObject } from 'platform-bible-utils';
import {
  IWindowService,
  windowServiceObjectToProxy,
  windowServiceProviderName,
} from '@shared/services/window.service-model';

let dataProvider: IWindowService;
let initializationPromise: Promise<void>;

/**
 * Resolve the scoped window service provider name. In the renderer, uses the local windowId. In the
 * extension host (no windowId), queries the focused window ID via command.
 *
 * TODO: The extension host resolves the focused window once and caches it. If the user changes
 * focus to a different window after the first papi.window call from the extension host, subsequent
 * calls still go to the original window's provider. Re-resolve per call if this becomes a real
 * problem.
 */
async function resolveProviderName(): Promise<string> {
  if (globalThis.windowId) {
    return `${windowServiceProviderName}-${globalThis.windowId}`;
  }
  // Extension host: resolve the focused window's scoped provider
  const focusedWindowId = await sendCommand('platform.getFocusedWindowId');
  if (focusedWindowId === undefined) {
    throw new Error('Window service is not available: no focused window found. Is a window open?');
  }
  return `${windowServiceProviderName}-${focusedWindowId}`;
}

async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = (async () => {
      const scopedName = await resolveProviderName();
      const provider = await dataProviderService.get(
        // dataProviderService.get expects the literal provider name type, but the scoped
        // name is built dynamically at runtime
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        scopedName as typeof windowServiceProviderName,
      );
      if (!provider) throw new Error('Window service undefined');
      dataProvider = provider;
    })();
  }
  return initializationPromise;
}

// Dynamic proxy target so dataProviderName returns the scoped name at access time (not at module
// load time, when windowId may not yet be set)
const windowServiceProxyTarget = {
  ...windowServiceObjectToProxy,
  get dataProviderName(): typeof windowServiceProviderName {
    // Provider name is dynamically scoped per window but the type system expects the literal type
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return (
      globalThis.windowId
        ? `${windowServiceProviderName}-${globalThis.windowId}`
        : windowServiceProviderName
    ) as typeof windowServiceProviderName;
  },
};

export const windowService = createSyncProxyForAsyncObject<IWindowService>(async () => {
  await initialize();
  return dataProvider;
}, windowServiceProxyTarget);
