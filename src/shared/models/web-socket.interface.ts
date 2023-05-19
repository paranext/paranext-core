/**
 * Interface that defines the webSocket functionality the extension host and the renderer must implement.
 * Used by WebSocketFactory to supply the right kind of WebSocket to ClientNetworkConnector.
 * For now, we are just using the browser WebSocket type. We may need specific functionality that don't
 * line up between the ws library's implementation and the browser implementation. We can adjust as needed at that point.
 */
export type IWebSocket = WebSocket;
export interface IWebSocketConstructor {
  new (...args: ConstructorParameters<typeof WebSocket>): IWebSocket;
}
