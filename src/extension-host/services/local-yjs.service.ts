import WebSocket from 'ws';
import http from 'http';
import logger from '@shared/services/logger.service';
import { setupWSConnection } from './local-yjs.util';

// Adapted from y-websocket/bin/server.cjs
export default function startLocalYjsServer() {
  const wss = new WebSocket.Server({ noServer: true });
  const host = process.env.LOCAL_YJS_HOST || 'localhost';
  const port = parseInt(process.env.LOCAL_YJS_PORT || '8877', 10);

  const server = http.createServer((_request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('okay');
  });

  wss.on('connection', setupWSConnection);

  server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  server.listen(port, host, () => {
    logger.info(`y-js local web server running at '${host}' on port ${port}`);
  });
}
