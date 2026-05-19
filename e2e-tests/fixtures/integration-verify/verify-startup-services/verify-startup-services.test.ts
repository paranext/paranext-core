/** Tests for .claude/scripts/integration-verify/verify-startup-services.ts (PR-B B.3). */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'verify-startup-services.ts',
);

interface Result {
  status: 'PASS' | 'FAIL';
  checked: number;
  passed: number;
  failures: Array<{ kind: string; className: string; registrarFile?: string }>;
}

function setup(
  programCs: string,
  services: Array<{ className: string; registrarFile?: string }>,
): {
  exitCode: number;
  output: Result | null;
} {
  const tmp = mkdtempSync(join(tmpdir(), 'startup-'));
  mkdirSync(join(tmp, 'c-sharp'), { recursive: true });
  writeFileSync(join(tmp, 'c-sharp', 'Program.cs'), programCs, 'utf8');
  const plan = {
    feature: 'sample',
    version: '1.0.0',
    phase: 3,
    commands: [],
    journeys: [],
    navigation: { menuItems: [], webViewTitle: '' },
    touchpoints: [],
    startup: { services, commandPairs: [] },
  };
  const planPath = join(tmp, 'plan.json');
  writeFileSync(planPath, JSON.stringify(plan), 'utf8');
  const outPath = join(tmp, 'startup-services.json');
  const r = spawnSync(
    'npx',
    ['tsx', SCRIPT, '--integration-plan', planPath, '--output', outPath, '--repo-root', tmp],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  let output: Result | null = null;
  try {
    output = JSON.parse(readFileSync(outPath, 'utf8')) as Result;
  } catch {
    output = null;
  }
  return { exitCode: r.status ?? -1, output };
}

describe('verify-startup-services.ts', () => {
  it('PASS — service instantiated and in Task.WhenAll', () => {
    const r = setup(
      `
class Program {
  static async Task Main() {
    var sampleService = new SampleService();
    await Task.WhenAll(sampleService.RegisterAsync());
  }
}
`,
      [{ className: 'SampleService' }],
    );
    expect(r.exitCode).toBe(0);
    expect(r.output?.status).toBe('PASS');
    expect(r.output?.passed).toBe(1);
  });

  it('FAIL — service not instantiated', () => {
    const r = setup(
      `
class Program { static async Task Main() {} }
`,
      [{ className: 'MissingService' }],
    );
    expect(r.exitCode).toBe(1);
    expect(r.output?.status).toBe('FAIL');
    expect(r.output?.failures[0].kind).toBe('missing-instantiation');
  });

  it('FAIL — service instantiated but absent from Task.WhenAll', () => {
    const r = setup(
      `
class Program {
  static async Task Main() {
    var orphan = new SampleService();
    await Task.WhenAll(other.RegisterAsync());
  }
}
`,
      [{ className: 'SampleService' }],
    );
    expect(r.exitCode).toBe(1);
    expect(r.output?.failures[0].kind).toBe('missing-task-whenall');
  });

  it('PASS — multiple services, each instantiated and registered', () => {
    const r = setup(
      `
class Program {
  static async Task Main() {
    var a = new ServiceA();
    var b = new ServiceB();
    await Task.WhenAll(a.RegisterAsync(), b.RegisterAsync());
  }
}
`,
      [{ className: 'ServiceA' }, { className: 'ServiceB' }],
    );
    expect(r.exitCode).toBe(0);
    expect(r.output?.passed).toBe(2);
  });
});
