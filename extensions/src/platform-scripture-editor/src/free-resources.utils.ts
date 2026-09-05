import type { ResourceReference } from 'platform-scripture';
import { isDblResourceReference } from './resource-reference.utils';
import { FREE_RESOURCE_DBL_ENTRY_UIDS } from './free-resources.const';

/**
 * The allowlist as a lookup set, normalized to upper case.
 *
 * Built once at module scope rather than per call: the no-project panels filter on every render,
 * and `Array.prototype.includes` over the whole list would be linear each time.
 */
const FREE_RESOURCE_UID_SET: ReadonlySet<string> = new Set(
  FREE_RESOURCE_DBL_ENTRY_UIDS.map((uid) => uid.toUpperCase()),
);

/**
 * The allowlisted UIDs in their original case, as a stable array.
 *
 * Module-level (not derived per render) because it is passed to the resource picker through
 * `useDialogCallback`/`useMemo` dependency arrays — a fresh array each render would give the dialog
 * callback a new identity every render and rebuild it continuously.
 */
export const FREE_RESOURCE_IDS: readonly string[] = FREE_RESOURCE_DBL_ENTRY_UIDS;

/**
 * Whether any resource is allowlisted at all.
 *
 * Gates the whole no-project entry point. With an empty allowlist the panels would otherwise offer
 * a pick prompt whose picker is empty by construction — a worse answer than the plain "no project"
 * message, which at least says something true. See {@link FREE_RESOURCE_DBL_ENTRY_UIDS} for why the
 * list can legitimately be empty.
 */
export const HAS_FREE_RESOURCES: boolean = FREE_RESOURCE_DBL_ENTRY_UIDS.length > 0;

const UNRESTRICTED_PICKER_OPTIONS = Object.freeze({});

/**
 * The resource-picker options that restrict the catalog to free resources, or nothing when the
 * caller may offer the whole catalog. Spread into the dialog options.
 *
 * Restricting what the picker OFFERS — rather than rejecting a non-free pick afterwards — is what
 * makes a non-free resource unreachable instead of merely refused.
 *
 * The `notice` matters as much as the restriction. The dialog builds its own explanation of a short
 * list from the fetch results alone, which are unaffected by this narrowing — so a restricted
 * picker whose catalog happens to carry none of the allowlisted resources would otherwise render an
 * empty list, no language filters, and no explanation at all. With a one-entry allowlist that is a
 * likely first experience, not an edge case.
 *
 * Callers spread the result inside their own `useMemo`/`useCallback`, which is what keeps the
 * dialog options at a stable identity.
 *
 * @param isFreeResourceEntryPoint Whether this caller is the no-project free-resource entry point.
 * @param notice Already-localized sentence explaining the restriction.
 * @returns Options to spread; `{}` when unrestricted.
 */
export function freeResourcePickerOptions(isFreeResourceEntryPoint: boolean, notice: string) {
  return isFreeResourceEntryPoint
    ? { allowedResourceIds: FREE_RESOURCE_IDS, notice }
    : UNRESTRICTED_PICKER_OPTIONS;
}

/**
 * Whether a DBL entry UID is one Platform.Bible treats as free / openly licensed.
 *
 * Comparison is case-insensitive: the C# provider upper-cases before matching its own whitelist,
 * while `DblResourceData.dblEntryUid` reaches the front end in whatever case the DBL catalog
 * supplied, so a case-sensitive check here would silently drop valid entries.
 *
 * @param dblEntryUid The DBL entry UID to test. A missing UID is never free.
 * @returns `true` when the UID is allowlisted.
 */
export function isFreeResource(dblEntryUid: string | undefined): boolean {
  if (!dblEntryUid) return false;
  return FREE_RESOURCE_UID_SET.has(dblEntryUid.toUpperCase());
}

/**
 * Narrows a stored reference list to the free DBL resources in it.
 *
 * Applied when READING the no-project lists, not only when writing them. A UID stored while the
 * allowlist was wider — or edited into the setting by hand — would otherwise keep rendering in the
 * no-project entry point long after it stopped qualifying, which is the case the write-side guard
 * alone cannot cover.
 *
 * Non-DBL references (projects, and every other reference type) are dropped too: the no-project
 * state has no project context to resolve them against, so there is nothing to render.
 *
 * @param references The stored references to filter.
 * @returns Only the allowlisted DBL references, in their original order.
 */
export function filterFreeReferences<T extends ResourceReference>(references: T[]): T[] {
  return references.filter(
    (reference) => isDblResourceReference(reference) && isFreeResource(reference.id),
  );
}
