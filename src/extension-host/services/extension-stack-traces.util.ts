import { findSourceMap, SourceMap } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

/**
 * Inline source map at the end of a file: `//# sourceMappingURL=data:application/json;base64,...`
 * followed only by whitespace
 */
const INLINE_SOURCE_MAP =
  /\/\/[#@] ?sourceMappingURL=data:application\/json(?:;charset=[^;,]+)?;base64,([A-Za-z0-9+/=]+)\s*$/;

/**
 * Source maps of the extension files `loadExtensionModule` has loaded, keyed by path. Each entry
 * holds the map's base64 text until a stack frame first needs it, then the parsed map (or
 * `undefined` if the text did not parse). Replaced every time the file is loaded, so a rebuilt
 * extension is mapped through its new map.
 */
const extensionSourceMaps = new Map<
  string,
  { encodedMap: string } | { sourceMap: SourceMap | undefined }
>();

/** A V8 call site, as `Error.prepareStackTrace` receives it */
type CallSite = Parameters<NonNullable<typeof Error.prepareStackTrace>>[1][number];

let isInstalled = false;

/**
 * Records the inline source map of an extension file just loaded, replacing any map recorded for
 * that path. Does nothing unless {@link installSourceMappedStackTraces} has run.
 *
 * @param filePath Path the file was compiled with, which stack frames report
 * @param source The file's contents
 */
export function rememberExtensionSourceMap(filePath: string, source: string): void {
  if (!isInstalled) return;
  // Only the end of the file can hold the map comment; searching from the last mention keeps this
  // fast on large bundles
  const tail = source.slice(source.lastIndexOf('sourceMappingURL='));
  const match = INLINE_SOURCE_MAP.exec(`//# ${tail}`);
  if (match) extensionSourceMaps.set(filePath, { encodedMap: match[1] });
  else extensionSourceMaps.delete(filePath);
}

function getExtensionSourceMap(filePath: string): SourceMap | undefined {
  const entry = extensionSourceMaps.get(filePath);
  if (!entry) return undefined;
  if ('sourceMap' in entry) return entry.sourceMap;
  let sourceMap: SourceMap | undefined;
  try {
    sourceMap = new SourceMap(JSON.parse(Buffer.from(entry.encodedMap, 'base64').toString('utf8')));
  } catch {
    sourceMap = undefined;
  }
  extensionSourceMaps.set(filePath, { sourceMap });
  return sourceMap;
}

/** Node's recorded source map for a file it loaded itself, looked up by path or `file:` URL */
function getNodeSourceMap(fileName: string): SourceMap | undefined {
  const sourceMap = findSourceMap(fileName);
  if (sourceMap) return sourceMap;
  if (fileName.startsWith('file:')) return findSourceMap(fileURLToPath(fileName));
  if (path.isAbsolute(fileName)) return findSourceMap(pathToFileURL(fileName).href);
  return undefined;
}

/**
 * Turns a source map's `sources` entry into what a stack frame shows: a path for a `file:` URL, a
 * path relative to the generated file resolved against its folder, and other URLs as they are
 */
function describeOriginalSource(originalSource: string, generatedFile: string): string {
  if (originalSource.startsWith('file:')) return fileURLToPath(originalSource);
  if (/^[a-z][a-z0-9+.-]*:/i.test(originalSource) || path.isAbsolute(originalSource))
    return originalSource;
  const generatedPath = generatedFile.startsWith('file:')
    ? fileURLToPath(generatedFile)
    : generatedFile;
  return path.resolve(path.dirname(generatedPath), originalSource);
}

/** The original location of a call site, or `undefined` if no source map covers it */
function mapLocation(callSite: CallSite): string | undefined {
  const fileName = callSite.getFileName();
  const lineNumber = callSite.getLineNumber();
  const columnNumber = callSite.getColumnNumber();
  if (!fileName || typeof lineNumber !== 'number' || typeof columnNumber !== 'number')
    return undefined;

  const sourceMap = getExtensionSourceMap(fileName) ?? getNodeSourceMap(fileName);
  if (!sourceMap) return undefined;
  const origin = sourceMap.findOrigin(lineNumber, columnNumber);
  if (!('fileName' in origin)) return undefined;
  return `${describeOriginalSource(origin.fileName, fileName)}:${origin.lineNumber}:${origin.columnNumber}`;
}

/**
 * Describes a call site the way V8 does, with `location` in place of its generated location
 *
 * @param callSite The frame to describe
 * @param location The frame's original location
 */
function describeCallSite(callSite: CallSite, location: string): string {
  const prefix = callSite.isAsync() ? 'async ' : '';
  if (callSite.isPromiseAll()) return `${prefix}Promise.all (index ${callSite.getPromiseIndex()})`;

  const functionName = callSite.getFunctionName();
  const isConstructor = callSite.isConstructor();
  const isMethodCall = !(callSite.isToplevel() || isConstructor);
  let name: string | undefined;
  if (isMethodCall) {
    const typeName = callSite.getTypeName();
    const methodName = callSite.getMethodName();
    if (functionName) {
      name =
        typeName && !functionName.startsWith(typeName)
          ? `${typeName}.${functionName}`
          : functionName;
      if (methodName && functionName !== methodName && !functionName.endsWith(`.${methodName}`))
        name += ` [as ${methodName}]`;
    } else name = `${typeName}.${methodName ?? '<anonymous>'}`;
  } else if (isConstructor) name = `new ${functionName ?? '<anonymous>'}`;
  else if (functionName) name = functionName;

  return name ? `${prefix}${name} (${location})` : `${prefix}${location}`;
}

function prepareSourceMappedStackTrace(error: Error, callSites: CallSite[]): string {
  let header: string;
  try {
    header = Error.prototype.toString.call(error);
  } catch {
    header = 'Error';
  }
  const frames = callSites.map((callSite) => {
    try {
      const location = mapLocation(callSite);
      return location ? describeCallSite(callSite, location) : String(callSite);
    } catch {
      return String(callSite);
    }
  });
  return [header, ...frames.map((frame) => `    at ${frame}`)].join('\n');
}

/**
 * Maps stack frames back to their original source in the dev extension host.
 *
 * Extension entry files are compiled by `loadExtensionModule` through `vm.compileFunction`, which
 * Node's own source-map support does not cover, so their frames would otherwise point at the built
 * bundle. The loader records each file's inline source map when it loads the file, so a rebuilt
 * extension is mapped through its new map. Setting `Error.prepareStackTrace` replaces Node's own
 * source mapping for every frame, so frames from files Node loaded itself (host files tsx
 * transpiled) are mapped through the source maps Node recorded for them. Frames no map covers are
 * described exactly as V8 describes them.
 */
export function installSourceMappedStackTraces(): void {
  isInstalled = true;
  Error.prepareStackTrace = prepareSourceMappedStackTrace;
}
