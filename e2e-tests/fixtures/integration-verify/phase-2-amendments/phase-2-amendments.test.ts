/**
 * Unit tests for .claude/scripts/integration-verify/apply-phase-2-amendments.ts
 *
 * Plan reference: .context/plans/we-ported-the-first-vectorized-gizmo.md sections A.4 (Phase 2
 * amendments artifact + workflow) and A.6 (P3P.4 review criterion).
 *
 * Covers (minimum set from the deliverable spec):
 *
 * 1. No phase-2-amendments.json → exit 0 with "nothing to apply"
 * 2. Add-command accepted → command appended
 * 3. Modify-command accepted → command's params replaced
 * 4. Remove-command accepted → command gone
 * 5. Pending (null decision) → exit 1, IDs in stderr
 * 6. Rejected amendment → command unchanged
 * 7. Add-command name collision → exit 1
 * 8. Modify-command targeting unknown name → exit 1
 * 9. Remove-command targeting unknown name → exit 1
 * 10. Mixed batch (1 accept + 1 reject + 1 null) → exit 1 (pending wins)
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
  'apply-phase-2-amendments.ts',
);

interface RunResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  contracts: { commands: Array<Record<string, unknown>> } | null;
  amendmentsAfter: Record<string, unknown> | null;
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

function run(files: FeatureFiles): RunResult {
  const tmp = mkdtempSync(join(tmpdir(), 'amend-'));
  const featureDir = join(tmp, 'feature');
  mkdirSync(featureDir, { recursive: true });
  writeFeature(featureDir, files);
  const result = spawnSync('npx', ['tsx', SCRIPT, featureDir], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  const contractsPath = join(featureDir, 'characterization', 'data-contracts.json');
  const amendmentsPath = join(featureDir, 'characterization', 'phase-2-amendments.json');
  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    contracts: existsSync(contractsPath)
      ? (JSON.parse(readFileSync(contractsPath, 'utf8')) as RunResult['contracts'])
      : null,
    amendmentsAfter: existsSync(amendmentsPath)
      ? (JSON.parse(readFileSync(amendmentsPath, 'utf8')) as Record<string, unknown>)
      : null,
  };
}

/* --------------------------------------------------------------- fixtures -- */

const baseCommand = {
  name: 'sample.getThing',
  params: [{ name: 'id', tsType: 'string', csType: 'string' }],
  returnSchema: { type: 'object' },
  errors: [{ code: -32001, when: 'not found' }],
  coverage: 'full' as const,
  representativeInput: { params: ['x'], setup: 'create-test-project', sourceScenario: 'TS-T001' },
};

const otherCommand = {
  name: 'sample.listThings',
  params: [],
  returnSchema: { type: 'array' },
  coverage: 'full' as const,
  representativeInput: { params: [], setup: 'create-test-project', sourceScenario: 'TS-T002' },
};

function contractsDoc(commands: unknown[]): Record<string, unknown> {
  return { feature: 'sample', version: '1.0.0', phase: 2, commands };
}

function amendmentsDoc(amendments: unknown[]): Record<string, unknown> {
  return {
    feature: 'sample',
    proposed_at: '2026-05-19T00:00:00Z',
    amendments,
  };
}

/* ------------------------------------------------------------------ tests -- */

describe('apply-phase-2-amendments.ts', () => {
  it('no phase-2-amendments.json → exit 0 with "nothing to apply"', () => {
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
    });
    expect(r.exitCode).toBe(0);
    expect(r.stdout).toMatch(/nothing to apply/);
    // data-contracts.json untouched.
    expect(r.contracts?.commands).toHaveLength(1);
    expect(r.contracts?.commands[0].name).toBe('sample.getThing');
  }, 30_000);

  it('add-command accepted → command appended', () => {
    const newCommand = { ...otherCommand };
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-001',
          kind: 'add-command',
          command: newCommand.name,
          summary: 'add list endpoint',
          proposed_change: newCommand,
          evidence: 'backend-alignment.md line 47',
          decision: 'accept',
        },
      ]),
    });
    expect(r.exitCode).toBe(0);
    expect(r.contracts?.commands).toHaveLength(2);
    const names = r.contracts?.commands.map((c) => c.name);
    expect(names).toContain('sample.getThing');
    expect(names).toContain('sample.listThings');
    expect(r.stdout).toMatch(/Applied 1 amendments \(1 added, 0 modified, 0 removed\)/);
    // phase-2-amendments.json is NOT mutated.
    expect(r.amendmentsAfter).not.toBeNull();
    const amends = r.amendmentsAfter?.amendments as Array<Record<string, unknown>>;
    expect(amends[0].decision).toBe('accept');
  }, 30_000);

  it('modify-command accepted → params replaced', () => {
    const modified = {
      ...baseCommand,
      params: [
        { name: 'id', tsType: 'string', csType: 'string' },
        { name: 'verbose', tsType: 'boolean', csType: 'bool', optional: true },
      ],
    };
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-002',
          kind: 'modify-command',
          command: baseCommand.name,
          summary: 'add verbose flag',
          proposed_change: modified,
          evidence: 'alignment review',
          decision: 'accept',
        },
      ]),
    });
    expect(r.exitCode).toBe(0);
    expect(r.contracts?.commands).toHaveLength(1);
    const params = (r.contracts?.commands[0].params as Array<Record<string, unknown>>) ?? [];
    expect(params).toHaveLength(2);
    expect(params[1].name).toBe('verbose');
    expect(r.stdout).toMatch(/0 added, 1 modified, 0 removed/);
  }, 30_000);

  it('remove-command accepted → command gone', () => {
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand, otherCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-003',
          kind: 'remove-command',
          command: otherCommand.name,
          summary: 'no longer needed',
          proposed_change: null,
          evidence: 'scope reduction',
          decision: 'accept',
        },
      ]),
    });
    expect(r.exitCode).toBe(0);
    expect(r.contracts?.commands).toHaveLength(1);
    expect(r.contracts?.commands[0].name).toBe('sample.getThing');
    expect(r.stdout).toMatch(/0 added, 0 modified, 1 removed/);
  }, 30_000);

  it('pending (null decision) → exit 1, IDs in stderr', () => {
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-004',
          kind: 'add-command',
          command: otherCommand.name,
          summary: 'pending',
          proposed_change: otherCommand,
          evidence: 'tbd',
          decision: null,
        },
        {
          id: 'AMEND-005',
          kind: 'add-command',
          command: 'sample.another',
          summary: 'also pending',
          proposed_change: { ...otherCommand, name: 'sample.another' },
          evidence: 'tbd',
          decision: null,
        },
      ]),
    });
    expect(r.exitCode).toBe(1);
    expect(r.stderr).toMatch(/amendments pending review/);
    expect(r.stderr).toMatch(/AMEND-004/);
    expect(r.stderr).toMatch(/AMEND-005/);
    // data-contracts.json untouched.
    expect(r.contracts?.commands).toHaveLength(1);
  }, 30_000);

  it('rejected amendment → command unchanged', () => {
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-006',
          kind: 'add-command',
          command: otherCommand.name,
          summary: 'rejected proposal',
          proposed_change: otherCommand,
          evidence: 'review',
          decision: 'reject',
          decision_rationale: 'not needed for MVP',
        },
      ]),
    });
    expect(r.exitCode).toBe(0);
    expect(r.contracts?.commands).toHaveLength(1);
    expect(r.contracts?.commands[0].name).toBe('sample.getThing');
    expect(r.stdout).toMatch(/Applied 0 amendments.*rejected 1/);
  }, 30_000);

  it('add-command with name collision → exit 1', () => {
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-007',
          kind: 'add-command',
          command: baseCommand.name, // collides
          summary: 'duplicate add',
          proposed_change: baseCommand,
          evidence: 'oops',
          decision: 'accept',
        },
      ]),
    });
    expect(r.exitCode).toBe(1);
    expect(r.stderr).toMatch(/already exists/);
    // data-contracts.json untouched (or unchanged), still 1 command.
    expect(r.contracts?.commands).toHaveLength(1);
  }, 30_000);

  it('modify-command targeting unknown name → exit 1', () => {
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-008',
          kind: 'modify-command',
          command: 'sample.nonExistent',
          summary: 'modify ghost',
          proposed_change: { ...otherCommand, name: 'sample.nonExistent' },
          evidence: 'bad ref',
          decision: 'accept',
        },
      ]),
    });
    expect(r.exitCode).toBe(1);
    expect(r.stderr).toMatch(/not found/);
    expect(r.contracts?.commands).toHaveLength(1);
  }, 30_000);

  it('remove-command targeting unknown name → exit 1', () => {
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-009',
          kind: 'remove-command',
          command: 'sample.nonExistent',
          summary: 'remove ghost',
          proposed_change: null,
          evidence: 'bad ref',
          decision: 'accept',
        },
      ]),
    });
    expect(r.exitCode).toBe(1);
    expect(r.stderr).toMatch(/not found/);
    expect(r.contracts?.commands).toHaveLength(1);
  }, 30_000);

  it('mixed batch (1 accept + 1 reject + 1 null) → exit 1 because pending wins', () => {
    const r = run({
      'characterization/data-contracts.json': contractsDoc([baseCommand]),
      'characterization/phase-2-amendments.json': amendmentsDoc([
        {
          id: 'AMEND-010',
          kind: 'add-command',
          command: otherCommand.name,
          summary: 'accepted add',
          proposed_change: otherCommand,
          evidence: 'ok',
          decision: 'accept',
        },
        {
          id: 'AMEND-011',
          kind: 'modify-command',
          command: baseCommand.name,
          summary: 'rejected modify',
          proposed_change: { ...baseCommand, params: [] },
          evidence: 'noop',
          decision: 'reject',
        },
        {
          id: 'AMEND-012',
          kind: 'remove-command',
          command: baseCommand.name,
          summary: 'pending remove',
          proposed_change: null,
          evidence: 'tbd',
          decision: null,
        },
      ]),
    });
    expect(r.exitCode).toBe(1);
    expect(r.stderr).toMatch(/amendments pending review/);
    expect(r.stderr).toMatch(/AMEND-012/);
    // No merge happened: data-contracts.json is unchanged.
    expect(r.contracts?.commands).toHaveLength(1);
    expect(r.contracts?.commands[0].name).toBe('sample.getThing');
  }, 30_000);
});
