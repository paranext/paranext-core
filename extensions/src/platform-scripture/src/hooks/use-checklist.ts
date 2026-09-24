import { useEffect, useState } from 'react';
import papi, { logger } from '@papi/frontend';
import { getErrorMessage } from 'platform-bible-utils';
import type { IChecklistService } from 'platform-scripture';

/** Network object name for the Markers Checklist service (see data-contracts.md §4). */
export const CHECKLIST_SERVICE_NAME = 'platformScripture.checklistService';

/**
 * Return shape of {@link useChecklistService}.
 *
 * `service` is `undefined` while the NetworkObject proxy is being acquired (or if acquisition
 * fails). `isEditable` reflects the project-level `platform.isEditable` setting and gates the
 * editor-launch affordance. It defaults to `false` until the PDP has been read.
 */
export interface UseChecklistServiceResult {
  service: IChecklistService | undefined;
  isEditable: boolean;
}

/**
 * Acquires the Markers Checklist NetworkObject proxy and reads the project-level
 * `platform.isEditable` setting for the supplied `projectId`.
 *
 * Uses `papi.networkObjects.get<IChecklistService>(...)` (NOT `useDataProvider`) because the
 * checklist server surface is a plain NetworkObject with no get/set/subscribe triplet (see
 * `.context/features/markers-checklist/implementation/ui-alignment.md`, Network Object
 * Connection).
 *
 * This is the SCAFFOLD wiring produced by UI-PKG-001; full consumption of the returned service (the
 * actual `buildChecklistData(...)` call + state wiring) lands in UI-PKG-002.
 */
export function useChecklistService(projectId: string | undefined): UseChecklistServiceResult {
  const [service, setService] = useState<IChecklistService | undefined>();
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // Acquire the NetworkObject proxy once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const proxy = await papi.networkObjects.get<IChecklistService>(CHECKLIST_SERVICE_NAME);
        if (!cancelled) setService(proxy);
      } catch (error) {
        if (!cancelled)
          logger.warn(`useChecklistService: failed to acquire proxy: ${getErrorMessage(error)}`);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Read `platform.isEditable` from the project's base PDP. Skipped when projectId is undefined
  // (e.g. scaffold-only renders) — stays at the default `false`.
  useEffect(() => {
    if (!projectId) {
      setIsEditable(false);
      return () => {};
    }
    let cancelled = false;
    (async () => {
      try {
        const pdp = await papi.projectDataProviders.get('platform.base', projectId);
        const value = await pdp.getSetting('platform.isEditable');
        if (!cancelled) setIsEditable(Boolean(value));
      } catch (error) {
        if (!cancelled) {
          logger.warn(
            `useChecklistService: failed to read platform.isEditable for ${projectId}: ${getErrorMessage(error)}`,
          );
          setIsEditable(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  return { service, isEditable };
}

export default useChecklistService;
