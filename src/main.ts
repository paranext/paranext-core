import { logger } from '@papi/backend';

export async function activate() {
  logger.debug('Extension template is activating!');
}

export async function deactivate() {
  logger.debug('Extension template is deactivating!');
  return true;
}
