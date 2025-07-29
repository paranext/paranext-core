import { DataProviderEngine } from '@papi/backend';
import { DataProviderUpdateInstructions, IDataProviderEngine } from '@papi/core';
import type {
  LexicalEntriesById,
  LexicalEntriesByOccurrence,
  LexicalReferenceSelector,
  LexicalReferenceDataTypes,
  LexicalSensesByOccurrence,
  LexicalSensesById,
} from 'platform-lexical-tools';
import { Unsubscriber } from 'platform-bible-utils';
import { LexicalReferenceTextManager } from './lexical-reference-text-manager.model';

export class LexicalReferenceService
  extends DataProviderEngine<LexicalReferenceDataTypes>
  implements IDataProviderEngine<LexicalReferenceDataTypes>
{
  #changeLexicalReferenceTextsUnsubscriber: Unsubscriber;

  constructor(private lexicalReferenceTextManager: LexicalReferenceTextManager) {
    super();

    this.#changeLexicalReferenceTextsUnsubscriber =
      this.lexicalReferenceTextManager.onDidChangeLexicalReferenceTexts(() =>
        this.notifyUpdate('*'),
      );
  }

  async getEntriesById(selector: LexicalReferenceSelector): Promise<LexicalEntriesById> {
    return this.lexicalReferenceTextManager.getEntriesById(selector);
  }

  async getEntriesByOccurrence(
    selector: LexicalReferenceSelector,
  ): Promise<LexicalEntriesByOccurrence> {
    return this.lexicalReferenceTextManager.getEntriesByOccurrence(selector);
  }

  async getSensesById(selector: LexicalReferenceSelector): Promise<LexicalSensesById> {
    return this.lexicalReferenceTextManager.getSensesById(selector);
  }

  async getSensesByOccurrence(
    selector: LexicalReferenceSelector,
  ): Promise<LexicalSensesByOccurrence> {
    return this.lexicalReferenceTextManager.getSensesByOccurrence(selector);
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setEntriesById(): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>> {
    throw new Error('These lexical reference texts are readonly. Cannot set entries by ID.');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setEntriesByOccurrence(): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>> {
    throw new Error(
      'These lexical reference texts are readonly. Cannot set entries by occurrence.',
    );
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setSensesById(): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>> {
    throw new Error('These lexical reference texts are readonly. Cannot set senses by ID.');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setSensesByOccurrence(): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>> {
    throw new Error('These lexical reference texts are readonly. Cannot set senses by occurrence.');
  }

  async dispose() {
    return this.#changeLexicalReferenceTextsUnsubscriber();
  }
}
