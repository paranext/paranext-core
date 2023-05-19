import { IWebSocketConstructor } from '@shared/models/web-socket.interface';

/**
 * The renderer's implementation of WebSocket is the browser-supplied WebSocket, which doesn't work in Node
 */
const Ws = WebSocket as IWebSocketConstructor;
export default Ws;
