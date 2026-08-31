import { isClient, isRenderer } from '@shared/utils/internal-util';
import { IRpcMethodRegistrar } from '@shared/models/rpc.interface';

/** Creates a server or client RPC handler depending on if we're in main or some other process */
export const createRpcHandler = async (): Promise<IRpcMethodRegistrar> => {
  if (isClient()) {
    const RpcClient = (await import('@client/services/rpc-client')).default;
    // Renderer and extension-host are the only two client peers; label log lines with which
    // one dropped so a multi-window session's close/error lines are distinguishable.
    // On an unclean disconnect the renderer reloads rather than sitting in a broken state:
    // the server is healthy (it drops the dead socket's registrations but stays running), so
    // a fresh page load reconnects cleanly and re-registers every method. The extension host
    // has no equivalent recovery path; if it ever loses its socket nothing in this callback
    // can rescue it. TODO(PT-4435): evaluate full reconnect-plus-registration-replay as a
    // follow-up to cover the extension-host case and avoid the disruptive reload.
    const onUncleanClose = isRenderer() ? () => globalThis.location.reload() : undefined;
    return new RpcClient(globalThis.processType, onUncleanClose);
  }
  const RpcWebSocketListener = (await import('@main/services/rpc-websocket-listener')).default;
  return new RpcWebSocketListener();
};
