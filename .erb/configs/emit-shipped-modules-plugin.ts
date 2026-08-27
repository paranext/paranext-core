import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';

const NAME = 'EmitShippedModulesPlugin';

/**
 * The identity of the build this manifest belongs to, written by `prebuild`
 * (`.erb/scripts/notices-build-id.ts`) before any webpack starts.
 *
 * Five separate processes write the five manifests, and the notices generator unions them - so
 * without a shared stamp a set of MIXED VINTAGE is undetectable, and a stale manifest is a silent
 * under-report of what ships. `shipping-set.ts` refuses a set whose stamps disagree.
 *
 * A bundle rebuilt on its own, after the id file was written for an earlier build, still reads that
 * earlier id - which is correct only if nothing else changed, and is exactly why the remedy the
 * generator prints is a full `npm run build`. With no id file at all, each manifest gets its own
 * `unstamped-` value, which cannot match any other and so fails closed rather than passing as one
 * coherent set.
 */
function buildId(outputDir: string): string {
  try {
    return fs.readFileSync(path.join(outputDir, '..', 'build-id'), 'utf8').trim();
  } catch {
    return `unstamped-${crypto.randomUUID()}`;
  }
}

/**
 * Whether this compiler's persistent filesystem cache directory already held content before this
 * run started.
 *
 * `finishModules` fires for every module THIS compilation's graph walks - but a module webpack
 * restores from a warm filesystem cache does not re-run its loaders, and a loader that injects new
 * modules into the graph AS PART OF running never gets the chance to add them on a cache hit.
 * `css-loader` does exactly that: it emits `require()`s for its own runtime helpers (`api.js`,
 * `getUrl.js`, `sourceMaps.js`) as it processes a stylesheet. The size of the effect on this
 * repository: a warm `webpack-renderer` cache yields 8,563 modules with those three files absent,
 * against 8,568 for a cold build of the identical source (the other two are `data:image/svg+xml`
 * inline URIs - not packages, so they do not affect the shipping set either way). The emitted
 * BUNDLE still contains the runtime code regardless - only this plugin's manifest under-reports it
 *
 * - So this cannot be caught by diffing bundle output, only by knowing the cache's temperature at
 *   build time.
 *
 * Detected the crude-but-provable way: whether `cache.cacheDirectory` already held content when
 * this run started, checked in `beforeRun` before webpack has a chance to populate it for THIS run.
 * A directory that predates this run means SOME module in this compilation may be served from it
 * rather than rebuilt - which is precisely the condition that under-reports - so this errs toward
 * over-flagging (a warm cache whose relevant modules would have rebuilt identically anyway still
 * gets marked warm) rather than under-flagging, which is the safe direction for a legal artifact.
 * The alternative - inspecting webpack's stats for which modules were served from cache - is more
 * precise, but a check here has to be provable by making it fail and pass on purpose (see
 * `shipping-set.ts`'s refusal message and its test coverage), and directory presence is the
 * mechanism that is trivial to prove both ways.
 *
 * Only `renderer` (`.erb/configs/webpack.config.renderer.prod.ts`) and the two extension bundles
 * (`extensions/webpack/webpack.config.base.ts`, narrowed per bundle by `extensionCacheDirectory`)
 * configure a filesystem cache at all - `main` and `extension-host` set none, so
 * `compiler.options.cache` there is never `{ type: 'filesystem' }` and this is always `false` for
 * them; a single `npm run build` invocation is one process with no cross-process memory cache to be
 * warm from either.
 *
 * The directory each extension bundle watches is its OWN, per bundle and per mode. Sharing one made
 * this answer wrong twice over: `extension-main` declares `dependencies: ['webView']`, so it starts
 * only after `extension-web-view` has written its entries and read as warm on a genuinely cold
 * build; and a release job's production extension build inherited the development build's cache, so
 * its manifests could not be verified at all and the per-platform check had to run against the
 * development graph instead. `extensionCacheDirectory` documents both.
 */
export function isWarmFilesystemCache(cache: webpack.Configuration['cache']): boolean {
  if (!cache || typeof cache !== 'object' || cache.type !== 'filesystem') return false;
  // webpack's own default when a filesystem cache names no directory. Reporting COLD for that was
  // the one branch here that produced a permissive verdict from absent information: the default
  // directory is warm on any tree built twice, and a manifest written over it would then be trusted
  // for a legal artifact. Nothing in this repository configures a filesystem cache without naming a
  // directory, so this is a guard rather than a live path - but the safe answer to "which directory
  // is this cache in?" is webpack's answer, not "there isn't one".
  const dir = cache.cacheDirectory || path.join(process.cwd(), 'node_modules', '.cache', 'webpack');
  try {
    return fs.readdirSync(dir).length > 0;
  } catch (error: unknown) {
    // ENOENT is the one reading failure that IS an answer: the directory was never created, so
    // nothing can have been served from it and the build is cold.
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return false;
    // Anything else - EACCES after a `sudo` or a container build, EMFILE under the five webpacks
    // `npm run build` runs concurrently - is a directory that may well be full and simply could not
    // be read. Answering "cold" there is a permissive verdict drawn from absent information, which
    // is exactly what the comment above refuses for the missing-`cacheDirectory` case: the manifest
    // would be stamped trustworthy and a module list a cache hit had shortened would go into a
    // legal artifact. The safe answer to "is this cache warm?" when the cache cannot be read is to
    // stop, not to guess.
    throw new Error(
      `could not read the webpack cache directory ${dir} to decide whether this build was served ` +
        `from a warm cache (${error instanceof Error ? error.message : String(error)}). A warm ` +
        'cache can under-report the modules a bundle contains, so the answer cannot be assumed.',
    );
  }
}

/**
 * Writes the list of modules webpack actually compiled into a bundle.
 *
 * The notices generator needs to know which npm packages ship. Package manifests cannot answer that
 *
 * - Bundled dependencies live in `devDependencies` by convention, because webpack compiles them in at
 *   build time - and post-build SBOM scanners cannot either, because bundling erases package
 *   boundaries. The compiler already knows exactly, so it reports rather than being inferred.
 *
 * Hooks `finishModules` rather than iterating `compilation.modules` at emit time: by emit,
 * ModuleConcatenationPlugin has merged modules into ConcatenatedModule wrappers whose inner modules
 * are not directly enumerable. `finishModules` fires while every NormalModule is still its own
 * entry.
 *
 * Also stamps `cacheWarm` (see `isWarmFilesystemCache`) so `shipping-set.ts` can refuse a manifest
 * set that may have been silently under-reported by a warm persistent cache, the same way it
 * already refuses one whose `buildId`s disagree.
 */
export class EmitShippedModulesPlugin {
  constructor(private options: { bundleName: string; outputDir: string }) {}

  apply(compiler: webpack.Compiler) {
    const resources = new Set<string>();
    let cacheWarm = false;

    // Both hooks, and both reset the accumulated set: `beforeRun` fires for a one-shot `webpack`
    // run and `watchRun` for every rebuild in watch mode, which `npm start` and the extensions'
    // `npm run watch` use. Tapping only `beforeRun` left watch builds stamped `cacheWarm: false`
    // for exactly the builds guaranteed to be warm, and left `resources` accumulating across every
    // rebuild in the compiler's lifetime - so a module deleted from the source tree stayed in the
    // manifest until the watcher was restarted, over-reporting the shipping set or failing the
    // generator's unresolved-module check on a directory that is legitimately gone.
    const startRun = () => {
      resources.clear();
      cacheWarm = isWarmFilesystemCache(compiler.options.cache);
    };
    compiler.hooks.beforeRun.tap(NAME, startRun);
    compiler.hooks.watchRun.tap(NAME, startRun);

    compiler.hooks.compilation.tap(NAME, (compilation) => {
      compilation.hooks.finishModules.tap(NAME, (modules) => {
        // `Iterable<Module>`, not an array: webpack passes a Set at runtime, so `.forEach` happens
        // to work, but the declared type carries no such method. `Array.from` is what that type
        // supports, and keeps the array-iteration style this repo's `no-restricted-syntax` rule
        // requires.
        Array.from(modules).forEach((module) => {
          // A narrowing check rather than `module as webpack.NormalModule`: this repo bans type
          // assertions (`no-type-assertion/no-type-assertion`), and `resource` is genuinely absent
          // on some module kinds, so narrowing is also the more honest expression of the fact.
          // Loaders and virtual modules have no resource. Query strings distinguish `?inline` and
          // `?raw` variants of the same file, which are the same file for licensing purposes.
          const resource =
            'resource' in module && typeof module.resource === 'string'
              ? module.resource
              : undefined;
          if (resource) resources.add(resource.split('?')[0]);
        });
      });
    });

    compiler.hooks.done.tap(NAME, (stats) => {
      // `done` fires whether or not the compilation succeeded, and a failed compilation's module
      // graph is whatever the compiler had walked when it gave up. Writing that would stamp a
      // PARTIAL list with the current build id, which passes both of the generator's guards - the
      // stamps agree (one id) and the list is non-empty - and silently shortens the shipping set.
      // `concurrently --kill-others-on-fail` makes this reachable on any failed `npm run build`.
      // Leaving the previous manifest in place instead fails closed: it carries an earlier build
      // id, which the mixed-vintage check reports with the remedy that rebuilds everything.
      if (stats.hasErrors()) {
        console.log(
          `${NAME}: compilation failed, so no manifest was written for ${this.options.bundleName}`,
        );
        return;
      }
      const { bundleName, outputDir } = this.options;
      fs.mkdirSync(outputDir, { recursive: true });
      const out = path.join(outputDir, `${bundleName}.json`);
      const build = buildId(outputDir);
      // Staged and renamed, like the artifact and lock `main.ts` writes: five of these are written
      // concurrently and read by a separate process, and a reader that catches one mid-write gets a
      // bare `SyntaxError` naming no file rather than a manifest.
      const tmp = `${out}.tmp`;
      const contents = `${JSON.stringify(
        {
          bundle: bundleName,
          buildId: build,
          // The webpack MODE this graph came from. A release job builds the extensions twice from
          // one commit - development through `npm run build`, then production - and the second run
          // OVERWRITES the two extension manifests while the three core ones (always production)
          // stay put. The build id cannot see that substitution: `prebuild` fires only for the root
          // `build`, so the production run re-stamps the same id and the mixed-vintage check finds
          // one stamp on a genuinely mixed set. The mode is the fact that actually differs, so it
          // is the one recorded.
          mode: compiler.options.mode || 'none',
          cacheWarm,
          modules: [...resources].sort(),
        },
        undefined,
        2,
      )}\n`;
      // `watchRun` fires for every rebuild, and the five manifests together are the better part of a
      // megabyte of JSON - almost all of it the renderer's 8,500 module paths, which do not move
      // when a developer edits one component. Comparing first turns the ordinary `npm start` edit
      // loop into a read instead of a write. It is not a correctness shortcut: identical content
      // means an identical manifest, so a rebuild that changes what ships still writes.
      let existing;
      try {
        existing = fs.readFileSync(out, 'utf8');
      } catch {
        existing = undefined;
      }
      if (existing === contents) return;
      fs.writeFileSync(tmp, contents);
      fs.renameSync(tmp, out);
      console.log(
        `${NAME}: wrote ${resources.size} module paths to ${out} (build ${build}${cacheWarm ? ', warm cache' : ''})`,
      );
    });
  }
}
