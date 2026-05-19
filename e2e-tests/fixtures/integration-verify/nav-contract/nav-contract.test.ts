/**
 * Unit tests for .claude/scripts/integration-verify/verify-navigation-contract.ts and
 * verify-menu-contributions.ts. Covers PASS and FAIL paths spelled out in PR-C
 * implementation plan section C.2 / C.3.
 *
 * Each test materializes a tiny feature tree under tmp, writes the navigation contract,
 * runs the verifier as a subprocess, and asserts the structured evidence.
 */
import { spawnSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, mkdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = join(__dirname, '..', '..', '..', '..');
const NAV_SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'verify-navigation-contract.ts',
);
const MENU_SCRIPT = join(
  REPO_ROOT,
  '.claude',
  'scripts',
  'integration-verify',
  'verify-menu-contributions.ts',
);

interface CaseFiles {
  /** Files to write into the feature root; keys are paths relative to that root. */
  [path: string]: string;
}

function setupCase(files: CaseFiles): { featureDir: string; coreRoot: string } {
  const tmp = mkdtempSync(join(tmpdir(), 'nav-'));
  // The script treats feature-dir == coreRoot is fine when paths are absolute. Here
  // we mirror the prod layout: featureDir is .context/features/{feature}/ and
  // coreRoot is the repo root that contains extensions/src/...
  // For simplicity in the test, feature root == core root == tmp.
  for (const [relPath, contents] of Object.entries(files)) {
    const absPath = join(tmp, relPath);
    mkdirSync(join(absPath, '..'), { recursive: true });
    writeFileSync(absPath, contents, 'utf8');
  }
  return { featureDir: tmp, coreRoot: tmp };
}

interface NavResult {
  exitCode: number;
  stdout: string;
  stderr: string;
  output: {
    status: 'PASS' | 'FAIL';
    checked_at: string;
    details: { checked: number; passed: number };
    checks: Array<{ kind: string; expected: string; ok: boolean }>;
    drift: Array<{ kind: string; expected: string }>;
    failures: Array<{ kind: string; expected: string }>;
    warnings: string[];
  } | null;
}

function runNav(featureDir: string, coreRoot: string): NavResult {
  const outputPath = join(featureDir, 'nav-result.json');
  const result = spawnSync(
    'npx',
    [
      'tsx',
      NAV_SCRIPT,
      '--feature-dir',
      featureDir,
      '--core-root',
      coreRoot,
      '--output',
      outputPath,
    ],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  let output: NavResult['output'] = null;
  try {
    output = JSON.parse(readFileSync(outputPath, 'utf8'));
  } catch {
    output = null;
  }
  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    output,
  };
}

function runMenu(featureDir: string, coreRoot: string): NavResult {
  const outputPath = join(featureDir, 'menu-result.json');
  const result = spawnSync(
    'npx',
    [
      'tsx',
      MENU_SCRIPT,
      '--feature-dir',
      featureDir,
      '--core-root',
      coreRoot,
      '--output',
      outputPath,
    ],
    { cwd: REPO_ROOT, encoding: 'utf8' },
  );
  let output: NavResult['output'] = null;
  try {
    output = JSON.parse(readFileSync(outputPath, 'utf8'));
  } catch {
    output = null;
  }
  return {
    exitCode: result.status ?? -1,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    output,
  };
}

const HAPPY_PATH_PLAN = JSON.stringify({
  feature: 'smoke-feature',
  version: '1.0.0',
  phase: 3,
  journeys: [],
  commands: [],
  touchpoints: [],
  navigation: {
    menuItems: [
      { groupId: 'smoke.group', label: 'Open Smoke', command: 'smokeFeature.open' },
    ],
    webViewTitle: 'Smoke View',
    testIds: [{ role: 'button', value: 'smoke-save' }],
    dialogs: [{ id: 'smoke-dlg', title: 'Smoke Dialog' }],
  },
  startup: {
    services: [],
    commandPairs: [],
    menuContributions: [
      {
        file: 'extensions/src/smoke-feature/contributions/menus.json',
        entry: 'smokeFeature.open',
      },
    ],
  },
});

const HAPPY_PATH_MENUS = JSON.stringify({
  mainMenu: {
    columns: {},
    groups: { 'smoke.group': { order: 1 } },
    items: [
      { label: 'Open Smoke', command: 'smokeFeature.open', group: 'smoke.group', order: 1 },
    ],
  },
  defaultWebViewTopMenu: { groups: {}, items: [] },
  defaultWebViewContextMenu: { groups: {}, items: [] },
});

const HAPPY_PATH_SRC = `
import { papi } from '@papi/backend';
export function reg() {
  return papi.webViewProviders.registerWebViewProvider('smokeFeature.viewer', {
    title: 'Smoke View',
    getWebView: () => Promise.resolve(undefined),
  });
}
export function Dlg() {
  return papi.dialogs.selectProject({ title: 'Smoke Dialog', prompt: 'pick' });
}
export function View() {
  return (<button data-testid="smoke-save">Save</button>);
}
`;

describe('verify-navigation-contract.ts', () => {
  it('happy path: all contract entries honored → status PASS, exit 0', () => {
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': HAPPY_PATH_PLAN,
      'extensions/src/smoke-feature/contributions/menus.json': HAPPY_PATH_MENUS,
      'extensions/src/smoke-feature/src/main.tsx': HAPPY_PATH_SRC,
    });
    const r = runNav(featureDir, coreRoot);
    expect(r.exitCode).toBe(0);
    expect(r.output?.status).toBe('PASS');
    // 1 menu-label + 1 menu-command + 1 webview-title + 1 testid + 1 dialog-title = 5
    expect(r.output?.details.checked).toBe(5);
    expect(r.output?.details.passed).toBe(5);
    expect(r.output?.drift).toHaveLength(0);
  }, 30_000);

  it('menu command drift: contract command differs from menus.json → status FAIL, exit 1', () => {
    const driftedMenus = HAPPY_PATH_MENUS.replace(
      '"command": "smokeFeature.open"',
      '"command": "smokeFeature.openWrong"',
    );
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': HAPPY_PATH_PLAN,
      'extensions/src/smoke-feature/contributions/menus.json': driftedMenus,
      'extensions/src/smoke-feature/src/main.tsx': HAPPY_PATH_SRC,
    });
    const r = runNav(featureDir, coreRoot);
    expect(r.exitCode).toBe(1);
    expect(r.output?.status).toBe('FAIL');
    expect(r.output?.drift.some((d) => d.kind === 'menu-command-mismatch')).toBe(true);
  }, 30_000);

  it('missing testid in source → status FAIL with testid-missing drift', () => {
    const srcWithoutTestId = HAPPY_PATH_SRC.replace('data-testid="smoke-save"', '');
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': HAPPY_PATH_PLAN,
      'extensions/src/smoke-feature/contributions/menus.json': HAPPY_PATH_MENUS,
      'extensions/src/smoke-feature/src/main.tsx': srcWithoutTestId,
    });
    const r = runNav(featureDir, coreRoot);
    expect(r.exitCode).toBe(1);
    expect(r.output?.drift.some((d) => d.kind === 'testid-missing')).toBe(true);
  }, 30_000);

  it('webview title rename → status FAIL with webview-title-missing drift', () => {
    const srcWithBadTitle = HAPPY_PATH_SRC.replace(
      "title: 'Smoke View'",
      "title: 'Smoke Viewer'",
    );
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': HAPPY_PATH_PLAN,
      'extensions/src/smoke-feature/contributions/menus.json': HAPPY_PATH_MENUS,
      'extensions/src/smoke-feature/src/main.tsx': srcWithBadTitle,
    });
    const r = runNav(featureDir, coreRoot);
    expect(r.exitCode).toBe(1);
    expect(r.output?.drift.some((d) => d.kind === 'webview-title-missing')).toBe(true);
  }, 30_000);

  it('menu uses %loc% key with matching localizeNotes → label still PASSes', () => {
    const localizedMenus = JSON.stringify({
      mainMenu: {
        columns: {},
        groups: { 'smoke.group': { order: 1 } },
        items: [
          {
            label: '%smoke_openSmoke%',
            localizeNotes: 'Main menu > Open Smoke for smoke-feature',
            command: 'smokeFeature.open',
            group: 'smoke.group',
            order: 1,
          },
        ],
      },
      defaultWebViewTopMenu: { groups: {}, items: [] },
      defaultWebViewContextMenu: { groups: {}, items: [] },
    });
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': HAPPY_PATH_PLAN,
      'extensions/src/smoke-feature/contributions/menus.json': localizedMenus,
      'extensions/src/smoke-feature/src/main.tsx': HAPPY_PATH_SRC,
    });
    const r = runNav(featureDir, coreRoot);
    expect(r.exitCode).toBe(0);
    expect(r.output?.status).toBe('PASS');
  }, 30_000);
});

describe('verify-menu-contributions.ts', () => {
  it('happy path: command entry matched in menus.json → PASS, exit 0', () => {
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': HAPPY_PATH_PLAN,
      'extensions/src/smoke-feature/contributions/menus.json': HAPPY_PATH_MENUS,
    });
    const r = runMenu(featureDir, coreRoot);
    expect(r.exitCode).toBe(0);
    expect(r.output?.status).toBe('PASS');
    expect(r.output?.details.checked).toBe(1);
    expect(r.output?.details.passed).toBe(1);
  }, 30_000);

  it('missing entry → FAIL with entry-missing reason', () => {
    const badPlan = JSON.stringify({
      ...JSON.parse(HAPPY_PATH_PLAN),
      startup: {
        services: [],
        commandPairs: [],
        menuContributions: [
          {
            file: 'extensions/src/smoke-feature/contributions/menus.json',
            entry: 'smokeFeature.doesNotExist',
          },
        ],
      },
    });
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': badPlan,
      'extensions/src/smoke-feature/contributions/menus.json': HAPPY_PATH_MENUS,
    });
    const r = runMenu(featureDir, coreRoot);
    expect(r.exitCode).toBe(1);
    expect(r.output?.status).toBe('FAIL');
    expect(r.output?.failures[0]).toMatchObject({
      entry: 'smokeFeature.doesNotExist',
    });
  }, 30_000);

  it('missing file → FAIL with file-missing reason', () => {
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': HAPPY_PATH_PLAN,
      // menus.json deliberately not written
    });
    const r = runMenu(featureDir, coreRoot);
    expect(r.exitCode).toBe(1);
    expect(r.output?.status).toBe('FAIL');
    expect(r.output?.failures[0]).toMatchObject({
      file: 'extensions/src/smoke-feature/contributions/menus.json',
    });
  }, 30_000);

  it('empty menuContributions → PASS with warning (vacuously PASS)', () => {
    const emptyPlan = JSON.stringify({
      ...JSON.parse(HAPPY_PATH_PLAN),
      startup: { services: [], commandPairs: [], menuContributions: [] },
    });
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': emptyPlan,
    });
    const r = runMenu(featureDir, coreRoot);
    expect(r.exitCode).toBe(0);
    expect(r.output?.status).toBe('PASS');
    expect(r.output?.warnings.length).toBeGreaterThan(0);
  }, 30_000);

  it('label-style entry matches menus.json label → PASS', () => {
    const planWithLabelEntry = JSON.stringify({
      ...JSON.parse(HAPPY_PATH_PLAN),
      startup: {
        services: [],
        commandPairs: [],
        menuContributions: [
          {
            file: 'extensions/src/smoke-feature/contributions/menus.json',
            entry: 'Open Smoke',
          },
        ],
      },
    });
    const { featureDir, coreRoot } = setupCase({
      'implementation/integration-plan.json': planWithLabelEntry,
      'extensions/src/smoke-feature/contributions/menus.json': HAPPY_PATH_MENUS,
    });
    const r = runMenu(featureDir, coreRoot);
    expect(r.exitCode).toBe(0);
    expect(r.output?.status).toBe('PASS');
  }, 30_000);
});
