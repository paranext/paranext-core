import { isClient } from '@shared/utils/internal-util';
import { IRpcMethodRegistrar } from '@shared/models/rpc.interface';

/** Creates a server or client RPC handler depending on if we're in main or some other process */
export const createRpcHandler = async (): Promise<IRpcMethodRegistrar> => {
  if (isClient()) {
    const RpcClient = (await import('@client/services/rpc-client')).default;
    // Renderer and extension-host are the only two client peers; label log lines with which
    // one dropped so a multi-window session's close/error lines are distinguishable.
    return new RpcClient(globalThis.processType);
  }
  const RpcWebSocketListener = (await import('@main/services/rpc-websocket-listener')).default;
  return new RpcWebSocketListener();
};
