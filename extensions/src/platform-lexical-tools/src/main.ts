import papi, { logger } from '@papi/backend';
import { ExecutionActivationContext } from '@papi/core';
import { LexicalReferenceService } from './lexical-reference.service';
import { LexicalReferenceTextManager } from './lexical-reference-text-manager.model';
import { LexicalReferenceProjectDataProviderEngineFactory } from './lexical-reference-project-data-provider-engine-factory.model';
import { LEXICAL_REFERENCE_PROJECT_INTERFACES } from './lexical-reference-project-data-provider-engine.model';

export async function activate(context: ExecutionActivationContext) {
  logger.info('Platform Lexical Tools is activating!');

  const lexicalReferenceTextManager = new LexicalReferenceTextManager();

  const lexicalReferenceServicePromise = papi.dataProviders.registerEngine(
    'platformLexicalTools.lexicalReferenceService',
    new LexicalReferenceService(lexicalReferenceTextManager),
  );

  const lexicalReferenceProjectDataProviderEngineFactory =
    new LexicalReferenceProjectDataProviderEngineFactory(lexicalReferenceTextManager);

  const lexicalReferencePdpefPromise =
    papi.projectDataProviders.registerProjectDataProviderEngineFactory(
      'platformLexicalTools.lexicalReferencePdpf',
      LEXICAL_REFERENCE_PROJECT_INTERFACES,
      lexicalReferenceProjectDataProviderEngineFactory,
    );

  const lexicalReferenceService = await lexicalReferenceServicePromise;
  await lexicalReferenceService.registerLexicalReferenceText(
    'papi-extension://platformLexicalTools/assets/lexical-db/lexical.db',
  );

  context.registrations.add(
    lexicalReferenceTextManager,
    lexicalReferenceService,
    await lexicalReferencePdpefPromise,
  );
}

export async function deactivate() {
  logger.info('Platform Lexical Tools is deactivating!');
  return true;
}
