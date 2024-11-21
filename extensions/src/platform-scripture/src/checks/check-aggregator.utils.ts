import { VerseRef } from '@sillsdev/scripture';
import { CheckInputRange, CheckSubscriptionId, ScriptureRange } from 'platform-scripture';

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
    return a.start.BBBCCC - b.start.BBBCCC;
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

export function isWithinRange(range: ScriptureRange, verseRef: VerseRef): boolean {
  const startBookNum = range.start.bookNum;
  const endBookNum = range.end?.bookNum ?? startBookNum;
  if (verseRef.bookNum < startBookNum || verseRef.bookNum > endBookNum) return false;

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
  const existingStart = existingRange.start.BBBCCC;
  const existingEnd = existingRange.end?.BBBCCC ?? existingRange.start.bookNum * 1000 + 999;
  const newStart = newRange.start.BBBCCC;
  const newEnd = newRange.end?.BBBCCC ?? newRange.start.bookNum * 1000 + 999;
  return (
    newRange.projectId === existingRange.projectId &&
    ((newStart >= existingStart && newStart <= existingEnd) ||
      (newEnd >= existingStart && newEnd <= existingEnd) ||
      (newStart <= existingStart && newEnd >= existingEnd))
  );
}

function mergeRanges(existingRange: CheckInputRange, newRange: CheckInputRange): CheckInputRange {
  const start =
    newRange.start.BBBCCC < existingRange.start.BBBCCC ? newRange.start : existingRange.start;
  let end: VerseRef | undefined;
  if (existingRange.end && newRange.end)
    end = newRange.end.BBBCCC > existingRange.end.BBBCCC ? newRange.end : existingRange.end;
  return {
    start: new VerseRef(start),
    end: end ? new VerseRef(end) : undefined,
    projectId: existingRange.projectId,
  };
}
