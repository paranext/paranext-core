import ws from 'ws';
/**
 * extension-host client uses ws as its WebSocket client, but the renderer can't use it. So we need to exclude it from the renderer webpack bundle like this.
 */

export default ws;
