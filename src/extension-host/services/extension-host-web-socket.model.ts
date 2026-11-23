import WebSocket from 'ws';
import { timingSafeEqual } from 'crypto';
import { sha256Digest } from '@node/utils/crypto-util';
import {
  LaunchSecrets,
  PAPI_CLIENT_SECRET_HEADER,
  PAPI_SERVER_SECRET_HEADER,
} from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { markLocalConnectionIdentified } from '@client/services/launch-secrets';

/**
 * Opens the extension host's connection to main presenting its launch secret. The connection only
 * opens if main's handshake reply carries the matching server secret, proving it is the main that
 * launched this process; otherwise it is closed before it opens.
 *
 * @param url Address of main's PAPI WebSocket
 * @param secrets The secrets main handed this process. Not kept after the handshake.
 */
export function createIdentifiedWebSocket(url: string, secrets: LaunchSecrets): WebSocket {
  const socket = new WebSocket(url, {
    headers: { [PAPI_CLIENT_SECRET_HEADER]: secrets.clientSecret },
  });
  const expectedServerSecretDigest = sha256Digest(secrets.serverSecret);
  socket.once('upgrade', (response) => {
    const presented = response.headers[PAPI_SERVER_SECRET_HEADER];
    if (
      typeof presented === 'string' &&
      timingSafeEqual(sha256Digest(presented), expectedServerSecretDigest)
    ) {
      markLocalConnectionIdentified('extensionHost');
      return;
    }
    logger.error(
      'The PAPI WebSocket server did not prove it is the main process that launched this extension host; closing the connection',
    );
    socket.terminate();
  });
  return socket;
}

/**
 * Extension-host client uses ws as its WebSocket client, but the renderer can't use it. So we need
 * to exclude it from the renderer webpack bundle like this.
 */
export default WebSocket;
