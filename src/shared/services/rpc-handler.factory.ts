import { isClient } from '@shared/utils/internal-util';
import { IRpcMethodRegistrar } from '@shared/models/rpc.interface';

/** Creates a server or client RPC handler depending on if we're in main or some other process */
export const createRpcHandler = async (): Promise<IRpcMethodRegistrar> => {
  if (isClient()) {
    const RpcClient = (await import('@client/services/rpc-client')).default;
    return new RpcClient();
  }
  const RpcWebSocketListener = (await import('@main/services/rpc-websocket-listener')).default;
  return new RpcWebSocketListener();
};
