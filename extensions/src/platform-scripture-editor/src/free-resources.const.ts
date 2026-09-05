/**
 * The DBL entry UIDs that Platform.Bible treats as **free / openly licensed**, and therefore offers
 * to a user who has no project open.
 *
 * ## Why this is a hand-curated list
 *
 * Nothing in the stack reports whether a DBL resource is openly licensed. `DblResourceData` carries
 * no licence field, the C# projection in `DblDownloadableDataProvider.cs` does not add one, and
 * ParatextData's `InstallableDBLResource` exposes only project-licence/permission members plus
 * `Copyright` and `Rightsholders` — none of which answers the question. A curated list is therefore
 * the only available mechanism, and it is the one the roadmap already assumes ("a curated free
 * resource set").
 *
 * Two sibling lists in the C# provider set the precedent: `DblResourceWhiteList.s_validResourceIds`
 * (compatibility) and `DblDownloadableDataProvider.CommentariesWhiteList` (the UBS handbook set).
 *
 * ## Which licences qualify
 *
 * **Public Domain only** — 48 of open.bible's 930 entries. Every Creative Commons variant is out
 * for this first pass, including the permissive ones: CC BY (9 entries) and CC BY-SA (681, by far
 * the largest group there).
 *
 * The exclusions are deliberately conservative rather than strictly necessary. Even share-alike
 * only constrains redistributing _modified_ copies; none of these licences restrict reading, which
 * is all these panels do. So a "may a user read it?" test would admit essentially the whole
 * catalog. Public Domain is simply the tier that needs no argument at all, which is the right place
 * to start an entry point that hands resources to users who have not agreed to anything.
 *
 * Widening it is a product decision, not a cleanup: revisit the test itself before adding entries
 * that fail it. CC BY is the obvious next tier if one is wanted.
 *
 * ## How to populate it
 *
 * [https://open.bible](https://open.bible) is the authority on WHICH texts are openly licensed —
 * filter its listing by licence — but it cannot supply the ids: it keys everything by its own UUIDs
 * (`/bibles/<uuid>`), publishes no `dblEntryUid`, and aggregates providers such as eBible.org that
 * are not all DBL entries. Matching therefore needs a live catalog on both sides:
 *
 * 1. Run Platform.Bible on a machine with a valid registration.
 * 2. Call `platformGetResources.getCachedResources` over PAPI and dump `dblEntryUid` / `displayName` /
 *    `fullName` / `bestLanguageName`.
 * 3. Match those against the open.bible listing by name and language, keeping only the licences named
 *    above. A name with no catalog match drops out whatever its licence — it is not offerable
 *    here.
 * 4. Add each entry below, UID first with the resource's short name and language in a trailing
 *    comment, following `DblDownloadableDataProvider.CommentariesWhiteList`.
 *
 * Step 1 needs DBL credentials, which many machines do not have — `getCachedResources` resolves
 * `undefined` there rather than throwing. A credential-free shortcut covers any resource already
 * installed under Paratext 9: `_Resources/<SHORTNAME>.p8z` is a zip whose DIRECTORY listing is
 * readable without the resource password, and it contains a `.dbl/id/<dblEntryUid>` entry. So
 * `unzip -l <file>.p8z | grep '\.dbl/id/'` yields the UID directly. Cross-check anything harvested
 * that way against `DblResourceWhiteList.s_validResourceIds` (upper-cased) to confirm the platform
 * will actually serve it.
 *
 * Audio-only entries are excluded too, whatever their licence: these panels render USJ text and
 * cannot display them.
 *
 * UIDs are compared **case-insensitively** (see `free-resources.utils.ts`) because the C# provider
 * and the DBL catalog disagree on case: `DblResourceWhiteList` upper-cases before comparing, while
 * `DblResourceData.dblEntryUid` arrives as `InstallableDBLResource.DBLEntryUid.Id` in whatever case
 * the catalog supplies. Entries here may be written in either case.
 *
 * An empty list means no resource qualifies as free. `HAS_FREE_RESOURCES` then switches the
 * no-project entry point off entirely rather than offering a picker that cannot be populated — the
 * safe direction to fail, since the alternative would offer resources we cannot confirm are freely
 * readable.
 */
// Keep expanding this list: one entry is enough to switch the no-project panels on, but it leaves a
// user with a single text in one language. See the harvesting steps above for how to add more.
export const FREE_RESOURCE_DBL_ENTRY_UIDS: readonly string[] = Object.freeze([
  '9879dbb7cfe39e4d', // WEB — World English Bible (English, Public Domain)
]);
