import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

/*
 * Pins the module specifiers an extension may `require` at runtime.
 *
 * The `Module.prototype.require` shim in `extension.service.ts` is where the Extension Interface is
 * defined in practice, and `LICENSE-EXCEPTION.md` grants an additional permission under section 7
 * of the AGPL to works that reach Platform.Bible only through that interface. The list is therefore
 * the boundary of a published, irrevocable license grant as well as a security control.
 *
 * This reads source text because the shim has no seam: `activateExtensions` installs it as a side
 * effect of loading extensions, and the same function deletes `globalThis.eval`/`Function` and
 * replaces `fetch`/`XMLHttpRequest`, so calling it to probe the allowlist would wreck the test
 * process. A source scan is narrow, but it fails on exactly the change that matters.
 *
 * Fail-closed by construction: a rewrite that moves the allowlist out of the `moduleName === '…'`
 * shape extracts nothing and fails here too, which is the intended prompt to re-point this guard
 * rather than to delete it.
 */

const EXTENSION_SERVICE_PATH = path.join(__dirname, 'extension.service.ts');

const SHIM_START = 'Module.prototype.require = ((moduleName: string) => {';
const SHIM_END = '}) as typeof Module.prototype.require;';

/**
 * Module specifiers the shim currently answers itself instead of refusing.
 *
 * Every entry is a promise this project has already made to extension authors. Adding one widens
 * the AGPL section 7 additional permission in `LICENSE-EXCEPTION.md`; removing one can push an
 * existing extension outside it.
 */
const PERMITTED_MODULE_SPECIFIERS = [
  '@papi/backend',
  '@papi/core',
  '@sillsdev/scripture',
  'crypto',
  'platform-bible-utils',
];

const WIDENING_THE_GRANT = [
  'The module specifiers this shim permits ARE the Extension Interface that LICENSE-EXCEPTION.md',
  'names: its additional permission under section 7 of the AGPL frees a work from sections 4, 5, 6',
  'and 13 provided it talks to Platform.Bible only through them. Adding an entry widens a published,',
  'irrevocable grant, and removing one can put an existing extension outside it. If this change is',
  'intended, update PERMITTED_MODULE_SPECIFIERS deliberately and say so in the review; do not update',
  'it to make the test pass.',
].join(' ');

/** The specifiers the shim short-circuits, read out of its source. */
function readPermittedModuleSpecifiers(source: string): string[] {
  const startIndex = source.indexOf(SHIM_START);
  if (startIndex < 0)
    throw new Error(
      `Could not find the require shim ('${SHIM_START}') in ${EXTENSION_SERVICE_PATH}. This guard reads source text, so check whether the shim was merely renamed or reshaped before assuming anything else. ${WIDENING_THE_GRANT}`,
    );
  const endIndex = source.indexOf(SHIM_END, startIndex);
  if (endIndex < 0)
    throw new Error(
      `Could not find the end of the require shim ('${SHIM_END}') in ${EXTENSION_SERVICE_PATH}. This guard reads source text, so check whether the shim was merely reshaped before assuming anything else. ${WIDENING_THE_GRANT}`,
    );
  const shim = source.slice(startIndex, endIndex);
  return [...shim.matchAll(/moduleName === '([^']+)'/g)].map(([, specifier]) => specifier).sort();
}

// The consequence lives in the test name because that is what a failing run prints. Vitest's
// two-argument `expect(value, message)` would say it closer to the assertion, but `vitest/valid-expect`
// refuses that form.
describe('extension host require shim allowlist', () => {
  it(`permits exactly the modules the Extension Interface publishes — ${WIDENING_THE_GRANT}`, () => {
    const permitted = readPermittedModuleSpecifiers(readFileSync(EXTENSION_SERVICE_PATH, 'utf8'));

    expect(permitted).toEqual([...PERMITTED_MODULE_SPECIFIERS].sort());
  });
});
