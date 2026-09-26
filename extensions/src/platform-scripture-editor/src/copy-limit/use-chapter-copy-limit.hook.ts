import papi, { logger } from '@papi/frontend';
import { useProjectData, useProjectDataProvider } from '@papi/frontend/react';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { usePromise } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { blockCopyWhileChapterLoads, resolveCopyLimit } from './resolve-copy-limit.util';
import { useIsProjectDataLoading } from './use-is-project-data-loading.hook';

const COPY_LIMIT_PROJECT_INTERFACE = 'platformScripture.CopyLimit';

/**
 * How long a failed lookup is reused before it is tried again. A metadata lookup asks every project
 * data provider factory, so a project whose lookup keeps failing must not cost one lookup per mount
 * (see `adr-provider-lookup-is-a-fan-out`).
 */
const FAILED_LOOKUP_RETRY_DELAY_MS = 30_000;

/** Whether a project's metadata lists the copy-limit interface, or `undefined` if the lookup failed. */
type CopyLimitSupport = { offersCopyLimit: boolean | undefined; failedAt?: number };

type CopyLimitSupportLookup = {
  promise: Promise<boolean | undefined>;
  /** The answer, once the lookup has settled. */
  settled?: CopyLimitSupport;
};

/**
 * One lookup per project, shared by every view in this web view and kept for its lifetime: a
 * project's interfaces do not change while it stays open.
 */
const copyLimitSupportLookups = new Map<string, CopyLimitSupportLookup>();

/** Forgets every lookup. For tests only, so each test starts without earlier tests' answers. */
export function resetForTesting() {
  copyLimitSupportLookups.clear();
}

/** The lookup for `projectId` to reuse, if there is one: pending, answered, or recently failed. */
function getReusableLookup(projectId: string): CopyLimitSupportLookup | undefined {
  const lookup = copyLimitSupportLookups.get(projectId);
  const failedAt = lookup?.settled?.failedAt;
  if (failedAt !== undefined && Date.now() - failedAt >= FAILED_LOOKUP_RETRY_DELAY_MS)
    return undefined;
  return lookup;
}

/**
 * Whether the metadata of `projectId` lists the copy-limit interface: `true` or `false`, or
 * `undefined` if the metadata could not be looked up. The lookup has no interface filter, so it
 * answers for every project it knows.
 */
function lookUpCopyLimitSupport(projectId: string): Promise<boolean | undefined> {
  const reusable = getReusableLookup(projectId);
  if (reusable) return reusable.promise;

  const lookup: CopyLimitSupportLookup = { promise: Promise.resolve(undefined) };
  lookup.promise = (async () => {
    try {
      const metadata = await papi.projectLookup.getMetadataForProject(projectId);
      const offersCopyLimit = metadata.projectInterfaces.includes(COPY_LIMIT_PROJECT_INTERFACE);
      lookup.settled = { offersCopyLimit };
      return offersCopyLimit;
    } catch (e) {
      lookup.settled = { offersCopyLimit: undefined, failedAt: Date.now() };
      logger.warn(
        `Failed to look up the copy-limit interface of project ${projectId}: ${getErrorMessage(e)}`,
      );
      return undefined;
    }
  })();
  copyLimitSupportLookups.set(projectId, lookup);
  return lookup.promise;
}

/**
 * The editor `copyLimit` for the chapter `scrRef` points to in `projectId`. The limits are looked
 * up in `scrRef`'s versification, so they match the chapter text fetched with the same reference.
 * Subscribes once per book and versification, so changing chapter within a book needs no new
 * request.
 *
 * @param isChapterTextLoading Whether the text of the chapter `scrRef` points to is still loading;
 *   the result is also `0` while it is true (see `blockCopyWhileChapterLoads`). Pass
 *   `'applied-by-caller'` only when the caller combines the result with
 *   `blockCopyWhileChapterLoads` itself.
 * @returns The chapter's limit, resolved from the project's copy-limit provider as its metadata
 *   lists it; `undefined` means no limit; `0` while the limit is loading or after the request
 *   fails. `0` blocks copying and the Select All shortcut for every text.
 */
export function useChapterCopyLimit(
  projectId: string | undefined,
  scrRef: SerializedVerseRef,
  isChapterTextLoading: boolean | 'applied-by-caller',
): number | undefined {
  const { book, versificationStr } = scrRef;
  const bookSelector = useMemo<SerializedVerseRef>(
    () => ({
      book,
      chapterNum: 1,
      verseNum: 1,
      ...(versificationStr !== undefined && { versificationStr }),
    }),
    [book, versificationStr],
  );
  // One resolved provider backs both the subscription and the loading check below.
  const copyLimitProvider = useProjectDataProvider(COPY_LIMIT_PROJECT_INTERFACE, projectId);
  const [value, , isLoading] = useProjectData(
    COPY_LIMIT_PROJECT_INTERFACE,
    copyLimitProvider,
  ).BookCopyLimits(bookSelector, undefined);
  const isLimitLoading = useIsProjectDataLoading(bookSelector, isLoading, {
    projectId,
    dataProvider: copyLimitProvider,
  });

  // Resolve the limit from the project's copy-limit provider as the project's metadata lists it. An
  // answer already in hand is used at once, so a view that mounts later does not wait for it.
  const settledSupport = projectId ? getReusableLookup(projectId)?.settled : undefined;
  const getPendingSupport = useCallback(
    async () =>
      projectId
        ? { projectId, offersCopyLimit: await lookUpCopyLimitSupport(projectId) }
        : undefined,
    [projectId],
  );
  const [pendingSupport] = usePromise(
    settledSupport || !projectId ? undefined : getPendingSupport,
    undefined,
  );
  let offersCopyLimit: boolean | undefined;
  if (settledSupport) offersCopyLimit = settledSupport.offersCopyLimit;
  // `usePromise` keeps the previous project's answer until the new lookup resolves.
  else if (pendingSupport && pendingSupport.projectId === projectId)
    offersCopyLimit = pendingSupport.offersCopyLimit;

  // Try a failed lookup again while this view stays open, rather than only on the next mount: the
  // re-render finds the failure too old to reuse and starts a new lookup.
  const [, rerender] = useReducer((renderCount: number) => renderCount + 1, 0);
  const lookupFailedAt = settledSupport?.failedAt;
  useEffect(() => {
    if (lookupFailedAt === undefined) return undefined;
    const timer = setTimeout(rerender, lookupFailedAt + FAILED_LOOKUP_RETRY_DELAY_MS - Date.now());
    return () => clearTimeout(timer);
  }, [lookupFailedAt]);

  let copyLimit: number | undefined;
  if (offersCopyLimit === false) copyLimit = undefined;
  else if (offersCopyLimit === undefined || isLimitLoading) copyLimit = 0;
  else copyLimit = resolveCopyLimit({ value, isLoading, chapterNum: scrRef.chapterNum });

  return isChapterTextLoading === 'applied-by-caller'
    ? copyLimit
    : blockCopyWhileChapterLoads(copyLimit, isChapterTextLoading);
}
