/**
 * Loads every built module of both libraries in Node, so a bundling mistake that only shows up at
 * import time (a missing chunk, a bad export, a DOM access at load) fails CI. Runs under bare
 * `node` with type stripping.
 */

const path = require('path');
const { pathToFileURL } = require('url');
const { JSDOM, VirtualConsole } = require('jsdom');
// Explicit `.ts`: bare `node` does not resolve extensionless TypeScript files.
const { LIBRARY_DIRS } = require('./library-dist.util.ts');
const { listDistModules } = require('./list-dist-modules.util.ts');

const REPO_ROOT: string = path.resolve(__dirname, '..', '..', '..');

// The React library's injected styles and components touch the DOM when they are imported. An empty
// virtual console keeps jsdom's CSS parser (which rejects modern Tailwind syntax) from printing
// stack traces for stylesheets this check does not render.
const { window } = new JSDOM('<!doctype html><html><body></body></html>', {
  url: 'http://localhost/',
  virtualConsole: new VirtualConsole(),
});
const domGlobals: Record<string, unknown> = {
  window,
  document: window.document,
  navigator: window.navigator,
  HTMLElement: window.HTMLElement,
  getComputedStyle: window.getComputedStyle.bind(window),
};
Object.entries(domGlobals).forEach(([name, value]) => {
  // `navigator` is a getter on Node's globalThis, so plain assignment would not replace it.
  Object.defineProperty(globalThis, name, { value, configurable: true, writable: true });
});

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

async function loadLibrary(libraryDir: string): Promise<string[]> {
  const { commonJs, esModules } = listDistModules(path.join(REPO_ROOT, libraryDir, 'dist'));
  console.log(
    `${libraryDir}: loading ${commonJs.length} CommonJS and ${esModules.length} ES modules`,
  );
  const commonJsFailures: string[] = commonJs.flatMap((file: string) => {
    try {
      require(file);
      return [];
    } catch (error) {
      return [`${file}: ${errorMessage(error)}`];
    }
  });
  const noFailures: string[] = [];
  // Sequential on purpose: modules share globals and import each other.
  const esFailures = await esModules.reduce(async (previous: Promise<string[]>, file: string) => {
    const failures = await previous;
    try {
      await import(pathToFileURL(file).href);
      return failures;
    } catch (error) {
      return [...failures, `${file}: ${errorMessage(error)}`];
    }
  }, Promise.resolve(noFailures));
  return [...commonJsFailures, ...esFailures];
}

async function main(): Promise<void> {
  const failures: string[] = (await Promise.all(LIBRARY_DIRS.map(loadLibrary))).flat();
  if (failures.length > 0) {
    console.error(`${failures.length} module(s) failed to load:\n${failures.join('\n')}`);
    process.exit(1);
  }
  console.log('All library dist modules loaded.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
