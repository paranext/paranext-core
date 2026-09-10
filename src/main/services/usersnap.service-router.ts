/**
 * Service router for the Usersnap feedback commands. Claims the `platform.usersnap*` command names
 * consumers call and forwards each to the Usersnap service shard of the window the user is working
 * in — the widget is a DOM overlay owned by one renderer, so a feedback form has to open where the
 * user is looking.
 *
 * These four commands have a shard of their own rather than riding on the WebView service shard,
 * because they have nothing to do with web views.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { USERSNAP_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import {
  IUsersnapServiceShard,
  USERSNAP_SERVICE_SHARD_NETWORK_OBJECT_NAME,
} from '@shared/models/usersnap.service-shard.model';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { serializeRequestType } from '@shared/utils/util';

/**
 * The Usersnap service shard each window registers, found by network object type and window
 * attribute rather than by rebuilding the window-scoped name the window registered under.
 */
const usersnapShards = createServiceShardIndex<IUsersnapServiceShard>({
  objectType: USERSNAP_SERVICE_SHARD_OBJECT_TYPE,
  resolveShard: (networkObjectId) =>
    networkObjectService.get<IUsersnapServiceShard>(networkObjectId),
});

/** Get the Usersnap shard for the window the user is working in, throwing if there is none */
const getTargetUsersnapShard = createTargetShardResolver(
  USERSNAP_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  usersnapShards,
);

/** The Usersnap command names this router claims */
type UsersnapCommandName =
  | 'platform.usersnapSubmitIdea'
  | 'platform.usersnapReportIssue'
  | 'platform.isUsersnapFormCurrentlyOpen'
  | 'platform.closeOpenUsersnapForm';

/**
 * OpenRPC documentation for the generic command names, which are the ones consumers call.
 *
 * Keyed by the exact names rather than by `string`, so a mistyped lookup below is a compile error
 * rather than a registration that publishes no documentation at all.
 */
const USERSNAP_COMMAND_DOCS: Record<UsersnapCommandName, SingleMethodDocumentation> = {
  'platform.usersnapSubmitIdea': {
    method: {
      summary: 'Open Usersnap feedback form to submit an idea',
      params: [],
      result: { name: 'return value', schema: { type: 'null' } },
    },
  },
  'platform.usersnapReportIssue': {
    method: {
      summary: 'Open Usersnap feedback form to report an issue',
      params: [],
      result: { name: 'return value', schema: { type: 'null' } },
    },
  },
  'platform.isUsersnapFormCurrentlyOpen': {
    method: {
      summary: 'Check if a Usersnap form is currently open',
      params: [],
      result: { name: 'isOpen', schema: { type: 'boolean' } },
    },
  },
  'platform.closeOpenUsersnapForm': {
    method: {
      summary: 'Call close function for Usersnap forms known to the application',
      params: [],
      result: { name: 'return value', schema: { type: 'null' } },
    },
  },
};

/**
 * Register the Usersnap commands under the generic names so they are claimed before any renderer
 * starts. Must be called during main process startup, before createWindow().
 */
export async function startUsersnapServiceRouter(): Promise<void> {
  assertCommandRoutingMatchesDocs(
    'Usersnap service router',
    Object.entries(USERSNAP_COMMAND_DOCS).map(([commandName, docs]) => ({
      commandName,
      docs,
      routing: 'focus' as const,
    })),
  );

  await Promise.all([
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.usersnapSubmitIdea'),
      async () => (await getTargetUsersnapShard()).submitIdea(),
      USERSNAP_COMMAND_DOCS['platform.usersnapSubmitIdea'],
    ),
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.usersnapReportIssue'),
      async () => (await getTargetUsersnapShard()).reportIssue(),
      USERSNAP_COMMAND_DOCS['platform.usersnapReportIssue'],
    ),
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.isUsersnapFormCurrentlyOpen'),
      async () => (await getTargetUsersnapShard()).isFormCurrentlyOpen(),
      USERSNAP_COMMAND_DOCS['platform.isUsersnapFormCurrentlyOpen'],
    ),
    networkService.registerRequestHandler(
      serializeRequestType(CATEGORY_COMMAND, 'platform.closeOpenUsersnapForm'),
      async () => (await getTargetUsersnapShard()).closeOpenForm(),
      USERSNAP_COMMAND_DOCS['platform.closeOpenUsersnapForm'],
    ),
  ]);
  logger.info('Usersnap service router registered');
}
