import { IProjectDataProviderEngineFactory, ProjectMetadataWithoutFactoryInfo } from '@papi/core';
import {
  LEXICAL_REFERENCE_PROJECT_INTERFACES,
  LexicalReferenceProjectDataProviderEngine,
} from './lexical-reference-project-data-provider-engine.model';
import { LexicalReferenceTextManager } from './lexical-reference-text-manager.model';

export class LexicalReferenceProjectDataProviderEngineFactory
  implements IProjectDataProviderEngineFactory<typeof LEXICAL_REFERENCE_PROJECT_INTERFACES>
{
  constructor(private lexicalReferenceTextManager: LexicalReferenceTextManager) {}

  async getAvailableProjects(): Promise<ProjectMetadataWithoutFactoryInfo[]> {
    const lexicalReferenceTextsById =
      await this.lexicalReferenceTextManager.getLexicalReferenceTextsById();
    return Object.values(lexicalReferenceTextsById)
      .filter((text) => !!text)
      .map((text) => ({
        id: text.id,
        projectInterfaces: LEXICAL_REFERENCE_PROJECT_INTERFACES,
      }));
  }

  async createProjectDataProviderEngine(projectId: string) {
    const lexicalReferenceTexts =
      await this.lexicalReferenceTextManager.getLexicalReferenceTextsById();
    if (!lexicalReferenceTexts[projectId])
      throw new Error(`No lexical reference text project for projectId ${projectId}`);

    return new LexicalReferenceProjectDataProviderEngine(
      lexicalReferenceTexts[projectId],
      this.lexicalReferenceTextManager,
    );
  }
}
