/**
 * Teardown cleanup scoped to the checkout that ran the tests.
 *
 * Matching processes by NAME reaches every `electron` and `dotnet` on the machine: the developer's
 * own app, any app a CDP-based suite is attached to, and other checkouts' runs on a shared box.
 * Selection here is by working directory instead, so cleanup reaches only what this checkout
 * started.
 *
 * Two decisions live here so they can be tested without killing anything: whether to sweep at all,
 * and which processes belong to this checkout.
 */
import fs from 'fs';
import path from 'path';

/** A process considered for cleanup. `cwd` is undefined when it could not be read. */
export type ProcessCandidate = { pid: number; comm: string; cwd: string | undefined };

/**
 * The only process names cleanup considers.
 *
 * Being under the repo root is necessary but NOT sufficient: npm, node and the shell running the
 * suite are rooted there too, and killing them kills the run doing the killing.
 *
 * `dotnet` is the data provider in development (`dotnet watch --project
 * c-sharp/ParanextDataProvider.csproj`), which is how every e2e run launches it. A packaged build
 * runs it as a `ParanextDataProvider` executable instead, named here so a packaged app started by
 * hand in this checkout is not left behind.
 */
const SWEEPABLE_PROCESS_NAMES = ['electron', 'dotnet', 'ParanextDataProvider'];

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

/** The parent of `pid`, or undefined when it cannot be read. */
function readParentPid(pid: number): number | undefined {
  try {
    // /proc/<pid>/stat field 4 is the parent pid. Field 2 is the command name, which can contain
    // spaces and parentheses, so only the fields after the final ')' can be split safely.
    const stat = fs.readFileSync(`/proc/${pid}/stat`, 'utf-8');
    const afterComm = stat
      .slice(stat.lastIndexOf(')') + 1)
      .trim()
      .split(/\s+/);
    const parsed = Number.parseInt(afterComm[1] ?? '', 10);
    return Number.isNaN(parsed) ? undefined : parsed;
  } catch {
    return undefined;
  }
}

/** This process and every ancestor of it, so cleanup cannot kill the run performing it. */
export function selfAndAncestorPids(): number[] {
  const pids: number[] = [];
  let current = process.pid;
  while (current > 1 && !pids.includes(current)) {
    pids.push(current);
    const parent = readParentPid(current);
    if (parent === undefined) break;
    current = parent;
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

/** What a cleanup pass may do, injected so the choice between them is testable. */
export type CleanupActions = {
  /** Terminate this checkout's processes, returning their pids. */
  killUnderRoot: (root: string) => number[];
  /** Terminate by process name across the machine. Only ever correct where the machine is ours. */
  sweepByProcessName: () => void;
};

/**
 * Decide and perform the cleanup this run should do.
 *
 * Scoped selection reads `/proc`, which only Linux has, so on macOS and Windows it can find nothing
 * at all. Those are CI runners in practice, and a CI runner is single-tenant — nothing else on the
 * machine belongs to anyone — so matching by name is both correct and the only option there.
 * Falling through to "do nothing" instead would quietly drop the cleanup on two of the three
 * platforms CI builds on.
 */
export function runCleanup(
  {
    ciFlag,
    platform,
    root,
  }: { ciFlag: string | undefined; platform: NodeJS.Platform; root: string },
  actions: CleanupActions,
): { swept: 'none' | 'scoped' | 'by-name'; pids: number[] } {
  if (!isSweepEnabled(ciFlag)) return { swept: 'none', pids: [] };
  if (platform === 'linux') return { swept: 'scoped', pids: actions.killUnderRoot(root) };
  actions.sweepByProcessName();
  return { swept: 'by-name', pids: [] };
}
