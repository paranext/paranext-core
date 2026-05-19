/**
 * Unit tests for .claude/scripts/integration-verify/render-narrative.ts
 *
 * Covers:
 *
 * - Fenced sections regenerate from JSON; non-fenced content stays byte-equal
 * - Re-running on already-rendered content is idempotent
 * - Unknown AUTOGEN section, unmatched BEGIN/END, mismatched fences → error
 * - Empty arrays render placeholder text, not error
 * - Multiple fence sections in one file all regenerate
 *
 * Plan reference: A.9 validation step "render-narrative fence handling".
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(REPO_ROOT, '.claude', 'scripts', 'integration-verify', 'render-narrative.ts');

function runWith(json: unknown, md: string): { exitCode: number; stderr: string; mdOut: string } {
  const tmp = mkdtempSync(join(tmpdir(), 'render-narrative-'));
  const jsonPath = join(tmp, 'sidecar.json');
  const mdPath = join(tmp, 'companion.md');
  writeFileSync(jsonPath, JSON.stringify(json), 'utf8');
  writeFileSync(mdPath, md, 'utf8');
  const result = spawnSync('npx', ['tsx', SCRIPT, jsonPath, mdPath], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  const mdOut = readFileSync(mdPath, 'utf8');
  return { exitCode: result.status ?? -1, stderr: result.stderr ?? '', mdOut };
}

describe('render-narrative.ts', () => {
  it('regenerates AUTOGEN:commands section and preserves human commentary', () => {
    const json = {
      feature: 'sample',
      version: '1.0.0',
      phase: 2,
      commands: [
        {
          name: 'sample.getThing',
          params: [{ name: 'id', tsType: 'string', csType: 'string' }],
          returnSchema: { type: 'object' },
          coverage: 'partial',
        },
      ],
    };
    const md = `# Sample Data Contracts

Some commentary above. This stays exactly as written.

<!-- AUTOGEN:commands BEGIN — do not edit; regenerated from sidecar.json -->
old stale content that will be replaced
<!-- AUTOGEN:commands END -->

Some commentary below. This also stays.
`;
    const { exitCode, mdOut } = runWith(json, md);
    expect(exitCode).toBe(0);
    expect(mdOut).toContain('Some commentary above.');
    expect(mdOut).toContain('Some commentary below.');
    expect(mdOut).toContain('| Command | Params (TS) | Errors | Coverage |');
    expect(mdOut).toContain('sample.getThing');
    expect(mdOut).toContain('partial');
    expect(mdOut).not.toContain('old stale content');
  }, 30_000);

  it('idempotent: re-running produces byte-equal output', () => {
    const json = {
      commands: [
        {
          name: 'x.y',
          params: [],
          returnSchema: { type: 'object' },
          coverage: 'full',
          representativeInput: { params: [] },
        },
      ],
    };
    const md = `<!-- AUTOGEN:commands BEGIN — do not edit; regenerated from sidecar.json -->
old
<!-- AUTOGEN:commands END -->
`;
    const first = runWith(json, md);
    expect(first.exitCode).toBe(0);
    const second = runWith(json, first.mdOut);
    expect(second.exitCode).toBe(0);
    expect(second.mdOut).toBe(first.mdOut);
  }, 30_000);

  it('renders empty array as placeholder, not error', () => {
    const json = { commands: [] };
    const md = `<!-- AUTOGEN:commands BEGIN -->
<!-- AUTOGEN:commands END -->
`;
    const { exitCode, mdOut } = runWith(json, md);
    expect(exitCode).toBe(0);
    expect(mdOut).toContain('_(no commands)_');
  }, 30_000);

  it('errors on unknown AUTOGEN section', () => {
    const json = { commands: [] };
    const md = `<!-- AUTOGEN:nonExistentSection BEGIN -->
<!-- AUTOGEN:nonExistentSection END -->
`;
    const { exitCode, stderr } = runWith(json, md);
    expect(exitCode).toBe(1);
    expect(stderr).toMatch(/unknown AUTOGEN section/);
  }, 30_000);

  it('errors on unmatched BEGIN fence (missing END)', () => {
    const json = { commands: [] };
    const md = `<!-- AUTOGEN:commands BEGIN -->
content but no END marker, helper must fail loud
`;
    const { exitCode, stderr } = runWith(json, md);
    expect(exitCode).toBe(1);
    expect(stderr).toMatch(/unclosed BEGIN fence/);
  }, 30_000);

  it('errors on unmatched END fence (missing BEGIN)', () => {
    const json = { commands: [] };
    const md = `Some text, then a dangling end:
<!-- AUTOGEN:commands END -->
`;
    const { exitCode, stderr } = runWith(json, md);
    expect(exitCode).toBe(1);
    expect(stderr).toMatch(/unmatched END fence/);
  }, 30_000);

  it('errors on mismatched fence sections (BEGIN A, END B)', () => {
    const json = { commands: [] };
    const md = `<!-- AUTOGEN:commands BEGIN -->
content
<!-- AUTOGEN:journeys END -->
`;
    const { exitCode, stderr } = runWith(json, md);
    expect(exitCode).toBe(1);
    expect(stderr).toMatch(/mismatched fences/);
  }, 30_000);

  it('regenerates multiple fence sections in one file', () => {
    const json = {
      commands: [{ name: 'sample.getX', params: [], returnSchema: { type: 'object' } }],
      journeys: [
        {
          id: 'J-001',
          scenarioRef: 'TS-T001',
          testFile: 'test.spec.ts',
          steps: [{ action: 'click', locator: '#x' }],
        },
      ],
      navigation: {
        menuItems: [{ groupId: 'g', label: 'L', command: 'c.d' }],
        webViewTitle: 'T',
      },
    };
    const md = `# Integration plan

<!-- AUTOGEN:commands BEGIN -->
<!-- AUTOGEN:commands END -->

Between fences. Preserved verbatim.

<!-- AUTOGEN:journeys BEGIN -->
<!-- AUTOGEN:journeys END -->

<!-- AUTOGEN:navigation BEGIN -->
<!-- AUTOGEN:navigation END -->
`;
    const { exitCode, mdOut } = runWith(json, md);
    expect(exitCode).toBe(0);
    expect(mdOut).toContain('Between fences. Preserved verbatim.');
    expect(mdOut).toContain('sample.getX');
    expect(mdOut).toContain('J-001');
    expect(mdOut).toContain('Web-view title');
  }, 30_000);

  it('regenerates fence BEGIN suffix to reflect source filename', () => {
    const json = { commands: [] };
    const md = `<!-- AUTOGEN:commands BEGIN — do not edit; regenerated from OLD.json -->
<!-- AUTOGEN:commands END -->
`;
    const { exitCode, mdOut } = runWith(json, md);
    expect(exitCode).toBe(0);
    expect(mdOut).toContain('regenerated from sidecar.json');
    expect(mdOut).not.toContain('OLD.json');
  }, 30_000);

  it('alignment file: files/utilities/patternRefs all render', () => {
    const json = {
      files: [{ path: 'c-sharp/X.cs', kind: 'service' }],
      utilities: [
        {
          id: 'UTL-CS-001',
          name: 'Foo',
          location: 'c-sharp/Foo.cs:10',
          useFor: 'something',
        },
      ],
      patternRefs: [{ description: 'Pattern X', location: 'c-sharp/Y.cs:42' }],
    };
    const md = `<!-- AUTOGEN:files BEGIN -->
<!-- AUTOGEN:files END -->

<!-- AUTOGEN:utilities BEGIN -->
<!-- AUTOGEN:utilities END -->

<!-- AUTOGEN:patternRefs BEGIN -->
<!-- AUTOGEN:patternRefs END -->
`;
    const { exitCode, mdOut } = runWith(json, md);
    expect(exitCode).toBe(0);
    expect(mdOut).toContain('c-sharp/X.cs');
    expect(mdOut).toContain('UTL-CS-001');
    expect(mdOut).toContain('Pattern X');
    expect(mdOut).toContain('c-sharp/Y.cs:42');
  }, 30_000);
});
