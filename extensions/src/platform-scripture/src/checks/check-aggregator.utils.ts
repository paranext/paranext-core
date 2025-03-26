import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { CheckInputRange, CheckSubscriptionId, ScriptureRange } from 'platform-scripture';
import { scrRefToBBBCCC } from 'platform-bible-utils';

/* All these types and functions could live in `check-aggregator.service.ts`, but to get jest tests
 * to run properly, it was much easier to pull these standalone functions into a different file and
 * test them directly.
 */

export type SubscriptionData = {
  enabledProjectsByCheckId: Map<string, Set<string>>;
  ranges: CheckInputRange[];
  includeDeniedResults: boolean;
};

export function aggregateRanges(
  subscriptions: Map<CheckSubscriptionId, SubscriptionData>,
): CheckInputRange[] {
  const retVal: CheckInputRange[] = [];

  // Collect all ranges from all subscriptions
  const allRanges: CheckInputRange[] = [];
  subscriptions.forEach((subscription) => allRanges.push(...subscription.ranges));

  // Sort ranges so any overlapping ranges will be adjacent to each other
  allRanges.sort((a, b) => {
    if (a.projectId < b.projectId) return -1;
    if (a.projectId > b.projectId) return 1;
    return scrRefToBBBCCC(a.start) - scrRefToBBBCCC(b.start);
  });

  // Merge overlapping ranges
  if (allRanges.length > 0) retVal.push(allRanges[0]);
  for (let i = 1; i < allRanges.length; i++) {
    const range = retVal[retVal.length - 1];
    const nextRange = allRanges[i];
    if (rangesAreOverlapping(range, nextRange))
      retVal[retVal.length - 1] = mergeRanges(range, nextRange);
    else retVal.push(nextRange);
  }

  return retVal;
}

export function isWithinRange(range: ScriptureRange, verseRef: SerializedVerseRef): boolean {
  const startBookNum = Canon.bookIdToNumber(range.start.book);
  const endBookNum = range.end?.book ? Canon.bookIdToNumber(range.end.book) : startBookNum;
  const bookNum = Canon.bookIdToNumber(verseRef.book);
  if (bookNum < startBookNum || bookNum > endBookNum) return false;

  const startChapterNum = range.start.chapterNum;
  const endChapterNum = range.end?.chapterNum ?? 999;
  if (verseRef.chapterNum < startChapterNum || verseRef.chapterNum > endChapterNum) return false;

  // Don't worry about verse numbers for now since the UI only works at the chapter level
  return true;
}

export function aggregateProjectIdsByCheckId(
  subscriptions: Map<CheckSubscriptionId, SubscriptionData>,
): Map<string, Set<string>> {
  const retVal = new Map<string, Set<string>>();
  subscriptions.forEach((subscription) => {
    subscription.enabledProjectsByCheckId.forEach((projects, checkId) => {
      const aggregatedProjects = retVal.get(checkId);
      if (!aggregatedProjects) retVal.set(checkId, new Set(projects));
      else projects.forEach((project) => aggregatedProjects.add(project));
    });
  });
  return retVal;
}

function rangesAreOverlapping(existingRange: CheckInputRange, newRange: CheckInputRange) {
  // Don't worry about verse numbers for now since the UI only works at the chapter level
  const existingStart = scrRefToBBBCCC(existingRange.start);
  const existingEnd = existingRange.end
    ? scrRefToBBBCCC(existingRange.end)
    : Canon.bookIdToNumber(existingRange.start.book) * 1000 + 999;
  const newStart = scrRefToBBBCCC(newRange.start);
  const newEnd = newRange.end
    ? scrRefToBBBCCC(newRange.end)
    : Canon.bookIdToNumber(newRange.start.book) * 1000 + 999;
  return (
    newRange.projectId === existingRange.projectId &&
    ((newStart >= existingStart && newStart <= existingEnd) ||
      (newEnd >= existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd))
  );
}

function mergeRanges(existingRange: CheckInputRange, newRange: CheckInputRange): CheckInputRange {
  const start =
    scrRefToBBBCCC(newRange.start) < scrRefToBBBCCC(existingRange.start)
      ? newRange.start
      : existingRange.start;
  let end: SerializedVerseRef | undefined;
  if (existingRange.end && newRange.end)
    end =
      scrRefToBBBCCC(newRange.end) > scrRefToBBBCCC(existingRange.end)
        ? newRange.end
        : existingRange.end;
  return {
    start,
    end: end ?? undefined,
    projectId: existingRange.projectId,
  };
}
