import papi, { logger } from '@papi/frontend';
import { usePromise } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import { useCallback } from 'react';

/** Which project the Text Collection may read and write its settings through. */
export type TextCollectionBinding = {
  /**
   * The project to bind the Text Collection's settings to, or `undefined` while there is none,
   * while its kind is still being read, or when it is a published resource.
   */
  collectionProjectId: string | undefined;
  /** Whether the project is a published resource, which has no Text Collection. */
  isPublishedResource: boolean;
};

const UNBOUND: TextCollectionBinding = {
  collectionProjectId: undefined,
  isPublishedResource: false,
};

/** A project's `platform.isPublished` reading, tagged with the project it was read for. */
type Classification = { projectId: string; isPublished: boolean };

/**
 * Reads whether `projectId` is a published resource. A failed read counts as not published, the
 * setting's own default, so a translation project's Text Collection stays usable.
 */
async function readIsPublished(projectId: string): Promise<boolean> {
  try {
    const pdp = await papi.projectDataProviders.get('platform.base', projectId);
    return (await pdp.getSetting('platform.isPublished')) === true;
  } catch (e) {
    logger.warn(
      `Could not read platform.isPublished for ${projectId} (${getErrorMessage(e)}); treating it as a translation project`,
    );
    return false;
  }
}

/**
 * Decides which project the Text Collection binds its settings to, given the project it shows.
 *
 * A published resource is never bound. `platform.isPublished` means nothing on the project may be
 * written, while the Text Collection writes into the project it is bound to: the first-open overlay
 * init runs on mount, and View Options writes on every change. Leaving the settings unbound makes
 * every one of those writes impossible rather than guarded one by one.
 *
 * Nothing is bound until the project's own answer arrives. The reading is tagged with its project
 * because `useProjectSetting` can keep serving the previous project's value for a render after the
 * id changes, which here would bind a resource on a translation project's answer.
 *
 * @param projectId The project the Text Collection shows, or `undefined` before it has one.
 * @returns See {@link TextCollectionBinding}.
 */
export function useTextCollectionBinding(projectId: string | undefined): TextCollectionBinding {
  const [classification] = usePromise<Classification | undefined>(
    useCallback(
      async () =>
        projectId === undefined
          ? undefined
          : { projectId, isPublished: await readIsPublished(projectId) },
      [projectId],
    ),
    undefined,
  );

  if (projectId === undefined || classification?.projectId !== projectId) return UNBOUND;
  return classification.isPublished
    ? { collectionProjectId: undefined, isPublishedResource: true }
    : { collectionProjectId: projectId, isPublishedResource: false };
}

export default useTextCollectionBinding;
