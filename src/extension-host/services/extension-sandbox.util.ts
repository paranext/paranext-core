import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

/** Resolves a module name the way an extension's `require` call should. */
export type ExtensionRequire = (moduleName: string) => unknown;

/**
 * Substring present in the errors that the extension loader, the extension `require` resolver and
 * the lockdowns in this file throw when they refuse an extension. Other refusals (such as the
 * `XMLHttpRequest` and `WebSocket` stubs) do not include it.
 */
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
  // A fresh arrow, not `extensionRequire` itself, so extension code cannot read or reassign any
  // properties the caller's function carries
  const isolatedRequire = (moduleName: string): unknown => extensionRequire(moduleName);
  compiled.call(
    extensionModule.exports,
    extensionModule.exports,
    isolatedRequire,
    extensionModule,
    entryFilePath,
    path.dirname(entryFilePath),
  );
  return extensionModule.exports;
}

/**
 * `process` members that hand out Node modules, native code, the host's live handles (sockets,
 * servers, timers) or file contents without going through `require`
 */
const PROCESS_MODULE_ACCESS_MEMBERS = [
  'getBuiltinModule',
  'binding',
  '_linkedBinding',
  'dlopen',
  'loadEnvFile',
  '_getActiveHandles',
  '_getActiveRequests',
];

/**
 * Replaces the `process` members that load Node modules or native code outside `require`, read
 * files into the environment, or hand out the host's live handles with functions that throw, and
 * hides `process.mainModule` (a handle on Node's module loader). Safe to call more than once.
 *
 * This does not lock down the rest of `process`: members such as `kill`, `send`, `chdir`, `env`,
 * `report.writeReport` and the `net.Socket` constructor behind `process.stdout` and
 * `process.stderr` stay reachable.
 */
export function blockProcessModuleAccess(): void {
  PROCESS_MODULE_ACCESS_MEMBERS.forEach((memberName) => {
    Object.defineProperty(process, memberName, {
      value: () => {
        throw new Error(`process.${memberName} is ${NOT_ALLOWED_IN_EXTENSIONS}`);
      },
      writable: true,
      configurable: true,
    });
  });
  Object.defineProperty(process, 'mainModule', {
    value: undefined,
    writable: true,
    configurable: true,
  });
}

function refuseCodeGenerationFromStrings(): never {
  throw new Error(`Generating code from strings is ${NOT_ALLOWED_IN_EXTENSIONS}`);
}

/**
 * Removes `eval` and `Function` from the global object and locks the `constructor` of every
 * function kind's prototype (`Function`, `AsyncFunction`, `GeneratorFunction`,
 * `AsyncGeneratorFunction`) to a function that throws, so code cannot compile strings by calling
 * the `constructor` of any function it can write as a literal. Safe to call more than once.
 *
 * The prototypes are reached through `Object.getPrototypeOf` on function literals rather than
 * through `.constructor`, so a repeat call still finds them after the first call has replaced
 * `constructor`.
 */
export function blockCodeGenerationFromStrings(): void {
  Reflect.deleteProperty(globalThis, 'eval');
  Reflect.deleteProperty(globalThis, 'Function');

  const functionPrototypes: object[] = [
    Object.getPrototypeOf(() => {}),
    Object.getPrototypeOf(async () => {}),
    Object.getPrototypeOf(function* generator() {
      yield undefined;
    }),
    Object.getPrototypeOf(async function* asyncGenerator() {
      yield undefined;
    }),
  ];
  functionPrototypes.forEach((functionPrototype) => {
    // Already locked: redefining a non-configurable property throws
    if (Object.getOwnPropertyDescriptor(functionPrototype, 'constructor')?.configurable === false)
      return;
    Object.defineProperty(functionPrototype, 'constructor', {
      value: refuseCodeGenerationFromStrings,
      writable: false,
      configurable: false,
    });
  });
}
