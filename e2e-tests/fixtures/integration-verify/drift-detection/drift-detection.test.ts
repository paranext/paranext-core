/**
 * Unit tests for .claude/scripts/integration-verify/check-contract-drift.ts
 *
 * Plan reference: A.3 (contracts mode) and A.0 (alignment two-tier). Validation steps 8, 8a, 8b
 * from A.9.
 *
 * Covers:
 *
 * - Contracts mode PASS (snapshot byte-equal to current data-contracts + integration-plan)
 * - Contracts mode FAIL on structural drift (e.g., param type changed)
 * - Contracts mode WARN on descriptive drift (error description text changed)
 * - Contracts mode FAIL on missing-entry, extra-entry
 * - Alignment mode PASS / FAIL (structural) / WARN (descriptive)
 * - Alignment mode handles missing ui-alignment for Level-A (snapshot.ui === null)
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'check-contract-drift.ts',
);

interface RunResult {
  exitCode: number;
  stderr: string;
  report: {
    status: 'PASS' | 'FAIL';
    mode: 'contracts' | 'alignment';
    failures: Array<{
      kind: string;
      scope: string;
      field: string;
      snapshot?: unknown;
      current?: unknown;
      current_data_contracts?: unknown;
      current_integration_plan?: unknown;
    }>;
    warnings: Array<{
      kind: string;
      scope: string;
      field: string;
      snapshot?: unknown;
      current?: unknown;
      current_data_contracts?: unknown;
      current_integration_plan?: unknown;
    }>;
  } | null;
}

interface FeatureFiles {
  [path: string]: string | Record<string, unknown> | unknown[];
}

function writeFeature(featureDir: string, files: FeatureFiles): void {
  for (const [rel, content] of Object.entries(files)) {
    const abs = join(featureDir, rel);
    mkdirSync(join(abs, '..'), { recursive: true });
    const text = typeof content === 'string' ? content : `${JSON.stringify(content, null, 2)}\n`;
    writeFileSync(abs, text, 'utf8');
  }
}

function run(mode: 'contracts' | 'alignment', files: FeatureFiles): RunResult {
  const tmp = mkdtempSync(join(tmpdir(), 'drift-'));
  const featureDir = join(tmp, 'feature');
  mkdirSync(featureDir, { recursive: true });
  writeFeature(featureDir, files);
  const outputPath = join(tmp, 'drift-report.json');
  const result = spawnSync(
    'npx',
    ['tsx', SCRIPT, '--mode', mode, '--feature-dir', featureDir, '--output', outputPath],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  let report: RunResult['report'] = null;
  if (existsSync(outputPath)) {
    report = JSON.parse(readFileSync(outputPath, 'utf8'));
  }
  return {
    exitCode: result.status ?? -1,
    stderr: result.stderr ?? '',
    report,
  };
}

const baseCommand = {
  name: 'sample.getThing',
  params: [{ name: 'id', tsType: 'string', csType: 'string' }],
  returnSchema: { type: 'object' },
  errors: [{ code: -32001, when: 'not found' }],
  coverage: 'full',
  representativeInput: { params: ['x'], setup: 'create-test-project', sourceScenario: 'TS-T001' },
};

function dataContracts(commands: unknown[]): Record<string, unknown> {
  return { feature: 'sample', version: '1.0.0', phase: 2, commands };
}

function integrationPlan(commands: unknown[]): Record<string, unknown> {
  return {
    feature: 'sample',
    version: '1.0.0',
    phase: 3,
    commands,
    journeys: [],
    navigation: { menuItems: [], webViewTitle: '' },
    touchpoints: [],
    startup: { services: [], commandPairs: [] },
  };
}

describe('check-contract-drift.ts contracts mode', () => {
  it('PASS when snapshot byte-equals current files', () => {
    const r = run('contracts', {
      'implementation/proofs/runtime-planning/commands-snapshot.json': [baseCommand],
      'characterization/data-contracts.json': dataContracts([baseCommand]),
      'implementation/integration-plan.json': integrationPlan([baseCommand]),
    });
    expect(r.exitCode).toBe(0);
    expect(r.report?.status).toBe('PASS');
    expect(r.report?.failures).toHaveLength(0);
    expect(r.report?.warnings).toHaveLength(0);
  }, 30_000);

  it('FAIL on structural drift (param tsType changed)', () => {
    const drifted = JSON.parse(JSON.stringify(baseCommand));
    drifted.params[0].tsType = 'number';
    const r = run('contracts', {
      'implementation/proofs/runtime-planning/commands-snapshot.json': [baseCommand],
      'characterization/data-contracts.json': dataContracts([drifted]),
      'implementation/integration-plan.json': integrationPlan([drifted]),
    });
    expect(r.exitCode).toBe(1);
    expect(r.report?.status).toBe('FAIL');
    const structuralFailures =
      r.report?.failures.filter((f) => f.kind === 'structural-drift') ?? [];
    expect(structuralFailures.length).toBeGreaterThan(0);
    expect(structuralFailures.some((f) => f.field.includes('tsType'))).toBe(true);
  }, 30_000);

  it('WARN (not FAIL) on descriptive drift (errors[].when text)', () => {
    const drifted = JSON.parse(JSON.stringify(baseCommand));
    drifted.errors[0].when = 'item does not exist (more descriptive)';
    const r = run('contracts', {
      'implementation/proofs/runtime-planning/commands-snapshot.json': [baseCommand],
      'characterization/data-contracts.json': dataContracts([drifted]),
      'implementation/integration-plan.json': integrationPlan([drifted]),
    });
    expect(r.exitCode).toBe(0); // descriptive drift does not fail
    expect(r.report?.status).toBe('PASS');
    expect(r.report?.warnings.length).toBeGreaterThan(0);
    expect(r.report?.warnings.some((w) => w.field.includes('when'))).toBe(true);
  }, 30_000);

  it('WARN on descriptive drift (representativeInput.sourceScenario)', () => {
    const drifted = JSON.parse(JSON.stringify(baseCommand));
    drifted.representativeInput.sourceScenario = 'TS-T999';
    const r = run('contracts', {
      'implementation/proofs/runtime-planning/commands-snapshot.json': [baseCommand],
      'characterization/data-contracts.json': dataContracts([drifted]),
      'implementation/integration-plan.json': integrationPlan([drifted]),
    });
    expect(r.exitCode).toBe(0);
    expect(r.report?.warnings.some((w) => w.field.includes('sourceScenario'))).toBe(true);
  }, 30_000);

  it('FAIL on missing-entry (command removed from current data-contracts)', () => {
    const r = run('contracts', {
      'implementation/proofs/runtime-planning/commands-snapshot.json': [baseCommand],
      'characterization/data-contracts.json': dataContracts([]),
      'implementation/integration-plan.json': integrationPlan([baseCommand]),
    });
    expect(r.exitCode).toBe(1);
    expect(r.report?.failures.some((f) => f.kind === 'missing-entry')).toBe(true);
  }, 30_000);

  it('FAIL on extra-entry (new command added to current)', () => {
    const newCmd = { ...baseCommand, name: 'sample.newThing' };
    const r = run('contracts', {
      'implementation/proofs/runtime-planning/commands-snapshot.json': [baseCommand],
      'characterization/data-contracts.json': dataContracts([baseCommand, newCmd]),
      'implementation/integration-plan.json': integrationPlan([baseCommand, newCmd]),
    });
    expect(r.exitCode).toBe(1);
    expect(r.report?.failures.some((f) => f.kind === 'extra-entry')).toBe(true);
  }, 30_000);

  it('reports drift in EITHER file (data-contracts edited but integration-plan untouched)', () => {
    const drifted = JSON.parse(JSON.stringify(baseCommand));
    drifted.params[0].tsType = 'number'; // structural drift, only in data-contracts
    const r = run('contracts', {
      'implementation/proofs/runtime-planning/commands-snapshot.json': [baseCommand],
      'characterization/data-contracts.json': dataContracts([drifted]),
      'implementation/integration-plan.json': integrationPlan([baseCommand]),
    });
    expect(r.exitCode).toBe(1);
    const f = r.report?.failures.find(
      (x) => x.field.includes('tsType') && x.current_data_contracts !== undefined,
    );
    expect(f).toBeDefined();
  }, 30_000);
});

describe('check-contract-drift.ts alignment mode', () => {
  const baseBackend = {
    feature: 'sample',
    version: '1.0.0',
    namespace: 'Paranext.DataProvider.Sample',
    files: [{ path: 'c-sharp/Sample.cs', kind: 'service' }],
    utilities: [
      {
        id: 'UTL-CS-001',
        name: 'Foo',
        location: 'c-sharp/Foo.cs:10',
        useFor: 'something',
      },
    ],
    testInfra: { baseClass: 'ParatextDataProviderTestBase' },
    patternRefs: [{ description: 'NetworkObject', location: 'c-sharp/Y.cs:42' }],
  };
  const baseUi = {
    feature: 'sample',
    version: '1.0.0',
    webViewProvider: { id: 'sample.wv', file: 'extensions/src/sample/main.ts' },
    components: [
      { name: 'SamplePanel', path: 'extensions/src/sample/SamplePanel.tsx', kind: 'panel' },
    ],
    paranextReactImports: [],
    testInfra: { framework: 'vitest' },
  };

  it('PASS when snapshot byte-equals current backend + ui', () => {
    const r = run('alignment', {
      'implementation/proofs/runtime-planning/alignment-snapshot.json': {
        backend: baseBackend,
        ui: baseUi,
      },
      'implementation/backend-alignment.json': baseBackend,
      'implementation/ui-alignment.json': baseUi,
    });
    expect(r.exitCode).toBe(0);
    expect(r.report?.status).toBe('PASS');
  }, 30_000);

  it('FAIL on structural drift (backend namespace changed)', () => {
    const drifted = { ...baseBackend, namespace: 'Paranext.Other.Namespace' };
    const r = run('alignment', {
      'implementation/proofs/runtime-planning/alignment-snapshot.json': {
        backend: baseBackend,
        ui: baseUi,
      },
      'implementation/backend-alignment.json': drifted,
      'implementation/ui-alignment.json': baseUi,
    });
    expect(r.exitCode).toBe(1);
    expect(r.report?.failures.some((f) => f.scope === 'backend' && f.field === '/namespace')).toBe(
      true,
    );
  }, 30_000);

  it('WARN on descriptive drift (utilities[].useFor changed)', () => {
    const drifted = JSON.parse(JSON.stringify(baseBackend));
    drifted.utilities[0].useFor = 'something else, more descriptive';
    const r = run('alignment', {
      'implementation/proofs/runtime-planning/alignment-snapshot.json': {
        backend: baseBackend,
        ui: baseUi,
      },
      'implementation/backend-alignment.json': drifted,
      'implementation/ui-alignment.json': baseUi,
    });
    expect(r.exitCode).toBe(0);
    expect(r.report?.warnings.some((w) => w.field.includes('useFor'))).toBe(true);
  }, 30_000);

  it('Level-A: snapshot.ui null + missing ui-alignment file → PASS', () => {
    const r = run('alignment', {
      'implementation/proofs/runtime-planning/alignment-snapshot.json': {
        backend: baseBackend,
        ui: null,
      },
      'implementation/backend-alignment.json': baseBackend,
    });
    expect(r.exitCode).toBe(0);
    expect(r.report?.status).toBe('PASS');
  }, 30_000);
});
