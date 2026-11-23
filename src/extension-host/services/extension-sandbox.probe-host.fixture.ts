/**
 * Child-process host for `extension-sandbox.probes.test.ts`. Loads the evil extension and prints
 * its sandbox probe results as JSON on the last stdout line.
 *
 * Usage: `node --import tsx extension-sandbox.probe-host.fixture.ts <protected | unprotected>`
 *
 * - `protected` loads evil through the loader `lockDownAndCreateExtensionLoader` returns, as the
 *   extension host does.
 * - `unprotected` loads evil with Node's own `require` and only filters `require` calls by name, with
 *   no lockdowns. It shows the probes can report an escape.
 */
import log from 'electron-log';
import Module, { createRequire } from 'node:module';
import path from 'node:path';
import { createExtensionLogger } from './extension-logger.util';
import {
  lockDownAndCreateExtensionLoader,
  NOT_ALLOWED_IN_EXTENSIONS,
} from './extension-sandbox.util';

const EVIL_PATH = path.resolve(__dirname, '../../../extensions/src/evil/evil.js');
// Built from the shared constant, as `requireForExtension` builds its refusal
const REFUSED_REQUIRE_MESSAGE = `Requiring other than papi is ${NOT_ALLOWED_IN_EXTENSIONS}!`;

// A real logger, as the host's is, with output turned off so it writes nothing
log.transports.file.setAppName('extension-sandbox-probe-host');
log.transports.file.level = false;
log.transports.console.level = false;

const mode = process.argv[2];

const papiStub = {
  // The host gives extensions the narrowed logger; an unprotected host gives the real one
  logger: mode === 'protected' ? createExtensionLogger(log) : log,
};

const stubRequire = (moduleName: string): unknown => {
  if (moduleName === '@papi/backend') return papiStub;
  throw new Error(REFUSED_REQUIRE_MESSAGE);
};

function loadProtected(): unknown {
  // Twice: the host creates a new loader every time it activates extensions
  lockDownAndCreateExtensionLoader(stubRequire);
  const loadExtension = lockDownAndCreateExtensionLoader(stubRequire);
  return loadExtension(EVIL_PATH);
}

function loadUnprotected(): unknown {
  const nodeRequire = Module.prototype.require;
  // `Object.assign` only gives the replacement the `NodeJS.Require` type.
  // `Module.prototype.require` has no own members to copy: `cache` and `resolve` live on each
  // module's own `require`
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
