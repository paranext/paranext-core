/**
 * Unit tests for .claude/scripts/integration-verify/check-coverage-rationales.ts
 *
 * Plan reference: PR-A foundation plan, Part 2 Section A.6 (review criterion) and A.8 (file list).
 * The script verifies that every `coverage: "partial"` command in data-contracts.json has a
 * rationale recorded in the companion data-contracts.md.
 *
 * Each test materializes a tmpdir with a data-contracts.json and data-contracts.md, runs the script
 * via spawnSync, and asserts the exit code and (when relevant) stderr content.
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'check-coverage-rationales.ts',
);

interface RunResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

function runScript(jsonPath: string, mdPath: string): RunResult {
  const result = spawnSync('npx', ['tsx', SCRIPT, jsonPath, mdPath], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    env: { ...process.env },
  });
  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
  };
}

interface CaseFiles {
  /** If undefined, the file is NOT written (used to test missing-file cases). */
  jsonContents?: string;
  /** If undefined, the file is NOT written. */
  mdContents?: string;
}

function setupCase(files: CaseFiles): { jsonPath: string; mdPath: string } {
  const tmp = mkdtempSync(join(tmpdir(), 'covrat-'));
  const jsonPath = join(tmp, 'data-contracts.json');
  const mdPath = join(tmp, 'data-contracts.md');
  if (files.jsonContents !== undefined) {
    writeFileSync(jsonPath, files.jsonContents, 'utf8');
  }
  if (files.mdContents !== undefined) {
    writeFileSync(mdPath, files.mdContents, 'utf8');
  }
  return { jsonPath, mdPath };
}

describe('check-coverage-rationales.ts (PR-A A.6)', () => {
  it('happy path: all partial commands have rationales → exit 0', () => {
    const { jsonPath, mdPath } = setupCase({
      jsonContents: JSON.stringify({
        feature: 'demo',
        version: '0.1.0',
        phase: 2,
        commands: [
          { name: 'demo.alpha', params: [], returnSchema: {}, coverage: 'partial' },
          { name: 'demo.beta', params: [], returnSchema: {}, coverage: 'partial' },
          { name: 'demo.gamma', params: [], returnSchema: {}, coverage: 'full' },
        ],
      }),
      mdContents: [
        '## Commands',
        '',
        '### demo.alpha',
        'Rationale: this command requires complex setup state we cannot stage in test fixtures.',
        '',
        '### demo.beta',
        'Coverage is partial because the precondition involves an authenticated remote session.',
        '',
        '### demo.gamma',
        'Full coverage via TS-001.',
        '',
      ].join('\n'),
    });
    const result = runScript(jsonPath, mdPath);
    expect(result.exitCode).toBe(0);
    expect(result.stderr).toMatch(/demo\.alpha: rationale OK/);
    expect(result.stderr).toMatch(/demo\.beta: rationale OK/);
    // demo.gamma is `full`, not reported
    expect(result.stderr).not.toMatch(/demo\.gamma/);
  }, 30_000);

  it('one partial command missing rationale → exit 1', () => {
    const { jsonPath, mdPath } = setupCase({
      jsonContents: JSON.stringify({
        feature: 'demo',
        version: '0.1.0',
        phase: 2,
        commands: [
          { name: 'demo.alpha', params: [], returnSchema: {}, coverage: 'partial' },
          { name: 'demo.beta', params: [], returnSchema: {}, coverage: 'partial' },
        ],
      }),
      mdContents: [
        '## Commands',
        '',
        '### demo.alpha',
        'Coverage is partial because the precondition involves an authenticated remote session.',
        '',
        '### demo.beta',
        'This is just a plain description with nothing about why coverage is limited.',
        '',
      ].join('\n'),
    });
    const result = runScript(jsonPath, mdPath);
    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/demo\.alpha: rationale OK/);
    expect(result.stderr).toMatch(/demo\.beta: missing rationale/);
  }, 30_000);

  it('no partial commands (all full) → exit 0 with explanatory message', () => {
    const { jsonPath, mdPath } = setupCase({
      jsonContents: JSON.stringify({
        feature: 'demo',
        version: '0.1.0',
        phase: 2,
        commands: [
          { name: 'demo.alpha', params: [], returnSchema: {}, coverage: 'full' },
          { name: 'demo.beta', params: [], returnSchema: {}, coverage: 'full' },
        ],
      }),
      mdContents: '## Commands\n\nAll commands are fully covered.\n',
    });
    const result = runScript(jsonPath, mdPath);
    expect(result.exitCode).toBe(0);
    expect(result.stderr).toMatch(/no partial-coverage commands/);
  }, 30_000);

  it('missing data-contracts.json → exit 2', () => {
    const { jsonPath, mdPath } = setupCase({
      mdContents: '## Commands\n',
      // jsonContents intentionally omitted
    });
    const result = runScript(jsonPath, mdPath);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/data-contracts\.json not found/);
  }, 30_000);

  it('missing data-contracts.md → exit 2', () => {
    const { jsonPath, mdPath } = setupCase({
      jsonContents: JSON.stringify({
        feature: 'demo',
        version: '0.1.0',
        phase: 2,
        commands: [{ name: 'demo.alpha', params: [], returnSchema: {}, coverage: 'partial' }],
      }),
      // mdContents intentionally omitted
    });
    const result = runScript(jsonPath, mdPath);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/data-contracts\.md not found/);
  }, 30_000);

  it('bad JSON in data-contracts.json → exit 2', () => {
    const { jsonPath, mdPath } = setupCase({
      jsonContents: '{ not valid json',
      mdContents: '## Commands\n',
    });
    const result = runScript(jsonPath, mdPath);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toMatch(/not valid JSON/);
  }, 30_000);
});
