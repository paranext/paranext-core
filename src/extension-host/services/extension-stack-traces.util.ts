import { findSourceMap } from 'node:module';
import { fileURLToPath } from 'node:url';
import sourceMapSupport from 'source-map-support';

/**
 * Looks up the source map Node recorded for a file it loaded itself (host files tsx transpiled in
 * dev), with `file:` URL sources turned into paths so `source-map-support` resolves them as given
 */
function retrieveSourceMapFromNodeCache(source: string): sourceMapSupport.UrlAndMap | null {
  const sourceMap = findSourceMap(source);
  // `source-map-support` types this handler's "no map" result as `null`
  // eslint-disable-next-line no-null/no-null
  if (!sourceMap) return null;
  const { payload } = sourceMap;
  return {
    url: source,
    map: {
      ...payload,
      version: String(payload.version),
      sources: payload.sources.map((sourcePath) =>
        sourcePath.startsWith('file:') ? fileURLToPath(sourcePath) : sourcePath,
      ),
    },
  };
}

/**
 * Maps stack frames from extension files back to their original source.
 *
 * Extension entry files are compiled by `loadExtensionModule` through `vm.compileFunction`, which
 * Node's own source-map support does not cover, so their frames would otherwise point at the built
 * bundle. `source-map-support` reads each extension's inline source map from its file instead.
 * Installing it replaces Node's stack-trace source mapping for every frame, so frames from files
 * Node loaded itself are mapped through the source maps Node already recorded for them.
 */
export function installSourceMappedStackTraces(): void {
  sourceMapSupport.install({
    environment: 'node',
    handleUncaughtExceptions: false,
    retrieveSourceMap: retrieveSourceMapFromNodeCache,
  });
}
