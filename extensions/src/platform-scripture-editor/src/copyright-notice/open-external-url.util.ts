import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';

/** Opens a web page in the user's browser, e.g. Biblica's permissions page */
export function openExternalUrl(url: string): void {
  papi.commands.sendCommand('platform.openWindow', url).catch((e) => {
    logger.warn(`Could not open ${url}: ${getErrorMessage(e)}`);
  });
}

export default openExternalUrl;
