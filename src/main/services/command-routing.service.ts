/**
 * Registers proxy commands under generic names (e.g. "platform.openSettings") that forward to the
 * focused window's scoped command handler (e.g. "platform.openSettings-1"). This enables
 * multi-window support by ensuring that renderer-hosted commands execute in the correct window.
 */

import { getTargetWindowId } from '@main/services/window-state.service';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { RENDERER_HOSTED_COMMAND_NAMES } from '@shared/services/web-view.service-model';
import * as networkService from '@shared/services/network.service';
import { serializeRequestType } from '@shared/utils/util';

/**
 * Register proxy commands for all renderer-hosted commands. Each proxy forwards calls to the
 * focused window's scoped command handler. Must be called during main process startup, before
 * createWindow().
 */
export async function startCommandRoutingService(): Promise<void> {
  const registrations = RENDERER_HOSTED_COMMAND_NAMES.map(async (commandName) => {
    const genericRequestType = serializeRequestType(CATEGORY_COMMAND, commandName);
    await networkService.registerRequestHandler(genericRequestType, async (...args: unknown[]) => {
      const targetWindowId = getTargetWindowId();
      if (targetWindowId === undefined)
        throw new Error(`No windows available to route command ${commandName}`);
      const scopedRequestType = serializeRequestType(
        CATEGORY_COMMAND,
        `${commandName}-${targetWindowId}`,
      );
      return networkService.request(scopedRequestType, ...args);
    });
  });

  await Promise.all(registrations);
  logger.info(
    `Command routing proxies registered for ${RENDERER_HOSTED_COMMAND_NAMES.length} commands`,
  );
}
