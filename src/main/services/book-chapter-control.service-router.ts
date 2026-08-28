/**
 * Service router for `platform.openBookChapterControl`. Claims the command name consumers call
 * (Ctrl/Cmd+B reaches it through the main process's keyboard handling) and forwards it to the
 * BookChapterControl service shard of the window the user is working in. Which control inside that
 * window to open is the shard's decision — it reads focus and the tracked last-selected web view,
 * neither of which exists in this process.
 *
 * The natural conceptual home for `open()` is the window service shard: it is focus-derived and
 * window-scoped, like everything else there. It lives in a shard of its own instead because
 * `IWindowService` is public PAPI, so putting it there would publish a permanent extension-facing
 * API for a UI affordance that is not one. A shard with its own object type keeps the surface where
 * it belongs.
 *
 * See the router/shard pattern in `.context/standards/Architecture.md` § "Service router and
 * service shard".
 */

import { assertCommandRoutingMatchesDocs } from '@main/services/owner-routed-command.util';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import {
  BOOK_CHAPTER_CONTROL_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  IBookChapterControlServiceShard,
} from '@shared/models/book-chapter-control.service-shard.model';
import { SingleMethodDocumentation } from '@shared/models/openrpc.model';
import { BOOK_CHAPTER_CONTROL_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { serializeRequestType } from '@shared/utils/util';

/**
 * The BookChapterControl service shard each window registers, found by network object type and
 * window attribute rather than by rebuilding the window-scoped name the window registered under.
 */
const bookChapterControlShards = createServiceShardIndex<IBookChapterControlServiceShard>({
  objectType: BOOK_CHAPTER_CONTROL_SERVICE_SHARD_OBJECT_TYPE,
  resolveShard: (networkObjectId) =>
    networkObjectService.get<IBookChapterControlServiceShard>(networkObjectId),
});

/** Get the shard for the window the user is working in, throwing if there is none */
const getTargetBookChapterControlShard = createTargetShardResolver(
  BOOK_CHAPTER_CONTROL_SERVICE_SHARD_NETWORK_OBJECT_NAME,
  bookChapterControlShards,
);

/** OpenRPC documentation for the generic command name, which is the one consumers call */
const OPEN_BOOK_CHAPTER_CONTROL_DOCS: SingleMethodDocumentation = {
  method: {
    'x-experimental': true,
    summary:
      "Open the appropriate Book Chapter Control (the active tab's if it shows one, else the " +
      "top toolbar's) and focus its input, ready for typing a reference",
    params: [],
    result: { name: 'return value', schema: { type: 'null' } },
  },
};

/**
 * Register `platform.openBookChapterControl` under the generic name so it is claimed before any
 * renderer starts. Must be called during main process startup, before createWindow().
 */
export async function startBookChapterControlServiceRouter(): Promise<void> {
  assertCommandRoutingMatchesDocs('BookChapterControl service router', [
    {
      commandName: 'platform.openBookChapterControl',
      docs: OPEN_BOOK_CHAPTER_CONTROL_DOCS,
      routing: 'focus',
    },
  ]);

  await networkService.registerRequestHandler(
    serializeRequestType(CATEGORY_COMMAND, 'platform.openBookChapterControl'),
    async () => (await getTargetBookChapterControlShard()).open(),
    OPEN_BOOK_CHAPTER_CONTROL_DOCS,
  );
  logger.info('BookChapterControl service router registered');
}
