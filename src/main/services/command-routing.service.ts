/**
 * Registers proxies under the generic request names that renderer-hosted commands and dialogs are
 * called by (e.g. "platform.openSettings", "dialog:showDialog") and forwards each call to the
 * focused window's scoped handler (e.g. "platform.openSettings-1"). This enables multi-window
 * support by ensuring that renderer-hosted work executes in the window the user is looking at.
 */

import { getTargetWindowId } from '@main/services/window-state.service';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import {
  CATEGORY_DIALOG,
  RENDERER_HOSTED_DIALOG_REQUEST_NAMES,
} from '@shared/services/dialog.service-model';
import {
  RENDERER_HOSTED_COMMAND_DOCS,
  RENDERER_HOSTED_COMMAND_NAMES,
} from '@shared/services/web-view.service-model';
import * as networkService from '@shared/services/network.service';
import { NetworkMethodHandlerOptions } from '@shared/models/network.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { serializeRequestType } from '@shared/utils/util';

/**
 * Register one proxy that forwards `category:name` to `category:name-{focusedWindowId}`.
 *
 * @param category Request category the name belongs to
 * @param name Generic (unscoped) request name consumers call
 * @param docs OpenRPC documentation for the generic name, if it has any
 */
async function registerFocusedWindowProxy(
  category: string,
  name: string,
  docs?: SingleMethodDocumentation,
  options?: NetworkMethodHandlerOptions,
): Promise<void> {
  await networkService.registerRequestHandler(
    serializeRequestType(category, name),
    async (...args: unknown[]) => {
      const targetWindowId = getTargetWindowId();
      if (targetWindowId === undefined)
        throw new Error(`No windows available to route ${category}:${name}`);
      return networkService.request(
        serializeRequestType(category, `${name}-${targetWindowId}`),
        ...args,
      );
    },
    // The generic name is the documented public API; the scoped names the renderers register under
    // are internal, so this proxy is where the OpenRPC docs belong
    docs,
    options,
  );
}

/**
 * Register proxies for everything the renderers host per window — the renderer-hosted commands and
 * the dialog requests. Each proxy forwards to the focused window's scoped handler. Must be called
 * during main process startup, before createWindow().
 */
export async function startCommandRoutingService(): Promise<void> {
  await Promise.all([
    ...RENDERER_HOSTED_COMMAND_NAMES.map((commandName) =>
      registerFocusedWindowProxy(
        CATEGORY_COMMAND,
        commandName,
        RENDERER_HOSTED_COMMAND_DOCS[commandName],
      ),
    ),
    ...RENDERER_HOSTED_DIALOG_REQUEST_NAMES.map((requestName) =>
      // No OpenRPC docs on the generic dialog names. The renderer's doc objects reference
      // `dialog-definition.model` (renderer-only) for the dialog-type enum, so they cannot move to
      // the shared model the way RENDERER_HOSTED_COMMAND_DOCS did without relocating that model
      // too. The docs still appear in the OpenRPC document under the scoped names. Move
      // `dialog-definition.model` to `@shared` if the public names need documenting.
      //
      // A dialog waits for the user, so the proxy must disable its timeout the same way the
      // renderer's registration does — otherwise the generic request gives up while the dialog is
      // still open.
      registerFocusedWindowProxy(CATEGORY_DIALOG, requestName, undefined, {
        timeoutMilliseconds: 0,
      }),
    ),
  ]);

  logger.info(
    `Routing proxies registered for ${RENDERER_HOSTED_COMMAND_NAMES.length} commands and ${RENDERER_HOSTED_DIALOG_REQUEST_NAMES.length} dialog requests`,
  );
}
