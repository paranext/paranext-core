import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Opens a web page in the user's browser. A link in a web view cannot open a window itself unless
 * the web view allows popups, so the platform opens it.
 */
export function openInBrowser(url: string): void {
  papi.commands.sendCommand('platform.openWindow', url).catch((e) => {
    logger.warn(`Could not open ${url}: ${getErrorMessage(e)}`);
  });
}

export default openInBrowser;
