// **********************************************************************************************
// NOTE: The types defined in this file should match what is defined in NetworkConnectorTypes.cs
// **********************************************************************************************

/** Port to use for the webSocket */
export const WEBSOCKET_PORT = 8876;

/** Number of attempts a client will make to connect to the WebSocket server before failing */
export const WEBSOCKET_ATTEMPTS_MAX = 5;
/**
 * Time in ms for the client to wait before attempting to connect to the WebSocket server again
 * after a failure
 */
export const WEBSOCKET_ATTEMPTS_WAIT = 1000;
