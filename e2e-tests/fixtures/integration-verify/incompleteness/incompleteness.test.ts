/**
 * Unit tests for .claude/scripts/integration-verify/aggregate-incompleteness.ts
 *
 * Plan reference: PR-A foundation plan, Part 2
 *
 * - A.0 ("Incompleteness aggregation (new)") — vocabularies to scan
 * - A.6 ("Incompleteness aggregation (Pattern 2)") — gate criterion shape
 * - A.9 step 8c — counts must match a manual grep
 *
 * Each test materializes a tmp feature dir, seeds files with specific markers, runs the script as a
 * subprocess, and asserts the structured report.
 */
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'aggregate-incompleteness.ts',
);

type CategoryKey =
  | 'test_fixme'
  | 'forward_notes'
  | 'superseded_banners'
  | 'needs_review_verdicts'
  | 'inconclusive_outcomes'
  | 'skipped_na'
  | 'deferred_functionality'
  | 'post_phase_3_followups'
  | 'red_stub_provenance'
  | 'blocked_verdicts';

interface ReportItem {
  file: string;
  line?: number;
  snippet?: string;
}

interface Report {
  feature: string;
  generated_at: string;
  categories: Record<CategoryKey, { count: number; items: ReportItem[] }>;
  totals: { all_categories: number; blocker_kinds: number };
}

interface RunResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  report: Report | null;
  markdown: string | null;
  featureDir: string;
  outDir: string;
}

/** Map of relative-path → contents to seed into the feature dir. */
type Seed = Record<string, string>;

function setupCase(seed: Seed): RunResult {
  const tmp = mkdtempSync(join(tmpdir(), 'incompleteness-'));
  const featureDir = join(tmp, 'feature');
  mkdirSync(featureDir, { recursive: true });
  for (const [relPath, contents] of Object.entries(seed)) {
    const absPath = join(featureDir, relPath);
    mkdirSync(join(absPath, '..'), { recursive: true });
    writeFileSync(absPath, contents, 'utf8');
  }
  const outDir = join(tmp, 'out');
  // Don't pre-create out-dir: the script must create it itself.

  const result = spawnSync('npx', ['tsx', SCRIPT, featureDir, outDir], {
    cwd: REPO_ROOT,
    encoding: 'utf8',
    env: { ...process.env },
  });

  let report: Report | null = null;
  let markdown: string | null = null;
  try {
    report = JSON.parse(readFileSync(join(outDir, 'incompleteness-report.json'), 'utf8')) as Report;
  } catch {
    report = null;
  }
  try {
    markdown = readFileSync(join(outDir, 'incompleteness-report.md'), 'utf8');
  } catch {
    markdown = null;
  }

  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    report,
    markdown,
    featureDir,
    outDir,
  };
}

describe('aggregate-incompleteness.ts (PR-A A.0/A.6)', () => {
  it('empty feature dir → exit 0, all category counts == 0', () => {
    const result = setupCase({});
    expect(result.exitCode).toBe(0);
    expect(result.report).not.toBeNull();
    const cats = result.report!.categories;
    for (const key of Object.keys(cats) as CategoryKey[]) {
      expect(cats[key].count, `category ${key}`).toBe(0);
      expect(cats[key].items).toEqual([]);
    }
    expect(result.report!.totals.all_categories).toBe(0);
    expect(result.report!.totals.blocker_kinds).toBe(0);
  }, 30_000);

  it('seeded test.fixme calls → counted with file + line', () => {
    const result = setupCase({
      'tests/foo.test.ts': [
        "import { test } from 'vitest';",
        "test('alpha', () => {});",
        "test.fixme('beta', () => {});",
        '',
        "test.fixme('gamma', () => {});",
      ].join('\n'),
      'tests/bar.test.tsx': "test.fixme('delta', () => {});\n",
      'src/notes.md': 'test.fixme appears here but should not count in MD files\n',
    });
    expect(result.exitCode).toBe(0);
    const fx = result.report!.categories.test_fixme;
    expect(fx.count).toBe(3);
    // Items should mention the right files and lines
    const locs = fx.items.map((i) => `${i.file}:${i.line}`).sort();
    expect(locs).toEqual(['tests/bar.test.tsx:1', 'tests/foo.test.ts:3', 'tests/foo.test.ts:5']);
    expect(fx.items[0].snippet).toContain('test.fixme');
  }, 30_000);

  it('seeded STATUS: SUPERSEDED banner → counted under superseded_banners', () => {
    const result = setupCase({
      'forward-notes.md': '## STATUS: SUPERSEDED 2026-04-15\n\nThis note was rolled into FN-007.\n',
      'README.md': '# Feature\n\nNothing to see.\n',
    });
    expect(result.exitCode).toBe(0);
    const ss = result.report!.categories.superseded_banners;
    expect(ss.count).toBe(1);
    expect(ss.items[0].file).toBe('forward-notes.md');
    expect(ss.items[0].snippet).toContain('SUPERSEDED');
    // Should contribute to blocker_kinds
    expect(result.report!.totals.blocker_kinds).toBe(1);
  }, 30_000);

  it('seeded NEEDS_REVIEW in step-verdict JSON → counted under needs_review_verdicts', () => {
    const result = setupCase({
      'implementation/step-verdicts/alignment-review.json': JSON.stringify({
        verdict: 'NEEDS_REVIEW',
        step_name: 'alignment-review',
      }),
      'implementation/step-verdicts/other.json': JSON.stringify({
        verdict: 'PASS',
        step_name: 'other',
      }),
    });
    expect(result.exitCode).toBe(0);
    const nr = result.report!.categories.needs_review_verdicts;
    expect(nr.count).toBe(1);
    expect(nr.items[0].file).toBe('implementation/step-verdicts/alignment-review.json');
    expect(nr.items[0].snippet).toBe('verdict: NEEDS_REVIEW');
  }, 30_000);

  it('seeded BLOCKED verdict → counted under blocked_verdicts AND contributes to blocker_kinds', () => {
    const result = setupCase({
      'implementation/step-verdicts/backend-smoke-test-review.json': JSON.stringify({
        verdict: 'BLOCKED',
        step_name: 'backend-smoke-test-review',
        notes: 'awaiting C# fixture',
      }),
    });
    expect(result.exitCode).toBe(0);
    const bl = result.report!.categories.blocked_verdicts;
    expect(bl.count).toBe(1);
    expect(bl.items[0].file).toBe('implementation/step-verdicts/backend-smoke-test-review.json');
    expect(result.report!.totals.blocker_kinds).toBeGreaterThanOrEqual(1);
  }, 30_000);

  it('seeded deferred-functionality.md with bullet items → items counted', () => {
    const result = setupCase({
      'implementation/deferred-functionality.md': [
        '# Deferred',
        '',
        '## Summary',
        '',
        '- DEF-001: cross-launch to settings',
        '- DEF-002: multi-select file picker',
        '* DEF-003: progress plan prompts',
        '',
        'Trailing prose, not a bullet.',
      ].join('\n'),
    });
    expect(result.exitCode).toBe(0);
    const df = result.report!.categories.deferred_functionality;
    expect(df.count).toBe(3);
    expect(df.items.map((i) => i.snippet)).toEqual([
      '- DEF-001: cross-launch to settings',
      '- DEF-002: multi-select file picker',
      '* DEF-003: progress plan prompts',
    ]);
  }, 30_000);

  it('seeded Provenance coverage 0% in traceability matrix → counted under red_stub_provenance', () => {
    const result = setupCase({
      'implementation/traceability-matrix-CAP-001.json': JSON.stringify({
        capability: 'CAP-001',
        summary: { provenance: { coverage: '0%', note: 'RED stubs' } },
        notes: 'Provenance coverage 0% — RED stubs awaiting GREEN implementation',
      }),
      'implementation/traceability-report-CAP-002.md': [
        '| Provenance coverage | 0% | DEFERRED — RED STUB phase |',
        '',
      ].join('\n'),
      'implementation/traceability-matrix-CAP-003.json': JSON.stringify({
        capability: 'CAP-003',
        summary: { provenance: { coverage: '100%' } },
      }),
    });
    expect(result.exitCode).toBe(0);
    const rs = result.report!.categories.red_stub_provenance;
    expect(rs.count).toBe(2);
    const files = rs.items.map((i) => i.file).sort();
    expect(files).toEqual([
      'implementation/traceability-matrix-CAP-001.json',
      'implementation/traceability-report-CAP-002.md',
    ]);
  }, 30_000);

  it('markdown report generated and contains expected category names + counts', () => {
    const result = setupCase({
      'tests/x.test.ts': "test.fixme('x', () => {});\n",
      'implementation/step-verdicts/foo.json': JSON.stringify({
        verdict: 'BLOCKED',
        step_name: 'foo',
      }),
    });
    expect(result.exitCode).toBe(0);
    expect(result.markdown).not.toBeNull();
    const md = result.markdown!;
    expect(md).toContain('Incompleteness aggregate');
    expect(md).toContain('test.fixme calls');
    expect(md).toContain('BLOCKED step verdicts');
    // Should call out the blocker
    expect(md).toMatch(/Blocker categories present/);
    // Each category row should appear in the summary table
    expect(md).toContain('| **Total** | **2** |');
  }, 30_000);

  it('multiple categories simultaneously → totals.all_categories == sum', () => {
    const result = setupCase({
      // 2 test.fixme
      'tests/a.test.ts': "test.fixme('a', () => {});\ntest.fixme('b', () => {});\n",
      // 1 FN-XXX
      'forward-notes.md': '## FN-001: a pending follow-up\n\nSomething here.\n',
      // 1 SUPERSEDED banner (keep FN reference out so we don't bleed FN-count)
      'feedback/old.md': 'STATUS: SUPERSEDED 2026-05-01: rolled into a newer note.\n',
      // 1 NEEDS_REVIEW + 1 INCONCLUSIVE + 1 BLOCKED
      'implementation/step-verdicts/a.json': JSON.stringify({ verdict: 'NEEDS_REVIEW' }),
      'implementation/step-verdicts/b.json': JSON.stringify({ verdict: 'INCONCLUSIVE' }),
      'implementation/step-verdicts/c.json': JSON.stringify({ verdict: 'BLOCKED' }),
      // 1 SKIPPED N/A inside an auto-check
      'implementation/step-verdicts/d.json': JSON.stringify({
        verdict: 'PASS',
        automated_checks: [
          {
            name: 'level-A only check',
            status: 'SKIPPED',
            details: 'SKIPPED — N/A for this feature',
          },
        ],
      }),
      // 2 deferred items
      'implementation/deferred-functionality.md': '- DEF-001: a\n- DEF-002: b\n',
      // 1 post-phase-3-followup
      'implementation/post-phase-3-followups.md': '- FU-001: revisit caching\n',
      // 1 RED-stub provenance
      'implementation/traceability-matrix-CAP-001.json': JSON.stringify({
        notes: 'Provenance coverage 0% — RED',
      }),
    });
    expect(result.exitCode).toBe(0);
    const cats = result.report!.categories;
    const sum = (Object.keys(cats) as CategoryKey[]).reduce((acc, k) => acc + cats[k].count, 0);
    expect(result.report!.totals.all_categories).toBe(sum);
    // Sanity: per-category counts
    expect(cats.test_fixme.count).toBe(2);
    expect(cats.forward_notes.count).toBe(1);
    expect(cats.superseded_banners.count).toBe(1);
    expect(cats.needs_review_verdicts.count).toBe(1);
    expect(cats.inconclusive_outcomes.count).toBe(1);
    expect(cats.blocked_verdicts.count).toBe(1);
    expect(cats.skipped_na.count).toBe(1);
    expect(cats.deferred_functionality.count).toBe(2);
    expect(cats.post_phase_3_followups.count).toBe(1);
    expect(cats.red_stub_provenance.count).toBe(1);
    // blocker_kinds == superseded + blocked = 1 + 1
    expect(result.report!.totals.blocker_kinds).toBe(2);
  }, 30_000);
});
