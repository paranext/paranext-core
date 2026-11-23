import papi from '@papi/frontend';
import { useData } from '@papi/frontend/react';
import { isPlatformError } from 'platform-bible-utils';
import { useEffect, useState } from 'react';
import { resolveTextCollectionProjectId } from './scripture-text-grid-project.utils';

/**
 * The project whose text collection the grid shows: its explicit `projectId` if it has one,
 * otherwise the first project the window's `ActiveEditorProjectId` reports, kept from then on. See
 * {@link resolveTextCollectionProjectId} for why the grid never follows the active editor after
 * that.
 *
 * Deliberately NOT scroll group 0's source project (`useWebViewScrollGroupScrRef`'s 5th tuple
 * member): that field's only job is tagging which versification frame the current reference is in,
 * and it changes for reasons that have nothing to do with which project is active (Back/Forward, a
 * resource cell's own click, a click in the Comments or Checks panel).
 *
 * @param explicitProjectId The web view's own `projectId`, if it was opened with one
 * @returns The project id whose text collection to display, or `undefined` until one is known
 */
export function useTextCollectionProjectId(
  explicitProjectId: string | undefined,
): string | undefined {
  const [activeEditorProjectIdPossiblyError] = useData(
    papi.window.dataProviderName,
  ).ActiveEditorProjectId(undefined, undefined);
  const activeEditorProjectId = isPlatformError(activeEditorProjectIdPossiblyError)
    ? undefined
    : activeEditorProjectIdPossiblyError;

  const [effectiveProjectId, setEffectiveProjectId] = useState<string | undefined>(() =>
    resolveTextCollectionProjectId(undefined, { explicitProjectId, activeEditorProjectId }),
  );
  useEffect(() => {
    setEffectiveProjectId((previous) =>
      resolveTextCollectionProjectId(previous, { explicitProjectId, activeEditorProjectId }),
    );
  }, [explicitProjectId, activeEditorProjectId]);

  return effectiveProjectId;
}

export default useTextCollectionProjectId;
