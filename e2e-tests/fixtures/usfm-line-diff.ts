/**
 * A unified line diff of two USFM texts, for failure messages that must show exactly which bytes
 * changed. Data-fidelity drift is usually whitespace — a trailing space dropped, a run of spaces
 * collapsed, a CR added — which a plain diff renders invisibly, so every line is printed as a JSON
 * string literal: spaces stay countable at both ends, and `\r`, tabs and other control characters
 * are spelled out.
 *
 * Lines are split on `\n` only, so a CRLF/LF change shows as a `\r` appearing or disappearing at
 * the end of the line rather than vanishing in the split.
 */

/** Lines of context printed around each changed region. */
const CONTEXT_LINES = 2;

type DiffOp = { kind: ' ' | '-' | '+'; line: string; oldNo: number; newNo: number };

/** Longest-common-subsequence edit script over the lines that differ. */
function diffLines(oldLines: string[], newLines: string[]): DiffOp[] {
  // Trim the common head and tail first: a chapter save touches a few dozen lines of a book file
  // that can run to thousands, and the LCS table is quadratic in what is left.
  let head = 0;
  while (head < oldLines.length && head < newLines.length && oldLines[head] === newLines[head])
    head += 1;
  let tail = 0;
  while (
    tail < oldLines.length - head &&
    tail < newLines.length - head &&
    oldLines[oldLines.length - 1 - tail] === newLines[newLines.length - 1 - tail]
  )
    tail += 1;

  const oldMid = oldLines.slice(head, oldLines.length - tail);
  const newMid = newLines.slice(head, newLines.length - tail);
  const lcs: number[][] = Array.from({ length: oldMid.length + 1 }, () =>
    new Array<number>(newMid.length + 1).fill(0),
  );
  for (let i = oldMid.length - 1; i >= 0; i -= 1)
    for (let j = newMid.length - 1; j >= 0; j -= 1)
      lcs[i][j] =
        oldMid[i] === newMid[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);

  const ops: DiffOp[] = [];
  for (let k = 0; k < head; k += 1)
    ops.push({ kind: ' ', line: oldLines[k], oldNo: k + 1, newNo: k + 1 });
  let i = 0;
  let j = 0;
  while (i < oldMid.length || j < newMid.length) {
    if (i < oldMid.length && j < newMid.length && oldMid[i] === newMid[j]) {
      ops.push({ kind: ' ', line: oldMid[i], oldNo: head + i + 1, newNo: head + j + 1 });
      i += 1;
      j += 1;
    } else if (i < oldMid.length && (j === newMid.length || lcs[i + 1][j] >= lcs[i][j + 1])) {
      // Removals before additions on a tie, so a changed line reads `-old` then `+new`.
      ops.push({ kind: '-', line: oldMid[i], oldNo: head + i + 1, newNo: head + j });
      i += 1;
    } else {
      ops.push({ kind: '+', line: newMid[j], oldNo: head + i, newNo: head + j + 1 });
      j += 1;
    }
  }
  for (let k = 0; k < tail; k += 1) {
    const oldNo = oldLines.length - tail + k + 1;
    const newNo = newLines.length - tail + k + 1;
    ops.push({ kind: ' ', line: oldLines[oldNo - 1], oldNo, newNo });
  }
  return ops;
}

/**
 * Unified diff of `before` → `after`, every line rendered as a JSON string literal. Returns `''`
 * when the two texts are identical.
 *
 * @param before The text as it was
 * @param after The text as it is now
 * @param beforeLabel Name printed on the `---` header line
 * @param afterLabel Name printed on the `+++` header line
 */
export function unifiedUsfmDiff(
  before: string,
  after: string,
  beforeLabel = 'before',
  afterLabel = 'after',
): string {
  if (before === after) return '';
  const ops = diffLines(before.split('\n'), after.split('\n'));

  // Group changed ops into hunks, each padded with CONTEXT_LINES of unchanged lines either side and
  // merged with its neighbour when their context would overlap.
  const changed = ops.flatMap((op, index) => (op.kind === ' ' ? [] : [index]));
  const hunks: Array<[number, number]> = [];
  changed.forEach((index) => {
    const start = Math.max(0, index - CONTEXT_LINES);
    const end = Math.min(ops.length - 1, index + CONTEXT_LINES);
    const last = hunks.at(-1);
    if (last && start <= last[1] + 1) last[1] = Math.max(last[1], end);
    else hunks.push([start, end]);
  });

  const out = [`--- ${beforeLabel}`, `+++ ${afterLabel}`];
  hunks.forEach(([start, end]) => {
    const slice = ops.slice(start, end + 1);
    const oldCount = slice.filter((op) => op.kind !== '+').length;
    const newCount = slice.filter((op) => op.kind !== '-').length;
    const oldStart = slice.find((op) => op.kind !== '+')?.oldNo ?? slice[0].oldNo;
    const newStart = slice.find((op) => op.kind !== '-')?.newNo ?? slice[0].newNo;
    out.push(`@@ -${oldStart},${oldCount} +${newStart},${newCount} @@`);
    slice.forEach((op) => out.push(`${op.kind}${JSON.stringify(op.line)}`));
  });
  return out.join('\n');
}
