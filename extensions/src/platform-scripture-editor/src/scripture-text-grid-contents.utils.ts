import type {
  DblResourceReference,
  ProjectReference,
  ResourceReference,
  ResourceReferenceList,
  TextCollectionOverlay,
} from 'platform-scripture';
import { isDblResourceReference, isProjectReference } from './resource-reference.utils';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';

/**
 * A Bible-text reference — the only reference types that carry `id` and
 * `isInTextCollectionForUser`.
 */
type BibleTextReference = ProjectReference | DblResourceReference;

/**
 * The three data sources that together determine what a given user sees in the Text Collection.
 *
 * The admin's text-collection opinions live solely on `referencedProjectsAndResources`: model texts
 * are decoupled from the text-collection feature (they carry no `isInTextCollection` flag and the
 * overlay is initialized only from the referenced list), so they are not a source here.
 */
export type TextCollectionSources = {
  /** Admin project-scope `platformScripture.referencedProjectsAndResources` list. */
  adminReferenced: ResourceReferenceList;
  /** The current user's per-user `UserReferencedProjectsAndResources` list. */
  userReferenced: ResourceReferenceList;
  /** The current user's per-user text-collection overlay (keyed by resource id). */
  overlay: TextCollectionOverlay;
  /** The current user's preferred cell order (resource ids); `[]` when unset. */
  order: string[];
};

/** A single row in the View Options TEXTS list. */
export type ViewOptionsTextEntry = {
  /** The Bible-text reference this row represents. */
  reference: BibleTextReference;
  /** Whether the row's checkbox is checked (i.e. the text shows in the grid for this user). */
  checked: boolean;
  /**
   * `true` for admin-selected (top-section) rows: the user may uncheck them to hide the text from
   * the grid, but the row stays in the list and has no remove (hover-X) affordance.
   */
  isAdminLocked: boolean;
  /**
   * `true` only for genuine user-list entries — the only rows that show a remove (hover-X)
   * affordance; `false` for every admin-owned row (top or bottom), which can be unchecked but never
   * removed.
   */
  isUserRemovable: boolean;
};

/** An admin-owned entry: one Bible-text reference plus whether the admin currently flags it shown. */
type AdminOwnedEntry = { reference: BibleTextReference; adminFlagged: boolean };

/** Narrows any reference to a Bible-text reference and returns its id, else `undefined`. */
function getBibleTextId(reference: unknown): string | undefined {
  if (isProjectReference(reference) || isDblResourceReference(reference)) return reference.id;
  return undefined;
}

/**
 * The Bible-text resources the admin owns for the Text Collection, decided per referenced-list
 * item: a resource is owned when the admin has an opinion on it (`isInTextCollection` set to `true`
 * or `false`) or the user still has an overlay slot for it from a prior admin selection.
 * Deduplicated by `id`, referenced-list order.
 *
 * Only the admin `referencedProjectsAndResources` list is read — model texts are decoupled from the
 * text-collection feature. A resource merely present in the referenced list with no flag (e.g.
 * downloaded for another feature) is NOT owned — the user can add it to their own list like any
 * other resource. An overlay slot whose id is no longer in the referenced list is ignored: there is
 * no reference left to render.
 *
 * `adminFlagged` is `true` when the resource is currently text-collection in the referenced list.
 */
function getAdminOwnedEntries(
  adminReferenced: ResourceReferenceList,
  overlay: TextCollectionOverlay,
): AdminOwnedEntry[] {
  const byId = new Map<string, AdminOwnedEntry>();
  const entries: AdminOwnedEntry[] = [];

  const consider = (item: ResourceReference) => {
    if (!isProjectReference(item) && !isDblResourceReference(item)) return;

    const isFlagSet = item.isInTextCollection !== undefined;
    if (!isFlagSet && !Object.hasOwn(overlay, item.id)) return;

    const flagged = item.isInTextCollection === true;
    const existing = byId.get(item.id);
    if (existing) {
      if (flagged) existing.adminFlagged = true;
      return;
    }

    const entry: AdminOwnedEntry = { reference: item, adminFlagged: flagged };
    byId.set(item.id, entry);
    entries.push(entry);
  };

  adminReferenced.items.forEach(consider);
  return entries;
}

/**
 * The user's effective shown-state for an admin-owned entry: their overlay choice, else the admin
 * flag.
 */
function isAdminEntryShown(overlay: TextCollectionOverlay, entry: AdminOwnedEntry): boolean {
  return Object.hasOwn(overlay, entry.reference.id)
    ? overlay[entry.reference.id]
    : entry.adminFlagged;
}

/**
 * Whether `resourceId` is an admin-owned entry for the given sources (see
 * {@link getAdminOwnedEntries}).
 */
function isAdminOwnedId(resourceId: string, sources: TextCollectionSources): boolean {
  const { adminReferenced, overlay } = sources;
  return getAdminOwnedEntries(adminReferenced, overlay).some(
    (entry) => entry.reference.id === resourceId,
  );
}

/**
 * Computes the Bible-text references that render in the Scripture Text Grid for the current user:
 * admin-owned entries the user has shown (overlay choice, falling back to the admin flag), followed
 * by the user's own list entries with `isInTextCollectionForUser === true`. Deduplicated by `id`
 * with admin precedence; admin entries keep referenced-list order, user entries keep user-list
 * order.
 */
export function getScriptureTextGridContents(sources: TextCollectionSources): BibleTextReference[] {
  const { adminReferenced, userReferenced, overlay } = sources;
  const adminOwned = getAdminOwnedEntries(adminReferenced, overlay);
  const seen = new Set<string>();
  const contents: BibleTextReference[] = [];

  adminOwned.forEach((entry) => {
    seen.add(entry.reference.id);
    if (isAdminEntryShown(overlay, entry)) contents.push(entry.reference);
  });

  userReferenced.items.forEach((item) => {
    if (!isProjectReference(item) && !isDblResourceReference(item)) return;
    if (seen.has(item.id)) return;
    seen.add(item.id);
    if (item.isInTextCollectionForUser === true) contents.push(item);
  });

  return contents;
}

/**
 * Splits the View Options TEXTS list into two ordered sections:
 *
 * - `top` — the admin's current selection (`isInTextCollection === true`). Always visible and locked
 *   from removal (`isAdminLocked: true`); the user may only uncheck to hide from the grid.
 * - `bottom` — resources the user can freely toggle and remove (`isAdminLocked: false`): other
 *   admin-owned entries (opted out, or shown before) followed by the user's own list additions.
 *
 * Checkbox state comes from the overlay for admin-owned entries and from
 * `isInTextCollectionForUser` for the user's own entries. An admin-owned id never also appears as a
 * user entry (admin precedence).
 */
export function getViewOptionsTexts(sources: TextCollectionSources): {
  top: ViewOptionsTextEntry[];
  bottom: ViewOptionsTextEntry[];
} {
  const { adminReferenced, userReferenced, overlay } = sources;
  const adminOwned = getAdminOwnedEntries(adminReferenced, overlay);
  const top: ViewOptionsTextEntry[] = [];
  const bottom: ViewOptionsTextEntry[] = [];
  const adminIds = new Set<string>();

  adminOwned.forEach((entry) => {
    adminIds.add(entry.reference.id);
    const row = {
      reference: entry.reference,
      checked: isAdminEntryShown(overlay, entry),
      isAdminLocked: entry.adminFlagged,
      isUserRemovable: false,
    };
    (entry.adminFlagged ? top : bottom).push(row);
  });

  userReferenced.items.forEach((item) => {
    if (!isProjectReference(item) && !isDblResourceReference(item)) return;
    if (adminIds.has(item.id)) return; // admin-owned ids are rendered by the loop above
    bottom.push({
      reference: item,
      checked: item.isInTextCollectionForUser === true,
      isAdminLocked: false,
      isUserRemovable: true,
    });
  });

  return { top, bottom };
}

/**
 * Records the user's shown/hidden choice for a resource, returning the next state (callers
 * persist). Routes by ownership: an admin-owned entry writes the per-user overlay (the admin's flag
 * is untouched); a user-list entry writes that item's `isInTextCollectionForUser`. Unknown ids are
 * a no-op.
 */
export function setUserDisplay(
  resourceId: string,
  shown: boolean,
  sources: TextCollectionSources,
): { userReferenced: ResourceReferenceList; overlay: TextCollectionOverlay } {
  const { userReferenced, overlay } = sources;

  if (isAdminOwnedId(resourceId, sources))
    return { userReferenced, overlay: { ...overlay, [resourceId]: shown } };

  const index = userReferenced.items.findIndex((item) => getBibleTextId(item) === resourceId);
  if (index < 0) return { userReferenced, overlay };

  const items = userReferenced.items.map((item, itemIndex) =>
    itemIndex === index ? { ...item, isInTextCollectionForUser: shown } : item,
  );
  return { userReferenced: { dataVersion: CURRENT_DATA_VERSION, items }, overlay };
}

/**
 * Removes a resource from the user's per-user list entirely (the hover-X remove affordance). No-op
 * when the id is not in the user list — including admin entries, which never live there
 * (defense-in-depth).
 *
 * Only Bible-text references (project / DBL resource) can be removed: matching is by
 * {@link getBibleTextId}, which returns `undefined` for non-Bible-text references (e.g.
 * `enhancedResource`), so those never match `resourceId` and are left untouched. By design the Text
 * Collection holds only Bible-text references, so this is not a gap.
 */
export function removeFromUserResources(
  resourceId: string,
  userReferenced: ResourceReferenceList,
): ResourceReferenceList {
  const items = userReferenced.items.filter((item) => getBibleTextId(item) !== resourceId);
  if (items.length === userReferenced.items.length) return userReferenced;
  return { dataVersion: CURRENT_DATA_VERSION, items };
}

/**
 * Appends a Bible-text reference to the user's per-user list with `isInTextCollectionForUser ===
 * true` (the Get Resources flow). Idempotent: returns the list unchanged when the id is already
 * present.
 *
 * Precondition: `reference` must not be an admin-owned resource. Admin-owned resources are
 * overlay-driven — toggle them with {@link setUserDisplay}; a user-list entry for one is ignored by
 * the read helpers. The Get Resources flow only adds resources the user picked that aren't already
 * in the admin selection.
 */
export function addToUserResources(
  reference: BibleTextReference,
  userReferenced: ResourceReferenceList,
): ResourceReferenceList {
  if (userReferenced.items.some((item) => getBibleTextId(item) === reference.id)) {
    return userReferenced;
  }
  return {
    dataVersion: CURRENT_DATA_VERSION,
    items: [...userReferenced.items, { ...reference, isInTextCollectionForUser: true }],
  };
}
