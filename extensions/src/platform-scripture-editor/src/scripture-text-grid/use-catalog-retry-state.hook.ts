import { useCallback, useEffect, useState } from 'react';

/**
 * Tracks a catalog retry the user started, from the click until the catalog fetch settles (either
 * way), so the retry banner can stay mounted through it.
 *
 * @param hasCatalogSettled Whether the catalog fetch has settled (succeeded or failed).
 * @param refetchCatalog Restarts the catalog fetch.
 */
export function useCatalogRetryState(
  hasCatalogSettled: boolean,
  refetchCatalog: () => void,
): { isRetrying: boolean; retry: () => void } {
  const [isRetrying, setIsRetrying] = useState(false);
  useEffect(() => {
    if (hasCatalogSettled) setIsRetrying(false);
  }, [hasCatalogSettled]);
  const retry = useCallback(() => {
    setIsRetrying(true);
    refetchCatalog();
  }, [refetchCatalog]);
  return { isRetrying, retry };
}

export default useCatalogRetryState;
