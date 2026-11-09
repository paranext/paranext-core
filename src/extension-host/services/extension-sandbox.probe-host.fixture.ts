/**
 * Child-process host for `extension-sandbox.probes.test.ts`. Loads the evil extension and prints
 * its sandbox probe results as JSON on the last stdout line.
 *
 * Usage: `node --import tsx extension-sandbox.probe-host.fixture.ts <protected | unprotected>`
 *
 * - `protected` applies the extension host's lockdowns and loads evil through `loadExtensionModule`.
 * - `unprotected` loads evil with Node's own `require`, only filtering `require` calls by name: the
 *   sandbox extensions had before `loadExtensionModule`. It shows the probes can report an escape.
 */
import Module, { createRequire } from 'node:module';
import path from 'node:path';
import {
  blockCodeGenerationFromStrings,
  blockProcessModuleAccess,
  loadExtensionModule,
} from './extension-sandbox.util';

const EVIL_PATH = path.resolve(__dirname, '../../../extensions/src/evil/evil.js');
const REFUSED_REQUIRE_MESSAGE = 'Requiring other than papi is not allowed in extensions!';

const papiStub = {
  logger: {
    info: () => {},
    warn: () => {},
    error: () => {},
  },
};

const stubRequire = (moduleName: string): unknown => {
  if (moduleName === '@papi/backend') return papiStub;
  throw new Error(REFUSED_REQUIRE_MESSAGE);
};

function loadProtected(): unknown {
  // Twice each: the host re-applies the lockdowns every time it activates extensions
  blockProcessModuleAccess();
  blockCodeGenerationFromStrings();
  blockProcessModuleAccess();
  blockCodeGenerationFromStrings();
  return loadExtensionModule(EVIL_PATH, stubRequire);
}

function loadUnprotected(): unknown {
  const nodeRequire = Module.prototype.require;
  // `Object.assign` only gives the replacement the `NodeJS.Require` type. `Module.prototype.require`
  // has no own members to copy: `cache` and `resolve` live on each module's own `require`
  Module.prototype.require = Object.assign(function filteredRequire(
    this: Module,
    moduleName: string,
  ) {
    if (moduleName === EVIL_PATH) return nodeRequire.call(this, moduleName);
    return stubRequire(moduleName);
  }, nodeRequire);
  return createRequire(__filename)(EVIL_PATH);
}

async function main(): Promise<void> {
  const mode = process.argv[2];
  if (mode !== 'protected' && mode !== 'unprotected')
    throw new Error(`Expected mode 'protected' or 'unprotected', got '${mode}'`);

  const evil = mode === 'protected' ? loadProtected() : loadUnprotected();
  if (!evil || typeof evil !== 'object' || !('runSandboxProbes' in evil))
    throw new Error('evil.js does not export runSandboxProbes');
  const { runSandboxProbes } = evil;
  if (typeof runSandboxProbes !== 'function')
    throw new Error('evil.js runSandboxProbes is not a function');

  const results = await runSandboxProbes();
  process.stdout.write(`\n${JSON.stringify(results)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.exitCode = 1;
});
