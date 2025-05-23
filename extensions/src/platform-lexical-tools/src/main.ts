import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import { LexicalReferenceService } from './lexical-reference.service';

export async function activate(context: ExecutionActivationContext) {
  logger.info('Platform Lexical Tools is activating!');

  const lexicalReferenceServicePromise = papi.dataProviders.registerEngine(
    'platformLexicalTools.lexicalReferenceService',
    new LexicalReferenceService(),
  );

  const lexicalReferenceService = await lexicalReferenceServicePromise;
  await lexicalReferenceService.registerLexicalReferenceText(
    'papi-extension://platformLexicalTools/assets/lexical-db/lexical.db',
  );

  context.registrations.add(lexicalReferenceService);
}

export async function deactivate() {
  logger.info('Platform Lexical Tools is deactivating!');
  return true;
}
