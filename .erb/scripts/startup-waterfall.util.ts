// Relative (not @shared/*) import: this CLI/test corpus lives outside the root tsconfig's
// `include`, so path aliases don't resolve here under vitest. platform.data is import-free, so
// pulling it in drags no logger side effects into the CLI.
import { STARTUP_MARK_PREFIX } from '../../src/shared/data/platform.data';

export interface StartupMark {
  proc: string;
  name: string;
  t: number;
}

// Matches a startup mark anywhere in a log line: "STARTUP_MARK <proc> <name> <epochMs>".
// The prefix comes from the shared constant the emitters use (platform.data is import-free, so
// this CLI can import it without dragging in logger side effects).
// <name> may itself contain spaces (e.g. "activate-start platformScripture"), so <epochMs> is
// anchored as the trailing run of digits and <name> is everything between proc and that.
// TypeScript log lines that don't already start with a "[...]" prefix get a caller annotation
// (" [at <fn> <file>:<line>:<col>]") appended by the shared logger hook
// (src/shared/utils/logger.utils.ts), so <epochMs> may be followed by an optional trailing
// "[at ...]" suffix that must be tolerated (and NOT mistaken for part of the epoch, since the
// suffix itself contains digits, e.g. line/column numbers).
const MARK_REGEX = new RegExp(
  `${STARTUP_MARK_PREFIX} (\\S+) (.+?) (\\d+)(?:\\s+\\[at\\b[^\\]]*\\])?\\s*$`,
);

/** Extract every startup mark from raw log text, in file order. */
export function parseStartupMarks(logText: string): StartupMark[] {
  return logText
    .split('\n')
    .map((line) => MARK_REGEX.exec(line))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => ({ proc: match[1], name: match[2], t: Number(match[3]) }));
}

/**
 * Slice parsed marks (in file order) down to the latest app run. electron-log's `main.log` appends
 * across launches (only 3MB size rotation, never truncated per launch), so a log captured after two
 * instrumented runs would otherwise merge into one waterfall whose Total span covers the gap
 * between launches. A run starts at a `main process-start` mark - the main process emits it first,
 * before spawning the other processes (`process-start` marks from other procs are NOT run
 * boundaries; the extension host re-emits one on reload within the same run). Returns all marks
 * unchanged when no boundary exists (e.g. a log that rotated mid-run); `runCount` lets callers warn
 * when older runs were dropped.
 */
export function selectLatestRun(marks: StartupMark[]): {
  marks: StartupMark[];
  runCount: number;
} {
  let runCount = 0;
  let lastBoundaryIndex = -1;
  marks.forEach((mark, i) => {
    if (mark.proc === 'main' && mark.name === 'process-start') {
      runCount += 1;
      lastBoundaryIndex = i;
    }
  });
  if (runCount <= 1) return { marks, runCount };
  return { marks: marks.slice(lastBoundaryIndex), runCount };
}

/** Render marks as an ordered waterfall with offsets from the earliest mark. */
export function formatWaterfall(marks: StartupMark[]): string {
  if (marks.length === 0)
    return 'No startup marks found. Launch with PT_STARTUP_MARKS=true and reproduce startup.';
  const ordered = [...marks].sort((a, b) => a.t - b.t);
  const zero = ordered[0].t;
  const nameWidth = Math.max(...ordered.map((m) => m.name.length));
  const procWidth = Math.max(...ordered.map((m) => m.proc.length));
  const lines = ordered.map((m, i) => {
    const offset = m.t - zero;
    const delta = i === 0 ? 0 : m.t - ordered[i - 1].t;
    return `${m.proc.padEnd(procWidth)}  ${m.name.padEnd(nameWidth)}  +${offset}ms  (Δ${delta}ms)`;
  });
  const total = ordered[ordered.length - 1].t - zero;
  return `${lines.join('\n')}\n\nTotal span: ${total}ms across ${ordered.length} marks`;
}
