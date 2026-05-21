/**
 * Smoke test: every fixture in this directory must validate (or fail to validate) as its `valid-` /
 * `invalid-` prefix declares.
 *
 * Tests the .claude/scripts/integration-verify/validate-schema.ts wrapper end-to-end:
 *
 * - Schema discovery from .context/standards/artifact-schemas/
 * - Ajv strict-mode compilation
 * - Cross-schema $ref resolution (integration-plan references data-contracts)
 * - Exit-code contract (0 for valid, 1 for invalid, 2 for invocation errors)
 */
import { spawnSync } from 'node:child_process';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const FIXTURES_ROOT = __dirname;
const VALIDATOR = join(REPO_ROOT, '.claude', 'scripts', 'integration-verify', 'validate-schema.ts');

interface FixtureCase {
  schema: string;
  file: string;
  expectedExitCode: 0 | 1;
}

function discoverFixtures(): FixtureCase[] {
  const cases: FixtureCase[] = [];
  for (const schemaDir of readdirSync(FIXTURES_ROOT)) {
    const schemaPath = join(FIXTURES_ROOT, schemaDir);
    if (!statSync(schemaPath).isDirectory()) continue;
    for (const file of readdirSync(schemaPath)) {
      if (!file.endsWith('.json')) continue;
      let expected: 0 | 1;
      if (file.startsWith('valid-')) expected = 0;
      else if (file.startsWith('invalid-')) expected = 1;
      else continue;
      cases.push({
        schema: schemaDir,
        file: join(schemaPath, file),
        expectedExitCode: expected,
      });
    }
  }
  return cases;
}

describe('validate-schema.ts against fixture matrix', () => {
  const cases = discoverFixtures();

  it('discovers at least one fixture per known schema', () => {
    const schemas = new Set(cases.map((c) => c.schema));
    expect(schemas.has('data-contracts')).toBe(true);
    expect(schemas.has('integration-plan')).toBe(true);
    expect(schemas.has('backend-alignment')).toBe(true);
    expect(schemas.has('ui-alignment')).toBe(true);
  });

  for (const c of cases) {
    const name = `${c.schema}/${c.file.split('/').pop()}`;
    it(`${name} exits ${c.expectedExitCode}`, () => {
      const result = spawnSync('npx', ['tsx', VALIDATOR, c.schema, c.file], {
        cwd: REPO_ROOT,
        encoding: 'utf8',
      });
      const stderr = result.stderr ?? '';
      const stdout = result.stdout ?? '';
      expect(result.status, `${name}\nstdout: ${stdout}\nstderr: ${stderr}`).toBe(
        c.expectedExitCode,
      );
    }, 30_000);
  }
});
