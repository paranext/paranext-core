import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

/** Resolves a module name the way an extension's `require` call should. */
export type ExtensionRequire = (moduleName: string) => unknown;

/** Substring present in every error that refuses an extension access to a module or loader. */
export const NOT_ALLOWED_IN_EXTENSIONS = 'not allowed in extensions';

/**
 * Loads an extension entry file with its own `module`, `exports` and `require`.
 *
 * The file is compiled through `vm.compileFunction` without an `importModuleDynamically` callback,
 * so `import()` in extension code rejects. The `module` object is a plain object and `require` is a
 * bare function wrapping `extensionRequire`, so extension code has no handle on Node's module
 * loader (`require.cache`, `require.main`, `require.resolve`, `module.constructor`).
 *
 * @param entryFilePath Absolute path of the extension file to run
 * @param extensionRequire Resolver for every `require` call the file makes
 * @returns The file's `module.exports`
 */
export function loadExtensionModule(
  entryFilePath: string,
  extensionRequire: ExtensionRequire,
): unknown {
  const source = fs.readFileSync(entryFilePath, 'utf8');
  const compiled = vm.compileFunction(
    source,
    ['exports', 'require', 'module', '__filename', '__dirname'],
    { filename: entryFilePath },
  );

  const extensionModule: { exports: unknown } = { exports: {} };
  const requireForExtension = (moduleName: string): unknown => extensionRequire(moduleName);
  compiled.call(
    extensionModule.exports,
    extensionModule.exports,
    requireForExtension,
    extensionModule,
    entryFilePath,
    path.dirname(entryFilePath),
  );
  return extensionModule.exports;
}
