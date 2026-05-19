/**
 * Unit tests for .claude/scripts/integration-verify/fan-out.ts Covers every edge case spelled out
 * in PR-A foundation plan A.2.
 *
 * Each test materializes a tiny feature dir under tmp, writes a criteria.md, runs the fan-out
 * helper as a subprocess, and asserts the structured verdict.
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(REPO_ROOT, '.claude', 'scripts', 'integration-verify', 'fan-out.ts');

interface CaseFiles {
  /** Files to write into the feature dir; keys are paths relative to the feature dir. */
  [path: string]: string;
}

interface RunResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  output: {
    criteria: string;
    feature_dir: string;
    directives: Array<{
      name: string;
      status: 'PASS' | 'FAIL' | 'SKIP';
      tool: 'fan-out';
      fan_out_file: string;
      fan_out_pointer: string;
      criteria_line: number;
      items_total: number;
      items_passed: number;
      fan_out_results: Array<{ entry: string; status: 'PASS' | 'FAIL'; details?: string }>;
      directive_error?: string;
    }>;
  } | null;
}

const tmpDirs: string[] = [];

function setupCase(criteria: string, files: CaseFiles, env: NodeJS.ProcessEnv = {}): RunResult {
  const tmp = mkdtempSync(join(tmpdir(), 'fanout-'));
  tmpDirs.push(tmp);
  const featureDir = join(tmp, 'feature');
  mkdirSync(featureDir, { recursive: true });
  for (const [relPath, contents] of Object.entries(files)) {
    const absPath = join(featureDir, relPath);
    mkdirSync(join(absPath, '..'), { recursive: true });
    writeFileSync(absPath, contents, 'utf8');
  }
  const criteriaPath = join(tmp, 'criteria.md');
  writeFileSync(criteriaPath, criteria, 'utf8');
  const outputPath = join(tmp, 'fan-out-results.json');

  const result = spawnSync(
    'npx',
    [
      'tsx',
      SCRIPT,
      '--criteria',
      criteriaPath,
      '--feature-dir',
      featureDir,
      '--output',
      outputPath,
    ],
    {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      env: { ...process.env, ...env },
    },
  );

  let output: RunResult['output'] = null;
  try {
    output = JSON.parse(readFileSync(outputPath, 'utf8'));
  } catch {
    output = null;
  }
  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    output,
  };
}

afterEach(() => {
  // tmp dirs leak intentionally for debuggability; mkdtemp keeps them under $TMPDIR
});

describe('fan-out.ts directive edge cases (A.2)', () => {
  it('happy path: multi-entry all PASS → directive PASS, exit 0', () => {
    const result = setupCase(
      `- [auto, fan-out: implementation/integration-plan.json#/commands]
  For each command, the proof file exists.
  pass-when: test -f "proofs/wire/{name}.json"
`,
      {
        'implementation/integration-plan.json': JSON.stringify({
          commands: [{ name: 'a' }, { name: 'b' }, { name: 'c' }],
        }),
        'proofs/wire/a.json': '{}',
        'proofs/wire/b.json': '{}',
        'proofs/wire/c.json': '{}',
      },
    );
    expect(result.exitCode).toBe(0);
    expect(result.output?.directives[0]).toMatchObject({
      status: 'PASS',
      items_total: 3,
      items_passed: 3,
    });
  }, 30_000);

  it('mixed PASS/FAIL: 1/3 pass → directive FAIL, exit 1', () => {
    const result = setupCase(
      `- [auto, fan-out: data.json#/items]
  Each item passes when proofs/{id}.json exists.
  pass-when: test -f "proofs/{id}.json"
`,
      {
        'data.json': JSON.stringify({
          items: [{ id: 'A' }, { id: 'B' }, { id: 'C' }],
        }),
        'proofs/A.json': '{}',
        // B and C missing intentionally
      },
    );
    expect(result.exitCode).toBe(1);
    const d = result.output?.directives[0];
    expect(d?.status).toBe('FAIL');
    expect(d?.items_total).toBe(3);
    expect(d?.items_passed).toBe(1);
    expect(d?.fan_out_results.map((r) => `${r.entry}:${r.status}`)).toEqual([
      'A:PASS',
      'B:FAIL',
      'C:FAIL',
    ]);
  }, 30_000);

  it('empty array → directive SKIP, exit 0', () => {
    const result = setupCase(
      `- [auto, fan-out: data.json#/commands]
  No commands to check.
  pass-when: true
`,
      { 'data.json': JSON.stringify({ commands: [] }) },
    );
    expect(result.exitCode).toBe(0);
    expect(result.output?.directives[0]).toMatchObject({
      status: 'SKIP',
      items_total: 0,
      directive_error: 'no items to fan out over',
    });
  }, 30_000);

  it('missing fan-out file → directive FAIL', () => {
    const result = setupCase(
      `- [auto, fan-out: missing.json#/items]
  pass-when: true
`,
      {},
    );
    expect(result.exitCode).toBe(1);
    expect(result.output?.directives[0].status).toBe('FAIL');
    expect(result.output?.directives[0].directive_error).toMatch(/fan-out file not found/);
  }, 30_000);

  it('invalid JSON in fan-out file → directive FAIL', () => {
    const result = setupCase(
      `- [auto, fan-out: bad.json#/items]
  pass-when: true
`,
      { 'bad.json': '{ not valid json' },
    );
    expect(result.exitCode).toBe(1);
    expect(result.output?.directives[0].directive_error).toMatch(/not valid JSON/);
  }, 30_000);

  it('pointer does not resolve → directive FAIL', () => {
    const result = setupCase(
      `- [auto, fan-out: data.json#/nonexistent/path]
  pass-when: true
`,
      { 'data.json': JSON.stringify({ commands: [] }) },
    );
    expect(result.exitCode).toBe(1);
    expect(result.output?.directives[0].directive_error).toMatch(/pointer does not resolve/);
  }, 30_000);

  it('pointer resolves to non-array (object) → directive FAIL', () => {
    const result = setupCase(
      `- [auto, fan-out: data.json#/config]
  pass-when: true
`,
      { 'data.json': JSON.stringify({ config: { key: 'value' } }) },
    );
    expect(result.exitCode).toBe(1);
    expect(result.output?.directives[0].directive_error).toMatch(/not an array/);
  }, 30_000);

  it('deeply nested substitution: {producer.command}', () => {
    const result = setupCase(
      `- [auto, fan-out: plan.json#/touchpoints]
  Check producer.command field substitution.
  pass-when: echo "{producer.command}" | grep -q '^build$'
`,
      {
        'plan.json': JSON.stringify({
          touchpoints: [{ id: 'TP-001', producer: { cap: 'CAP-001', command: 'build' } }],
        }),
      },
    );
    expect(result.exitCode).toBe(0);
    expect(result.output?.directives[0]).toMatchObject({ status: 'PASS', items_passed: 1 });
  }, 30_000);

  it('RFC 6901 escapes (~1 = /, ~0 = ~)', () => {
    // JSON has a key containing "/" and "~" so we exercise both escapes.
    // We use ~1 to access the "weird/key" entry's contents.
    const result = setupCase(
      `- [auto, fan-out: data.json#/weird~1key]
  pass-when: test "{name}" = "alpha"
`,
      {
        'data.json': JSON.stringify({ 'weird/key': [{ name: 'alpha' }] }),
      },
    );
    expect(result.exitCode).toBe(0);
    expect(result.output?.directives[0]).toMatchObject({ status: 'PASS' });
  }, 30_000);

  it('unresolved placeholder in pass-when → entry FAIL, other entries continue', () => {
    const result = setupCase(
      `- [auto, fan-out: data.json#/items]
  Each item passes when the named (but absent) field is present.
  pass-when: test -f "proofs/{nonexistent_field}.json"
`,
      {
        'data.json': JSON.stringify({
          items: [{ id: 'A' }, { id: 'B' }],
        }),
      },
    );
    expect(result.exitCode).toBe(1);
    const d = result.output?.directives[0];
    expect(d?.status).toBe('FAIL');
    expect(d?.items_total).toBe(2);
    expect(d?.items_passed).toBe(0);
    expect(d?.fan_out_results[0].details).toMatch(/missing field.*nonexistent_field/);
    expect(d?.fan_out_results[1].details).toMatch(/missing field.*nonexistent_field/);
  }, 30_000);

  it('command timeout → entry FAIL with timeout marker', () => {
    const result = setupCase(
      `- [auto, fan-out: data.json#/items]
  pass-when: sleep 5
`,
      { 'data.json': JSON.stringify({ items: [{ id: 'A' }] }) },
      { FAN_OUT_TIMEOUT_MS: '200' },
    );
    expect(result.exitCode).toBe(1);
    const r0 = result.output?.directives[0].fan_out_results[0];
    expect(r0?.status).toBe('FAIL');
    expect(r0?.details).toMatch(/timeout/);
  }, 30_000);

  it('identifier fallback: entry.name when no id', () => {
    const result = setupCase(
      `- [auto, fan-out: data.json#/svcs]
  pass-when: true
`,
      {
        'data.json': JSON.stringify({
          svcs: [{ name: 'ChecklistDataProvider' }, { name: 'BookmarkDataProvider' }],
        }),
      },
    );
    expect(result.exitCode).toBe(0);
    const ids = result.output?.directives[0].fan_out_results.map((r) => r.entry);
    expect(ids).toEqual(['ChecklistDataProvider', 'BookmarkDataProvider']);
  }, 30_000);

  it('multiple directives in one criteria file: aggregated per directive', () => {
    const result = setupCase(
      `## block 1

- [auto, fan-out: data.json#/a]
  pass-when: test -f "proofs/{id}.txt"

## block 2

- [auto, fan-out: data.json#/b]
  pass-when: test -f "proofs/{id}.txt"
`,
      {
        'data.json': JSON.stringify({
          a: [{ id: 'x' }],
          b: [{ id: 'y' }],
        }),
        'proofs/x.txt': '',
        // y.txt missing
      },
    );
    expect(result.exitCode).toBe(1);
    expect(result.output?.directives).toHaveLength(2);
    expect(result.output?.directives[0].status).toBe('PASS');
    expect(result.output?.directives[1].status).toBe('FAIL');
  }, 30_000);
});
