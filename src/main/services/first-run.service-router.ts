/**
 * Service router for the developer reset command `platform.resetFirstRun`. Puts Platform.Bible back
 * into the state a new user — or a Paratext 9 user launching it for the first time — starts from,
 * then restarts into the first-run wizard. Meant for developers, testers and designers, including
 * in installed builds (F12 → Console → `await
 * papi.commands.sendCommand('platform.resetFirstRun')`).
 *
 * The reset spans three owners: core settings (here, through the settings service), the
 * registration in Platform.Bible's own ParatextData folder (the C# data provider), and the wizard's
 * progress in the renderer's `localStorage` (a window's first-run service shard — `localStorage` is
 * shared by every window, so any one window will do).
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { app } from 'electron';
import { access, unlink, writeFile } from 'fs/promises';
import path from 'path';
import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import {
  FIRST_RUN_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  IFirstRunServiceShard,
} from '@shared/models/first-run.service-shard.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { FIRST_RUN_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import * as commandService from '@shared/services/command.service';
import { getDataProviderObjectId } from '@shared/services/data-provider.service';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { networkObjectStatusService } from '@shared/services/network-object-status.service';
import * as networkService from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import { settingsServiceDataProviderName } from '@shared/services/settings.service-model';
import { serializeRequestType } from '@shared/utils/util';
import type { ResetFirstRunOptions, ResetFirstRunRegistration } from 'papi-shared-types';
import { getErrorMessage } from 'platform-bible-utils';

const REGISTRATION_MODES: ResetFirstRunRegistration[] = ['keep', 'copyFromParatext9', 'clear'];

/**
 * Present while a reset is waiting for the next startup to switch to Simple mode. See
 * {@link applyPendingFirstRunReset}.
 */
const SIMPLE_MODE_PENDING_FILE_NAME = 'first-run-reset-simple-mode-pending';

/**
 * How long the startup after a reset waits for the settings service before giving up on switching
 * to Simple mode until the next launch. The first window waits too, so keep it bounded.
 */
const SETTINGS_SERVICE_WAIT_MS = 30000;

function getSimpleModePendingFilePath(): string {
  return path.join(app.getPath('userData'), SIMPLE_MODE_PENDING_FILE_NAME);
}

/** The first-run service shard each window registers, found by network object type */
const firstRunShards = createServiceShardIndex<IFirstRunServiceShard>({
  objectType: FIRST_RUN_SERVICE_SHARD_OBJECT_TYPE,
  resolveShard: (networkObjectId) =>
    networkObjectService.get<IFirstRunServiceShard>(networkObjectId),
});

/** Get a window's first-run shard (the one the user is working in), throwing if there is none */
const getTargetFirstRunShard = createTargetShardResolver(
  FIRST_RUN_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  firstRunShards,
);

/** The command name this router claims */
type FirstRunCommandName = 'platform.resetFirstRun';

/** OpenRPC documentation for the command, keyed by its exact name */
const FIRST_RUN_COMMAND_DOCS: Record<FirstRunCommandName, SingleMethodDocumentation> = {
  'platform.resetFirstRun': {
    method: {
      summary:
        'Developer reset: forget first-run progress (and optionally the registration) and restart into the first-run wizard',
      params: [
        {
          name: 'options',
          required: false,
          summary:
            "`registration`: 'keep' (default) leaves the registration alone; 'copyFromParatext9' copies Paratext 9's registration and internet settings again on restart; 'clear' removes the registration. Paratext 9's own files are never changed.",
          schema: {
            type: 'object',
            properties: { registration: { type: 'string', enum: REGISTRATION_MODES } },
          },
        },
      ],
      result: { name: 'return value', schema: { type: 'null' } },
      'x-experimental': true,
    },
  },
};

/** Reset first-run state as described on the `platform.resetFirstRun` command, then restart. */
async function resetFirstRun(options?: ResetFirstRunOptions): Promise<void> {
  const registration = options?.registration ?? 'keep';
  if (!REGISTRATION_MODES.includes(registration))
    throw new Error(
      `Unknown registration option '${registration}'. Use one of: ${REGISTRATION_MODES.join(', ')}`,
    );

  // Everything that can refuse goes first, so a refusal leaves nothing half reset: without a window
  // to clear the renderer's cache in, the next launch would read that cache as "first run complete"
  // and skip the wizard anyway; and the data provider refuses a registration reset when ParatextData
  // is not on Platform.Bible's own folder.
  const firstRunShard = await getTargetFirstRunShard();
  logger.info(`Resetting first run (registration: ${registration})`);
  if (registration !== 'keep')
    await commandService.sendCommand('paratextRegistration.resetForFirstRun', registration);
  await firstRunShard.clearLocalState();
  // The wizard only runs in Simple mode, and only until first run is complete.
  await settingsService.set('platform.firstRunComplete', false);
  await settingsService.set('platform.syncOnStartup', true);
  await settingsService.set('platform.showRegistrationReminderOnStartup', true);
  await settingsService.set('platform.internetUseChoiceAsked', false);
  await settingsService.set('platform.internetUseDisableSomeServicesChosen', false);
  // Not switched to Simple mode now: in Power mode that would close every secondary window with a
  // Simple-mode close sync, and the quit would then sync every open editor's project instead of
  // following the Power-mode schedule.
  await writeFile(getSimpleModePendingFilePath(), '');
  await commandService.sendCommand('platform.restart');
}

/**
 * Finish a `platform.resetFirstRun` from the previous session by switching to Simple mode. Must run
 * at startup before any window is created, so the window restore and the renderer's first-run gate
 * both read the Simple mode. Never throws: a failure is logged, startup continues in the saved
 * mode, and the switch is tried again on the next launch.
 */
export async function applyPendingFirstRunReset(): Promise<void> {
  const pendingFilePath = getSimpleModePendingFilePath();
  try {
    await access(pendingFilePath);
  } catch {
    return;
  }
  try {
    logger.info('Switching to Simple mode to finish the first-run reset');
    // This early in startup the extension host may not have registered the settings service yet,
    // and the settings service's own lookup gives up long before it usually does.
    await networkObjectStatusService.waitForNetworkObject(
      { id: getDataProviderObjectId(settingsServiceDataProviderName) },
      SETTINGS_SERVICE_WAIT_MS,
    );
    await settingsService.set('platform.interfaceMode', 'simple');
  } catch (e) {
    logger.warn(`Could not switch to Simple mode for the first-run reset: ${getErrorMessage(e)}`);
    return;
  }
  try {
    await unlink(pendingFilePath);
  } catch (e) {
    logger.warn(`Could not remove ${pendingFilePath}: ${getErrorMessage(e)}`);
  }
}

/**
 * Register the first-run reset command under its generic name so it is claimed before any renderer
 * starts. Must be called during main process startup, before createWindow().
 */
export async function startFirstRunServiceRouter(): Promise<void> {
  assertCommandRoutingMatchesDocs('first-run service router', [
    {
      commandName: 'platform.resetFirstRun',
      docs: FIRST_RUN_COMMAND_DOCS['platform.resetFirstRun'],
      routing: 'focus',
    },
  ]);

  await networkService.registerRequestHandler(
    serializeRequestType(CATEGORY_COMMAND, 'platform.resetFirstRun'),
    resetFirstRun,
    FIRST_RUN_COMMAND_DOCS['platform.resetFirstRun'],
  );
  logger.info('First-run service router registered');
}
