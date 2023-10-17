import { useEffect, useState } from 'react';
import IDataProvider from '@shared/models/data-provider.interface';
import { isString } from '@shared/utils/util';
import dataProviderService from '@shared/services/data-provider.service';
import logger from '@shared/services/logger.service';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useDataProviderMulti<T extends IDataProvider<any>[]>(
  dataProviderSources: (string | T[number] | undefined)[],
): (T[number] | undefined)[] {
  type InputType = string | T[number] | undefined;
  type OutputType = T[number] | undefined;

  const [dataProviders, setDataProviders] = useState(() =>
    Array<OutputType>(dataProviderSources.length),
  );

  useEffect(() => {
    async function lookupDataProviders() {
      const dpPromises = dataProviderSources.map(async (source: InputType) => {
        if (!source) return undefined;
        if (!isString(source)) return source;

        const dataProvider = await dataProviderService.get(source);
        if (dataProvider) {
          dataProvider.onDidDispose(() => {
            setDataProviders((latestDataProviders) => {
              const updatedList = Array<OutputType>(latestDataProviders.length);
              latestDataProviders.forEach((dpInArray: OutputType, index: number) => {
                updatedList[index] = dpInArray === dataProvider ? undefined : dpInArray;
              });
              return updatedList;
            });
          });
        }
        return dataProvider;
      });
      try {
        setDataProviders(await Promise.all(dpPromises));
      } catch (error) {
        logger.warn(`Unable to set data providers: ${error}`);
      }
    }
    lookupDataProviders();
  }, [dataProviderSources]);

  return dataProviders;
}

export default useDataProviderMulti;
