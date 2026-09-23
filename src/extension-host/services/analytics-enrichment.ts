import os from 'os';
import { appService } from '@shared/services/app.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

const UNKNOWN_VERSION = 'unknown';

let cachedAppVersion: string | undefined;

/**
 * Resolves the running app's version string via main's AppService. Cached after the first success.
 * A failure is not cached: the app service registers early in startup but analytics can run even
 * earlier, so the next event gets another chance.
 */
async function getAppVersion(): Promise<string> {
  if (cachedAppVersion) return cachedAppVersion;
  try {
    const { version } = await appService.getAppInfo();
    cachedAppVersion = version;
    return version;
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
 * TODO(PT-4359): the agreed set of per-event properties extends this function.
 */
export async function getCommonProperties(): Promise<Record<string, unknown>> {
  return {
    app_version: await getAppVersion(),
    os_platform: os.platform(),
    os_release: os.release(),
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
    .filter((key) => key in commonProperties)
    .forEach((key) => {
      logger.debug(`Analytics: caller property '${key}' overrides the common property`);
    });
  return { ...commonProperties, ...callerProperties };
}
