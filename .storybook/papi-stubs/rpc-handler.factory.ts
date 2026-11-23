/**
 * Storybook stub for `@shared/services/rpc-handler.factory`.
 *
 * In the app, `networkService.initialize()` calls `createRpcHandler()`, which (in the renderer)
 * constructs an `RpcClient`. That client immediately arms a 10s `AsyncVariable('websocket
 * connected')` and tries to open `ws://localhost:<port>`. Storybook has no PAPI backend, so the
 * socket never opens and the AsyncVariable rejects unhandled with "Timeout reached when waiting for
 * websocket connected to settle" — which the webpack/react-refresh dev overlay surfaces as a crash
 * on any story whose component tree touches the network service (the whole startup-wizard set, plus
 * dialogs/overlays).
 *
 * This inert handler makes `initialize()` succeed instantly with no socket and no timer, so no
 * connection is ever attempted and nothing rejects. Requests resolve to a JSON-RPC error (there is
 * no backend to answer them); event registration/emission are no-ops. Data hooks that reach the
 * network therefore render their loading/offline state instead of hanging — which is the correct
 * Storybook behavior. Wired via NormalModuleReplacementPlugin in `.storybook/main.ts` (not
 * `resolve.alias`, which `TsconfigPathsPlugin` overrides for `@shared/*`).
 */

import { ConnectionStatus } from '@shared/data/rpc.model';
import type { IRpcMethodRegistrar } from '@shared/models/rpc.interface';
import type { SerializedRequestType } from '@shared/utils/util';
import type { JSONRPCResponse } from 'json-rpc-2.0';

export const createRpcHandler = async (): Promise<IRpcMethodRegistrar> => ({
  connectionStatus: ConnectionStatus.Connected,
  connect: async () => true,
  disconnect: async () => {},
  request: async (requestType: SerializedRequestType): Promise<JSONRPCResponse> => ({
    jsonrpc: '2.0',
    // json-rpc requires an id; 0 is fine for these unanswerable Storybook requests.
    id: 0,
    error: { code: -32601, message: `Storybook: no PAPI backend to handle "${requestType}"` },
  }),
  emitEventOnNetwork: () => {},
  registerMethod: async () => true,
  unregisterMethod: async () => true,
  registerEvent: async () => true,
  unregisterEvent: async () => true,
  // `networkService.initialize()` subscribes to this immediately after `createRpcHandler()`, so it
  // has to exist or every story whose tree touches the network service dies with
  // "jsonRpc.onDidDisconnectClient is not a function". Nothing ever connects here, so nothing can
  // ever disconnect: hand back an unsubscriber that reports success, like the other members do.
  onDidDisconnectClient: () => () => true,
});

export default createRpcHandler;
