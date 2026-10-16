import { EVENT_NAME_ON_DID_START_EXTENSION_HOST } from '@shared/models/extension-host-lifecycle.model';
import { logger } from '@shared/services/logger.service';
import { createNetworkEventEmitterAsync } from '@shared/services/network.service';
import { getErrorMessage, PlatformEventEmitter } from 'platform-bible-utils';

let startedEmitter: PlatformEventEmitter<undefined> | undefined;

/**
 * Register `platform.onDidStartExtensionHost`. Call right after the network service initializes, so
 * the emitter exists before extensions load. A registration failure is logged and swallowed:
 * windows then fall back to their timer after a restart, which is not worth failing startup over.
 */
export async function registerExtensionHostStartedEvent(): Promise<void> {
  try {
    startedEmitter = await createNetworkEventEmitterAsync(EVENT_NAME_ON_DID_START_EXTENSION_HOST, {
      notification: {
        summary:
          'Emitted once this extension host has initialized its extensions, including on the ' +
          'first start. No payload. The readiness signal after platform.restartExtensionHost.',
        params: [],
        'x-experimental': true,
      },
    });
  } catch (e) {
    logger.warn(
      `Failed to register ${EVENT_NAME_ON_DID_START_EXTENSION_HOST}; windows will not learn when ` +
        `a restarted extension host is ready. ${getErrorMessage(e)}`,
    );
  }
}

/** Announce that extensions have initialized. No-op if registration failed; never throws. */
export function announceExtensionHostStarted(): void {
  if (!startedEmitter) return;
  try {
    startedEmitter.emit(undefined);
  } catch (e) {
    logger.warn(
      `Failed to announce ${EVENT_NAME_ON_DID_START_EXTENSION_HOST}. ${getErrorMessage(e)}`,
    );
  }
}
