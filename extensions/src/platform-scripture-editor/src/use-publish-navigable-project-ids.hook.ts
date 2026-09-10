import type { UseWebViewStateHook } from '@papi/core';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { useEffect, useMemo } from 'react';
import { resolveNavigableProjectIdsWrite } from './navigable-project-ids.utils';

/** Stable default for `useWebViewState`, so the hook does not hand it a fresh array each render. */
const EMPTY_PROJECT_IDS: string[] = [];

/**
 * Declares the projects a web view displays under {@link NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY},
 * so global navigation UI can offer their books. A web view definition's own `projectId` is the
 * container project, so a view that displays a resource other than its own project — or several
 * projects at once — is invisible to anything reading open web view definitions unless it declares
 * its members here.
 *
 * `isReady` is what keeps a transiently empty `displayedProjectIds` from being published: while a
 * view's sources are still loading, "nothing displayed yet" is indistinguishable from "everything
 * was removed", and publishing the latter would wipe a correct persisted list on remount. Callers
 * pass the readiness of every source `displayedProjectIds` is derived from.
 *
 * Membership, not order, decides whether anything is written: every publish is a web view
 * definition update that lands in layout persistence, so a reorder must not cost a write.
 *
 * @param useWebViewState The web view's own `useWebViewState` from its `WebViewProps`
 * @param displayedProjectIds Installed project ids of the projects the view currently displays. May
 *   be a fresh array each render; only its membership is depended on.
 * @param isReady Whether every source `displayedProjectIds` is derived from has loaded. Nothing is
 *   published while false.
 */
export function usePublishNavigableProjectIds(
  useWebViewState: UseWebViewStateHook,
  displayedProjectIds: string[],
  isReady: boolean,
): void {
  const [publishedNavigableProjectIds, setPublishedNavigableProjectIds] = useWebViewState<string[]>(
    NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
    EMPTY_PROJECT_IDS,
  );

  // A membership fingerprint, so callers can pass a freshly built array every render without
  // re-running the effect. Sorted because set equality, not order, is what matters. NUL-separated
  // so no pair of distinct id sets can collide into the same key — a space would let {'A B'} and
  // {'A', 'B'} agree, silently suppressing a real change.
  const displayedProjectIdsKey = useMemo(
    () => [...new Set(displayedProjectIds)].sort().join('\u0000'),
    [displayedProjectIds],
  );

  useEffect(() => {
    if (!isReady) return;
    const toPublish = resolveNavigableProjectIdsWrite(
      displayedProjectIds,
      publishedNavigableProjectIds,
    );
    if (toPublish) setPublishedNavigableProjectIds(toPublish);
    // Hidden case: intentionally handled by doing nothing special. This publishing is data-driven,
    // not geometry-driven, so the effect keeps running while the tab is inactive (rc-dock hides
    // panes with display:none but leaves them mounted) and the declared ids stay current. There is
    // nothing to defer and nothing to catch up on activation.

    // displayedProjectIdsKey is the real dependency: it is displayedProjectIds' membership
    // fingerprint, so depending on the array itself would re-run this for every equal-but-new array
    // a caller builds during render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isReady,
    displayedProjectIdsKey,
    publishedNavigableProjectIds,
    setPublishedNavigableProjectIds,
  ]);
}

export default usePublishNavigableProjectIds;
