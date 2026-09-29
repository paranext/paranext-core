import type { UseWebViewStateHook } from '@papi/core';
import { NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY } from 'platform-bible-utils/experimental';
import { useEffect, useMemo } from 'react';
import { resolveNavigableProjectIdsWrite } from './navigable-project-ids.utils';

/** Stable default for `useWebViewState`, so the hook does not hand it a fresh array each render. */
const EMPTY_PROJECT_IDS: string[] = [];

/**
 * Which project the currently-published list was built for. Kept in a separate key because
 * {@link NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY} is read by global navigation UI and its shape is
 * not this hook's to change.
 */
const NAVIGABLE_PROJECT_IDS_OWNER_WEB_VIEW_STATE_KEY = 'navigableProjectIdsOwningProjectId';

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
 * That guard assumes a remount means the _same_ project's data is coming back, which is not true
 * for a view re-pointed by `reloadWebView`: the web view id is reused, so the persisted list
 * survives while the project changes underneath it. `owningProjectId` closes that hole — a list
 * built for a different project is dropped immediately rather than served to global navigation
 * until the new project's sources land.
 *
 * Membership, not order, decides whether anything is written: every publish is a web view
 * definition update that lands in layout persistence, so a reorder must not cost a write.
 *
 * @param useWebViewState The web view's own `useWebViewState` from its `WebViewProps`
 * @param displayedProjectIds Installed project ids of the projects the view currently displays. May
 *   be a fresh array each render; only its membership is depended on.
 * @param isReady Whether every source `displayedProjectIds` is derived from has loaded. Nothing is
 *   published while false.
 * @param owningProjectId The project `displayedProjectIds` is derived from. When this and the
 *   recorded owner are both known and differ, the stale list is cleared without waiting for
 *   `isReady`. Either being `undefined` means unknown provenance rather than foreign, so the list
 *   is kept and adopted instead.
 */
export function usePublishNavigableProjectIds(
  useWebViewState: UseWebViewStateHook,
  displayedProjectIds: string[],
  isReady: boolean,
  owningProjectId: string | undefined,
): void {
  const [publishedNavigableProjectIds, setPublishedNavigableProjectIds] = useWebViewState<string[]>(
    NAVIGABLE_PROJECT_IDS_WEB_VIEW_STATE_KEY,
    EMPTY_PROJECT_IDS,
  );
  const [publishedOwningProjectId, setPublishedOwningProjectId] = useWebViewState<
    string | undefined
  >(NAVIGABLE_PROJECT_IDS_OWNER_WEB_VIEW_STATE_KEY, undefined);

  // A membership fingerprint, so callers can pass a freshly built array every render without
  // re-running the effect. Sorted because set equality, not order, is what matters. NUL-separated
  // so no pair of distinct id sets can collide into the same key — a space would let {'A B'} and
  // {'A', 'B'} agree, silently suppressing a real change.
  const displayedProjectIdsKey = useMemo(
    () => [...new Set(displayedProjectIds)].sort().join('\u0000'),
    [displayedProjectIds],
  );

  useEffect(() => {
    // Only a KNOWN mismatch counts as "this list belongs to another project". Two cases look like a
    // mismatch but are not, and clearing on either would wipe a correct list — the very thing the
    // isReady gate below exists to prevent:
    //
    // - `owningProjectId` is undefined on the first renders of an unbound grid (the shipped default
    //   layout opens with no projectId), so we do not yet know whose list this is.
    // - `publishedOwningProjectId` is undefined for any list persisted before this key existed,
    //   which is every existing user on first ship. Unknown provenance, not foreign provenance —
    //   adopt it below rather than discarding it.
    const isOwnerKnown = owningProjectId !== undefined && publishedOwningProjectId !== undefined;
    const isOwnedByAnotherProject = isOwnerKnown && publishedOwningProjectId !== owningProjectId;
    if (isOwnedByAnotherProject && publishedNavigableProjectIds.length > 0) {
      setPublishedNavigableProjectIds(EMPTY_PROJECT_IDS);
      return;
    }

    if (!isReady) return;
    const toPublish = resolveNavigableProjectIdsWrite(
      displayedProjectIds,
      publishedNavigableProjectIds,
    );
    if (toPublish) setPublishedNavigableProjectIds(toPublish);
    // Stamp ownership whenever what is recorded no longer matches, which covers both adopting a
    // pre-existing unowned list and completing a re-point.
    if (publishedOwningProjectId !== owningProjectId) setPublishedOwningProjectId(owningProjectId);
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
    owningProjectId,
    publishedOwningProjectId,
    setPublishedOwningProjectId,
  ]);
}

export default usePublishNavigableProjectIds;
