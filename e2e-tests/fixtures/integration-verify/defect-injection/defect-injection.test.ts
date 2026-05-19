/**
 * PR-B B.10 defect-injection validation (11 cases).
 *
 * For each defect listed in the plan's B.10, this test materializes a tiny
 * "feature" with a planted bug and confirms the relevant script FAILs with the
 * expected `kind` field. The intent is precision: every B.10 row is exercised
 * by exactly one test below, so a regression in any verifier surfaces here.
 *
 * Plan reference:
 *   .context/plans/we-ported-the-first-vectorized-gizmo.md Part 3 B.10
 *
 * The 11 cases:
 *   1.  Remove service from Task.WhenAll                → verify-startup-services FAIL missing-task-whenall
 *   2.  Change C# handler param type                    → audit-extension-registration FAIL type-drift
 *   3.  Return tuple from C# handler                    → (verified via existing Roslyn PNX007; build fails)
 *   4.  Break touchpoint shape (wrong producer return)  → covered by the generated touchpoint spec (runtime)
 *   5.  Unrecognized C# form (method-group syntax)      → audit-extension-registration FAIL unrecognized-form
 *   6.  Rename a namespace                              → verify-alignment-conformance FAIL namespace-drift
 *   7.  Move a declared file                            → verify-alignment-conformance FAIL missing-file
 *   8.  Remove a utility call                           → verify-alignment-conformance FAIL utility-not-used
 *   9.  Edit backend-alignment.json.namespace post-snap → check-contract-drift FAIL structurally (PR-A scope)
 *  10.  Edit patternRefs[0].description post-snap       → check-contract-drift WARN descriptively (PR-A scope)
 *  11.  Add console.error in extension-host startup     → app-start.json FAIL (covered by runtime-verifier
 *        wiring; not script-injectable here without spinning up the app)
 *
 * Cases 3, 4, 9, 10, 11 are covered indirectly:
 *   - Case 3 (tuple return) is a Roslyn analyzer (PNX007) and a Playwright wire-conformance
 *     check (Ajv would fail). Both are out of this test's scope: PNX007 runs in dotnet build,
 *     and wire-conformance is a runtime test that needs the live app.
 *   - Case 4 (touchpoint break) is similarly runtime — the generated touchpoints.spec.ts
 *     produces the FAIL when run against a real backend.
 *   - Cases 9 and 10 are covered by the PR-A drift-detection.test.ts (already passing).
 *   - Case 11 needs the live app; covered by runtime-verifier's app-start step.
 *
 * What this file exercises directly: cases 1, 2, 5, 6, 7, 8 — the deterministic
 * static defects the PR-B scripts catch on their own.
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPTS_DIR = join(REPO_ROOT, '.claude', 'scripts', 'integration-verify');

function runScript(scriptName: string, args: string[]): { exitCode: number; output: unknown } {
  const out = mkdtempSync(join(tmpdir(), `${scriptName}-`)) + '/result.json';
  const fullArgs = [...args, '--output', out];
  const r = spawnSync('npx', ['tsx', join(SCRIPTS_DIR, scriptName), ...fullArgs], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  let output: unknown = null;
  try {
    output = JSON.parse(readFileSync(out, 'utf8'));
  } catch {
    output = null;
  }
  return { exitCode: r.status ?? -1, output };
}

function setupFakeRepo(): string {
  const tmp = mkdtempSync(join(tmpdir(), 'defect-'));
  mkdirSync(join(tmp, 'c-sharp'), { recursive: true });
  writeFileSync(join(tmp, 'c-sharp', 'Program.cs'), '// placeholder', 'utf8');
  return tmp;
}

describe('PR-B B.10 defect injection (deterministic FAILs)', () => {
  it('Case 1: service removed from Task.WhenAll → missing-task-whenall', () => {
    const tmp = setupFakeRepo();
    writeFileSync(
      join(tmp, 'c-sharp', 'Program.cs'),
      `
class Program {
  static async Task Main() {
    var orphan = new SampleService();
    // intentionally NOT in Task.WhenAll
  }
}
`,
      'utf8',
    );
    const planPath = join(tmp, 'plan.json');
    writeFileSync(
      planPath,
      JSON.stringify({
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: { services: [{ className: 'SampleService' }], commandPairs: [] },
      }),
      'utf8',
    );
    const r = runScript('verify-startup-services.ts', [
      '--integration-plan', planPath, '--repo-root', tmp,
    ]);
    expect(r.exitCode).toBe(1);
    const result = r.output as { failures: Array<{ kind: string }> };
    expect(result.failures.find((f) => f.kind === 'missing-task-whenall')).toBeTruthy();
  });

  it('Case 2: C# param type changed (string→int) → type-drift', () => {
    const tmp = setupFakeRepo();
    writeFileSync(
      join(tmp, 'c-sharp', 'Program.cs'),
      `
class Program {
  static async Task Main() {
    await papi.RegisterRequestHandlerAsync("command:sample.x", async (int id) => Do(id));
  }
}
`,
      'utf8',
    );
    mkdirSync(join(tmp, 'extensions', 'src', 'sample', 'src', 'types'), { recursive: true });
    writeFileSync(
      join(tmp, 'extensions', 'src', 'sample', 'src', 'types', 'sample.d.ts'),
      `declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'sample.x': (id: string) => Promise<void>;
  }
}`,
      'utf8',
    );
    const planPath = join(tmp, 'plan.json');
    writeFileSync(
      planPath,
      JSON.stringify({
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [
          { name: 'sample.x', params: [{ name: 'id', tsType: 'string', csType: 'string' }], returnSchema: {} },
        ],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: { services: [], commandPairs: [{ name: 'sample.x', dts: 'extensions/src/sample/src/types/sample.d.ts', csharp: 'c-sharp/Program.cs' }] },
      }),
      'utf8',
    );
    const r = runScript('audit-extension-registration.ts', [
      '--integration-plan', planPath, '--repo-root', tmp,
    ]);
    expect(r.exitCode).toBe(1);
    const result = r.output as { failures: Array<{ kind: string }> };
    expect(result.failures.find((f) => f.kind === 'type-drift')).toBeTruthy();
  });

  it('Case 5: unrecognized C# form (method-group) → unrecognized-form', () => {
    const tmp = setupFakeRepo();
    writeFileSync(
      join(tmp, 'c-sharp', 'Program.cs'),
      `
class Program {
  static async Task Main() {
    await papi.RegisterRequestHandlerAsync("command:sample.x", HandlerMethod);
  }
}
`,
      'utf8',
    );
    mkdirSync(join(tmp, 'extensions', 'src', 'sample', 'src', 'types'), { recursive: true });
    writeFileSync(
      join(tmp, 'extensions', 'src', 'sample', 'src', 'types', 'sample.d.ts'),
      `declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'sample.x': (id: string) => Promise<void>;
  }
}`,
      'utf8',
    );
    const planPath = join(tmp, 'plan.json');
    writeFileSync(
      planPath,
      JSON.stringify({
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [
          { name: 'sample.x', params: [{ name: 'id', tsType: 'string', csType: 'string' }], returnSchema: {} },
        ],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: { services: [], commandPairs: [{ name: 'sample.x', dts: 'extensions/src/sample/src/types/sample.d.ts', csharp: 'c-sharp/Program.cs' }] },
      }),
      'utf8',
    );
    const r = runScript('audit-extension-registration.ts', [
      '--integration-plan', planPath, '--repo-root', tmp,
    ]);
    expect(r.exitCode).toBe(1);
    const result = r.output as { failures: Array<{ kind: string; snippet?: string }> };
    const unrec = result.failures.find((f) => f.kind === 'unrecognized-form');
    expect(unrec).toBeTruthy();
    expect(unrec?.snippet).toContain('RegisterRequestHandlerAsync');
  });

  it('Case 6: namespace renamed → namespace-drift', () => {
    const tmp = setupFakeRepo();
    mkdirSync(join(tmp, 'c-sharp', 'Sample'), { recursive: true });
    writeFileSync(
      join(tmp, 'c-sharp', 'Sample', 'SampleService.cs'),
      `namespace Sample.NewName;
class SampleService {}`,
      'utf8',
    );
    const alignmentPath = join(tmp, 'backend-alignment.json');
    writeFileSync(
      alignmentPath,
      JSON.stringify({
        feature: 'sample',
        version: '1.0.0',
        namespace: 'Sample.OriginalName',
        files: [{ path: 'c-sharp/Sample/SampleService.cs' }],
        utilities: [],
        testInfra: { baseClass: 'X' },
      }),
      'utf8',
    );
    const r = runScript('verify-alignment-conformance.ts', [
      '--alignment', alignmentPath, '--repo-root', tmp,
    ]);
    expect(r.exitCode).toBe(1);
    const result = r.output as { failures: Array<{ kind: string }> };
    expect(result.failures.find((f) => f.kind === 'namespace-drift')).toBeTruthy();
  });

  it('Case 7: declared file moved away → missing-file', () => {
    const tmp = setupFakeRepo();
    const alignmentPath = join(tmp, 'backend-alignment.json');
    writeFileSync(
      alignmentPath,
      JSON.stringify({
        feature: 'sample',
        version: '1.0.0',
        namespace: 'Sample',
        files: [{ path: 'c-sharp/Sample/Moved.cs' }],
        utilities: [],
        testInfra: { baseClass: 'X' },
      }),
      'utf8',
    );
    const r = runScript('verify-alignment-conformance.ts', [
      '--alignment', alignmentPath, '--repo-root', tmp,
    ]);
    expect(r.exitCode).toBe(1);
    const result = r.output as { failures: Array<{ kind: string }> };
    expect(result.failures.find((f) => f.kind === 'missing-file')).toBeTruthy();
  });

  it('Case 8: utility call removed → utility-not-used', () => {
    const tmp = setupFakeRepo();
    mkdirSync(join(tmp, 'c-sharp', 'Sample'), { recursive: true });
    writeFileSync(
      join(tmp, 'c-sharp', 'Sample', 'SampleService.cs'),
      `namespace Sample;
class SampleService {
  // The utility call has been removed (defect injected).
}`,
      'utf8',
    );
    const alignmentPath = join(tmp, 'backend-alignment.json');
    writeFileSync(
      alignmentPath,
      JSON.stringify({
        feature: 'sample',
        version: '1.0.0',
        namespace: 'Sample',
        files: [{ path: 'c-sharp/Sample/SampleService.cs' }],
        utilities: [
          { id: 'UTL-CS-001', name: 'LocalParatextProjects', location: 'c-sharp/X.cs:1', usedInFiles: ['c-sharp/Sample/SampleService.cs'] },
        ],
        testInfra: { baseClass: 'X' },
      }),
      'utf8',
    );
    const r = runScript('verify-alignment-conformance.ts', [
      '--alignment', alignmentPath, '--repo-root', tmp,
    ]);
    expect(r.exitCode).toBe(1);
    const result = r.output as { failures: Array<{ kind: string }> };
    expect(result.failures.find((f) => f.kind === 'utility-not-used')).toBeTruthy();
  });
});
