/**
 * Service router for the commands the renderer still hosts per window. Registers under the generic
 * request names they are called by (e.g. "platform.goToNextChapter") and forwards each call to the
 * scoped handler (e.g. "platform.goToNextChapter-1") of the window the user is working in.
 *
 * Transitional: each of these commands moves into the router for its own service, at which point
 * this module goes away. See the router/shard pattern in `.context/standards/Architecture.md` §
 * "Service router and service shard".
 */

import { getTargetWindowId } from '@main/services/window-state.service';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import {
  RENDERER_HOSTED_COMMAND_DOCS,
  RENDERER_HOSTED_COMMAND_NAMES,
} from '@shared/services/web-view.service-model';
import * as networkService from '@shared/services/network.service';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { serializeRequestType } from '@shared/utils/util';

/**
 * Register one route that forwards `command:name` to the scoped `command:name-{windowId}` of the
 * window the user is working in.
 *
 * @param name Generic (unscoped) command name consumers call
 * @param docs OpenRPC documentation for the generic name, if it has any
 */
async function registerRoutedCommand(
  name: string,
  docs?: SingleMethodDocumentation,
): Promise<void> {
  await networkService.registerRequestHandler(
    serializeRequestType(CATEGORY_COMMAND, name),
    async (...args: unknown[]) => {
      const targetWindowId = getTargetWindowId();
      if (targetWindowId === undefined)
        throw new Error(`No windows available to route ${CATEGORY_COMMAND}:${name}`);
      return networkService.request(
        serializeRequestType(CATEGORY_COMMAND, `${name}-${targetWindowId}`),
        ...args,
      );
    },
    // The generic name is the documented public API; the scoped names the renderers register under
    // are internal, so this router is where the OpenRPC docs belong
    docs,
  );
}

/**
 * Register routes for the commands the renderers still host per window. Must be called during main
 * process startup, before createWindow().
 */
export async function startCommandServiceRouter(): Promise<void> {
  await Promise.all(
    RENDERER_HOSTED_COMMAND_NAMES.map((commandName) =>
      registerRoutedCommand(commandName, RENDERER_HOSTED_COMMAND_DOCS[commandName]),
    ),
  );

  logger.info(`Routes registered for ${RENDERER_HOSTED_COMMAND_NAMES.length} commands`);
}
