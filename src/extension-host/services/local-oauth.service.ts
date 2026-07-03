import { StatusCodes } from 'http-status-codes';
import { URL } from 'url';
import { createServer, Server } from 'http';
import { getErrorMessage } from 'platform-bible-utils';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { HANDLE_URI_REQUEST_TYPE } from '@node/services/extension.service-model';

let localServer: Server | undefined;
// Set by Auth0 configuration. Can be overridden with LOCAL_OAUTH_SERVER_PORT env variable.
const DEFAULT_LOCAL_SERVER_PORT = 5000;
const localServerPort = process.env.LOCAL_OAUTH_SERVER_PORT
  ? Number(process.env.LOCAL_OAUTH_SERVER_PORT)
  : DEFAULT_LOCAL_SERVER_PORT;

export async function startLocalOAuthServer(): Promise<void> {
  // We only need this for development and testing purposes. Don't run it in production.
  if (globalThis.isPackaged) return;

  return new Promise((resolve) => {
    localServer = createServer(async (req, res) => {
      if (!req.url) {
        res.writeHead(StatusCodes.BAD_REQUEST, { 'Content-Type': 'text/plain' });
        res.end('Bad Request: No URL provided');
        return;
      }

      const url = new URL(req.url, `http://localhost:${localServerPort}`);
      if (url.pathname !== '/callback/auth0') {
        res.writeHead(StatusCodes.NOT_FOUND, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }

      try {
        // Handle the OAuth callback
        await networkService.request(HANDLE_URI_REQUEST_TYPE, url);
      } catch (err) {
        logger.error(`Error handling OAuth callback: ${getErrorMessage(err)}`);
        res.writeHead(StatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      // Send a response to the browser
      res.writeHead(StatusCodes.OK, { 'Content-Type': 'text/html' });
      res.end(`
            <html>
              <body>
                <h1>Authentication Complete</h1>
                <p>You can close this window and return to the application.</p>
                <script>window.close();</script>
              </body>
            </html>
          `);
    });

    localServer.listen(localServerPort, 'localhost', () => {
      logger.info(`Local OAuth server listening on port ${localServerPort}`);
      resolve();
    });

    localServer.on('error', (err) => {
      // Don't reject: extension host startup awaits this dev-only service, and a rejection would
      // abort extension loading entirely. The port cannot be moved automatically because the OAuth
      // provider only redirects to the registered port, so just run without OAuth callbacks. This
      // is expected when another dev instance is already running (supported since PT-4109) - the
      // instance that owns the port receives the callbacks.
      logger.warn(
        `Local OAuth server could not start, so this instance will not receive OAuth callbacks: ${getErrorMessage(err)}. If another dev instance is running, it owns port ${localServerPort}. You can override the port with the LOCAL_OAUTH_SERVER_PORT environment variable if your OAuth configuration allows it.`,
      );
      stopLocalOAuthServer();
      resolve();
    });
  });
}

export function stopLocalOAuthServer(): void {
  if (localServer) {
    localServer.close();
    localServer = undefined;
  }
}
