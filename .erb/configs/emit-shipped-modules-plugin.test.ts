// @vitest-environment node

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import webpack from 'webpack';
import { EmitShippedModulesPlugin, isWarmFilesystemCache } from './emit-shipped-modules-plugin';

let dir: string;

beforeEach(() => {
  // Resolved: on macOS the temp folder is under the `/var` -> `/private/var` symlink, and webpack
  // records real paths.
  dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'warm-cache-')));
});
afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

describe('isWarmFilesystemCache', () => {
  // What this predicate protects: making it always return `false`, or removing the
  // `warmBundles.length` refusal in `shipping-set.ts`, is what `shipping-set.test.ts`'s "a manifest
  // built against a warm filesystem cache is refused" suite catches. Keep the two in step.

  it('is cold when the configured cache directory does not exist yet', () => {
    const neverBuilt = path.join(dir, 'never-built');
    expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: neverBuilt })).toBe(false);
  });

  it('is cold when the cache directory exists but is empty', () => {
    expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: dir })).toBe(false);
  });

  it('is warm when the cache directory holds content from a prior run', () => {
    fs.writeFileSync(path.join(dir, '0.pack'), '');
    expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: dir })).toBe(true);
  });

  it('is cold for a memory cache, regardless of any directory on disk', () => {
    fs.writeFileSync(path.join(dir, '0.pack'), '');
    expect(isWarmFilesystemCache({ type: 'memory' })).toBe(false);
  });

  it('is cold when caching is disabled', () => {
    expect(isWarmFilesystemCache(false)).toBe(false);
  });

  // The one branch that could answer permissively from absent information. "Which directory is
  // this cache in?" has an answer when the config names none - webpack's default - and that
  // directory is warm on any tree built twice, so reporting COLD here would let a manifest written
  // over a warm cache be trusted for a legal artifact.
  it('falls back to webpack’s default directory when a filesystem cache names none', () => {
    const cwd = process.cwd();
    const defaultDir = path.join(dir, 'node_modules', '.cache', 'webpack');
    fs.mkdirSync(defaultDir, { recursive: true });
    process.chdir(dir);
    try {
      expect(isWarmFilesystemCache({ type: 'filesystem' })).toBe(false);
      fs.writeFileSync(path.join(defaultDir, '0.pack'), '');
      expect(isWarmFilesystemCache({ type: 'filesystem' })).toBe(true);
    } finally {
      process.chdir(cwd);
    }
  });

  // `cacheLocation` is where webpack stores the cache. A configuration that names its own reads as
  // warm or cold by that folder, not by `cacheDirectory`, which webpack then never writes to.
  it('inspects cacheLocation rather than cacheDirectory when both are set', () => {
    const location = path.join(dir, 'location');
    const directory = path.join(dir, 'directory');
    fs.mkdirSync(location);
    fs.mkdirSync(directory);
    fs.writeFileSync(path.join(location, '0.pack'), '');
    expect(
      isWarmFilesystemCache({
        type: 'filesystem',
        cacheDirectory: directory,
        cacheLocation: location,
      }),
    ).toBe(true);

    fs.rmSync(path.join(location, '0.pack'));
    fs.writeFileSync(path.join(directory, '0.pack'), '');
    expect(
      isWarmFilesystemCache({
        type: 'filesystem',
        cacheDirectory: directory,
        cacheLocation: location,
      }),
    ).toBe(false);
  });

  // This repository's configurations name only `cacheDirectory`. webpack fills `cacheLocation` in as
  // `<cacheDirectory>/<name>-<mode>` before `beforeRun`, so that sub-folder is what is inspected.
  it("reads the <name>-<mode> folder webpack derives from a configuration's cacheDirectory", () => {
    const compiler = webpack({
      name: 'webView',
      mode: 'production',
      context: dir,
      entry: './index.js',
      cache: { type: 'filesystem', cacheDirectory: dir },
    });
    const { cache } = compiler.options;
    if (!cache || typeof cache !== 'object' || cache.type !== 'filesystem')
      throw new Error('expected a filesystem cache');
    expect(cache.cacheLocation).toBe(path.join(dir, 'webView-production'));

    fs.writeFileSync(path.join(dir, 'unrelated'), '');
    expect(isWarmFilesystemCache(cache)).toBe(false);
    fs.mkdirSync(path.join(dir, 'webView-production'));
    fs.writeFileSync(path.join(dir, 'webView-production', '0.pack'), '');
    expect(isWarmFilesystemCache(cache)).toBe(true);
  });
});

describe('EmitShippedModulesPlugin', () => {
  let outputDir: string;
  let manifest: string;

  beforeEach(() => {
    outputDir = path.join(dir, '.notices', 'modules');
    manifest = path.join(outputDir, 'bundle.json');
    fs.mkdirSync(path.join(dir, 'src'));
  });

  /** Runs a production build of `src/index.js` with the plugin, resolving to its stats. */
  function build(source: string): Promise<webpack.Stats | undefined> {
    fs.writeFileSync(path.join(dir, 'src', 'index.js'), source);
    const compiler = webpack({
      mode: 'production',
      context: dir,
      entry: './src/index.js',
      output: { path: path.join(dir, 'dist') },
      cache: false,
      optimization: { minimize: false },
      plugins: [new EmitShippedModulesPlugin({ bundleName: 'bundle', outputDir })],
    });
    return new Promise((resolve, reject) => {
      compiler.run((error, stats) => {
        compiler.close(() => {
          if (error) reject(error);
          else resolve(stats);
        });
      });
    });
  }

  it('writes the modules a successful build compiled', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      await build('module.exports = 1;\n');
    } finally {
      log.mockRestore();
    }

    const { bundle, mode, modules } = JSON.parse(fs.readFileSync(manifest, 'utf8'));
    expect({ bundle, mode }).toEqual({ bundle: 'bundle', mode: 'production' });
    expect(modules).toEqual([path.join(dir, 'src', 'index.js')]);
  });

  // An earlier manifest from the same watch session carries the current build id, so keeping it
  // would let the generator accept it beside its sibling's new one.
  it("removes the bundle's earlier manifest when the compilation fails", async () => {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(manifest, '{"modules":["from an earlier build"]}');
    const log = vi.spyOn(console, 'log').mockImplementation(() => {});
    try {
      const stats = await build("require('./missing');\n");
      expect(stats && stats.hasErrors()).toBe(true);
      expect(log).toHaveBeenCalledWith(expect.stringMatching(/compilation failed, so .* removed/));
    } finally {
      log.mockRestore();
    }

    expect(fs.existsSync(manifest)).toBe(false);
  });

  // A build that produces no notices must not fail over a manifest it cannot write; removing the
  // earlier manifest leaves the generator refusing a missing bundle instead.
  it('warns, does not fail the build, and removes the earlier manifest when the write fails', async () => {
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(manifest, '{"modules":["from an earlier build"]}');
    // A folder where the staged file goes, so writing it fails.
    fs.mkdirSync(`${manifest}.tmp`);
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const stats = await build('module.exports = 1;\n');
      expect(stats && stats.hasErrors()).toBe(false);
      expect(warn).toHaveBeenCalledWith(
        expect.stringMatching(/could not write .*bundle\.json[\s\S]*will refuse this build/),
      );
    } finally {
      warn.mockRestore();
    }

    expect(fs.existsSync(manifest)).toBe(false);
  });
});

describe('isWarmFilesystemCache when the directory cannot be read', () => {
  it('answers cold for a directory that does not exist', () => {
    // ENOENT is the one read failure that IS an answer: nothing was ever cached here.
    const missing = path.join(dir, 'never-built');
    expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: missing })).toBe(false);
  });

  it('answers warm when the read fails for any other reason', () => {
    // A directory that may well be full and simply could not be read - EACCES after a container
    // build, EMFILE under the five webpacks `npm run build` runs at once. Answering "cold" there
    // stamps the manifest trustworthy on the strength of information nobody has, and a module list
    // a cache hit has shortened then goes into a legal artifact. "Warm" refuses to certify the
    // manifest instead - `shipping-set.ts` rejects a warm-stamped set - without failing a build
    // that generates no notices. Reproduced here as ENOTDIR, which is the same class: a path that
    // exists and is not a readable directory.
    const notADirectory = path.join(dir, 'cache-is-a-file');
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      fs.writeFileSync(notADirectory, 'not a directory');
      expect(isWarmFilesystemCache({ type: 'filesystem', cacheDirectory: notADirectory })).toBe(
        true,
      );
      expect(warn).toHaveBeenCalledWith(
        expect.stringMatching(/could not read the webpack cache directory/),
      );
    } finally {
      warn.mockRestore();
    }
  });
});
