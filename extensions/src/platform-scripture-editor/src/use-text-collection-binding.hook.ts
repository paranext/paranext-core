import papi, { logger } from '@papi/frontend';
import { usePromise } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import { useCallback, useEffect, useState } from 'react';

/** Which project the Text Collection may read and write its settings through. */
export type TextCollectionBinding = {
  /**
   * The project to bind the Text Collection's settings to, or `undefined` while there is none,
   * while its kind is still being read or cannot be, or when it is a published resource.
   */
  collectionProjectId: string | undefined;
  /** Whether the project is a published resource, which has no Text Collection. */
  isPublishedResource: boolean;
};

const UNBOUND: TextCollectionBinding = {
  collectionProjectId: undefined,
  isPublishedResource: false,
};

/** How long a failed `platform.isPublished` read waits before the project is read again. */
export const IS_PUBLISHED_RETRY_DELAY_MS = 30_000;

/**
 * A project's `platform.isPublished` reading, tagged with the project it was read for;
 * `isPublished` is `undefined` when the read failed.
 */
type Classification = { projectId: string; isPublished: boolean | undefined };

/**
 * Reads whether `projectId` is a published resource, or `undefined` when that cannot be read. A
 * failed read is not taken as "not published": the lookup also fails for a resource whose provider
 * registers late or that was installed mid-session.
 */
async function readIsPublished(projectId: string): Promise<boolean | undefined> {
  try {
    const pdp = await papi.projectDataProviders.get('platform.base', projectId);
    return (await pdp.getSetting('platform.isPublished')) === true;
  } catch (e) {
    logger.warn(
      `Could not read platform.isPublished for ${projectId} (${getErrorMessage(e)}); leaving the Text Collection unbound until it can be read`,
    );
    return undefined;
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
 * id changes, which here would bind a resource on a translation project's answer. A failed read
 * binds nothing and is tried again after {@link IS_PUBLISHED_RETRY_DELAY_MS} for as long as the
 * project is shown: one provider lookup per delay, which bounds the fan-out
 * (`.claude/rules/architecture/provider-lookups-fan-out.md`).
 *
 * @param projectId The project the Text Collection shows, or `undefined` before it has one.
 * @returns See {@link TextCollectionBinding}.
 */
export function useTextCollectionBinding(projectId: string | undefined): TextCollectionBinding {
  const [readAttempt, setReadAttempt] = useState(0);
  const [classification] = usePromise<Classification | undefined>(
    useCallback(
      async () =>
        projectId === undefined
          ? undefined
          : { projectId, isPublished: await readIsPublished(projectId) },
      // `readAttempt` is a trigger (value unread): each bump reads the project again.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [projectId, readAttempt],
    ),
    undefined,
  );

  const isCurrent = projectId !== undefined && classification?.projectId === projectId;
  const failedRead =
    isCurrent && classification.isPublished === undefined ? classification : undefined;
  // Keyed on the failed reading itself, so a retry that fails again arms the next one, and moving
  // off the project cancels it.
  useEffect(() => {
    if (!failedRead) return undefined;
    const timer = setTimeout(
      () => setReadAttempt((attempt) => attempt + 1),
      IS_PUBLISHED_RETRY_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, [failedRead]);

  if (!isCurrent || classification.isPublished === undefined) return UNBOUND;
  return classification.isPublished
    ? { collectionProjectId: undefined, isPublishedResource: true }
    : { collectionProjectId: projectId, isPublishedResource: false };
}

export default useTextCollectionBinding;
