import os from 'os';
import { appService } from '@shared/services/app.service';
import { logger } from '@shared/services/logger.service';
import { createCachedInitializer, getErrorMessage } from 'platform-bible-utils';

const UNKNOWN_VERSION = 'unknown';

const getCachedAppVersion = createCachedInitializer(
  async () => (await appService.getAppInfo()).version,
);

/**
 * Resolves the running app's version string via main's AppService. Cached after the first success,
 * and concurrent lookups share one request. A failure is not cached: the app service registers
 * early in startup but analytics can run even earlier, so the next event gets another chance.
 */
async function getAppVersion(): Promise<string> {
  try {
    return await getCachedAppVersion();
  } catch (error) {
    logger.debug(`Analytics: could not resolve the app version: ${getErrorMessage(error)}`);
    return UNKNOWN_VERSION;
  }
}

/**
 * Properties attached to every analytics event regardless of which vendor transmits it. Kept
 * vendor-neutral so a provider swap keeps them. Nothing here may identify a person, a machine, a
 * project, a language, or a location.
 *
 * `os_arch` is the architecture the app was built for, not the machine's: an x64 build running
 * under emulation on an ARM machine reports x64.
 *
 * TODO(PT-4359): the agreed set of per-event properties extends this function.
 */
export async function getCommonProperties(): Promise<Record<string, unknown>> {
  return {
    app_version: await getAppVersion(),
    os_platform: os.platform(),
    os_release: os.release(),
    os_arch: os.arch(),
  };
}

/**
 * Overlays caller-supplied properties on the common set. A caller that deliberately sets a key the
 * common set also provides wins, since the caller has more specific knowledge; the collision is
 * logged at debug so an accidental shadowing is still discoverable.
 */
export function mergeWithCommonProperties(
  callerProperties: Record<string, unknown> | undefined,
  commonProperties: Record<string, unknown>,
): Record<string, unknown> {
  if (!callerProperties) return { ...commonProperties };
  Object.keys(callerProperties)
    .filter((key) => Object.hasOwn(commonProperties, key))
    .forEach((key) => {
      logger.debug(`Analytics: caller property '${key}' overrides the common property`);
    });
  return { ...commonProperties, ...callerProperties };
}
