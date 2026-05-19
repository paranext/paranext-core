/**
 * Tests for .claude/scripts/integration-verify/generate-wire-conformance-tests.ts (B.4),
 * generate-touchpoint-tests.ts (B.5), and verify-generator-determinism.ts (B.9 CI helper).
 *
 * The strongest determinism test is the determinism verifier itself, which regenerates each spec
 * twice and compares bytes. We also assert the generated specs contain the expected per-command /
 * per-touchpoint test names.
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const WIRE_SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'generate-wire-conformance-tests.ts',
);
const TP_SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'generate-touchpoint-tests.ts',
);
const DET_SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'verify-generator-determinism.ts',
);

const PLAN = {
  feature: 'sample',
  version: '1.0.0',
  phase: 3,
  commands: [
    {
      name: 'sample.zCommand',
      params: [{ name: 'id', tsType: 'string', csType: 'string' }],
      returnSchema: { type: 'object', properties: { z: { type: 'string' } } },
      coverage: 'full',
      representativeInput: { params: ['z-id'], sourceScenario: 'TS-T001' },
    },
    {
      name: 'sample.aCommand',
      params: [{ name: 'count', tsType: 'number', csType: 'int' }],
      returnSchema: { type: 'object' },
      coverage: 'partial',
    },
  ],
  journeys: [],
  navigation: { menuItems: [], webViewTitle: '' },
  touchpoints: [
    {
      id: 'TP-002',
      producer: { cap: 'CAP-001', command: 'sample.zCommand' },
      consumer: { cap: 'CAP-002', command: 'sample.aCommand' },
      inputFromProducerKey: '/z',
    },
    {
      id: 'TP-001',
      producer: { cap: 'CAP-001', command: 'sample.aCommand' },
      consumer: { cap: 'CAP-002', command: 'sample.zCommand' },
      inputFromProducerKey: '/foo',
    },
  ],
  startup: { services: [], commandPairs: [] },
};

function writePlan(): { tmp: string; planPath: string } {
  const tmp = mkdtempSync(join(tmpdir(), 'gen-det-'));
  const planPath = join(tmp, 'plan.json');
  writeFileSync(planPath, JSON.stringify(PLAN), 'utf8');
  return { tmp, planPath };
}

function run(
  script: string,
  planPath: string,
  output: string,
): {
  exitCode: number;
  stderr: string;
} {
  const r = spawnSync('npx', ['tsx', script, '--integration-plan', planPath, '--output', output], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  return { exitCode: r.status ?? -1, stderr: r.stderr ?? '' };
}

describe('generator determinism', () => {
  it('wire-conformance generator: sorted command order in the spec', () => {
    const { tmp, planPath } = writePlan();
    const out = join(tmp, 'wire.spec.ts');
    const r = run(WIRE_SCRIPT, planPath, out);
    expect(r.exitCode, r.stderr).toBe(0);
    const text = readFileSync(out, 'utf8');
    const aIdx = text.indexOf("'wire conformance: sample.aCommand");
    const zIdx = text.indexOf("'wire conformance: sample.zCommand");
    expect(aIdx).toBeGreaterThan(-1);
    expect(zIdx).toBeGreaterThan(aIdx);
  });

  it('touchpoint generator: sorted touchpoint id order in the spec', () => {
    const { tmp, planPath } = writePlan();
    const out = join(tmp, 'tp.spec.ts');
    const r = run(TP_SCRIPT, planPath, out);
    expect(r.exitCode, r.stderr).toBe(0);
    const text = readFileSync(out, 'utf8');
    const tp1 = text.indexOf("'touchpoint TP-001");
    const tp2 = text.indexOf("'touchpoint TP-002");
    expect(tp1).toBeGreaterThan(-1);
    expect(tp2).toBeGreaterThan(tp1);
  });

  it('wire generator emits coverage:partial annotation for partial commands', () => {
    const { tmp, planPath } = writePlan();
    const out = join(tmp, 'wire.spec.ts');
    run(WIRE_SCRIPT, planPath, out);
    const text = readFileSync(out, 'utf8');
    expect(text).toContain('coverage: partial');
  });

  it('verify-generator-determinism PASSes (both generators byte-equal across two runs)', () => {
    const { tmp, planPath } = writePlan();
    const r = spawnSync(
      'npx',
      ['tsx', DET_SCRIPT, '--integration-plan', planPath, '--scratch', join(tmp, 'scratch')],
      { cwd: REPO_ROOT, encoding: 'utf8' },
    );
    expect(r.status, `${r.stderr}\n${r.stdout}`).toBe(0);
    expect(r.stdout).toContain('byte-deterministic');
  });
});
