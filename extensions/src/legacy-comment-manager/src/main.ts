import { logger } from '@papi/backend';

export async function activate() {
  logger.info('Legacy comment manager is activating!');
}

export async function deactivate() {
  logger.info('Legacy comment manager is deactivating!');
  return true;
}
