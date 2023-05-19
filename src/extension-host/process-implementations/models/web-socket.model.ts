import { IWebSocketConstructor } from '@shared/models/web-socket.interface';
import ws from 'ws';
/**
 * extension-host client uses ws as its WebSocket client, but the renderer can't use it. So we need to exclude it from the renderer webpack bundle like this.
 */

// The node ws library doesn't perfectly match up with browser's WebSocket, but they're close
// enough for our current use. Let's type assert through unknown
const Ws = ws as unknown as IWebSocketConstructor;
export default Ws;
