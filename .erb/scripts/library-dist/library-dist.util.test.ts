// @vitest-environment node

import {
  buildStatus,
  hasLibraryChanges,
  isLibraryPath,
  isTargetForRun,
  parseTarget,
  PLACEHOLDER_DESCRIPTION,
  selectLibraryPullRequests,
  shouldReportResult,
  staleDistInstructions,
  STATUS_CONTEXT,
} from './library-dist.util';

const SHA_A = 'a'.repeat(40);
const SHA_B = 'b'.repeat(40);

describe('isLibraryPath', () => {
  it.each([
    'lib/platform-bible-react/src/index.ts',
    'lib/platform-bible-utils/vite.config.ts',
    'lib/platform-bible-react/dist/index.js',
    'package-lock.json',
  ])('treats %s as a library path', (filePath) => expect(isLibraryPath(filePath)).toBe(true));

  it.each([
    'src/renderer/index.tsx',
    'lib/papi-dts/papi.d.ts',
    'lib/platform-bible-react-extra/file.ts',
    'extensions/package-lock.json',
  ])('does not treat %s as a library path', (filePath) =>
    expect(isLibraryPath(filePath)).toBe(false),
  );
});

describe('hasLibraryChanges', () => {
  it('is true when any path is a library path', () =>
    expect(hasLibraryChanges(['README.md', 'lib/platform-bible-utils/src/a.ts'])).toBe(true));
  it('is false for no paths', () => expect(hasLibraryChanges([])).toBe(false));
});

describe('selectLibraryPullRequests', () => {
  it('keeps only pull requests that touch a library', () => {
    const library = {
      number: 1,
      headRefOid: SHA_A,
      files: [{ path: 'lib/platform-bible-react/src/a.tsx' }],
    };
    const other = { number: 2, headRefOid: SHA_B, files: [{ path: 'src/main/main.ts' }] };
    expect(selectLibraryPullRequests([library, other])).toEqual([library]);
  });

  it('keeps a pull request whose file list is truncated at 100 files', () => {
    const truncated = {
      number: 3,
      headRefOid: SHA_A,
      files: Array.from({ length: 100 }, (_, i) => ({ path: `src/f${i}.ts` })),
    };
    expect(selectLibraryPullRequests([truncated])).toEqual([truncated]);
  });
});

describe('parseTarget', () => {
  it('reads a pull request target', () =>
    expect(parseTarget(JSON.stringify({ pr: 12, sha: SHA_A, description: 'ok' }))).toEqual({
      pr: 12,
      sha: SHA_A,
      description: 'ok',
    }));

  it('reads a branch target without a pull request', () =>
    expect(parseTarget(JSON.stringify({ sha: SHA_A, description: 'ok' }))).toEqual({
      sha: SHA_A,
      description: 'ok',
    }));

  it.each([
    ['not JSON', '{'],
    ['a short sha', JSON.stringify({ sha: 'abc', description: '' })],
    ['a non-numeric pr', JSON.stringify({ pr: '12; rm -rf /', sha: SHA_A, description: '' })],
    ['a missing sha', JSON.stringify({ pr: 12, description: '' })],
  ])('rejects %s', (_, json) => expect(parseTarget(json)).toBeUndefined());
});

describe('shouldReportResult', () => {
  it('reports when the checked commit is still the head', () =>
    expect(shouldReportResult(SHA_A, SHA_A)).toBe(true));
  it('discards a result for a superseded commit', () =>
    expect(shouldReportResult(SHA_A, SHA_B)).toBe(false));
});

describe('isTargetForRun', () => {
  const push = { sha: SHA_A, description: 'x' };
  const pull = { pr: 7, sha: SHA_A, description: 'x' };

  it('accepts a push target for the run commit without a pull request', () =>
    expect(isTargetForRun(push, 'push', SHA_A)).toBe(true));
  it('rejects a push target with a pull request number', () =>
    expect(isTargetForRun(pull, 'push', SHA_A)).toBe(false));
  it('rejects a push target for another commit', () =>
    expect(isTargetForRun(push, 'push', SHA_B)).toBe(false));
  it('accepts a pull request target for the run head commit', () =>
    expect(isTargetForRun(pull, 'pull_request', SHA_A)).toBe(true));
  it('rejects a pull request target without a pull request number', () =>
    expect(isTargetForRun(push, 'pull_request', SHA_A)).toBe(false));
  it('rejects a pull request target for another commit', () =>
    expect(isTargetForRun(pull, 'pull_request', SHA_B)).toBe(false));
  it('accepts a manual run target with a pull request number', () =>
    expect(isTargetForRun(pull, 'workflow_dispatch', SHA_B)).toBe(true));
  it('rejects a manual run target without a pull request number', () =>
    expect(isTargetForRun(push, 'workflow_dispatch', SHA_A)).toBe(false));
  it('rejects any other event', () => expect(isTargetForRun(pull, 'schedule', SHA_A)).toBe(false));
});

describe('buildStatus', () => {
  it('maps a successful run to success', () =>
    expect(buildStatus('success', 'dist is current', 'https://x')).toEqual({
      state: 'success',
      context: STATUS_CONTEXT,
      description: 'dist is current',
      target_url: 'https://x',
    }));

  it.each(['failure', 'timed_out', 'startup_failure', 'action_required'])(
    'maps %s to failure',
    (conclusion) => expect(buildStatus(conclusion, 'x', 'https://x').state).toBe('failure'),
  );

  it('replaces the placeholder on a failed run that never wrote a description', () =>
    expect(buildStatus('failure', PLACEHOLDER_DESCRIPTION, 'https://x').description).toBe(
      'Check failed unexpectedly; see the run log',
    ));

  it('truncates the description to 140 characters', () =>
    expect(buildStatus('failure', 'x'.repeat(200), 'https://x').description).toHaveLength(140));
});

describe('staleDistInstructions', () => {
  it('names the changed files and the commands to run', () => {
    const text = staleDistInstructions(['lib/platform-bible-react/dist/index.js']);
    expect(text).toContain('lib/platform-bible-react/dist/index.js');
    expect(text).toContain('npm run build:pbu');
    expect(text).toContain('npm run build:pbr');
  });
});
