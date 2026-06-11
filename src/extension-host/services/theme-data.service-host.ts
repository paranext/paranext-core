import {
  ThemeDataDataTypes,
  IThemeDataService,
  themeDataServiceObjectToProxy,
  themeDataServiceProviderName,
} from '@shared/services/theme-data.service-model';
import { dataProviderService } from '@shared/services/data-provider.service';
import { DataProviderEngine, IDataProviderEngine } from '@shared/models/data-provider-engine.model';
import { DataProviderUpdateInstructions } from '@shared/models/data-provider.model';
import {
  createSyncProxyForAsyncObject,
  Unsubscriber,
  ThemeFamiliesByIdExpanded,
} from 'platform-bible-utils';
import { themesDocumentCombiner, onDidResyncContributions } from './contribution.service';

class ThemeDataDataProviderEngine
  extends DataProviderEngine<ThemeDataDataTypes>
  implements IDataProviderEngine<ThemeDataDataTypes>
{
  private unsubscribeOnDidResyncContributions: Unsubscriber | undefined;

  /** @param allThemeFamiliesById All Theme Data available to the application. */
  constructor(public allThemeFamiliesById: ThemeFamiliesByIdExpanded) {
    super();
    onDidResyncContributions(() => this.rebuildThemes());
  }

  async rebuildThemes(): Promise<void> {
    const currentThemes = themesDocumentCombiner.getAllThemeFamiliesById();
    if (!currentThemes) return;
    this.allThemeFamiliesById = currentThemes;
    this.notifyUpdate('*');
  }

  async getAllThemes(): Promise<ThemeFamiliesByIdExpanded> {
    return this.allThemeFamiliesById;
  }

  // setAllThemes doesn't use instance state but cannot be static because it implements the
  // IDataProviderEngine<ThemeDataDataTypes> interface
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async setAllThemes(): Promise<DataProviderUpdateInstructions<ThemeDataDataTypes>> {
    throw new Error('Cannot set all themes. Extensions can provide themes in contributions');
  }

  async dispose(): Promise<boolean> {
    if (this.unsubscribeOnDidResyncContributions) {
      const success = this.unsubscribeOnDidResyncContributions();
      this.unsubscribeOnDidResyncContributions = undefined;
      return success;
    }
    return true;
  }
}

let initializationPromise: Promise<void> | undefined;
/** Need to run initialize before using this */
let dataProvider: IThemeDataService;
export async function initialize(): Promise<void> {
  if (!initializationPromise) {
    initializationPromise = new Promise<void>((resolve, reject) => {
      const executor = async () => {
        try {
          const currentThemes = themesDocumentCombiner.getAllThemeFamiliesById();
          if (!currentThemes)
            throw new Error(
              'Theme data service host initialization error: Themes Document Combiner output was null!',
            );
          dataProvider = await dataProviderService.registerEngine(
            themeDataServiceProviderName,
            new ThemeDataDataProviderEngine(currentThemes),
          );
          resolve();
        } catch (error) {
          // Clear the cached promise so the next call retries instead of failing forever
          initializationPromise = undefined;
          reject(error);
        }
      };
      executor();
    });
  }
  return initializationPromise;
}

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingThemeDataService = {
  implementThemeDataDataProviderEngine: (dataObj: ThemeFamiliesByIdExpanded) => {
    return new ThemeDataDataProviderEngine(dataObj);
  },
};

// This will be needed later for disposing of the data provider, choosing to ignore instead of
// remove code that will be used later
// @ts-ignore 6133
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const themeDataService = createSyncProxyForAsyncObject<IThemeDataService>(async () => {
  await initialize();
  return dataProvider;
}, themeDataServiceObjectToProxy);
