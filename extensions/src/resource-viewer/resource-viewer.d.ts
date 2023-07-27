import type { DataProviderDataType } from 'shared/models/data-provider.model';
import type IDataProvider from 'shared/models/data-provider.interface';

declare module 'resource-viewer' {}

// TODO: Should this eventually be turned into ScrText or should it utilize ScrText?
export type ResourceDataTypes = {
  Name: DataProviderDataType<string, string, string>;
  FullName: DataProviderDataType<string, string, string>;
  Id: DataProviderDataType<string, string, string>;
  Directory: DataProviderDataType<string, string, string>;
  FullPath: DataProviderDataType<string, string, string>;
  BooksPresentSet: DataProviderDataType<string, string, string>;
  // TODO: Change this to use VerseRef when it is ready
  Usfm: DataProviderDataType<string, string, string>;
  Resource: DataProviderDataType<string, string, string>;
};

/**
 * Selector: '*' will select all sneezes, 'users' will select all users, a string userId will
 * return all the sneezes from the user with the entered userId, a number sneezeId will return the
 * sneeze with that id, and a date will return all sneezes that occurred on
 * that date (eventually)
 * GetData: the same provider can either return sneezes or users based on the selector (see above)
 * SetData: string type is userId and will set a new sneeze,
 *  number type is sneezeId and will update an existing sneeze
 */
export type ResourceDataProvider = IDataProvider<ResourceDataTypes>;

declare module 'papi-commands' {
  export interface CommandHandlers {
    'resourceViewer.resources': () => Promise<string>;
    'resourceViewer.getUsfm': () => Promise<string>;
  }
}
