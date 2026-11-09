/**
 * The resources whose install, update or removal the user has asked for while the running sync
 * holds them. The data provider waits for the sync to release such a resource before it starts, so
 * the row says so instead of showing progress.
 *
 * A resource the sync holds that the user has not acted on is not listed: the sync updating it is
 * not the user's action.
 *
 * @param idsBeingHandled DBL entry uids the user has an action in flight for.
 * @param syncHeldResourceIds DBL entry uids the running sync holds. Compared ignoring case, as the
 *   backend does.
 * @returns The uids from `idsBeingHandled` that the sync holds, as they were given.
 */
export function getIdsWaitingForSync(
  idsBeingHandled: readonly string[],
  syncHeldResourceIds: readonly string[],
): string[] {
  if (syncHeldResourceIds.length === 0) return [];
  const held = new Set(syncHeldResourceIds.map((id) => id.toLowerCase()));
  return idsBeingHandled.filter((id) => held.has(id.toLowerCase()));
}
