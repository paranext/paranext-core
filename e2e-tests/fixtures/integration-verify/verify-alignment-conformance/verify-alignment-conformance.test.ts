/** Tests for .claude/scripts/integration-verify/verify-alignment-conformance.ts (PR-B B.5a). */
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
  'verify-alignment-conformance.ts',
);

interface Result {
  status: 'PASS' | 'FAIL';
  checked: { files: number; utilities: number; patternRefs: number };
  failures: Array<Record<string, unknown>>;
  warnings: Array<Record<string, unknown>>;
}

function setup(
  files: Record<string, string>,
  alignment: unknown,
): {
  exitCode: number;
  output: Result | null;
} {
  const tmp = mkdtempSync(join(tmpdir(), 'align-conf-'));
  mkdirSync(join(tmp, 'c-sharp'), { recursive: true });
  writeFileSync(join(tmp, 'c-sharp', 'Program.cs'), 'class P {}', 'utf8');
  for (const [rel, contents] of Object.entries(files)) {
    const full = join(tmp, rel);
    mkdirSync(join(full, '..'), { recursive: true });
    writeFileSync(full, contents, 'utf8');
  }
  const alignmentPath = join(tmp, 'backend-alignment.json');
  writeFileSync(alignmentPath, JSON.stringify(alignment), 'utf8');
  const outPath = join(tmp, 'alignment-conformance.json');
  const r = spawnSync(
    'npx',
    ['tsx', SCRIPT, '--alignment', alignmentPath, '--output', outPath, '--repo-root', tmp],
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

describe('verify-alignment-conformance.ts', () => {
  it('PASS — all files exist, namespaces match, utility referenced', () => {
    const r = setup(
      {
        'c-sharp/Sample/SampleService.cs': `namespace Sample.Foo;
class SampleService {
  void M() => LocalParatextProjects.GetAll();
}`,
        'c-sharp/Helpers/LocalParatextProjects.cs': `namespace Sample.Helpers;
class LocalParatextProjects { public static void GetAll() {} }`,
      },
      {
        feature: 'sample',
        version: '1.0.0',
        namespace: 'Sample.Foo',
        files: [{ path: 'c-sharp/Sample/SampleService.cs', kind: 'service' }],
        utilities: [
          {
            id: 'UTL-CS-001',
            name: 'LocalParatextProjects',
            location: 'c-sharp/Helpers/LocalParatextProjects.cs:1',
            usedInFiles: ['c-sharp/Sample/SampleService.cs'],
          },
        ],
        testInfra: { baseClass: 'ParatextDataProviderTestBase' },
      },
    );
    expect(r.exitCode).toBe(0);
    expect(r.output?.status).toBe('PASS');
  });

  it('FAIL — namespace drift', () => {
    const r = setup(
      {
        'c-sharp/Sample/SampleService.cs': `namespace Sample.FooOld;
class SampleService {}`,
      },
      {
        feature: 'sample',
        version: '1.0.0',
        namespace: 'Sample.Foo',
        files: [{ path: 'c-sharp/Sample/SampleService.cs', kind: 'service' }],
        utilities: [],
        testInfra: { baseClass: 'Base' },
      },
    );
    expect(r.exitCode).toBe(1);
    expect(r.output?.failures[0]).toMatchObject({
      kind: 'namespace-drift',
      expected: 'Sample.Foo',
      actual: 'Sample.FooOld',
    });
  });

  it('FAIL — declared file missing', () => {
    const r = setup(
      {},
      {
        feature: 'sample',
        version: '1.0.0',
        namespace: 'Sample',
        files: [{ path: 'c-sharp/Sample/Gone.cs' }],
        utilities: [],
        testInfra: { baseClass: 'Base' },
      },
    );
    expect(r.exitCode).toBe(1);
    expect(r.output?.failures[0]).toMatchObject({
      kind: 'missing-file',
      file: 'c-sharp/Sample/Gone.cs',
    });
  });

  it('FAIL — utility not used', () => {
    const r = setup(
      {
        'c-sharp/Sample/SampleService.cs': `namespace Sample;
class SampleService {}`,
      },
      {
        feature: 'sample',
        version: '1.0.0',
        namespace: 'Sample',
        files: [{ path: 'c-sharp/Sample/SampleService.cs' }],
        utilities: [
          {
            id: 'UTL-CS-001',
            name: 'LocalParatextProjects',
            location: 'c-sharp/Helpers/LocalParatextProjects.cs:1',
            usedInFiles: ['c-sharp/Sample/SampleService.cs'],
          },
        ],
        testInfra: { baseClass: 'Base' },
      },
    );
    expect(r.exitCode).toBe(1);
    expect(r.output?.failures[0]).toMatchObject({
      kind: 'utility-not-used',
      utilityName: 'LocalParatextProjects',
    });
  });

  it('WARN — stale pattern reference does not fail the gate', () => {
    const r = setup(
      {
        'c-sharp/Sample/Hello.cs': `namespace Sample;
class Hello {}
// (line 3 is blank below)

`,
      },
      {
        feature: 'sample',
        version: '1.0.0',
        namespace: 'Sample',
        files: [{ path: 'c-sharp/Sample/Hello.cs' }],
        utilities: [],
        patternRefs: [
          // line 3 is empty in the test fixture
          {
            description: 'NetworkObject registration pattern',
            location: 'c-sharp/Sample/Hello.cs:3',
          },
        ],
        testInfra: { baseClass: 'Base' },
      },
    );
    expect(r.exitCode).toBe(0);
    expect(r.output?.warnings[0]).toMatchObject({ kind: 'stale-pattern-ref' });
  });
});
