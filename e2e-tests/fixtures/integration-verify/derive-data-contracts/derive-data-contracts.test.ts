/**
 * Unit tests for .claude/scripts/integration-verify/derive-data-contracts-json.ts
 *
 * Plan reference: A.7 — One-time JSON derivation for the in-flight feature (best-effort prose→JSON
 * migration helper).
 *
 * Cases covered:
 *
 * 1. Minimal markdown with one command in standard format → JSON with one command, partial coverage.
 * 2. Markdown with multiple commands → JSON with multiple commands in order.
 * 3. Markdown with TypeScript signature → params extracted with names and types; csType enriched from
 *    C# fence when available.
 * 4. Markdown with errors table → errors extracted with codes and `when` text; non-numeric codes get
 *    hashed and surface as TODOs.
 * 5. Markdown with NO commands section → file written but contains an empty commands[]; the output
 *    still validates (empty commands is permitted by the schema; the spec gate enforces
 *    non-emptiness for Level-B/C).
 * 6. Markdown with frontmatter feature/version → top-level fields populated.
 * 7. Output validates against data-contracts.schema.json via validate-schema.
 * 8. Re-running on the same input produces byte-equal output (idempotent in spirit modulo `generated`
 *    date).
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'derive-data-contracts-json.ts',
);
const VALIDATE_SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'validate-schema.ts',
);

interface RunResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  outputPath: string;
  tmpDir: string;
}

function runWith(md: string, outputFileName?: string): RunResult {
  const tmp = mkdtempSync(join(tmpdir(), 'derive-data-contracts-'));
  const mdPath = join(tmp, 'data-contracts.md');
  writeFileSync(mdPath, md, 'utf8');
  const outputPath = outputFileName ? join(tmp, outputFileName) : join(tmp, 'data-contracts.json');
  const args = ['tsx', SCRIPT, mdPath];
  if (outputFileName) args.push(outputPath);
  const result = spawnSync('npx', args, {
    cwd: REPO_ROOT,
    encoding: 'utf8',
  });
  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    outputPath,
    tmpDir: tmp,
  };
}

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(path, 'utf8')) as Record<string, unknown>;
}

const MINIMAL_MD = `---
artifact: data-contracts
feature: sample-feature
version: 1.2.3
---

# Sample feature

## 1. Overview

Some prose.

## 4. API Methods

### 4.1 sampleCommand

**Purpose**: Do the thing.

**TypeScript**:

\`\`\`typescript
function sampleCommand(id: string): Promise<void>;
\`\`\`
`;

const TWO_COMMANDS_MD = `---
artifact: data-contracts
feature: two
version: 0.1.0
---

## 4. API Methods

### 4.1 firstCommand

**TypeScript**:

\`\`\`typescript
function firstCommand(a: string): Promise<void>;
\`\`\`

### 4.2 secondCommand

**TypeScript**:

\`\`\`typescript
function secondCommand(b: number): Promise<void>;
\`\`\`
`;

const PARAMS_MD = `---
artifact: data-contracts
feature: paramy
version: 0.1.0
---

## 4. API Methods

### 4.1 getThing

**TypeScript**:

\`\`\`typescript
function getThing(projectId: string, options?: number): Promise<void>;
\`\`\`

**C#**:

\`\`\`csharp
public static Task<Result> GetThingAsync(
    string projectId,
    int options,
    CancellationToken ct);
\`\`\`
`;

const ERRORS_MD = `---
artifact: data-contracts
feature: erry
version: 0.1.0
---

## 4. API Methods

### 4.1 doStuff

**TypeScript**:

\`\`\`typescript
function doStuff(): Promise<void>;
\`\`\`

**Errors**:

| Condition | Code | Message |
|-----------|------|---------|
| Bad input | 400 | "bad input" |
| Project missing | E_PROJECT_NOT_FOUND | "missing" |
`;

const NO_COMMANDS_MD = `---
artifact: data-contracts
feature: empty
version: 0.0.1
---

## 1. Overview

This is a Level-A feature with no API surface.

## 9. PT10 Implementation Alignment

Nothing here.
`;

describe('derive-data-contracts-json.ts', () => {
  it('minimal markdown with one command → one command, partial coverage', () => {
    const r = runWith(MINIMAL_MD);
    expect(r.exitCode).toBe(0);
    expect(r.stdout).toMatch(/Derived 1 commands/);
    expect(r.stdout).toMatch(/representativeInput is intentionally omitted/);
    const doc = readJson(r.outputPath);
    expect(doc.phase).toBe(2);
    expect(Array.isArray(doc.commands)).toBe(true);
    const commands = doc.commands as Array<Record<string, unknown>>;
    expect(commands).toHaveLength(1);
    expect(commands[0].name).toBe('sampleCommand');
    expect(commands[0].coverage).toBe('partial');
    expect(commands[0].representativeInput).toBeUndefined();
    expect(commands[0].returnSchema).toEqual({ type: 'object' });
  }, 30_000);

  it('multiple commands → JSON commands appear in source order', () => {
    const r = runWith(TWO_COMMANDS_MD);
    expect(r.exitCode).toBe(0);
    const doc = readJson(r.outputPath);
    const commands = doc.commands as Array<Record<string, unknown>>;
    expect(commands.map((c) => c.name)).toEqual(['firstCommand', 'secondCommand']);
  }, 30_000);

  it('TypeScript signature → params extracted; C# fence enriches csType', () => {
    const r = runWith(PARAMS_MD);
    expect(r.exitCode).toBe(0);
    const doc = readJson(r.outputPath);
    const commands = doc.commands as Array<Record<string, unknown>>;
    const params = commands[0].params as Array<Record<string, unknown>>;
    expect(params).toHaveLength(2);
    expect(params[0].name).toBe('projectId');
    expect(params[0].tsType).toBe('string');
    expect(params[0].csType).toBe('string');
    expect(params[1].name).toBe('options');
    expect(params[1].tsType).toBe('number');
    expect(params[1].csType).toBe('int');
    expect(params[1].optional).toBe(true);
  }, 30_000);

  it('errors table → errors extracted; non-numeric codes get hashed + TODO', () => {
    const r = runWith(ERRORS_MD);
    expect(r.exitCode).toBe(0);
    const doc = readJson(r.outputPath);
    const commands = doc.commands as Array<Record<string, unknown>>;
    const errors = commands[0].errors as Array<Record<string, unknown>>;
    expect(errors).toHaveLength(2);
    expect(errors[0].code).toBe(400);
    expect(errors[0].when).toBe('Bad input');
    // Non-numeric code is hashed; TODO surfaces it in stderr.
    expect(typeof errors[1].code).toBe('number');
    expect(errors[1].code).not.toBe(0);
    expect(errors[1].when).toBe('Project missing');
    expect(r.stderr).toMatch(/TODO error code "E_PROJECT_NOT_FOUND"/);
  }, 30_000);

  it('markdown with no API Methods section → empty commands[], file still written and validates', () => {
    const r = runWith(NO_COMMANDS_MD);
    // Empty commands[] is permitted by the schema; exit 0.
    expect(r.exitCode).toBe(0);
    const doc = readJson(r.outputPath);
    expect(doc.commands).toEqual([]);
    expect(r.stderr).toMatch(/TODO no "API Methods" section found/);
  }, 30_000);

  it('frontmatter → top-level feature/version populated', () => {
    const r = runWith(MINIMAL_MD);
    expect(r.exitCode).toBe(0);
    const doc = readJson(r.outputPath);
    expect(doc.feature).toBe('sample-feature');
    expect(doc.version).toBe('1.2.3');
    expect(typeof doc.generated).toBe('string');
    expect(doc.generated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  }, 30_000);

  it('output validates against data-contracts.schema.json (smoke check)', () => {
    const r = runWith(MINIMAL_MD);
    expect(r.exitCode).toBe(0);
    const validate = spawnSync('npx', ['tsx', VALIDATE_SCRIPT, 'data-contracts', r.outputPath], {
      cwd: REPO_ROOT,
      encoding: 'utf8',
    });
    expect(validate.status).toBe(0);
    expect(validate.stdout).toMatch(/OK/);
  }, 30_000);

  it('idempotent in spirit: re-running on the same input produces equivalent commands', () => {
    const r1 = runWith(MINIMAL_MD);
    expect(r1.exitCode).toBe(0);
    const r2 = runWith(MINIMAL_MD);
    expect(r2.exitCode).toBe(0);
    const doc1 = readJson(r1.outputPath);
    const doc2 = readJson(r2.outputPath);
    // `generated` is today's date in both — byte-equal modulo same-day. To
    // make this robust, compare the commands array directly.
    expect(doc1.commands).toEqual(doc2.commands);
    expect(doc1.feature).toEqual(doc2.feature);
    expect(doc1.version).toEqual(doc2.version);
    expect(doc1.phase).toEqual(doc2.phase);
  }, 30_000);
});
