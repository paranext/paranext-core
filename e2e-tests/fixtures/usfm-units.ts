/**
 * Splits a USFM book into the units an edit's reach is judged by — the book header, each chapter
 * line, each verse — so a failure can name exactly what an edit touched.
 *
 * A unit runs from its marker up to the next unit's marker, so it owns the line ending and any
 * paragraph markers that follow it: the `\p` between `\v 2` and `\v 3` belongs to verse 2. An edit
 * inside verse 3 that rewrites that `\p` therefore reports verse 2 as changed, which is the point —
 * it reached outside the verse the user edited.
 */

/** One addressable piece of a USFM book. */
export interface UsfmUnit {
  /** `header` (everything before the first `\c`), `c N` (a chapter line), or `N:V` (a verse). */
  label: string;
  /** The unit's exact text, line endings included. */
  text: string;
}

/**
 * Where a unit starts: `\c` or `\v` followed by whitespace and its number. Only these two markers
 * start units, so a note's `\fr 3:13` or a `\va` never does.
 */
const UNIT_MARKER = /\\(c|v)[ \t]+(\S+)/g;

/**
 * Splits `usfm` into units in document order. Joining every unit's `text` gives back `usfm`
 * exactly. A label that repeats (a damaged book with two `\v 3`s in one chapter) gets `#2`, `#3`, …
 * appended so every label is unique.
 */
export function splitUsfmUnits(usfm: string): UsfmUnit[] {
  const starts: Array<{ index: number; label: string }> = [];
  let chapter = '';
  Array.from(usfm.matchAll(UNIT_MARKER)).forEach((match) => {
    const [, marker, number] = match;
    if (marker === 'c') chapter = number;
    starts.push({
      index: match.index,
      label: marker === 'c' ? `c ${number}` : `${chapter}:${number}`,
    });
  });

  const units: UsfmUnit[] = [];
  const firstStart = starts.length > 0 ? starts[0].index : usfm.length;
  if (firstStart > 0) units.push({ label: 'header', text: usfm.slice(0, firstStart) });
  const seen = new Map<string, number>();
  starts.forEach((start, index) => {
    const count = (seen.get(start.label) ?? 0) + 1;
    seen.set(start.label, count);
    const end = index + 1 < starts.length ? starts[index + 1].index : usfm.length;
    units.push({
      label: count === 1 ? start.label : `${start.label}#${count}`,
      text: usfm.slice(start.index, end),
    });
  });
  return units;
}

/** How two versions of a book differ, unit by unit. */
export interface UsfmUnitChanges {
  /** Units present in both whose text differs, in `after`'s order. */
  changed: string[];
  /** Units only `before` has. */
  removed: string[];
  /** Units only `after` has. */
  added: string[];
}

/** Compares two versions of a book unit by unit. */
export function compareUsfmUnits(before: string, after: string): UsfmUnitChanges {
  const beforeUnits = new Map(splitUsfmUnits(before).map((unit) => [unit.label, unit.text]));
  const afterUnits = splitUsfmUnits(after);
  const afterLabels = new Set(afterUnits.map((unit) => unit.label));
  return {
    changed: afterUnits
      .filter((unit) => beforeUnits.has(unit.label) && beforeUnits.get(unit.label) !== unit.text)
      .map((unit) => unit.label),
    removed: [...beforeUnits.keys()].filter((label) => !afterLabels.has(label)),
    added: afterUnits.filter((unit) => !beforeUnits.has(unit.label)).map((unit) => unit.label),
  };
}

/** The text of the unit labelled `label`, or `undefined` when `usfm` has no such unit. */
export function getUsfmUnit(usfm: string, label: string): string | undefined {
  return splitUsfmUnits(usfm).find((unit) => unit.label === label)?.text;
}

/**
 * Describes every way `after` differs from `before` OUTSIDE the units in `allowed`: each unit that
 * changed, appeared or disappeared, with its before and after text as JSON string literals so
 * whitespace and line endings are visible. Returns `''` when the only differences are inside
 * `allowed`.
 *
 * @param before The book before the edit
 * @param after The book after the edit
 * @param allowed Labels of the units the edit was aimed at
 */
export function describeChangesOutside(
  before: string,
  after: string,
  allowed: readonly string[],
): string {
  const changes = compareUsfmUnits(before, after);
  const allowedSet = new Set(allowed);
  const strayChanged = changes.changed.filter((label) => !allowedSet.has(label));
  if (strayChanged.length === 0 && changes.removed.length === 0 && changes.added.length === 0)
    return '';

  const lines = [
    `units changed: [${changes.changed.join(', ')}]; expected only: [${allowed.join(', ')}]`,
  ];
  if (changes.removed.length > 0) lines.push(`units removed: [${changes.removed.join(', ')}]`);
  if (changes.added.length > 0) lines.push(`units added: [${changes.added.join(', ')}]`);
  strayChanged.forEach((label) => {
    lines.push(
      `${label} before: ${JSON.stringify(getUsfmUnit(before, label))}`,
      `${label} after:  ${JSON.stringify(getUsfmUnit(after, label))}`,
    );
  });
  changes.removed.forEach((label) =>
    lines.push(`${label} (removed) was: ${JSON.stringify(getUsfmUnit(before, label))}`),
  );
  changes.added.forEach((label) =>
    lines.push(`${label} (added) is: ${JSON.stringify(getUsfmUnit(after, label))}`),
  );
  return lines.join('\n');
}
