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
  'process-getBuiltinModule',
  'process-binding',
  'process-linkedBinding',
  'process-dlopen',
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

  it('the probes detect escapes from the old sandbox', () => {
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
});
