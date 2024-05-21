import localizationDataService from '@shared/services/localization.service';
import {
  LocalizationData,
  LocalizationSelectors,
} from '@shared/services/localization.service-model';
import { DataProviderSubscriberOptions } from '@shared/models/data-provider.model';
import { useMemo } from 'react';
import useData from './use-data.hook';

/**
 * Gets localizations on the papi.
 *
 * @param keys LocalizationSelectors which are two arrays, one of keys to get localizations of and
 *   one of localization languages to look up the keys in
 *
 *   WARNING: MUST BE STABLE - const or wrapped in useState, useMemo, etc. The reference must not be
 *   updated every render
 * @param defaultState The initial value to return while first awaiting the localization values
 * @param subscriberOptions Various options to adjust how the subscriber emits updates
 *
 *   Note: this parameter is internally assigned to a `ref`, so changing it will not cause any hooks
 *   to re-run with its new value. This means that `subscriberOptions` will be passed to the data
 *   provider's `subscribe<data_type>` method as soon as possible and will not be updated again
 *   until `dataProviderSource` or `selector` changes.
 * @returns `[localizedStrings]`
 *
 *   - `localizedStrings`: The current state of the localizations, either `defaultState` or the stored
 *       state on the papi, if any
 */
const useLocalizedStrings = (
  localizationKeys: string[],
  localizationLocales?: string[],
  subscriberOptions?: DataProviderSubscriberOptions,
): [localizedStrings: LocalizationData, isLoading: boolean] => {
  const localizationSelectors = useMemo<LocalizationSelectors>(
    () => ({
      localizeKeys: localizationKeys,
      locales: localizationLocales,
    }),
    [localizationKeys, localizationLocales],
  );
  const defaultState: { [key: string]: string } = {};
  for (let i = 0; i < localizationKeys.length; i++) {
    const key = localizationKeys[i];
    defaultState[key] = key;
  }
  const [localizedStrings, , isLoading] = useData(
    localizationDataService.dataProviderName,
  ).LocalizedStrings(localizationSelectors, defaultState, subscriberOptions);

  return [localizedStrings, isLoading];
};
export default useLocalizedStrings;
