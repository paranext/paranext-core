import papi, { BaseProjectDataProviderEngine } from '@papi/backend';
import {
  DataProviderUpdateInstructions,
  IBaseProjectDataProviderEngine,
  MandatoryProjectDataTypes,
} from '@papi/core';
import type { ProjectSettingNames, ProjectSettingTypes } from 'papi-shared-types';
import type {
  LexicalEntriesById,
  LexicalEntriesByOccurrence,
  LexicalReferenceProjectDataTypes,
  LexicalReferenceProjectSelector,
  LexicalReferenceSelector,
  LexicalReferenceText,
  LexicalSensesById,
  LexicalSensesByOccurrence,
} from 'platform-lexical-tools';
import { deepEqual, Unsubscriber } from 'platform-bible-utils';
import { LexicalReferenceTextManager } from './lexical-reference-text-manager.model';

/** The `projectInterface`s the lexical reference pdpf serves */
// TypeScript is upset without `satisfies` here because `as const` makes the array readonly but it
// needs to be used in ProjectMetadata as not readonly :p
export const LEXICAL_REFERENCE_PROJECT_INTERFACES = [
  'platform.base',
  'platformLexicalTools.lexicalReference',
] as const satisfies ['platform.base', 'platformLexicalTools.lexicalReference'];

const ERROR_MESSAGE_NO_EXTENSION_DATA =
  'Extension data is not available on this readonly lexical reference text project.';
const ERROR_MESSAGE_NO_CHANGE_SETTING_DATA =
  'Project settings cannot be changed on this readonly lexical reference text project.';

export class LexicalReferenceProjectDataProviderEngine
  extends BaseProjectDataProviderEngine<typeof LEXICAL_REFERENCE_PROJECT_INTERFACES>
  implements IBaseProjectDataProviderEngine<typeof LEXICAL_REFERENCE_PROJECT_INTERFACES>
{
  /** Info about the lexical reference text this project represents */
  private lexicalReferenceText: LexicalReferenceText;
  #changeLexicalReferenceTextsUnsubscriber: Unsubscriber;

  constructor(
    initialLexicalReferenceText: LexicalReferenceText,
    private lexicalReferenceTextManager: LexicalReferenceTextManager,
  ) {
    super();

    this.lexicalReferenceText = initialLexicalReferenceText;

    this.#changeLexicalReferenceTextsUnsubscriber =
      this.lexicalReferenceTextManager.onDidChangeLexicalReferenceTexts(async () => {
        const updatedLexicalReferenceText = (
          await this.lexicalReferenceTextManager.getLexicalReferenceTextsById()
        )[this.lexicalReferenceText.id];

        if (!updatedLexicalReferenceText) {
          // The lexical reference text this project represents is gone. Delete this
          this.dispose();
          return;
        }

        // If this lexical reference text info is the same as it was before, no change. Just return
        if (deepEqual(this.lexicalReferenceText, updatedLexicalReferenceText)) return;

        // The lexical reference text changed in some way, so announce the change
        this.notifyUpdate('*');
      });
  }

  async getEntriesById(selector: LexicalReferenceProjectSelector): Promise<LexicalEntriesById> {
    return this.lexicalReferenceTextManager.getEntriesById(
      this.#transformProjectSelectorToSelector(selector),
    );
  }

  async getEntriesByOccurrence(
    selector: LexicalReferenceProjectSelector,
  ): Promise<LexicalEntriesByOccurrence> {
    return this.lexicalReferenceTextManager.getEntriesByOccurrence(
      this.#transformProjectSelectorToSelector(selector),
    );
  }

  async getSensesById(selector: LexicalReferenceProjectSelector): Promise<LexicalSensesById> {
    return this.lexicalReferenceTextManager.getSensesById(
      this.#transformProjectSelectorToSelector(selector),
    );
  }

  async getSensesByOccurrence(
    selector: LexicalReferenceProjectSelector,
  ): Promise<LexicalSensesByOccurrence> {
    return this.lexicalReferenceTextManager.getSensesByOccurrence(
      this.#transformProjectSelectorToSelector(selector),
    );
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setEntriesById(): Promise<DataProviderUpdateInstructions<LexicalReferenceProjectDataTypes>> {
    throw new Error('This lexical reference text is readonly. Cannot set entries by ID.');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setEntriesByOccurrence(): Promise<
    DataProviderUpdateInstructions<LexicalReferenceProjectDataTypes>
  > {
    throw new Error('This lexical reference text is readonly. Cannot set entries by occurrence.');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setSensesById(): Promise<DataProviderUpdateInstructions<LexicalReferenceProjectDataTypes>> {
    throw new Error('This lexical reference text is readonly. Cannot set senses by ID.');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setSensesByOccurrence(): Promise<
    DataProviderUpdateInstructions<LexicalReferenceProjectDataTypes>
  > {
    throw new Error('This lexical reference text is readonly. Cannot set senses by occurrence.');
  }

  // Because this is a base project data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setExtensionData(): Promise<DataProviderUpdateInstructions<MandatoryProjectDataTypes>> {
    throw new Error(ERROR_MESSAGE_NO_EXTENSION_DATA);
  }

  // Because this is a base project data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  getExtensionData(): Promise<string | undefined> {
    throw new Error(ERROR_MESSAGE_NO_EXTENSION_DATA);
  }

  // Because this is a base project data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setSetting(): Promise<DataProviderUpdateInstructions<MandatoryProjectDataTypes>> {
    throw new Error(ERROR_MESSAGE_NO_CHANGE_SETTING_DATA);
  }

  async getSetting<ProjectSettingName extends ProjectSettingNames>(
    key: ProjectSettingName,
  ): Promise<ProjectSettingTypes[ProjectSettingName]> {
    switch (key) {
      case 'platform.name':
        // TypeScript doesn't realize ProjectSettingName is 'platform.name' in this case for some reason
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return this.lexicalReferenceText.id as ProjectSettingTypes[ProjectSettingName];
      case 'platform.fullName':
        // ENHANCE: add titles into the database and provide titles here
        // TypeScript doesn't realize ProjectSettingName is 'platform.name' in this case for some reason
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return this.lexicalReferenceText.id as ProjectSettingTypes[ProjectSettingName];
      case 'platform.language':
        // ENHANCE: This is supposed to be a localized name of the language for this project, but we
        // just have BCP-47 codes. Localize these codes and localize the join
        // TypeScript doesn't realize ProjectSettingName is 'platform.name' in this case for some reason
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return Object.keys(this.lexicalReferenceText.localizedInfoByBCP47Code).join(
          ', ',
        ) as ProjectSettingTypes[ProjectSettingName];
      case 'platform.isEditable':
        // TypeScript doesn't realize ProjectSettingName is 'platform.name' in this case for some reason
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return false as ProjectSettingTypes[ProjectSettingName];
      default:
        return papi.projectSettings.getDefault(key);
    }
  }

  // Because this is a base project data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  resetSetting(): Promise<boolean> {
    throw new Error(ERROR_MESSAGE_NO_CHANGE_SETTING_DATA);
  }

  async dispose() {
    return this.#changeLexicalReferenceTextsUnsubscriber();
  }

  /**
   * Transforms the project-specific selector into its equivalent general lexical reference
   * selector. Returns a new object; does not mutate the original selector
   */
  #transformProjectSelectorToSelector(
    selector: LexicalReferenceProjectSelector,
  ): LexicalReferenceSelector {
    return {
      ...selector,
      lexicalReferenceTextId: this.lexicalReferenceText.id,
    };
  }
}
