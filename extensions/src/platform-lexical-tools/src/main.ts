import { logger } from '@papi/backend';

export async function activate() {
  logger.info('Platform Lexical Tools is activating!');
}

export async function deactivate() {
  logger.info('Platform Lexical Tools is deactivating!');
  return true;
}
