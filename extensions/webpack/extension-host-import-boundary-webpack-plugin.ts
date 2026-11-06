// paranext-core only: this plugin has no counterpart in the extension template, and it reads the
// extension host's allowlist from `src/extension-host/`, which the template does not carry. Keep
// it and its registration in `webpack.config.main.ts` outside the regions shared with the template.

import webpack from 'webpack';
import { EXTENSION_INTERFACE_MODULE_SPECIFIERS } from '../../src/extension-host/data/extension-interface-modules.data';

const NAME = 'ExtensionHostImportBoundaryWebpackPlugin';

/** The modules the extension host's `require` shim supplies; it throws for every other module */
const ALLOWED_EXTERNAL_REQUESTS: ReadonlySet<string> = new Set(
  EXTENSION_INTERFACE_MODULE_SPECIFIERS,
);

/** Where the restriction is documented, named in every error so the reader can find the why */
const DOCUMENTATION =
  '.context/standards/Security-Guide.md ("Module Import Restrictions") and ' +
  'https://github.com/paranext/paranext/wiki/Module-import-restrictions';

type ExtensionHostImportBoundaryWebpackPluginOptions = {
  /**
   * The extension each entry builds, keyed by entry name, for error messages. An entry missing from
   * the map is named by its entry name instead.
   */
  extensionNameByEntry: ReadonlyMap<string, string>;
};

/** The module an external module `require`s at run time, for comparison and display */
function getExternalRequest(module: webpack.ExternalModule): string {
  const { request } = module;
  if (typeof request === 'string') return request;
  // `['lib', 'member']` emits `require('lib').member`, so the module required is the first entry
  if (Array.isArray(request)) return request[0];
  // A per-library-type request map. This bundle's externals are all plain strings, so this only
  // keeps the error readable if one is ever declared another way.
  return JSON.stringify(request);
}

/** Whether a module is a `.tsx` source file compiled as code, not loaded as a `?inline` string */
function isCompiledTsxFile(module: webpack.Module): boolean {
  return (
    module instanceof webpack.NormalModule &&
    module.type.startsWith('javascript/') &&
    module.resource.split('?')[0].endsWith('.tsx')
  );
}

/**
 * Fails the extensions' main-bundle compilation when an extension's entry point reaches code the
 * extension host cannot run: a module webpack leaves as a runtime `require` that the host does not
 * supply, or a `.tsx` file.
 *
 * Everything an extension's `main.ts` reaches runs in the extension host, which replaces
 * `Module.prototype.require` with a shim (`src/extension-host/services/extension.service.ts`) that
 * answers only `EXTENSION_INTERFACE_MODULE_SPECIFIERS` and throws for anything else. Webpack
 * bundles most dependencies, so most imports never reach the shim, but the modules in
 * `webpack.config.base.ts` → `externals` stay as `require` calls - and `react`,
 * `react/jsx-runtime`, `react-dom` and `@papi/frontend` are externals the shim does NOT supply in
 * the host. Value-importing a UI module (a `lucide-react` icon, a `platform-bible-react` component)
 * into a host-reachable file pulls one of them in, and the extension fails to activate at runtime.
 * This check turns that into a build error.
 *
 * A `.tsx` file is reported on its own because it emits no `require` to catch: swc compiles JSX
 * with the classic runtime, to `React.createElement` calls against a global `React` that exists in
 * a web view and not in the extension host.
 *
 * The allowlist is read from the same module the shim dispatches from, so the two cannot drift.
 *
 * Node built-ins need no handling of their own here. This bundle targets `web`, so webpack resolves
 * a bare built-in like `fs` as a package, finds none, and fails the build with "Module not found";
 * `node:fs` fails it with an unhandled-scheme error. The only built-in that reaches the bundle is
 * `crypto`, which is listed in `externals` and supplied by the shim, and any other built-in added
 * to `externals` would be reported here like any other module.
 *
 * Type-only imports are erased before webpack sees them, and web views are imported with `?inline`
 * as strings whose own imports are not part of this graph, so neither is reported.
 *
 * Checked in `finishModules`, before tree shaking, so development and production builds report the
 * same set: an import that production happens to drop is still a `require` in development, where
 * the extension would fail to activate.
 */
export default class ExtensionHostImportBoundaryWebpackPlugin {
  constructor(private readonly options: ExtensionHostImportBoundaryWebpackPluginOptions) {}

  apply(compiler: webpack.Compiler) {
    compiler.hooks.thisCompilation.tap(NAME, (compilation) => {
      compilation.hooks.finishModules.tap(NAME, () => {
        compilation.entries.forEach((entry, entryName) => {
          this.checkEntry(compilation, entryName, entry.dependencies);
        });
      });
    });
  }

  /**
   * Walks one entry's module graph breadth-first, so the import chain reported for each module the
   * host cannot run is a shortest one from that extension's own entry point.
   */
  private checkEntry(
    compilation: webpack.Compilation,
    entryName: string,
    entryDependencies: webpack.Dependency[],
  ) {
    const { moduleGraph, requestShortener } = compilation;
    const extensionName = this.options.extensionNameByEntry.get(entryName) ?? entryName;
    /** Each reached module, mapped to the module that first imported it (`undefined` for roots) */
    const importedBy = new Map<webpack.Module, webpack.Module | undefined>();
    const queue: webpack.Module[] = [];

    const enqueue = (module: webpack.Module | null | undefined, parent?: webpack.Module) => {
      if (!module || importedBy.has(module)) return;
      importedBy.set(module, parent);
      queue.push(module);
    };

    const report = (module: webpack.Module, reached: string, reason: string) => {
      const chain = [reached];
      let link = importedBy.get(module);
      while (link) {
        chain.unshift(link.readableIdentifier(requestShortener));
        link = importedBy.get(link);
      }
      const error = new webpack.WebpackError(
        [
          `Extension '${extensionName}' reaches ${reached} from its entry point, but ${reason}, ` +
            `so the extension would fail to activate.`,
          `  Import chain: ${chain.join(' -> ')}`,
          `  The extension host supplies only these modules: ${[...ALLOWED_EXTERNAL_REQUESTS].join(
            ', ',
          )}.`,
          `  Make the import type-only if only its types are needed, or move the code that needs ` +
            `it into a module the entry point does not reach, such as a web view. See ` +
            `${DOCUMENTATION}.`,
        ].join('\n'),
      );
      error.hideStack = true;
      compilation.errors.push(error);
    };

    entryDependencies.forEach((dependency) => enqueue(moduleGraph.getModule(dependency)));

    for (let index = 0; index < queue.length; index += 1) {
      const module = queue[index];
      if (module instanceof webpack.ExternalModule) {
        const request = getExternalRequest(module);
        if (!ALLOWED_EXTERNAL_REQUESTS.has(request))
          report(module, `'${request}'`, 'the extension host does not supply it');
      } else {
        if (isCompiledTsxFile(module))
          report(
            module,
            module.readableIdentifier(requestShortener),
            'its JSX compiles to `React.createElement` and the extension host has no React',
          );
        Array.from(moduleGraph.getOutgoingConnections(module)).forEach((connection) =>
          enqueue(connection.module, module),
        );
      }
    }
  }
}
