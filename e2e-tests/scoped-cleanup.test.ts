/**
 * Unit tests for the teardown's process selection.
 *
 * Killing every process named `electron` or `dotnet` on the machine is correct only on a CI runner
 * the run owns. Anywhere else it takes down the developer's own app, any app a CDP-based suite is
 * attached to, and other people's runs. These cover the two decisions that keep teardown from doing
 * that — whether to sweep at all, and which processes belong to this checkout.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, it } from 'vitest';
import { isSweepEnabled, runCleanup, selectPidsUnderRoot } from './scoped-cleanup';

// Working directories come from /proc, so every synthetic one here is POSIX regardless of the host
// running the tests. The real directories in the symlink test below are the one exception.
const ROOT = '/home/dev/paranext-core';

describe('whether to sweep at all', () => {
  it('sweeps when CI is set to something meaning yes', () => {
    expect(isSweepEnabled('true')).toBe(true);
    expect(isSweepEnabled('1')).toBe(true);
    expect(isSweepEnabled('yes')).toBe(true);
  });

  it('does NOT sweep when CI is unset or empty', () => {
    expect(isSweepEnabled(undefined)).toBe(false);
    expect(isSweepEnabled('')).toBe(false);
    expect(isSweepEnabled('   ')).toBe(false);
  });

  it('does NOT sweep when CI is set to something meaning no', () => {
    // The whole point: `CI=false` is a non-empty string, so a truthiness test treats it as yes and
    // sweeps the machine — which is a common wrapper and IDE idiom, not an exotic case.
    expect(isSweepEnabled('false')).toBe(false);
    expect(isSweepEnabled('0')).toBe(false);
    expect(isSweepEnabled('no')).toBe(false);
    expect(isSweepEnabled('off')).toBe(false);
    expect(isSweepEnabled('FALSE')).toBe(false);
  });
});

describe('which processes belong to this checkout', () => {
  const candidates = [
    { pid: 101, comm: 'electron', cwd: ROOT },
    { pid: 102, comm: 'electron', cwd: path.posix.join(ROOT, 'release/app') },
    { pid: 103, comm: 'dotnet', cwd: path.posix.join(ROOT, 'c-sharp') },
  ];

  it('selects processes running inside the root', () => {
    expect(selectPidsUnderRoot(ROOT, candidates, [])).toEqual([101, 102, 103]);
  });

  it('leaves a neighbouring checkout alone', () => {
    // The failure that matters: another worktree's app must survive this run's teardown.
    const neighbour = { pid: 201, comm: 'electron', cwd: '/home/dev/other-worktree/paranext-core' };

    expect(selectPidsUnderRoot(ROOT, [...candidates, neighbour], [])).not.toContain(201);
  });

  it('is not fooled by a sibling directory sharing the root as a prefix', () => {
    const sibling = { pid: 202, comm: 'electron', cwd: `${ROOT}-other/release/app` };

    expect(selectPidsUnderRoot(ROOT, [sibling], [])).toEqual([]);
  });

  it('never selects this process or its ancestors', () => {
    // Teardown runs from the repo root, so without this it would select the very process doing the
    // killing and take the run down with it.
    const self = { pid: 999, comm: 'node', cwd: ROOT };

    expect(selectPidsUnderRoot(ROOT, [...candidates, self], [999])).not.toContain(999);
  });

  it('ignores processes whose cwd could not be read', () => {
    // /proc/<pid>/cwd is unreadable for another user's process. Unknown means "not ours".
    const unreadable = { pid: 301, comm: 'electron', cwd: undefined };

    expect(selectPidsUnderRoot(ROOT, [unreadable], [])).toEqual([]);
  });

  it('only targets the process names the old sweep targeted', () => {
    // Everything under the root is not fair game: npm, node and the shell running the suite all
    // live here too, and killing them kills the run.
    const ourOwnTooling = { pid: 401, comm: 'npm', cwd: ROOT };

    expect(selectPidsUnderRoot(ROOT, [ourOwnTooling], [])).toEqual([]);
  });
});

describe('which cleanup each environment gets', () => {
  /** Records which action ran, so the choice can be asserted without killing anything. */
  function spyActions(sweepByProcessName = () => {}) {
    const calls: string[] = [];
    return {
      calls,
      actions: {
        killUnderRoot: (root: string) => {
          calls.push(`scoped:${root}`);
          return [4242];
        },
        sweepByProcessName: () => {
          calls.push('by-name');
          sweepByProcessName();
        },
      },
    };
  }

  function cleanup(ciFlag: string | undefined, platform: NodeJS.Platform) {
    const { calls, actions } = spyActions();
    const result = runCleanup({ ciFlag, platform, root: ROOT }, actions);
    return { ...result, calls };
  }

  it('cleans up this checkout on Linux even when nobody set CI', () => {
    // The case the whole module exists for. A developer's box is where scoping matters: their run
    // must clear its own leaked app without touching a peer's checkout or their editor's.
    const result = cleanup(undefined, 'linux');

    expect(result.scoped).toBe(true);
    expect(result.pids).toEqual([4242]);
    expect(result.calls).toEqual([`scoped:${ROOT}`]);
    expect(result.byName).toBe('skipped');
  });

  it('does the same when CI is explicitly false on Linux', () => {
    const result = cleanup('false', 'linux');

    expect(result.scoped).toBe(true);
    expect(result.byName).toBe('skipped');
  });

  it('also runs the machine-wide sweep on a Linux CI runner', () => {
    // A CI runner is single-tenant, so the old sweep's wider reach costs nothing there and keeps
    // its coverage — it matches build watchers by command line, which scoped selection does not.
    const result = cleanup('true', 'linux');

    expect(result.scoped).toBe(true);
    expect(result.byName).toBe('ran');
    expect(result.calls).toEqual([`scoped:${ROOT}`, 'by-name']);
  });

  it('sweeps by name on a CI runner without /proc', () => {
    (['darwin', 'win32'] as const).forEach((platform) => {
      const result = cleanup('true', platform);

      expect(result.scoped).toBe(false);
      expect(result.byName).toBe('ran');
      expect(result.calls).toEqual(['by-name']);
    });
  });

  it('does nothing off CI where it cannot scope', () => {
    // Nothing can be scoped without /proc, and a machine-wide kill on someone's own Mac or Windows
    // box is the behaviour this module exists to stop. Doing nothing is the only safe answer.
    (['darwin', 'win32'] as const).forEach((platform) => {
      const result = cleanup(undefined, platform);

      expect(result.scoped).toBe(false);
      expect(result.byName).toBe('skipped');
      expect(result.calls).toEqual([]);
    });
  });
});

describe('processes this checkout must NOT claim', () => {
  it('leaves a nested worktree alone, even though its path is inside the root', () => {
    // Worktrees in this repo live at <root>/.claude/worktrees/<name>, so plain prefix containment
    // claims every one of them. A teardown run from the canonical checkout would then kill every
    // worktree's app — the exact cross-checkout kill this module exists to prevent, wearing a
    // different shape.
    const nested = {
      pid: 501,
      comm: 'electron',
      cwd: path.posix.join(ROOT, '.claude/worktrees/some-branch'),
    };
    const deeper = {
      pid: 502,
      comm: 'dotnet',
      cwd: path.posix.join(ROOT, '.claude/worktrees/some-branch/c-sharp'),
    };

    expect(selectPidsUnderRoot(ROOT, [nested, deeper], [])).toEqual([]);
  });

  it('still claims its own processes when it IS a nested worktree', () => {
    // The run happening inside a worktree must clean up after itself.
    const worktreeRoot = path.posix.join(ROOT, '.claude/worktrees/some-branch');
    const own = { pid: 503, comm: 'electron', cwd: worktreeRoot };

    expect(selectPidsUnderRoot(worktreeRoot, [own], [])).toEqual([503]);
  });
});

describe('a root reached through a symlink', () => {
  // Linux-only, and every filesystem call lives inside the test rather than the suite body: a
  // skipped test still has its enclosing describe evaluated during collection, and creating a
  // symlink on Windows needs privileges a runner may not have. A Windows temp path could not
  // stand in for a /proc working directory anyway.
  it.skipIf(process.platform !== 'linux')(
    "claims its own processes when the run's root is a symlink",
    () => {
      // Resolved once up front: os.tmpdir() itself is a symlink on some hosts (e.g. macOS's /tmp ->
      // /private/tmp), and comparing against an unresolved scratch dir would make `mine.cwd` below
      // fail to match the same way a real symlinked checkout would, for a reason unrelated to what
      // this test is checking.
      const scratch = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'scoped-cleanup-')));
      try {
        const realRoot = path.join(scratch, 'real-checkout');
        const linkedRoot = path.join(scratch, 'linked-checkout');
        fs.mkdirSync(realRoot);
        fs.symlinkSync(realRoot, linkedRoot);

        // /proc/<pid>/cwd is a resolved path, so a run launched through a symlinked checkout
        // compares its own processes against a path they can never match, and cleans up nothing.
        const mine = { pid: 301, comm: 'electron', cwd: path.join(realRoot, 'release/app') };

        expect(selectPidsUnderRoot(linkedRoot, [mine], [])).toEqual([301]);
      } finally {
        fs.rmSync(scratch, { recursive: true, force: true });
      }
    },
  );
});

describe('process names as the kernel reports them', () => {
  it('matches the data provider by the name /proc actually shows', () => {
    // /proc/<pid>/comm is capped at 15 characters, so a 20-character executable name is truncated
    // and a full-length entry in the list can never match anything.
    const dataProvider = { pid: 601, comm: 'ParanextDataPro', cwd: ROOT };

    expect(selectPidsUnderRoot(ROOT, [dataProvider], [])).toEqual([601]);
  });
});

describe('a failing name sweep does not fail the run', () => {
  const throwingActions = {
    killUnderRoot: () => [4242],
    sweepByProcessName: () => {
      throw new Error('npm run stop exited 1');
    },
  };

  it('reports the failure instead of throwing out of teardown', () => {
    // `npm run stop` shelling out to ps/CIM and fkill can exit non-zero or time out; that was an
    // expected outcome before and must not turn a passing run red.
    expect(() =>
      runCleanup({ ciFlag: 'true', platform: 'darwin', root: ROOT }, throwingActions),
    ).not.toThrow();
    expect(
      runCleanup({ ciFlag: 'true', platform: 'darwin', root: ROOT }, throwingActions).byName,
    ).toBe('failed');
  });

  it('keeps the scoped result when only the name sweep fails', () => {
    // On a Linux runner both run. A failing name sweep must not discard pids already terminated.
    const result = runCleanup({ ciFlag: 'true', platform: 'linux', root: ROOT }, throwingActions);

    expect(result.scoped).toBe(true);
    expect(result.pids).toEqual([4242]);
    expect(result.byName).toBe('failed');
  });
});
