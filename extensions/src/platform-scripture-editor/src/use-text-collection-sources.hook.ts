import { useMemo } from 'react';
import { isPlatformError, type PlatformError } from 'platform-bible-utils';
import type { ResourceReferenceList, ShownByDefaultOverlay } from 'platform-scripture';
import { useProjectData, useProjectSetting } from '@papi/frontend/react';
import type { TextCollectionSources } from './scripture-text-grid/scripture-text-grid-contents.utils';
import { DEFAULT_RESOURCE_REFERENCE_LIST as DEFAULT_LIST } from './resource-reference-list.const';

// Empty overlay while it loads or on error; `getScriptureTextGridContents` falls back to the admin
// `isResourceShownByDefault` flag when a resource has no overlay entry.
const EMPTY_OVERLAY: ShownByDefaultOverlay = Object.freeze({});

/** Unwraps a possibly-errored reference-list value to a usable list (empty on error). */
function unwrapList(value: ResourceReferenceList | PlatformError): ResourceReferenceList {
  return isPlatformError(value) ? DEFAULT_LIST : value;
}

/**
 * Assembles the four data sources `getScriptureTextGridContents` (A3) consumes for a project: the
 * two admin project-scope lists (`modelTexts` + `referencedProjectsAndResources` — both are read
 * because A2's auto-promote strips the shown-by-default flag off the referenced copy, so the flag
 * survives only on `modelTexts`), the current user's referenced list, and the per-user overlay.
 * Errors on any source degrade to an empty list / empty overlay so the grid stays renderable.
 *
 * @param projectId The project whose Text Collection sources to read.
 * @returns `[sources, isLoading]` — `sources` always well-formed (empty defaults while loading).
 */
export function useTextCollectionSources(
  projectId: string | undefined,
): [TextCollectionSources, boolean] {
  const [adminModelTexts, , , isModelTextsLoading] = useProjectSetting(
    projectId,
    'platformScripture.modelTexts',
    DEFAULT_LIST,
  );
  const [adminReferenced, , , isReferencedLoading] = useProjectSetting(
    projectId,
    'platformScripture.referencedProjectsAndResources',
    DEFAULT_LIST,
  );
  const [userReferenced, , isUserReferencedLoading] = useProjectData(
    'platformScripture.textConnectionSettings',
    projectId,
  ).UserReferencedProjectsAndResources(undefined, DEFAULT_LIST);
  const [overlay, , isOverlayLoading] = useProjectData(
    'platformScripture.textConnectionSettings',
    projectId,
  ).ShownByDefaultOverlay(undefined, EMPTY_OVERLAY);

  const sources = useMemo<TextCollectionSources>(
    () => ({
      adminModelTexts: unwrapList(adminModelTexts),
      adminReferenced: unwrapList(adminReferenced),
      userReferenced: unwrapList(userReferenced),
      overlay: isPlatformError(overlay) ? EMPTY_OVERLAY : overlay,
    }),
    [adminModelTexts, adminReferenced, userReferenced, overlay],
  );

  const isLoading =
    isModelTextsLoading || isReferencedLoading || isUserReferencedLoading || isOverlayLoading;

  return [sources, isLoading];
}

export default useTextCollectionSources;
