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

/** `/proc/<pid>/comm` is capped at this many characters by the kernel (TASK_COMM_LEN - 1). */
const COMM_MAX_LENGTH = 15;

/**
 * The only process names cleanup considers, truncated the way `/proc` reports them.
 *
 * Being under the repo root is necessary but NOT sufficient: npm, node and the shell running the
 * suite are rooted there too, and killing them kills the run doing the killing.
 *
 * `dotnet` is the data provider in development (`dotnet watch --project
 * c-sharp/ParanextDataProvider.csproj`), which is how every e2e run launches it. `dotnet watch`
 * then execs the apphost binary, and a packaged build runs that binary directly — so the executable
 * name is here too. It is longer than the cap, which is exactly why these are truncated rather than
 * compared whole: spelled in full it would never match anything.
 */
const SWEEPABLE_PROCESS_NAMES = ['electron', 'dotnet', 'ParanextDataProvider'].map((name) =>
  name.slice(0, COMM_MAX_LENGTH),
);

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
/**
 * `dir` with symlinks resolved, falling back to a plain resolve when the path cannot be read.
 *
 * A working directory read from /proc is always fully resolved, so a root that still contains a
 * symlink compares against a path no process can match.
 */
function realPathOrResolved(dir: string): string {
  try {
    return fs.realpathSync(path.resolve(dir));
  } catch {
    return path.resolve(dir);
  }
}

export function selectPidsUnderRoot(
  root: string,
  candidates: ProcessCandidate[],
  excludePids: number[],
): number[] {
  const resolvedRoot = realPathOrResolved(root);
  const prefix = `${resolvedRoot}${path.sep}`;
  // Worktrees of this repository live at <root>/.claude/worktrees/<name>, so they sit INSIDE the
  // root by path while belonging to a different checkout and, usually, a different run. Plain
  // containment would claim all of them, which is the same cross-checkout kill this module exists
  // to prevent. A run whose own root IS such a directory is unaffected: the container it excludes
  // is relative to its own root, not the canonical one.
  const nestedWorktrees = `${path.join(resolvedRoot, '.claude', 'worktrees')}${path.sep}`;
  return candidates
    .filter((candidate) => !excludePids.includes(candidate.pid))
    .filter((candidate) => SWEEPABLE_PROCESS_NAMES.includes(candidate.comm))
    .filter(
      (candidate) =>
        candidate.cwd !== undefined &&
        (candidate.cwd === resolvedRoot || candidate.cwd.startsWith(prefix)) &&
        !candidate.cwd.startsWith(nestedWorktrees),
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

/** What a cleanup did. */
export type CleanupOutcome = {
  /** Pids terminated because their working directory is inside this checkout. */
  pids: number[];
  /** Whether the working-directory-scoped sweep ran. */
  scoped: boolean;
  /** What the machine-wide sweep by process name did. */
  byName: 'skipped' | 'ran' | 'failed';
};

/**
 * Decide and perform the cleanup this run should do.
 *
 * The two sweeps answer different questions and are not alternatives. Scoping answers "which
 * processes are mine", and matters most on a shared developer machine, where a run must clear its
 * own leaked app without touching a peer's checkout or the app the developer is using. It reads
 * `/proc`, so only Linux can do it at all.
 *
 * The machine-wide sweep answers "is anything left over", and is safe only where the machine
 * belongs to the run. On a CI runner it is, so it runs there in addition — it matches build
 * watchers by command line, which selection by process name cannot reach.
 *
 * That leaves one combination with nothing to do: off CI, on a platform without `/proc`, where
 * scoping is impossible and a machine-wide kill would hit the developer's own processes. Doing
 * nothing is the only safe answer there.
 */
export function runCleanup(
  {
    ciFlag,
    platform,
    root,
  }: { ciFlag: string | undefined; platform: NodeJS.Platform; root: string },
  actions: CleanupActions,
): CleanupOutcome {
  const scoped = platform === 'linux';
  const pids = scoped ? actions.killUnderRoot(root) : [];
  if (!isSweepEnabled(ciFlag)) return { pids, scoped, byName: 'skipped' };
  try {
    actions.sweepByProcessName();
  } catch {
    // Having nothing to stop is a routine outcome, and the shell-outs behind it (ps, PowerShell's
    // CIM enumeration, fkill) can also exit non-zero or time out. None of that should turn a run
    // whose tests all passed into a failed one, nor discard pids already terminated.
    return { pids, scoped, byName: 'failed' };
  }
  return { pids, scoped, byName: 'ran' };
}
