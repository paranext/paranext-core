import { useMemo } from 'react';
import * as commandService from '@shared/services/command.service';
import usePromise from '@renderer/hooks/papi-hooks/use-promise.hook';

/** Ask the extension host for the asset from the given extension
 *  @param extensionName Name of the extension that packaged the asset in its installation directory
 *  @param assetName File name of the asset that was packaged
 *  @param defaultValue Value to provide for the asset while it is loading
 *  @param prefix Value to prepend to the asset after it has loaded, defaults to an empty string
 *  @param suffix Value to append to the asset after it has loaded, defaults to an empty string
 *  @returns If found, base64 encoded value of the requested asset with the prefix and suffix included. If not found, undefined.
 */
const useExtensionAsset = (
  extensionName: string,
  assetName: string,
  defaultValue: string,
  prefix: string = '',
  suffix: string = '',
): string | undefined => {
  const [assetValue] = usePromise(
    useMemo(() => {
      return async () => {
        const val: string = await commandService.sendCommand(
          'getExtensionAsset',
          extensionName,
          assetName,
        );
        return `${prefix}${val}${suffix}`;
      };
    }, [extensionName, assetName, prefix, suffix]),
    defaultValue,
  );
  return assetValue;
};

export default useExtensionAsset;
