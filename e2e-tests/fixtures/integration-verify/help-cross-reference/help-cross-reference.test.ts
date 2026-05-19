/**
 * Unit tests for .claude/scripts/integration-verify/cross-reference-help.ts
 *
 * Covers the Phase 2 Pattern 5 cases described in PR-A foundation plan A.0/A.6.
 *
 * Each test materialises a tiny feature dir under tmp containing
 * `characterization/help-documentation.md` and a behavior catalog (either `.md` or `.json`), then
 * runs the helper as a subprocess and asserts the exit code + stderr + optional JSON report.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'cross-reference-help.ts',
);

interface CaseFiles {
  /** Files to write into the feature dir; keys are paths relative to it. */
  [path: string]: string;
}

interface SetupOptions {
  /** Override the help-documentation path passed to the script. */
  helpPathOverride?: string;
  /** Override the catalog path passed to the script. */
  catalogPathOverride?: string;
  /** Pass an explicit report path as the third positional argument. */
  reportPath?: string;
  /** Catalog filename to write inside characterization/ (defaults to .md). */
  catalogFilename?: string;
}

interface RunResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  featureDir: string;
  reportPath: string;
  report: unknown;
}

function writeFiles(featureDir: string, files: CaseFiles): void {
  for (const [relPath, contents] of Object.entries(files)) {
    const absPath = join(featureDir, relPath);
    mkdirSync(join(absPath, '..'), { recursive: true });
    writeFileSync(absPath, contents, 'utf8');
  }
}

function setupCase(files: CaseFiles, options: SetupOptions = {}): RunResult {
  const tmp = mkdtempSync(join(tmpdir(), 'help-xref-'));
  const featureDir = join(tmp, 'feature');
  mkdirSync(featureDir, { recursive: true });
  writeFiles(featureDir, files);

  const helpPath =
    options.helpPathOverride ?? join(featureDir, 'characterization', 'help-documentation.md');
  const catalogFilename = options.catalogFilename ?? 'behavior-catalog.md';
  const catalogPath =
    options.catalogPathOverride ?? join(featureDir, 'characterization', catalogFilename);
  const reportPath = options.reportPath ?? join(tmp, 'help-cross-reference-report.json');

  const args = [SCRIPT, helpPath, catalogPath, reportPath];
  const result = spawnSync('npx', ['tsx', ...args], {
    cwd: featureDir,
    encoding: 'utf8',
    env: process.env,
  });

  let report: unknown = null;
  if (existsSync(reportPath)) {
    try {
      report = JSON.parse(readFileSync(reportPath, 'utf8'));
    } catch {
      report = null;
    }
  }

  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    featureDir,
    reportPath,
    report,
  };
}

describe('cross-reference-help.ts (Pattern 5)', () => {
  it('happy path: all help mentions appear in markdown catalog → exit 0', () => {
    const result = setupCase({
      'characterization/help-documentation.md': `# Hovering over linked words

When you **hover** over a linked word, a tooltip appears.

Click "Settings" to open the configuration panel.

## Open the Resource panel
`,
      'characterization/behavior-catalog.md': `# Behaviors

## Hovering over linked words
Shows a tooltip when the user hovers over a linked word.

## Settings panel
Opens when the user clicks the settings button.

## Open the Resource panel
Opens via View > Resources menu.

## Hover behavior
Generic hover behavior.
`,
    });

    expect(result.exitCode, `stderr was: ${result.stderr}`).toBe(0);
    expect(result.stderr).not.toMatch(/unmatched/);
    const report = result.report as { unmatched: number; total_mentions: number } | null;
    expect(report).not.toBeNull();
    expect(report?.unmatched).toBe(0);
    expect(report?.total_mentions).toBeGreaterThan(0);
  }, 30_000);

  it('one help mention has no matching behavior → exit 1, mention named in stderr', () => {
    const result = setupCase({
      'characterization/help-documentation.md': `# Some Feature

Click "**WidgetFactory**" to spawn a new widget.

Hover over the resource link.
`,
      'characterization/behavior-catalog.md': `# Behaviors

## Hover over the resource link
The user hovers over a linked resource.
`,
    });

    expect(result.exitCode).toBe(1);
    expect(result.stderr).toMatch(/unmatched.*WidgetFactory/);
    const report = result.report as { unmatched: number } | null;
    expect(report?.unmatched).toBeGreaterThanOrEqual(1);
  }, 30_000);

  it('unmatched mention accepted via working-docs/help-cross-reference.md → exit 0', () => {
    const result = setupCase({
      'characterization/help-documentation.md': `# Some Feature

Click "**WidgetFactory**" to spawn a widget.
`,
      'characterization/behavior-catalog.md': `# Behaviors

## Some Feature
Top-level feature description.
`,
      'working-docs/help-cross-reference.md': `# Cross-reference rationale

- **WidgetFactory** — accepted-gap: legacy term not in scope for current behaviors
- Click WidgetFactory — accepted-gap: covered by the WidgetFactory entry above
`,
    });

    expect(result.exitCode, `stderr: ${result.stderr}`).toBe(0);
    const report = result.report as {
      unmatched: number;
      accepted_gap: number;
      mentions: Array<{ mention: string; status: string }>;
    } | null;
    expect(report?.unmatched).toBe(0);
    expect(report?.accepted_gap).toBeGreaterThanOrEqual(1);
    const widgetMention = report?.mentions.find((m) => /widgetfactory/i.test(m.mention));
    expect(widgetMention?.status).toBe('accepted-gap');
  }, 30_000);

  it('help file missing → exit 2', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'help-xref-missing-'));
    const featureDir = join(tmp, 'feature');
    mkdirSync(join(featureDir, 'characterization'), { recursive: true });
    writeFileSync(
      join(featureDir, 'characterization', 'behavior-catalog.md'),
      '# Behaviors\n\n## x\n',
      'utf8',
    );

    const helpPath = join(featureDir, 'characterization', 'help-documentation.md');
    const catalogPath = join(featureDir, 'characterization', 'behavior-catalog.md');
    const reportPath = join(tmp, 'report.json');

    const result = spawnSync('npx', ['tsx', SCRIPT, helpPath, catalogPath, reportPath], {
      cwd: featureDir,
      encoding: 'utf8',
    });

    expect(result.status).toBe(2);
    expect(result.stderr).toMatch(/help documentation not found/);
  }, 30_000);

  it('catalog file missing → exit 2', () => {
    const tmp = mkdtempSync(join(tmpdir(), 'help-xref-missing-cat-'));
    const featureDir = join(tmp, 'feature');
    mkdirSync(join(featureDir, 'characterization'), { recursive: true });
    writeFileSync(
      join(featureDir, 'characterization', 'help-documentation.md'),
      '# Help\n\nClick foo.\n',
      'utf8',
    );

    const helpPath = join(featureDir, 'characterization', 'help-documentation.md');
    const catalogPath = join(featureDir, 'characterization', 'behavior-catalog.md');
    const reportPath = join(tmp, 'report.json');

    const result = spawnSync('npx', ['tsx', SCRIPT, helpPath, catalogPath, reportPath], {
      cwd: featureDir,
      encoding: 'utf8',
    });

    expect(result.status).toBe(2);
    expect(result.stderr).toMatch(/behavior catalog not found/);
  }, 30_000);

  it('catalog as .json with behaviors[] array works', () => {
    const result = setupCase(
      {
        'characterization/help-documentation.md': `# Help topic

Click "**Save**" to persist changes.

## Hovering over links
`,
        'characterization/behavior-catalog.json': JSON.stringify({
          behaviors: [
            {
              id: 'BEH-001',
              title: 'Save persists changes',
              description: 'Pressing Save writes to disk.',
            },
            { id: 'BEH-002', title: 'Hovering over links shows tooltip' },
            { id: 'BEH-003', title: 'Help topic landing page' },
          ],
        }),
      },
      { catalogFilename: 'behavior-catalog.json' },
    );

    expect(result.exitCode, `stderr: ${result.stderr}`).toBe(0);
    const report = result.report as { catalog_format: string; unmatched: number } | null;
    expect(report?.catalog_format).toBe('json');
    expect(report?.unmatched).toBe(0);
  }, 30_000);

  it('catalog as .md with headings only works', () => {
    const result = setupCase({
      'characterization/help-documentation.md': `## Saving a project

Click "**Save**" to save.
`,
      'characterization/behavior-catalog.md': `# Catalog

## Saving a project
## Click Save action
## Save button persists
## Loading a project
## Closing the window
`,
    });

    expect(result.exitCode, `stderr: ${result.stderr}`).toBe(0);
    const report = result.report as { catalog_format: string; unmatched: number } | null;
    expect(report?.catalog_format).toBe('md');
    expect(report?.unmatched).toBe(0);
  }, 30_000);

  it('empty help doc → exit 0', () => {
    const result = setupCase({
      'characterization/help-documentation.md': '',
      'characterization/behavior-catalog.md': '# Behaviors\n\n## Anything\n',
    });

    expect(result.exitCode, `stderr: ${result.stderr}`).toBe(0);
    const report = result.report as { total_mentions: number; unmatched: number } | null;
    expect(report?.total_mentions).toBe(0);
    expect(report?.unmatched).toBe(0);
  }, 30_000);
});
