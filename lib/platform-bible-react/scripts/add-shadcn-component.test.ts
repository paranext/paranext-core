import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// vi.mock calls are hoisted to the top of the file by Vitest; they must appear before any
// import that transitively uses these modules.
vi.mock('node:child_process', () => ({
  execSync: vi.fn(),
  execFileSync: vi.fn(),
}));
vi.mock('node:fs', () => ({
  readFileSync: vi.fn().mockReturnValue(':root { --a: 1; }'),
  writeFileSync: vi.fn(),
}));
vi.mock('./shadcn-transform-utils', () => ({
  parseProtectedVarsFromIndexCss: vi.fn().mockReturnValue(new Set<string>()),
  applyTransformationsToFiles: vi.fn().mockReturnValue({ modifiedCount: 0, errors: [] }),
}));

import { execFileSync, execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { main } from './add-shadcn-component';
import {
  applyTransformationsToFiles,
  parseProtectedVarsFromIndexCss,
} from './shadcn-transform-utils';

describe('add-shadcn-component main()', () => {
  let origArgv: string[];
  let stderrSpy: ReturnType<typeof vi.spyOn>;
  let exitSpy: ReturnType<typeof vi.spyOn>;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    origArgv = process.argv;
    stderrSpy = vi.spyOn(process.stderr, 'write').mockImplementation(() => true);
    exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => {
      throw new Error('process.exit');
    });
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    // (Re-)establish all vi.fn() implementations here. vi.restoreAllMocks() in afterEach
    // resets vi.fn() implementations back to undefined-returning, so mocks set up only in
    // the vi.mock() factory disappear after the first test.
    vi.mocked(execSync).mockImplementation(() => '' as unknown as Buffer);
    vi.mocked(execFileSync).mockImplementation(() => Buffer.from(''));
    vi.mocked(readFileSync).mockImplementation(() => ':root { --a: 1; }');
    vi.mocked(parseProtectedVarsFromIndexCss).mockImplementation(() => new Set<string>());
    vi.mocked(applyTransformationsToFiles).mockImplementation(() => ({
      modifiedCount: 0,
      errors: [],
    }));
  });

  afterEach(() => {
    process.argv = origArgv;
    vi.restoreAllMocks();
  });

  it('exits 1 with usage message when no component name is provided', () => {
    process.argv = ['node', 'add-shadcn-component.ts'];
    expect(() => main()).toThrow('process.exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('Usage:'));
  });

  it('exits 1 with usage message when only the component name is provided (preset missing)', () => {
    process.argv = ['node', 'add-shadcn-component.ts', 'progress'];
    expect(() => main()).toThrow('process.exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('Usage:'));
  });

  it('exits 1 with abort message when there are uncommitted working changes', () => {
    process.argv = ['node', 'add-shadcn-component.ts', 'progress', 'my-preset'];
    vi.mocked(execSync).mockReturnValue('M lib/some-file.ts\n' as unknown as Buffer);
    expect(() => main()).toThrow('process.exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('uncommitted'));
  });

  it('exits 1 when npx shadcn add fails', () => {
    process.argv = ['node', 'add-shadcn-component.ts', 'progress', 'my-preset'];
    vi.mocked(execFileSync).mockImplementation((_cmd, args) => {
      if (Array.isArray(args) && (args as string[]).includes('add'))
        throw new Error('shadcn failed');
      return Buffer.from('');
    });
    expect(() => main()).toThrow('process.exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it('still runs format and lint-fix even when npx shadcn add fails', () => {
    process.argv = ['node', 'add-shadcn-component.ts', 'progress', 'my-preset'];
    vi.mocked(execFileSync).mockImplementation((_cmd, args) => {
      if (Array.isArray(args) && (args as string[]).includes('add'))
        throw new Error('shadcn failed');
      return Buffer.from('');
    });
    try {
      main();
    } catch {
      // expected process.exit throw
    }
    const calls = vi.mocked(execFileSync).mock.calls;
    expect(calls.some((c) => Array.isArray(c[1]) && (c[1] as string[]).includes('format'))).toBe(
      true,
    );
    expect(calls.some((c) => Array.isArray(c[1]) && (c[1] as string[]).includes('lint-fix'))).toBe(
      true,
    );
  });

  it('does not call process.exit(1) on full success', () => {
    process.argv = ['node', 'add-shadcn-component.ts', 'progress', 'my-preset'];
    main(); // must not throw
    expect(exitSpy).not.toHaveBeenCalledWith(1);
  });

  it('commits with the proper message containing component, preset, and sentinel on full success', () => {
    process.argv = ['node', 'add-shadcn-component.ts', 'progress', 'my-preset'];
    main();
    const calls = vi.mocked(execFileSync).mock.calls;
    const commitCall = calls.find(
      (c) => Array.isArray(c[1]) && (c[1] as string[]).includes('commit'),
    );
    expect(commitCall).toBeDefined();
    const commitArgs = commitCall![1] as string[];
    const messageIdx = commitArgs.indexOf('-m');
    expect(messageIdx).toBeGreaterThan(-1);
    const message = commitArgs[messageIdx + 1];
    expect(message).toContain('progress');
    expect(message).toContain('npx shadcn apply --preset my-preset');
    expect(message).toContain('as a new baseline');
  });

  it('exits 1 with manual-commit instructions when the auto-commit fails', () => {
    process.argv = ['node', 'add-shadcn-component.ts', 'progress', 'my-preset'];
    vi.mocked(execFileSync).mockImplementation((_cmd, args) => {
      if (Array.isArray(args) && (args as string[]).includes('commit'))
        throw new Error('commit failed');
      return Buffer.from('');
    });
    expect(() => main()).toThrow('process.exit');
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(stderrSpy).toHaveBeenCalledWith(expect.stringContaining('Commit failed'));
    expect(stderrSpy).toHaveBeenCalledWith(
      expect.stringContaining('npx shadcn apply --preset my-preset'),
    );
  });
});
