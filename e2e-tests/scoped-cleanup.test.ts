/**
 * Unit tests for the teardown's process selection.
 *
 * Teardown used to finish by killing every process named `electron` or `dotnet` on the machine.
 * That is correct on a CI runner the run owns and wrong everywhere else: it takes down the
 * developer's own app, any app a CDP-based suite is attached to, and other people's runs. These
 * cover the two decisions that keep it from doing so — whether to sweep at all, and which processes
 * belong to this checkout.
 */
import path from 'path';
import { describe, expect, it } from 'vitest';
import { isSweepEnabled, selectPidsUnderRoot } from './scoped-cleanup';

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
    { pid: 102, comm: 'electron', cwd: path.join(ROOT, 'release/app') },
    { pid: 103, comm: 'dotnet', cwd: path.join(ROOT, 'c-sharp') },
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
