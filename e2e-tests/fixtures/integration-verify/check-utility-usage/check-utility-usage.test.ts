/** Tests for .claude/scripts/integration-verify/check-utility-usage.ts (PR-B B.7 helper). */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'check-utility-usage.ts',
);

function run(
  files: Record<string, string>,
  alignment: unknown,
  utilityId: string,
): { exitCode: number; stderr: string } {
  const tmp = mkdtempSync(join(tmpdir(), 'utl-usage-'));
  mkdirSync(join(tmp, 'c-sharp'), { recursive: true });
  writeFileSync(join(tmp, 'c-sharp', 'Program.cs'), 'class P {}', 'utf8');
  for (const [rel, contents] of Object.entries(files)) {
    const full = join(tmp, rel);
    mkdirSync(join(full, '..'), { recursive: true });
    writeFileSync(full, contents, 'utf8');
  }
  const alignmentPath = join(tmp, 'backend-alignment.json');
  writeFileSync(alignmentPath, JSON.stringify(alignment), 'utf8');
  const r = spawnSync(
    'npx',
    ['tsx', SCRIPT, '--utility-id', utilityId, '--alignment', alignmentPath, '--repo-root', tmp],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  return { exitCode: r.status ?? -1, stderr: r.stderr ?? '' };
}

describe('check-utility-usage.ts', () => {
  it('PASS — utility name token found in each file', () => {
    const r = run(
      {
        'c-sharp/A.cs': `class A { void M() { LocalParatextProjects.X(); } }`,
        'c-sharp/B.cs': `// uses LocalParatextProjects.Y()`,
      },
      {
        utilities: [
          {
            id: 'UTL-CS-001',
            name: 'LocalParatextProjects',
            location: 'X:1',
            usedInFiles: ['c-sharp/A.cs', 'c-sharp/B.cs'],
          },
        ],
      },
      'UTL-CS-001',
    );
    expect(r.exitCode).toBe(0);
  });

  it('FAIL — utility name token missing from one file', () => {
    const r = run(
      {
        'c-sharp/A.cs': `class A { void M() { LocalParatextProjects.X(); } }`,
        'c-sharp/B.cs': `class B {}`,
      },
      {
        utilities: [
          {
            id: 'UTL-CS-001',
            name: 'LocalParatextProjects',
            location: 'X:1',
            usedInFiles: ['c-sharp/A.cs', 'c-sharp/B.cs'],
          },
        ],
      },
      'UTL-CS-001',
    );
    expect(r.exitCode).toBe(1);
    expect(r.stderr).toContain('B.cs');
  });

  it('FAIL — declared file missing on disk', () => {
    const r = run(
      {},
      {
        utilities: [
          { id: 'UTL-CS-002', name: 'Foo', location: 'X:1', usedInFiles: ['c-sharp/Gone.cs'] },
        ],
      },
      'UTL-CS-002',
    );
    expect(r.exitCode).toBe(1);
  });

  it('PASS — utility with empty usedInFiles vacuously passes', () => {
    const r = run(
      {},
      { utilities: [{ id: 'UTL-CS-001', name: 'Foo', location: 'X:1' }] },
      'UTL-CS-001',
    );
    expect(r.exitCode).toBe(0);
  });

  it('die — unknown utility id', () => {
    const r = run({}, { utilities: [] }, 'UTL-CS-999');
    expect(r.exitCode).toBe(2);
  });
});
