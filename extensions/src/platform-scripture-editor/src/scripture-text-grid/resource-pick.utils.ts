/** What picking a resource in the picker should do. See {@link planResourcePick}. */
export type ResourcePickPlan = {
  /** Download the resource before anything else. */
  shouldInstall: boolean;
  /**
   * Confirm the download on its own, for a pick that installed a resource but has no text
   * collection to put it in. Only meaningful once the install has actually succeeded.
   */
  shouldConfirmDownloadOnly: boolean;
};

/**
 * Decides what a pick does, from whether the resource is already on disk and whether the panel has
 * a text collection bound.
 *
 * The load-bearing part is that `shouldInstall` ignores `hasTextConnection`: installing a resource
 * needs no text collection, so an unbound panel still downloads. Only adding it to a collection
 * needs one, which the caller checks against the collection's data provider directly. A pick that
 * can do neither — an already-installed resource with nowhere to add it — does nothing, which is
 * why the picker stops offering installed resources in that state.
 */
export function planResourcePick(
  isResourceInstalled: boolean,
  hasTextConnection: boolean,
): ResourcePickPlan {
  const shouldInstall = !isResourceInstalled;
  return { shouldInstall, shouldConfirmDownloadOnly: shouldInstall && !hasTextConnection };
}
