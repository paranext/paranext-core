import {
  diffStagedAgainstLock,
  formatRescuedCommitsBanner,
  getExpectedMarker,
  isEnvFlagEnabled,
  normalizeRepoUrl,
  shapeStagedManifest,
  type RescuedCommit,
  type StagedManifest,
} from './stage-dev-packages.util';

const CLONE_URL = 'https://github.com/paranext/scripture-editors.git';

describe('normalizeRepoUrl', () => {
  it('treats every URL form git accepts for one repo as the same repo', () => {
    const expected = 'github.com/paranext/scripture-editors';
    [
      CLONE_URL,
      'https://github.com/paranext/scripture-editors',
      'https://github.com/paranext/scripture-editors/',
      'git@github.com:paranext/scripture-editors.git',
      'ssh://git@github.com/paranext/scripture-editors.git',
      'git+https://github.com/paranext/scripture-editors.git',
      '  https://GitHub.com/Paranext/Scripture-Editors.git  ',
    ].forEach((url) => expect(normalizeRepoUrl(url)).toBe(expected));
  });

  it('still distinguishes a different repo, owner, or host', () => {
    // The org move is exactly this comparison, so a false positive here silently builds another
    // organization's source.
    expect(normalizeRepoUrl(CLONE_URL)).not.toBe(
      normalizeRepoUrl('https://github.com/eten-tech-foundation/scripture-editors.git'),
    );
    expect(normalizeRepoUrl(CLONE_URL)).not.toBe(
      normalizeRepoUrl('https://github.com/paranext/paranext-core.git'),
    );
    expect(normalizeRepoUrl(CLONE_URL)).not.toBe(
      normalizeRepoUrl('https://gitlab.com/paranext/scripture-editors.git'),
    );
  });
});

describe('getExpectedMarker', () => {
  const sha = '106e1ec87b8639acd76cd024af32af448ca53505';

  it('records the source commit, source path, and staging format', () => {
    expect(getExpectedMarker(sha, 'packages/platform', false, 2)).toBe(
      `${sha} path=packages/platform format=2`,
    );
  });

  it('distinguishes a package repointed at a different path at the same commit', () => {
    // The destination folder and the commit are both unchanged in this case, so without the path
    // the staged copy would stay "current" and never be rebuilt from the new source.
    expect(getExpectedMarker(sha, 'packages/platform', false, 2)).not.toBe(
      getExpectedMarker(sha, 'packages/platform-editor', false, 2),
    );
  });

  it('never lets a --local build satisfy a regular run', () => {
    expect(getExpectedMarker(sha, 'packages/platform', true, 2)).not.toBe(
      getExpectedMarker(sha, 'packages/platform', false, 2),
    );
    expect(getExpectedMarker(sha, 'packages/platform', true, 2)).toContain('-local');
  });

  it('supersedes copies staged by an older staging format', () => {
    expect(getExpectedMarker(sha, 'packages/platform', false, 2)).not.toBe(
      getExpectedMarker(sha, 'packages/platform', false, 3),
    );
  });

  it('carries a dirty source stamp through, so it can never match a clean one', () => {
    expect(getExpectedMarker(`${sha}-dirty`, 'packages/platform', false, 2)).not.toBe(
      getExpectedMarker(sha, 'packages/platform', false, 2),
    );
  });
});

describe('shapeStagedManifest', () => {
  const stagingFolders = new Map([
    ['@eten-tech-foundation/scripture-utilities', 'scripture-utilities'],
  ]);

  it('drops what a consumer must not see and rewrites workspace: specifiers', () => {
    const manifest: StagedManifest = {
      exports: { '.': { development: './src/index.ts', import: './dist/index.js' } },
      devDependencies: { vite: '^7.0.0' },
      volta: { node: '22.22.0' },
      dependencies: {
        '@eten-tech-foundation/scripture-utilities': 'workspace:*',
        '@lexical/react': '^0.43.0',
      },
    };

    const shaped = shapeStagedManifest(manifest, stagingFolders, 'package.json');

    expect(shaped.devDependencies).toBeUndefined();
    expect(shaped.volta).toBeUndefined();
    // The rest of the export map has to survive — it is how the package resolves at all.
    expect(shaped.exports).toEqual({ '.': { import: './dist/index.js' } });
    expect(shaped.dependencies).toEqual({
      '@eten-tech-foundation/scripture-utilities': 'file:../scripture-utilities',
      '@lexical/react': '^0.43.0',
    });
  });

  it('drops a development condition wherever it sits in the export map', () => {
    // `src` is in both dev packages' `files`, so a surviving condition resolves the staged package
    // to untranspiled TypeScript. `exports` nests arbitrarily, so the shapes below cover the four
    // places npm lets a condition sit: under another condition, on a non-`.` subpath, in
    // conditions-only shorthand at the top level, and inside a fallback array.
    const manifest: StagedManifest = {
      exports: {
        '.': { import: { development: './src/index.ts', default: './dist/index.js' } },
        './helpers': { development: './src/helpers.ts', default: './dist/helpers.js' },
      },
    };

    const shaped = shapeStagedManifest(manifest, stagingFolders, 'package.json');

    expect(shaped.exports).toEqual({
      '.': { import: { default: './dist/index.js' } },
      './helpers': { default: './dist/helpers.js' },
    });

    expect(
      shapeStagedManifest(
        { exports: { development: './src/index.ts', default: './dist/index.js' } },
        stagingFolders,
        'package.json',
      ).exports,
    ).toEqual({ default: './dist/index.js' });

    expect(
      shapeStagedManifest(
        { exports: { '.': [{ development: './src/index.ts' }, './dist/index.js'] } },
        stagingFolders,
        'package.json',
      ).exports,
    ).toEqual({ '.': [{}, './dist/index.js'] });
  });

  it('rewrites workspace: specifiers in every section npm resolves', () => {
    // `optionalDependencies` matters even though nothing declares one today: npm resolves it like
    // `dependencies`, so one left behind fails the install with `Unsupported URL Type`.
    const shaped = shapeStagedManifest(
      {
        dependencies: { '@eten-tech-foundation/scripture-utilities': 'workspace:^' },
        peerDependencies: { '@eten-tech-foundation/scripture-utilities': 'workspace:*' },
        optionalDependencies: { '@eten-tech-foundation/scripture-utilities': 'workspace:~' },
      },
      stagingFolders,
      'package.json',
    );

    expect(shaped.dependencies?.['@eten-tech-foundation/scripture-utilities']).toBe(
      'file:../scripture-utilities',
    );
    expect(shaped.peerDependencies?.['@eten-tech-foundation/scripture-utilities']).toBe(
      'file:../scripture-utilities',
    );
    expect(shaped.optionalDependencies?.['@eten-tech-foundation/scripture-utilities']).toBe(
      'file:../scripture-utilities',
    );
  });

  it('throws naming the package when a workspace: dependency is not staged', () => {
    expect(() =>
      shapeStagedManifest(
        { dependencies: { '@eten-tech-foundation/scribe-editor': 'workspace:*' } },
        stagingFolders,
        '/tmp/staging/platform-editor/package.json',
      ),
    ).toThrow(/@eten-tech-foundation\/scribe-editor.*not staged/s);
  });

  it('leaves a manifest with nothing to rewrite alone', () => {
    const shaped = shapeStagedManifest(
      { dependencies: { '@lexical/react': '^0.43.0' } },
      stagingFolders,
      'package.json',
    );
    expect(shaped.dependencies).toEqual({ '@lexical/react': '^0.43.0' });
  });
});

describe('diffStagedAgainstLock', () => {
  it('reports nothing when the lockfile records what is staged', () => {
    const sections = { dependencies: { '@lexical/react': '^0.43.0' } };
    expect(diffStagedAgainstLock('platform-editor', sections, sections)).toEqual([]);
  });

  it('catches a range change that leaves the dependency name installed', () => {
    // The failure this exists for: npm resolves the ideal tree before `preinstall` restages, so the
    // already-installed 0.43 satisfies the name and the lockfile keeps the old range.
    const problems = diffStagedAgainstLock(
      'platform-editor',
      { dependencies: { '@lexical/react': '^0.44.0' } },
      { dependencies: { '@lexical/react': '^0.43.0' } },
    );
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('@lexical/react');
    expect(problems[0]).toContain('"^0.44.0"');
    expect(problems[0]).toContain('"^0.43.0"');
  });

  it('catches an added and a removed dependency', () => {
    expect(
      diffStagedAgainstLock('platform-editor', { dependencies: { yjs: '^13.0.0' } }, {}),
    ).toEqual([expect.stringContaining('nothing')]);
    expect(
      diffStagedAgainstLock('platform-editor', {}, { dependencies: { yjs: '^13.0.0' } }),
    ).toEqual([expect.stringContaining('nothing')]);
  });

  it('catches a peer becoming required via peerDependenciesMeta', () => {
    // Structural comparison matters here: these entries are objects, and deleting one turns an
    // optional peer into a required one that npm pulls into the closure.
    const problems = diffStagedAgainstLock(
      'platform-editor',
      { peerDependenciesMeta: {} },
      { peerDependenciesMeta: { yjs: { optional: true } } },
    );
    expect(problems).toHaveLength(1);
    expect(problems[0]).toContain('peerDependenciesMeta.yjs');
  });

  it('reports a missing lockfile entry rather than comparing against nothing', () => {
    expect(diffStagedAgainstLock('platform-editor', { dependencies: {} }, undefined)).toEqual([
      'package-lock.json has no entry for dev-packages/staging/platform-editor',
    ]);
  });

  it('ignores sections npm does not record for a file: package', () => {
    // `devDependencies` is dropped by staging, so it must never be compared.
    expect(
      diffStagedAgainstLock(
        'platform-editor',
        // @ts-expect-error ts(2353) - deliberately passing a section outside the compared set
        { devDependencies: { vite: '^7.0.0' } },
        {},
      ),
    ).toEqual([]);
  });
});

describe('isEnvFlagEnabled', () => {
  it.each(['1', 'true', 'yes', 'TRUE', 'on'])('treats %j as on', (value) => {
    expect(isEnvFlagEnabled(value)).toBe(true);
  });

  it.each([undefined, '', '0', 'false', 'no', 'FALSE', ' 0 '])('treats %j as off', (value) => {
    // `!!process.env.X` reads all but the first two of these as on, so the natural way to turn one
    // of these flags back off would instead turn it on.
    expect(isEnvFlagEnabled(value)).toBe(false);
  });
});

describe('formatRescuedCommitsBanner', () => {
  const rescue: RescuedCommit = {
    repoFolder: 'scripture-editors',
    repoPath: '/repos/paranext-core/dev-packages/scripture-editors',
    revision: 'platform-yalc',
    commitCount: 2,
    rescueRef: 'refs/stage-rescue/platform-yalc/abc123def',
  };

  it('says nothing when nothing was moved aside', () => {
    // Printed unconditionally at the end of every install, so an empty banner has to be empty
    // rather than a set of rules around no content.
    expect(formatRescuedCommitsBanner([])).toBe('');
  });

  it('names the ref, and a command that recovers the commits from it', () => {
    // The whole value of parking a commit is that the ref can be found again. A banner that
    // announces a rescue without naming the ref leaves the reflog as the only way back, which is
    // the situation this exists to end.
    const banner = formatRescuedCommitsBanner([rescue]);
    expect(banner).toContain(rescue.rescueRef);
    expect(banner).toContain(`git -C "${rescue.repoPath}" branch <your-branch-name>`);
    expect(banner).toContain(`git -C "${rescue.repoPath}" log`);
  });

  it('says how to stop the reminder, since nothing deletes the ref', () => {
    expect(formatRescuedCommitsBanner([rescue])).toContain('update-ref -d');
  });

  it('reports each checkout separately when more than one was reset', () => {
    const other: RescuedCommit = {
      ...rescue,
      repoFolder: 'another-dev-repo',
      repoPath: '/repos/paranext-core/dev-packages/another-dev-repo',
      rescueRef: 'refs/stage-rescue/platform-yalc/9998887',
    };
    const banner = formatRescuedCommitsBanner([rescue, other]);
    expect(banner).toContain('scripture-editors: 2 commit(s)');
    expect(banner).toContain('another-dev-repo: 2 commit(s)');
    expect(banner).toContain(other.rescueRef);
  });
});
