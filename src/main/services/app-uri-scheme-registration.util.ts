/**
 * Registers the app as the operating system's handler for links in its URI scheme
 * (`platform-bible://…`), which is how such links reach `handleUri` and the extensions that asked
 * for them.
 *
 * Inside a snap the registration is skipped, because the snap's desktop file does it: snapd
 * installs that file at install time, and its `MimeType=x-scheme-handler/<scheme>;` line makes the
 * snap the handler for the scheme. Asking Electron as well only fails there: on Linux, Electron
 * looks the app up by a desktop-file name of its own, but snapd installs the file as
 * `<snap>_<app>.desktop`, so Electron reports a failure for a scheme that already works.
 */

import { logger } from '@shared/services/logger.service';

/** Electron's `app.setAsDefaultProtocolClient`, or a stand-in for it */
export type SetAsDefaultProtocolClient = (
  protocol: string,
  path: string,
  args: string[],
) => boolean;

/**
 * Registers `launchPath` (with `args`) as the handler for `scheme://` links, unless the app is
 * running as a snap, whose desktop file registers the scheme instead.
 *
 * @param scheme The URI scheme, without `://`
 * @param launchPath The executable the OS should start for a link
 * @param args Arguments the OS should pass before the link
 * @param setAsDefaultProtocolClient Electron's `app.setAsDefaultProtocolClient`
 * @param env The process environment; snapd sets `SNAP` for every snap's processes
 */
export function registerAppUriScheme(
  scheme: string,
  launchPath: string,
  args: string[],
  setAsDefaultProtocolClient: SetAsDefaultProtocolClient,
  env: typeof process.env = process.env,
): void {
  if (env.SNAP) {
    logger.debug(
      `Not registering ${scheme}:// with the operating system: running as a snap, whose desktop file registers the scheme`,
    );
    return;
  }
  if (!setAsDefaultProtocolClient(scheme, launchPath, args)) {
    logger.error(
      `Could not register ${launchPath} (arguments: ${args}) as the ${scheme}:// URI handler. Electron reported the failure without a cause, so links using this scheme will not open the app.`,
    );
  }
}
