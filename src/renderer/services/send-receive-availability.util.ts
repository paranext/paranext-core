import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Asks whether this build can run Send/Receive. Answers `undefined` when the request rejects (e.g.
 * the backend has not registered the command yet); each caller decides whether that means
 * "unavailable" or "ask again later".
 */
export async function askSendReceiveAvailable(): Promise<boolean | undefined> {
  try {
    return (await sendCommand('paratextBibleSendReceive.isAvailable')) === true;
  } catch (e) {
    logger.warn(`Could not tell whether Send/Receive is available: ${getErrorMessage(e)}`);
    return undefined;
  }
}
