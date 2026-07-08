import type {
  DblResourceReference,
  ProjectReference,
  ResourceReference,
  ResourceReferenceList,
  ShownByDefaultOverlay,
} from 'platform-scripture';
import { isDblResourceReference, isProjectReference } from './resource-reference.utils';
import { CURRENT_DATA_VERSION } from './resource-reference-list.const';

/** A Bible-text reference — the only reference types that carry `id` and `inTextCollectionUser`. */
type BibleTextReference = ProjectReference | DblResourceReference;

/**
 * The four data sources that together determine what a given user sees in the Text Collection.
 *
 * Two admin lists are read, not one: A2's auto-promote strips the `isResourceShownByDefault` flag
 * off the download copy it adds to `referencedProjectsAndResources`, so the flag survives on
 * `modelTexts`.
 */
export type TextCollectionSources = {
  /** Admin project-scope `platformScripture.modelTexts` list. */
  adminModelTexts: ResourceReferenceList;
  /** Admin project-scope `platformScripture.referencedProjectsAndResources` list. */
  adminReferenced: ResourceReferenceList;
  /** The current user's per-user `UserReferencedProjectsAndResources` list. */
  userReferenced: ResourceReferenceList;
  /** The current user's per-user shown-by-default overlay (keyed by resource id). */
  overlay: ShownByDefaultOverlay;
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
};

/** An admin-owned entry: one Bible-text reference plus whether the admin currently flags it shown. */
type AdminOwnedEntry = { reference: BibleTextReference; adminFlagged: boolean };

/** Narrows any reference to a Bible-text reference and returns its id, else `undefined`. */
function getBibleTextId(reference: unknown): string | undefined {
  if (isProjectReference(reference) || isDblResourceReference(reference)) return reference.id;
  return undefined;
}

/**
 * The Bible-text resources the admin owns for the Text Collection, decided per admin-list item: a
 * resource is owned when the admin has an opinion on it (`isResourceShownByDefault` set to `true`
 * or `false`) or the user still has an overlay slot for it from a prior admin selection.
 * Deduplicated by `id`, `modelTexts` order first.
 *
 * A resource merely present in an admin list with no flag (e.g. downloaded for another feature) is
 * NOT owned — the user can add it to their own list like any other resource. An overlay slot whose
 * id is no longer in either admin list is ignored: there is no reference left to render.
 *
 * `adminFlagged` is `true` when the resource is currently shown-by-default in either admin list.
 */
function getAdminOwnedEntries(
  adminModelTexts: ResourceReferenceList,
  adminReferenced: ResourceReferenceList,
  overlay: ShownByDefaultOverlay,
): AdminOwnedEntry[] {
  const byId = new Map<string, AdminOwnedEntry>();
  const entries: AdminOwnedEntry[] = [];

  const consider = (item: ResourceReference) => {
    if (!isProjectReference(item) && !isDblResourceReference(item)) return;
    const isFlagSet = item.isResourceShownByDefault !== undefined;
    if (!isFlagSet && !Object.hasOwn(overlay, item.id)) return;
    const flagged = item.isResourceShownByDefault === true;
    const existing = byId.get(item.id);
    if (existing) {
      if (flagged) existing.adminFlagged = true;
      return;
    }
    const entry: AdminOwnedEntry = { reference: item, adminFlagged: flagged };
    byId.set(item.id, entry);
    entries.push(entry);
  };

  adminModelTexts.items.forEach(consider);
  adminReferenced.items.forEach(consider);
  return entries;
}

/**
 * The user's effective shown-state for an admin-owned entry: their overlay choice, else the admin
 * flag.
 */
function isAdminEntryShown(overlay: ShownByDefaultOverlay, entry: AdminOwnedEntry): boolean {
  return Object.hasOwn(overlay, entry.reference.id)
    ? overlay[entry.reference.id]
    : entry.adminFlagged;
}

/**
 * Computes the Bible-text references that render in the Scripture Text Grid for the current user:
 * admin-owned entries the user has shown (overlay choice, falling back to the admin flag), followed
 * by the user's own list entries with `inTextCollectionUser === true`. Deduplicated by `id` with
 * admin precedence; admin entries keep project-list order, user entries keep user-list order.
 */
export function getScriptureTextGridContents(sources: TextCollectionSources): BibleTextReference[] {
  const { adminModelTexts, adminReferenced, userReferenced, overlay } = sources;
  const adminOwned = getAdminOwnedEntries(adminModelTexts, adminReferenced, overlay);
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
    if (item.inTextCollectionUser === true) contents.push(item);
  });

  return contents;
}

/**
 * Splits the View Options TEXTS list into two ordered sections:
 *
 * - `top` — the admin's current selection (`isResourceShownByDefault === true`). Always visible and
 *   locked from removal (`isAdminLocked: true`); the user may only uncheck to hide from the grid.
 * - `bottom` — resources the user can freely toggle and remove (`isAdminLocked: false`): other
 *   admin-owned entries (opted out, or shown before) followed by the user's own list additions.
 *
 * Checkbox state comes from the overlay for admin-owned entries and from `inTextCollectionUser` for
 * the user's own entries. An admin-owned id never also appears as a user entry (admin precedence).
 */
export function getViewOptionsTexts(sources: TextCollectionSources): {
  top: ViewOptionsTextEntry[];
  bottom: ViewOptionsTextEntry[];
} {
  const { adminModelTexts, adminReferenced, userReferenced, overlay } = sources;
  const adminOwned = getAdminOwnedEntries(adminModelTexts, adminReferenced, overlay);
  const top: ViewOptionsTextEntry[] = [];
  const bottom: ViewOptionsTextEntry[] = [];
  const adminIds = new Set<string>();

  adminOwned.forEach((entry) => {
    adminIds.add(entry.reference.id);
    const row = {
      reference: entry.reference,
      checked: isAdminEntryShown(overlay, entry),
      isAdminLocked: entry.adminFlagged,
    };
    (entry.adminFlagged ? top : bottom).push(row);
  });

  userReferenced.items.forEach((item) => {
    if (!isProjectReference(item) && !isDblResourceReference(item)) return;
    if (adminIds.has(item.id)) return; // admin-owned ids are rendered by the loop above
    bottom.push({
      reference: item,
      checked: item.inTextCollectionUser === true,
      isAdminLocked: false,
    });
  });

  return { top, bottom };
}

/**
 * Records the user's shown/hidden choice for a resource, returning the next state (callers
 * persist). Routes by ownership: an admin-owned entry writes the per-user overlay (the admin's flag
 * is untouched); a user-list entry writes that item's `inTextCollectionUser`. Unknown ids are a
 * no-op.
 */
export function setUserDisplay(
  resourceId: string,
  shown: boolean,
  sources: TextCollectionSources,
): { userReferenced: ResourceReferenceList; overlay: ShownByDefaultOverlay } {
  const { adminModelTexts, adminReferenced, userReferenced, overlay } = sources;
  const isAdminOwned = getAdminOwnedEntries(adminModelTexts, adminReferenced, overlay).some(
    (entry) => entry.reference.id === resourceId,
  );

  if (isAdminOwned) return { userReferenced, overlay: { ...overlay, [resourceId]: shown } };

  const index = userReferenced.items.findIndex((item) => getBibleTextId(item) === resourceId);
  if (index < 0) return { userReferenced, overlay };

  const items = userReferenced.items.map((item, itemIndex) =>
    itemIndex === index ? { ...item, inTextCollectionUser: shown } : item,
  );
  return { userReferenced: { dataVersion: CURRENT_DATA_VERSION, items }, overlay };
}

/**
 * Removes a resource from the user's per-user list entirely (the A5 hover-X). No-op when the id is
 * not in the user list — including admin entries, which never live there (defense-in-depth).
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
 * Appends a Bible-text reference to the user's per-user list with `inTextCollectionUser === true`
 * (the A5 Get Resources flow). Idempotent: returns the list unchanged when the id is already
 * present.
 *
 * Precondition: `reference` must not be an admin-owned resource. Admin-owned resources are
 * overlay-driven — toggle them with {@link setUserDisplay}; a user-list entry for one is ignored by
 * the read helpers. A5 only adds resources the user picked that aren't already in the admin
 * selection.
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
    items: [...userReferenced.items, { ...reference, inTextCollectionUser: true }],
  };
}
