import { describe, expect, it } from 'vitest';
import {
  makeBuiltInGroupings,
  type ProjectSelectorGrouping,
  type ProjectSelectorProject,
} from 'platform-bible-react/experimental';
import { normalizeProjectId, recencyMapFromOrderedIds } from 'platform-bible-utils';
import {
  CHECKS_SIDE_PANEL_PROJECT_SELECTOR_GROUPING_IDS,
  toChecksSelectorRows,
} from './checks/checks-side-panel/checks-side-panel.component';
import {
  CHECKLIST_PROJECT_SELECTOR_GROUPING_IDS,
  toChecklistSelectorRows,
} from './checklist.web-view';
import {
  FIND_PROJECT_SELECTOR_GROUPING_IDS,
  FIND_SIMPLE_PROJECT_SELECTOR_GROUPING_IDS,
  toFindSelectorRows,
} from './find/find.component';
import {
  MANAGE_BOOKS_COPY_FROM_GROUPING_IDS,
  toCopyFromSelectorRows,
} from './manage-books-dialog/manage-books-dialog.component';
import {
  MANAGE_BOOKS_PROJECT_SELECTOR_GROUPING_IDS,
  toManageBooksSelectorRows,
} from './manage-books.web-view';

/**
 * `ProjectSelectorProject.customData` is an untyped `Record<string, unknown>`, so nothing in the
 * type system connects "this picker offers the Language grouping" to "this picker's row builder
 * packs a language into `customData`". This suite is that connection: for every grouping a picker
 * offers, it runs the picker's own row builder over a representative fixture and proves the
 * grouping actually reads something out of the `customData` the builder produced.
 *
 * A grouping that reads nothing is a dead menu item — the user picks it and sees one
 * undifferentiated bucket ("Other", "Unknown language"). That is the failure this suite exists to
 * catch.
 *
 * Each surface's `groupingIds` is the SAME exported constant its component filters
 * `makeBuiltInGroupings` against, not a copy of it — so offering a new grouping is what puts it in
 * front of this suite, and there is no list to forget to update.
 *
 * WHAT THIS SUITE DOES NOT COVER: the fixture stands in for the production feed, so the suite
 * proves `builder input -> customData -> group key` and nothing upstream of the builder. Deleting
 * the `platform.language` fetch that feeds `toFindSelectorRows` would kill Find's Language grouping
 * and leave this suite green. Each web view's own tests cover that the feed supplies the field.
 */

/**
 * Local stand-in for the bucket `partitionByGrouping` emits under `unknownSectionHeading` when
 * `getGroupKey` yields nothing usable. Angle brackets keep it from colliding with a real group key
 * (a language name or a project-type key).
 */
const UNKNOWN_BUCKET = '<unknown>';

type Surface = {
  name: string;
  groupingIds: readonly string[];
  rows: readonly ProjectSelectorProject[];
};

const SURFACES: readonly Surface[] = [
  {
    name: 'find',
    groupingIds: FIND_PROJECT_SELECTOR_GROUPING_IDS,
    rows: toFindSelectorRows([
      { id: 'a', shortName: 'A', fullName: 'Project A', language: 'English', lastUsedAt: 2 },
      { id: 'b', shortName: 'B', fullName: 'Project B', language: 'Spanish', lastUsedAt: 1 },
    ]),
  },
  {
    // Find's Simple-interface branch offers a narrower list than the scroll-group branch, so it is
    // covered separately rather than assumed to match.
    name: 'find-simple',
    groupingIds: FIND_SIMPLE_PROJECT_SELECTOR_GROUPING_IDS,
    rows: toFindSelectorRows([
      { id: 'a', shortName: 'A', fullName: 'Project A', language: 'English', lastUsedAt: 2 },
      { id: 'b', shortName: 'B', fullName: 'Project B', language: 'Spanish', lastUsedAt: 1 },
    ]),
  },
  {
    name: 'checks-side-panel',
    groupingIds: CHECKS_SIDE_PANEL_PROJECT_SELECTOR_GROUPING_IDS,
    rows: toChecksSelectorRows([
      { id: 'a', shortName: 'A', fullName: 'Project A', language: 'English', lastUsedAt: 2 },
      // No `lastUsedAt`: the panel lists every scripture project, most of which were never opened.
      { id: 'b', shortName: 'B', fullName: 'Project B', language: 'Spanish' },
    ]),
  },
  {
    name: 'checklist',
    groupingIds: CHECKLIST_PROJECT_SELECTOR_GROUPING_IDS,
    rows: toChecklistSelectorRows(
      [
        { id: 'a', shortName: 'A', fullName: 'Project A', rawLanguage: 'English' },
        // No recency: the checklist lists every scripture project, most never opened.
        { id: 'b', shortName: 'B', fullName: 'Project B', rawLanguage: 'Spanish' },
      ],
      recencyMapFromOrderedIds(['a'].map(normalizeProjectId)),
    ),
  },
  {
    name: 'manage-books',
    groupingIds: MANAGE_BOOKS_PROJECT_SELECTOR_GROUPING_IDS,
    rows: toManageBooksSelectorRows(
      [
        {
          projectId: 'a',
          name: 'A',
          fullName: 'Project A',
          projectType: 'Standard',
          isEditable: true,
          isResource: false,
          versification: '4',
        },
        {
          projectId: 'b',
          name: 'B',
          fullName: 'Project B',
          projectType: 'BackTranslation',
          isEditable: true,
          isResource: false,
          versification: '4',
        },
      ],
      // Built exactly as the web view builds it: the recents service hands back an ordered id list
      // which is normalized before `recencyMapFromOrderedIds` keys the map. Only project `a` has
      // ever been opened.
      recencyMapFromOrderedIds(['a'].map(normalizeProjectId)),
    ),
  },
  {
    name: 'manage-books-copy-from',
    groupingIds: MANAGE_BOOKS_COPY_FROM_GROUPING_IDS,
    rows: toCopyFromSelectorRows([
      { id: 'a', shortName: 'A', name: 'A', fullName: 'Project A', type: 'Standard' },
      { id: 'b', shortName: 'B', name: 'B', fullName: 'Project B', type: 'BackTranslation' },
      // Resources are not copy sources, so the builder drops them; they must not be the only rows
      // carrying a type, or the fixture would pass on data the picker never shows.
      {
        id: 'r',
        shortName: 'R',
        name: 'R',
        fullName: 'Resource R',
        isResource: true,
        type: 'Resource',
      },
    ]),
  },
];

/**
 * Bucket projects the way `partitionByGrouping` does — an empty or `undefined` group key routes the
 * row to the unknown bucket — and return a stable `key:count` signature of the result.
 *
 * The partitioner itself is not on the `platform-bible-react` public surface (neither `computeRows`
 * nor `partitionByGrouping` is exported from `index.ts` or `experimental.ts`), so the bucketing
 * rule is reproduced here. Everything data-dependent — the grouping descriptor and its
 * `getGroupKey` — is the real built-in.
 *
 * This mirrors a deliberately non-exported library internal rather than a public API: widening
 * `experimental.ts` to serve one test is the worse trade. Delete this helper and call the real
 * partitioner if those functions are ever published.
 *
 * Two things it deliberately does not mirror, neither of which can change a verdict here: the real
 * partitioner DROPS unknown rows when the grouping has no `unknownSectionHeading`
 * (`project-selector.rows.ts:551`) where this always emits an `<unknown>` bucket; and this buckets
 * projects where the real one buckets `computeRows` rows, which are 1:1 with projects only in
 * `mode="project"` (Find's `projectScrollGroup` branch expands one project into several rows).
 */
function bucketSignature(
  grouping: ProjectSelectorGrouping,
  projects: readonly ProjectSelectorProject[],
): string[] {
  const counts = new Map<string, number>();
  projects.forEach((project) => {
    const key = grouping.getGroupKey?.(project);
    const bucket = key === undefined || key === '' ? UNKNOWN_BUCKET : key;
    counts.set(bucket, (counts.get(bucket) ?? 0) + 1);
  });
  return [...counts.entries()]
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([key, count]) => `${key}:${count}`);
}

/** The same rows with every consumer-packed grouping input removed. */
function withoutCustomData(
  projects: readonly ProjectSelectorProject[],
): readonly ProjectSelectorProject[] {
  return projects.map((project) => ({ ...project, customData: undefined }));
}

describe("every grouping a picker offers is backed by that picker's own customData", () => {
  const builtIns = makeBuiltInGroupings();

  SURFACES.forEach((surface) => {
    // `openTabs` partitions off the separate `openTabs` prop rather than `customData`, so there is
    // no row data for it to be backed by.
    surface.groupingIds
      .filter((groupingId) => groupingId !== 'openTabs')
      .forEach((groupingId) => {
        it(`${surface.name}: ${groupingId} reads data the builder packed into customData`, () => {
          expect(builtIns.map((candidate) => candidate.id)).toContain(groupingId);
          const grouping = builtIns.find((candidate) => candidate.id === groupingId);
          if (!grouping) return;

          expect(surface.rows.length).toBeGreaterThan(0);

          // At least one row must land somewhere other than the unknown bucket, or the menu item
          // renders as a single "Unknown ..." pile.
          const buckets = bucketSignature(grouping, surface.rows);
          const namedBuckets = buckets.filter((entry) => !entry.startsWith(UNKNOWN_BUCKET));
          expect(namedBuckets).not.toEqual([]);

          // The load-bearing assertion. Some groupings (notably `lastUsed`) have a catch-all bucket
          // rather than an unknown one, so "a named bucket exists" is true even when the rows carry
          // nothing. Partitioning the same rows with `customData` stripped must produce a DIFFERENT
          // partition — that is only possible when the builder packed data the grouping reads. The
          // failure diff prints both partitions, which shows what the grouping had to work with.
          expect(buckets).not.toEqual(bucketSignature(grouping, withoutCustomData(surface.rows)));
        });
      });
  });
});
