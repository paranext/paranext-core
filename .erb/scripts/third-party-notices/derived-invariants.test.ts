import * as fs from 'fs';
import * as path from 'path';
import { describe, expect, it, vi } from 'vitest';
import { REQUIRED_BUNDLES } from './shipping-set';
import { assertCopiedPlatformLibraryIdsAllowed, assertSnapStagePackagesClassified } from './main';
import { RIDS, readDirectPackageReferences } from './nuget-set';
import { STATIC_TREES, WHOLESALE_COPIED_EXTENSIONS } from './static-assets';

const REPO = path.resolve(__dirname, '..', '..', '..');

/**
 * Invariants that are stated in one place and depended on in another, checked by DERIVING the
 * second from the first rather than restating it.
 *
 * A test that asserts a constant equals a copy of itself passes for exactly as long as someone
 * remembers to change both - which is the failure mode these invariants have, since none of them is
 * visible in the diff that breaks it.
 */

/** Every webpack config that could carry an `EmitShippedModulesPlugin`. */
const CONFIG_FILES = [
  ...fs
    .readdirSync(path.join(REPO, '.erb', 'configs'))
    .filter((name) => name.startsWith('webpack.config.') && name.endsWith('.ts'))
    .map((name) => path.join(REPO, '.erb', 'configs', name)),
  ...fs
    .readdirSync(path.join(REPO, 'extensions', 'webpack'))
    .filter((name) => name.startsWith('webpack.config.') && name.endsWith('.ts'))
    .map((name) => path.join(REPO, 'extensions', 'webpack', name)),
];

/**
 * Every webpack config `npm run build` actually runs, read from the BUILD SCRIPTS.
 *
 * This is the independent half of the invariant below, and it has to come from somewhere other than
 * the plugin registrations. Deriving the expected bundles by grepping for `new
 * EmitShippedModulesPlugin` would be a tautology in the one direction that matters: a sixth
 * production bundle added WITHOUT the plugin leaves both sides unchanged and passes - precisely the
 * mistake `REQUIRED_BUNDLES` exists to fail on. The build scripts know what ships; the configs'
 * plugin lists are what is being checked against them.
 *
 * `build` fans out through `concurrently` to `npm:build:*`; the webpack legs of that name their
 * config with `--config`, and `build:extensions` delegates to `extensions/webpack.config.ts`, whose
 * imports name the two extension configs.
 */
function builtWebpackConfigs(): string[] {
  const { scripts }: { scripts: Record<string, string> } = JSON.parse(
    fs.readFileSync(path.join(REPO, 'package.json'), 'utf8'),
  );
  const fannedOut = [...scripts.build.matchAll(/npm:(build:[\w-]+)/g)].map((match) => match[1]);
  const configs = fannedOut.flatMap((name) => {
    const flag = /--config\s+(\S+)/.exec(scripts[name] || '');
    return flag ? [path.resolve(REPO, flag[1])] : [];
  });

  // `build:extensions` runs bare `webpack`, which loads `extensions/webpack.config.ts` - an array
  // of the configs it imports, so the imports are the list.
  const extensionsEntry = path.join(REPO, 'extensions', 'webpack.config.ts');
  const extensionConfigs = [
    ...fs.readFileSync(extensionsEntry, 'utf8').matchAll(/from '(\.\/webpack\/[^']+)'/g),
  ].map((match) => path.resolve(path.dirname(extensionsEntry), `${match[1]}.ts`));

  return [...configs, ...extensionConfigs];
}

describe('REQUIRED_BUNDLES is derived from the build graph, not restated', () => {
  // `REQUIRED_BUNDLES` has to be checked against the build graph, not against a copy of itself:
  // adding a sixth production bundle without wiring the plugin AND without touching the array emits
  // no manifest, requires none, leaves every stamp agreeing and the floor unmoved, and exits 0 -
  // which is the exact mistake the list exists to fail on.
  const bundleNamesIn = (file: string) =>
    [
      ...fs
        .readFileSync(file, 'utf8')
        .matchAll(/new EmitShippedModulesPlugin\(\{\s*bundleName:\s*'([^']+)'/g),
    ].map((match) => match[1]);

  const built = builtWebpackConfigs();
  const declared = CONFIG_FILES.flatMap(bundleNamesIn).sort();

  it('runs a webpack config for every bundle, and every one of them emits a manifest', () => {
    // The direction the grep-only derivation could not see. Each config `npm run build` runs is a
    // bundle that SHIPS, so each has to write the manifest the notices generator unions - and a new
    // one that does not fails here rather than silently shortening a legal document.
    expect(built.length).toBeGreaterThan(0);
    const withoutPlugin = built.filter((file) => bundleNamesIn(file).length === 0);
    expect(withoutPlugin.map((file) => path.relative(REPO, file))).toEqual([]);
  });

  it('requires exactly the bundles the build graph produces', () => {
    expect(built.flatMap(bundleNamesIn).sort()).toEqual(REQUIRED_BUNDLES.slice().sort());
  });

  it('finds a bundleName for every config that instantiates the plugin', () => {
    // Guards the regex itself: if it stopped matching, every assertion below would compare two
    // empty sets and pass.
    expect(declared.length).toBeGreaterThan(0);
    const instantiations = CONFIG_FILES.flatMap((file) => [
      ...fs.readFileSync(file, 'utf8').matchAll(/new EmitShippedModulesPlugin\(/g),
    ]);
    expect(declared).toHaveLength(instantiations.length);
  });

  it('matches what the webpack configs actually emit', () => {
    expect(REQUIRED_BUNDLES.slice().sort()).toEqual(declared);
  });

  it('names each bundle exactly once', () => {
    // Two configs claiming one bundleName means the later compilation overwrites the earlier one's
    // manifest, and the union silently loses whatever the overwritten bundle reached.
    expect(new Set(declared).size).toBe(declared.length);
  });
});

describe('the extension-host config carries only its own plugin instance', () => {
  // This config merges the fully-constructed mainConfig, whose plugins array already holds an
  // instance bound to 'main'. Left in place it would also apply to this compiler, and
  // .notices/modules/main.json would be overwritten with the extension-host module graph - both
  // files present, non-empty, same buildId, cache cold, every guard green. What prevents it is an
  // `instanceof` filter inside a webpack-merge callback, which a merge-shape change (a different
  // key, plugins moved under `optimization`, a wrapped instance) can silently defeat.
  //
  // Both config modules run `checkNodeEnv('production')` and `deleteSourceMaps()` at import time,
  // and the second DELETES FILES - so importing one to inspect it has to neutralise them first.
  // They are mocked rather than the config being read as text, because the thing worth checking is
  // what the merge PRODUCES, which no amount of reading the source can establish.
  it('holds exactly one EmitShippedModulesPlugin, bound to extension-host', async () => {
    vi.resetModules();
    // Paths are resolved relative to THIS file, not to the config that imports them.
    vi.doMock('../check-node-env', () => ({ default: () => {} }));
    vi.doMock('../delete-source-maps', () => ({ default: () => {} }));

    const { EmitShippedModulesPlugin } = await import('../../configs/emit-shipped-modules-plugin');
    const { default: config } = await import('../../configs/webpack.config.extension-host.prod');

    const emitters = (config.plugins ?? []).filter(
      (plugin) => plugin instanceof EmitShippedModulesPlugin,
    );
    expect(emitters).toHaveLength(1);
    // Reading the private field the constructor stored: the bundleName is the whole point of the
    // instance, and there is no accessor for it.
    expect(emitters.map((plugin) => Reflect.get(plugin, 'options')?.bundleName)).toEqual([
      'extension-host',
    ]);

    vi.doUnmock('../check-node-env');
    vi.doUnmock('../delete-source-maps');
    vi.resetModules();
  });
});

describe('LICENSING.md agrees with what the packages declare', () => {
  // The document calls the runtime-linking boundary "load-bearing", and it is: getting a package's
  // side wrong makes the AGPL viral for third-party extension authors, or gives away a package that
  // was meant to stay AGPL. The table is prose, so nothing else would fail on a relicensing commit
  // that moved a package without moving its row.
  const licensing = fs.readFileSync(path.join(REPO, 'LICENSING.md'), 'utf8');

  const tabulated = [
    ...licensing.matchAll(/^\|\s*`([a-z0-9-]+)`\s*\|\s*(MIT|AGPL-3\.0-or-later)\s*\|/gm),
  ].map((match) => [match[1], match[2]]);

  it('tabulates every package under lib/', () => {
    const onDisk = fs
      .readdirSync(path.join(REPO, 'lib'))
      .filter((name) => fs.existsSync(path.join(REPO, 'lib', name, 'package.json')))
      .sort();
    expect(tabulated.map(([name]) => name).sort()).toEqual(onDisk);
  });

  it.each([
    ['browserslist-config-detect-electron'],
    ['eslint-plugin-paranext'],
    ['papi-dts'],
    ['platform-bible-react'],
    ['platform-bible-utils'],
  ])('%s declares the license the table records', (name) => {
    const row = tabulated.find(([tableName]) => tableName === name);
    expect(row).toBeDefined();
    const manifest = JSON.parse(
      fs.readFileSync(path.join(REPO, 'lib', name, 'package.json'), 'utf8'),
    );
    expect(manifest.license).toBe(row?.[1]);
  });

  it('supplies as a webpack external every package the table says is supplied as one', () => {
    // The MIT side of the rule rests on runtime linking, and for platform-bible-utils the mechanism
    // IS the externals list - the table says so in as many words. Dropping it from `externals` would
    // bundle it instead: the license answer is unchanged, but the table's stated reason would stop
    // describing what actually happens.
    const externals = fs.readFileSync(
      path.join(REPO, 'extensions', 'webpack', 'webpack.config.base.ts'),
      'utf8',
    );
    const suppliedByHost = [
      ...licensing.matchAll(
        /^\|\s*`([a-z0-9-]+)`[^|]*\|[^|]*\|[^|]*supplied by the host as a webpack external/gm,
      ),
    ].map((match) => match[1]);
    expect(suppliedByHost.length).toBeGreaterThan(0);
    suppliedByHost.forEach((name) => expect(externals).toContain(`'${name}'`));
  });
});

describe('the snap section is written from the policy, not from prose', () => {
  // The "Linux snap" section is generated from `snapStagePackages`, so every library the installer
  // stages is named in it by construction. Hand-written prose over the same list cannot be checked
  // against it: a staged library missing from a sentence is invisible in a diff, and so is the next
  // one added.
  const policy = JSON.parse(fs.readFileSync(path.join(__dirname, 'notices-policy.json'), 'utf8'));
  const staged = (() => {
    const text = fs.readFileSync(path.join(REPO, 'electron-builder.json5'), 'utf8');
    const block = /stagePackages:\s*\[(.*?)\]/s.exec(text);
    return [...(block?.[1] ?? '').matchAll(/'([^']+)'/g)].map((match) => match[1]);
  })();

  it('reads a non-empty staged set from electron-builder.json5', () => {
    // Otherwise every assertion below compares two empty sets and passes.
    expect(staged.length).toBeGreaterThan(0);
  });

  it('classifies every library the installer stages', () => {
    expect(() => assertSnapStagePackagesClassified(staged, policy.snapStagePackages)).not.toThrow();
  });

  it('refuses a staged library the policy does not classify', () => {
    expect(() =>
      assertSnapStagePackagesClassified([...staged, 'libnewthing1'], policy.snapStagePackages),
    ).toThrow(/libnewthing1/);
  });

  it('refuses a classification for a library no longer staged', () => {
    // A determination about something that is not shipped would be reproduced in the document as
    // though it were.
    expect(() =>
      assertSnapStagePackagesClassified(staged, {
        ...policy.snapStagePackages,
        libgone2: { classification: 'permissive' },
      }),
    ).toThrow(/libgone2/);
  });

  it('refuses an entry whose classification is not one of the three', () => {
    // The pinned `copyright` is kept: dropping it would trip the separate "no copyright file"
    // refusal first, and this case is about the classification value.
    const bent = {
      ...policy.snapStagePackages,
      [staged[0]]: { ...policy.snapStagePackages[staged[0]], classification: 'probably fine' },
    };
    expect(() => assertSnapStagePackagesClassified(staged, bent)).toThrow(/does not classify/);
  });
});

describe('the RID list matches the runtimes the build publishes for', () => {
  // `RIDS` decides how many `dotnet restore` passes the NuGet closure is unioned from. A publish
  // target added to the build scripts and not here produces a document narrower than what ships,
  // with no new restore, no warning and no count that reveals the loss.
  const published = (() => {
    const { scripts }: { scripts: Record<string, string> } = JSON.parse(
      fs.readFileSync(path.join(REPO, 'package.json'), 'utf8'),
    );
    return [
      ...new Set(
        Object.entries(scripts)
          .filter(([name]) => name.startsWith('build:data-release:'))
          .flatMap(([, command]) => [...command.matchAll(/-r\s+(\S+)/g)].map((match) => match[1])),
      ),
    ].sort();
  })();

  it('reads a non-empty published set from the build scripts', () => {
    // Otherwise the comparison below is two empty sets.
    expect(published.length).toBeGreaterThan(0);
  });

  it('publishes for exactly the runtimes the NuGet closure is collected for', () => {
    expect(published).toEqual(RIDS.slice().sort());
  });
});

describe('the packed static trees match what webpack copies', () => {
  // `STATIC_TREES` and `WHOLESALE_COPIED_EXTENSIONS` restate `webpack.util.ts`'s copy rules. A
  // fourth copied directory added there and not here ships a third-party attribution file that no
  // gate reads - the failure `static-assets.ts` exists to prevent, arrived at from the other side.
  const util = fs.readFileSync(path.join(REPO, 'extensions', 'webpack', 'webpack.util.ts'), 'utf8');

  /** The `from` of every `staticFiles` entry copied as a DIRECTORY rather than as a named file. */
  const copiedTrees = (() => {
    const block = /const staticFiles:[\s\S]*?\}\[\] = \[([\s\S]*?)\n\];/.exec(util);
    if (!block) throw new Error('could not find the staticFiles list in webpack.util.ts');
    return [...block[1].matchAll(/\{[^{}]*\}/g)]
      .map((match) => match[0])
      .filter((entry) => !entry.includes("toType: 'file'"))
      .flatMap((entry) => {
        const from = /from: '([^']+)'/.exec(entry);
        // A `from` carrying an extension or a `<placeholder>` names one file, not a tree.
        return from && !from[1].includes('.') && !from[1].includes('<') ? [from[1]] : [];
      })
      .sort();
  })();

  const notBundled = (() => {
    const declaration = /const extensionsNotBundled: string\[\] = \[([^\]]*)\]/.exec(util);
    if (!declaration) throw new Error('could not find extensionsNotBundled in webpack.util.ts');
    return [...declaration[1].matchAll(/'([^']+)'/g)].map((match) => match[1]).sort();
  })();

  it('reads a non-empty copy list from webpack.util.ts', () => {
    // Both regexes above are the kind that stops matching after an unrelated reformat, and two
    // empty sets compare equal.
    expect(copiedTrees.length).toBeGreaterThan(0);
    expect(notBundled.length).toBeGreaterThan(0);
  });

  it('scans exactly the trees copy-webpack-plugin copies wholesale', () => {
    expect(copiedTrees).toEqual(STATIC_TREES.slice().sort());
  });

  it('scans the whole source directory of exactly the extensions webpack does not bundle', () => {
    expect(notBundled).toEqual(WHOLESALE_COPIED_EXTENSIONS.slice().sort());
  });
});

describe('every copied platform library names terms the corpus can reproduce', () => {
  // The document reproduces the CANONICAL text of each identifier on the library's behalf, and the
  // corpus index holds exactly the identifiers a verdict can reach - which `allowed` drives and this
  // table does not. An identifier here and nowhere else would leave the section stating an
  // obligation and reproducing nothing.
  const policy = JSON.parse(fs.readFileSync(path.join(__dirname, 'notices-policy.json'), 'utf8'));

  it('reads a non-empty table from the shipped policy', () => {
    // Otherwise the case below asserts nothing.
    expect(Object.keys(policy.copiedPlatformLibraries)).not.toHaveLength(0);
  });

  it('accepts the shipped policy', () => {
    expect(() => assertCopiedPlatformLibraryIdsAllowed(policy)).not.toThrow();
  });

  it('refuses an identifier that is not on the allow list', () => {
    expect(() =>
      assertCopiedPlatformLibraryIdsAllowed({
        ...policy,
        copiedPlatformLibraries: {
          'libsomething (Linux)': {
            platforms: 'Linux',
            copiedBy: 'a csproj Content rule',
            spdx: ['NotAnAllowedIdentifier'],
            reason: 'x',
          },
        },
      }),
    ).toThrow(/NotAnAllowedIdentifier/);
  });
});

describe('the two Microsoft compatibility shims are referenced for no assets', () => {
  // LICENSING.md records the determination: neither package's assembly reaches the publish output,
  // so neither may contribute one - a reference that DID would put a package carrying the pre-MIT
  // "Excluded License" clause into the derived closure and therefore into THIRD-PARTY-NOTICES.md,
  // raising a question nobody has answered. The `System.Net.Http` reference exists precisely to say
  // "no assets": `SIL.Core` pulls it in transitively, and without the exclusion the restore assets
  // file resolves its netstandard1.6 assembly even though publish discards it.
  const SHIMS = ['System.Net.Http', 'System.Net.WebSockets'];

  it.each(SHIMS)('references %s for no runtime assets, if at all', (id) => {
    const matching = readDirectPackageReferences().filter(
      (reference) => reference.id.toLowerCase() === id.toLowerCase(),
    );
    matching.forEach((reference) => expect(reference.shipsRuntimeAssets).toBe(false));
  });
});
