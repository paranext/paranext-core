// @vitest-environment node
import { spawnSync } from 'node:child_process';
import path from 'node:path';

/** Matches `SandboxProbeResult` in `extensions/src/evil/evil.js`. */
type SandboxProbeResult = { name: string; outcome: 'refused' | 'escaped'; detail: string };

const REPO_ROOT = path.resolve(__dirname, '../../..');
const FIXTURE = path.join(__dirname, 'extension-sandbox.probe-host.fixture.ts');

const PROBE_NAMES = [
  'require-fs',
  'require-node-fs',
  'require-https',
  'process-getBuiltinModule',
  'process-binding',
  'process-linkedBinding',
  'process-dlopen',
  'process-loadEnvFile',
  'process-getActiveHandles',
  'process-getActiveRequests',
  'process-execve',
  'process-mainModule',
  'module-loader',
  'require-cache',
  'dynamic-import',
  'function-constructor',
  'async-function-constructor',
  'generator-function-constructor',
  'async-generator-function-constructor',
  'global-eval',
  'global-Function',
];

/**
 * Runs the evil extension's sandbox probes in a fresh Node process, since the lockdowns change
 * process-wide globals that this test process must keep.
 */
function runProbes(mode: 'protected' | 'unprotected'): {
  status: number | null;
  results: SandboxProbeResult[];
  output: string;
} {
  const child = spawnSync(process.execPath, ['--import', 'tsx', FIXTURE, mode], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    timeout: 60_000,
  });
  const output = `stdout:\n${child.stdout}\nstderr:\n${child.stderr}`;
  const lastLine = child.stdout.trim().split('\n').at(-1) ?? '';
  let results: SandboxProbeResult[] = [];
  try {
    results = JSON.parse(lastLine);
  } catch {
    throw new Error(`Probe host did not print results (exit ${child.status}).\n${output}`);
  }
  return { status: child.status, results, output };
}

function describeEscapes(results: SandboxProbeResult[]): string {
  return results
    .filter((result) => result.outcome === 'escaped')
    .map((result) => `${result.name}: ${result.detail}`)
    .join('\n');
}

describe('evil extension sandbox probes', () => {
  it('every probe is refused when the sandbox is applied', () => {
    const { status, results, output } = runProbes('protected');

    expect({ status, output }).toMatchObject({ status: 0 });
    expect(results.map((result) => result.name).sort()).toEqual([...PROBE_NAMES].sort());
    // Compared as text so a failure lists every escaped probe with its detail
    expect(describeEscapes(results)).toBe('');
  }, 60_000);

  it('the probes detect escapes from a host that only filters require by name', () => {
    const { results } = runProbes('unprotected');

    expect(results).toEqual(
      expect.arrayContaining(
        [
          'process-getBuiltinModule',
          'process-binding',
          'module-loader',
          'require-cache',
          'dynamic-import',
          'function-constructor',
        ].map((name) => expect.objectContaining({ name, outcome: 'escaped' })),
      ),
    );
  }, 60_000);

  it('function kinds stay distinguishable after the constructors are locked', () => {
    const utilPath = path.join(__dirname, 'extension-sandbox.util.ts');
    const script = `
      const util = require('node:util');
      const { blockCodeGenerationFromStrings } = require(${JSON.stringify(utilPath)});
      blockCodeGenerationFromStrings();
      const fns = [function a() {}, async function b() {}, function* c() {}, async function* d() {}];
      const AsyncFunction = (async () => {}).constructor;
      console.log(JSON.stringify({
        names: fns.map((fn) => fn.constructor.name),
        isAsync: fns.map((fn) => fn.constructor === AsyncFunction),
        isInstance: fns.map((fn) => fn instanceof fn.constructor),
        inspected: fns.map((fn) => util.inspect(fn)),
      }));
    `;
    const child = spawnSync(process.execPath, ['--import', 'tsx', '--eval', script], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
      timeout: 60_000,
    });
    const lastLine = child.stdout.trim().split('\n').at(-1) ?? '';

    expect({ status: child.status, stderr: child.stderr }).toMatchObject({ status: 0 });
    expect(JSON.parse(lastLine)).toEqual({
      names: ['Function', 'AsyncFunction', 'GeneratorFunction', 'AsyncGeneratorFunction'],
      isAsync: [false, true, false, false],
      isInstance: [true, true, true, true],
      inspected: [
        '[Function: a]',
        '[AsyncFunction: b]',
        '[GeneratorFunction: c]',
        '[AsyncGeneratorFunction: d]',
      ],
    });
  }, 60_000);
});
