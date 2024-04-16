import { logger } from '@papi/backend';

export async function activate() {
  logger.info('platformScripture is activating!');
}

export async function deactivate() {
  logger.info('platformScripture is deactivating!');
  return true;
}
