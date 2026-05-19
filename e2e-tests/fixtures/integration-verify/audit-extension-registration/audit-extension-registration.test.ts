/**
 * Tests for .claude/scripts/integration-verify/audit-extension-registration.ts (PR-B B.2).
 *
 * Each case materializes a fake "repo" under tmp: a `c-sharp/Program.cs`, an extension `.d.ts`, and
 * an `integration-plan.json`. The script is invoked as a subprocess and its result.json is
 * asserted.
 *
 * Includes "unrecognized-form" fixtures verifying fail-loud behavior (B.0 mandate).
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'audit-extension-registration.ts',
);

interface AuditResult {
  status: 'PASS' | 'FAIL';
  checked: number;
  passed: number;
  details: string[];
  failures: Array<{
    kind: string;
    command?: string;
    param?: string;
    ts?: string;
    cs?: string;
    file?: string;
    line?: number;
    snippet?: string;
  }>;
  warnings: Array<{ kind: string; command: string }>;
}

interface CaseFiles {
  dtsPath: string;
  dtsContents: string;
  programCs: string;
  /** Optional extra C# files keyed by their relative path under fake repo */
  extraCs?: Record<string, string>;
  plan: unknown;
}

interface RunResult {
  exitCode: number;
  stderr: string;
  output: AuditResult | null;
}

const tmpDirs: string[] = [];

function setupCase(c: CaseFiles): RunResult {
  const tmp = mkdtempSync(join(tmpdir(), 'audit-ext-'));
  tmpDirs.push(tmp);
  mkdirSync(join(tmp, 'c-sharp'), { recursive: true });
  writeFileSync(join(tmp, 'c-sharp', 'Program.cs'), c.programCs, 'utf8');
  for (const [rel, contents] of Object.entries(c.extraCs ?? {})) {
    const full = join(tmp, rel);
    mkdirSync(join(full, '..'), { recursive: true });
    writeFileSync(full, contents, 'utf8');
  }
  const dtsFull = join(tmp, c.dtsPath);
  mkdirSync(join(dtsFull, '..'), { recursive: true });
  writeFileSync(dtsFull, c.dtsContents, 'utf8');
  const planPath = join(tmp, 'integration-plan.json');
  writeFileSync(planPath, JSON.stringify(c.plan, null, 2), 'utf8');
  const outputPath = join(tmp, 'audit-result.json');

  const r = spawnSync(
    'npx',
    ['tsx', SCRIPT, '--integration-plan', planPath, '--output', outputPath, '--repo-root', tmp],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  let output: AuditResult | null = null;
  try {
    output = JSON.parse(readFileSync(outputPath, 'utf8')) as AuditResult;
  } catch {
    output = null;
  }
  return { exitCode: r.status ?? -1, stderr: r.stderr ?? '', output };
}

afterEach(() => {
  // Tests use unique tmpdirs; OS cleanup is fine. No-op for vitest verbosity.
});

describe('audit-extension-registration.ts', () => {
  it('PASS — matching command across plan, .d.ts (lambda) Program.cs', () => {
    const r = setupCase({
      dtsPath: 'extensions/src/sample/src/types/sample.d.ts',
      dtsContents: `
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'sample.getThing': (id: string) => Promise<string>;
  }
}
`,
      programCs: `
namespace Sample;
class Program {
  static async Task Main() {
    await papi.RegisterRequestHandlerAsync("command:sample.getThing", async (string id) => GetThing(id));
  }
}
`,
      plan: {
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [
          {
            name: 'sample.getThing',
            params: [{ name: 'id', tsType: 'string', csType: 'string' }],
            returnSchema: { type: 'string' },
          },
        ],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: {
          services: [],
          commandPairs: [
            {
              name: 'sample.getThing',
              dts: 'extensions/src/sample/src/types/sample.d.ts',
              csharp: 'c-sharp/Program.cs',
            },
          ],
        },
      },
    });
    expect(r.exitCode, r.stderr).toBe(0);
    expect(r.output?.status).toBe('PASS');
    expect(r.output?.passed).toBe(1);
    expect(r.output?.failures).toEqual([]);
  });

  it('FAIL — command missing from C#', () => {
    const r = setupCase({
      dtsPath: 'extensions/src/sample/src/types/sample.d.ts',
      dtsContents: `
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'sample.getThing': (id: string) => Promise<string>;
  }
}
`,
      programCs: `
class Program { static async Task Main() { } }
`,
      plan: {
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [
          {
            name: 'sample.getThing',
            params: [{ name: 'id', tsType: 'string', csType: 'string' }],
            returnSchema: { type: 'string' },
          },
        ],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: {
          services: [],
          commandPairs: [
            {
              name: 'sample.getThing',
              dts: 'extensions/src/sample/src/types/sample.d.ts',
              csharp: 'c-sharp/Program.cs',
            },
          ],
        },
      },
    });
    expect(r.exitCode).toBe(1);
    expect(r.output?.status).toBe('FAIL');
    expect(r.output?.failures.find((f) => f.kind === 'missing-in-csharp')).toBeTruthy();
  });

  it('FAIL — type drift on a param', () => {
    const r = setupCase({
      dtsPath: 'extensions/src/sample/src/types/sample.d.ts',
      dtsContents: `
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'sample.getThing': (id: string) => Promise<string>;
  }
}
`,
      programCs: `
namespace Sample;
class Program {
  static async Task Main() {
    await papi.RegisterRequestHandlerAsync("command:sample.getThing", async (int id) => GetThing(id));
  }
}
`,
      plan: {
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [
          {
            name: 'sample.getThing',
            params: [{ name: 'id', tsType: 'string', csType: 'string' }],
            returnSchema: { type: 'string' },
          },
        ],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: {
          services: [],
          commandPairs: [
            {
              name: 'sample.getThing',
              dts: 'extensions/src/sample/src/types/sample.d.ts',
              csharp: 'c-sharp/Program.cs',
            },
          ],
        },
      },
    });
    expect(r.exitCode).toBe(1);
    expect(r.output?.failures.some((f) => f.kind === 'type-drift' && f.cs === 'int')).toBe(true);
  });

  it('FAIL loud — unrecognized C# registration form (method-group syntax)', () => {
    // Method-group syntax: `papi.RegisterRequestHandlerAsync("command:x", Handler)` — no lambda.
    // The script's recognizer requires a parenthesized parameter list and `=>`.
    const r = setupCase({
      dtsPath: 'extensions/src/sample/src/types/sample.d.ts',
      dtsContents: `
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'sample.getThing': (id: string) => Promise<string>;
  }
}
`,
      programCs: `
namespace Sample;
class Program {
  static async Task Main() {
    await papi.RegisterRequestHandlerAsync("command:sample.getThing", GetThingHandler);
  }
}
`,
      plan: {
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [
          {
            name: 'sample.getThing',
            params: [{ name: 'id', tsType: 'string', csType: 'string' }],
            returnSchema: { type: 'string' },
          },
        ],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: {
          services: [],
          commandPairs: [
            {
              name: 'sample.getThing',
              dts: 'extensions/src/sample/src/types/sample.d.ts',
              csharp: 'c-sharp/Program.cs',
            },
          ],
        },
      },
    });
    expect(r.exitCode).toBe(1);
    const unrec = r.output?.failures.find((f) => f.kind === 'unrecognized-form');
    expect(unrec).toBeTruthy();
    expect(unrec?.snippet).toContain('RegisterRequestHandlerAsync');
  });

  it('PASS — NetworkObject GetFunctions pattern recognized', () => {
    const r = setupCase({
      dtsPath: 'extensions/src/sample/src/types/sample.d.ts',
      dtsContents: `
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'sample.getItem': (id: string) => Promise<string>;
  }
}
`,
      programCs: `
namespace Sample;
class Program {
  static async Task Main() {
    var sampleService = new SampleService();
    await Task.WhenAll(sampleService.RegisterNetworkObjectAsync());
  }
}
`,
      extraCs: {
        'c-sharp/SampleService.cs': `
namespace Sample;

class SampleService : NetworkObject {
  public string GetItem(string id) => id;

  protected override IList<(string, Delegate)> GetFunctions() =>
    [
      ("getItem", GetItem),
    ];
}
`,
      },
      plan: {
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [
          {
            name: 'sample.getItem',
            params: [{ name: 'id', tsType: 'string', csType: 'string' }],
            returnSchema: { type: 'string' },
          },
        ],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: {
          services: [{ className: 'SampleService', registrarFile: 'c-sharp/Program.cs' }],
          commandPairs: [
            {
              name: 'sample.getItem',
              dts: 'extensions/src/sample/src/types/sample.d.ts',
              csharp: 'c-sharp/SampleService.cs',
            },
          ],
        },
      },
    });
    expect(r.exitCode, r.stderr).toBe(0);
    expect(r.output?.status).toBe('PASS');
  });

  it('warnings list extras in C# but plan-side passes', () => {
    const r = setupCase({
      dtsPath: 'extensions/src/sample/src/types/sample.d.ts',
      dtsContents: `
declare module 'papi-shared-types' {
  export interface CommandHandlers {
    'sample.getThing': (id: string) => Promise<string>;
  }
}
`,
      programCs: `
class Program {
  static async Task Main() {
    await papi.RegisterRequestHandlerAsync("command:sample.getThing", async (string id) => GetThing(id));
    await papi.RegisterRequestHandlerAsync("command:sample.legacy", async (string x) => Legacy(x));
  }
}
`,
      plan: {
        feature: 'sample',
        version: '1.0.0',
        phase: 3,
        commands: [
          {
            name: 'sample.getThing',
            params: [{ name: 'id', tsType: 'string', csType: 'string' }],
            returnSchema: { type: 'string' },
          },
        ],
        journeys: [],
        navigation: { menuItems: [], webViewTitle: '' },
        touchpoints: [],
        startup: {
          services: [],
          commandPairs: [
            {
              name: 'sample.getThing',
              dts: 'extensions/src/sample/src/types/sample.d.ts',
              csharp: 'c-sharp/Program.cs',
            },
          ],
        },
      },
    });
    expect(r.exitCode).toBe(0);
    expect(r.output?.warnings.some((w) => w.kind === 'extra-in-csharp')).toBe(true);
  });
});
