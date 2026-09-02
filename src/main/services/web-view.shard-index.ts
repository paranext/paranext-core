/**
 * The per-window WebView service shards, and how to reach the focused window's.
 *
 * A leaf on purpose: the router, the owner resolution and the move policy all read these, and a
 * module-level index that lived with any one of them would have the other two importing it back.
 * Nothing here imports any of the three.
 */

import { networkObjectService } from '@shared/services/network-object.service';
import { createServiceShardIndex } from '@main/services/service-shard-index';
import { WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE } from '@shared/models/service-shard.model';
import { WebViewServiceShard } from '@shared/models/web-view.service-shard.model';
import { createTargetShardResolver } from '@main/services/target-shard-resolver.util';
import { NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE } from '@shared/services/web-view.service-model';

/**
 * The WebView service shard each window registers, found by network object type and window
 * attribute rather than by rebuilding the window-scoped name the window registered under.
 */
export const webViewShards = createServiceShardIndex<WebViewServiceShard>({
  objectType: WEB_VIEW_SERVICE_SHARD_OBJECT_TYPE,
  resolveShard: (networkObjectId) => networkObjectService.get<WebViewServiceShard>(networkObjectId),
});

/** Get the WebView service shard for the currently focused window, throwing if none is available. */
export const getTargetWebViewShard = createTargetShardResolver(
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  webViewShards,
);
