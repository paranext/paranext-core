import projectDataProviderService from '@shared/services/data-provider.service';
import { ProjectDataProvider } from '@shared/models/project-data-provider-engine.model';
import { useCallback, useMemo, useState } from 'react';
import useEvent from '@renderer/hooks/papi-hooks/use-event.hook';
import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';
import { isString } from '@shared/utils/util';

/**
 * Gets a project data provider with specified provider name
 * @param dataProviderSource string name of the data provider to get OR projectDataProvider (result
 * of useProjectDataProvider, if you want this hook to just return the data provider again)
 * @returns undefined if the project data provider has not been retrieved, the requested project
 *  data provider if it has been retrieved and is not disposed, and undefined again if the project
 *  data provider is disposed
 *
 * @type `T` - the type of project data provider to return. Use
 *  `IProjectDataProvider<TProjectDataProviderDataTypes>`, specifying your own types, or provide a
 *  custom project data provider type
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useProjectDataProvider<T extends ProjectDataProvider>(
  dataProviderSource: string | T | undefined,
): T | undefined {
  // Check to see if they passed in the results of a useDataProvider hook or undefined
  const didReceiveDataProvider = !isString(dataProviderSource);

  // Get the requested project data provider
  // Note: do nothing if we have already received a project data provider, but still run this hook.
  // (We must make sure to run the same number of hooks in all code paths.)
  const [dataProvider] = usePromise(
    useMemo(() => {
      return didReceiveDataProvider
        ? // We already have a project data provider or undefined, so we don't need to run this promise
          undefined
        : async () =>
            // We have the project data provider's type, so we need to get the provider
            dataProviderSource
              ? // Type assert here - the user of this hook must make sure to provide the correct type
                (projectDataProviderService.get(dataProviderSource) as Promise<T | undefined>)
              : undefined;
    }, [didReceiveDataProvider, dataProviderSource]),
    undefined,
  );

  // Disable this hook when the project data provider is disposed
  // Note: do nothing if we already received a project data provider, but still run this hook.
  // (We must make sure to run the same number of hooks in all code paths.)
  const [isDisposed, setIsDisposed] = useState<boolean>(false);
  useEvent(
    !didReceiveDataProvider && dataProvider && !isDisposed
      ? // REVIEW: I'm pretty sure there must be a better way...
        dataProvider.ParatextStandard?.onDidDispose ??
          dataProvider.NotesOnly?.onDidDispose ??
          dataProvider.MyExtensionProjectTypeName?.onDidDispose ??
          undefined
      : undefined,
    useCallback(() => setIsDisposed(true), []),
  );

  // If we received a data provider or undefined, return it
  if (didReceiveDataProvider) return dataProviderSource;

  // If we had to get a data provider, return it if it is not disposed
  return dataProvider && !isDisposed ? dataProvider : undefined;
}

export default useProjectDataProvider;
