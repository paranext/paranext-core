/**
 * Teardown cleanup scoped to the checkout that ran the tests.
 *
 * The suite's teardown used to finish by running `npm run stop`, which kills every process named
 * `electron` or `dotnet` on the machine. That is defensible on a CI runner the run owns, and wrong
 * anywhere else: it takes down the developer's own app, any app a CDP-based suite is attached to,
 * and other checkouts' runs on the same box.
 *
 * Two decisions keep it honest, and both live here so they can be tested without killing anything:
 * whether to sweep at all, and which processes belong to this checkout.
 */
import fs from 'fs';
import path from 'path';

/** A process considered for cleanup. `cwd` is undefined when it could not be read. */
export type ProcessCandidate = { pid: number; comm: string; cwd: string | undefined };

/**
 * The process names the machine-wide sweep used to match, and the only ones considered here.
 *
 * Being under the repo root is NOT sufficient on its own: npm, node and the shell running the suite
 * are all rooted there too, and killing them kills the run doing the killing.
 */
const SWEEPABLE_PROCESS_NAMES = ['electron', 'dotnet'];

/** Values that mean "no" even though they are non-empty strings. */
const NEGATIVE_FLAG_VALUES = ['0', 'false', 'no', 'off'];

/**
 * Whether an environment flag asks for the sweep.
 *
 * A plain truthiness test on `process.env.CI` treats `CI=false` and `CI=0` as yes, because both are
 * non-empty strings — and those are ordinary wrapper and IDE idioms rather than exotic cases. That
 * reading is what let a developer's machine be swept by a run that had explicitly said not to.
 */
export function isSweepEnabled(value: string | undefined): boolean {
  if (value === undefined) return false;
  const normalized = value.trim().toLowerCase();
  if (normalized === '') return false;
  return !NEGATIVE_FLAG_VALUES.includes(normalized);
}

/**
 * The pids of sweepable processes running inside `root`, excluding `excludePids`.
 *
 * Containment is checked against the resolved path with a separator, so a sibling checkout whose
 * path merely starts with the same characters — `paranext-core-other` beside `paranext-core` — is
 * not treated as inside it. A process whose working directory could not be read is left alone:
 * unknown means "not ours", because /proc entries for another user's processes are unreadable and
 * guessing in that direction is how a neighbour's app gets killed.
 */
export function selectPidsUnderRoot(
  root: string,
  candidates: ProcessCandidate[],
  excludePids: number[],
): number[] {
  const resolvedRoot = path.resolve(root);
  const prefix = `${resolvedRoot}${path.sep}`;
  return candidates
    .filter((candidate) => !excludePids.includes(candidate.pid))
    .filter((candidate) => SWEEPABLE_PROCESS_NAMES.includes(candidate.comm))
    .filter(
      (candidate) =>
        candidate.cwd !== undefined &&
        (candidate.cwd === resolvedRoot || candidate.cwd.startsWith(prefix)),
    )
    .map((candidate) => candidate.pid);
}

/** This process and every ancestor of it, so cleanup cannot kill the run performing it. */
export function selfAndAncestorPids(): number[] {
  const pids: number[] = [];
  let { pid } = process;
  while (pid !== undefined && pid > 1 && !pids.includes(pid)) {
    pids.push(pid);
    try {
      // /proc/<pid>/stat field 4 is the parent pid. The command name in field 2 can contain spaces
      // and parentheses, so the fields after the final ')' are what can be split safely.
      const stat = fs.readFileSync(`/proc/${pid}/stat`, 'utf-8');
      const afterComm = stat
        .slice(stat.lastIndexOf(')') + 1)
        .trim()
        .split(/\s+/);
      const parsed = Number.parseInt(afterComm[1] ?? '', 10);
      pid = Number.isNaN(parsed) ? undefined : parsed;
    } catch {
      pid = undefined;
    }
  }
  return pids;
}

/** Every process this user can see, with its name and working directory. */
export function readProcessCandidates(): ProcessCandidate[] {
  let entries: string[];
  try {
    entries = fs.readdirSync('/proc');
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const pid = Number.parseInt(entry, 10);
    if (Number.isNaN(pid)) return [];
    let comm: string;
    try {
      comm = fs.readFileSync(`/proc/${pid}/comm`, 'utf-8').trim();
    } catch {
      return [];
    }
    let cwd: string | undefined;
    try {
      cwd = fs.readlinkSync(`/proc/${pid}/cwd`);
    } catch {
      cwd = undefined;
    }
    return [{ pid, comm, cwd }];
  });
}

/**
 * Terminate sweepable processes belonging to `root`, and report which.
 *
 * @returns The pids signalled, so a caller can say what it did rather than claiming a tidy exit.
 */
export function killProcessesUnderRoot(root: string): number[] {
  const pids = selectPidsUnderRoot(root, readProcessCandidates(), selfAndAncestorPids());
  pids.forEach((pid) => {
    try {
      process.kill(pid, 'SIGTERM');
    } catch {
      // Already gone between listing and signalling; nothing to do.
    }
  });
  return pids;
}
