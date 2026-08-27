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

const REPO = path.join(__dirname, '..', '..', '..');
const EXTENSION_SERVICE_PATH = path.join(__dirname, 'extension.service.ts');
const WEB_VIEW_MODULE_MAP_PATH = path.join(
  REPO,
  'src',
  'renderer',
  'global-this-web-view.model.ts',
);
const LICENSE_EXCEPTION_PATH = path.join(REPO, 'LICENSE-EXCEPTION.md');

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

/**
 * Modules the two hosts supply that Platform.Bible itself authors.
 *
 * The split is what decides whether a module belongs in the license grant, and it is not derivable
 * from either host's list: both supply first-party and third-party modules side by side. An
 * additional permission can only carve out rights in a work its grantors hold copyright in, so
 * React and Node's built-ins are supplied but ungranted - they carry their own terms, and no
 * permission from this project is needed to use them. `@sillsdev/scripture` is included as SIL's
 * own.
 *
 * Adding a FIRST-PARTY module to either host widens the published grant and must be accompanied by
 * a new version of `LICENSE-EXCEPTION.md`; adding a third-party one does not. That is the decision
 * this list exists to force.
 */
const FIRST_PARTY_SUPPLIED_MODULES = [
  '@papi/backend',
  '@papi/core',
  '@papi/frontend',
  '@papi/frontend/react',
  '@sillsdev/scripture',
  'platform-bible-react',
  'platform-bible-utils',
];

/** The specifiers the renderer answers for a web view, read out of its module map. */
function readWebViewModuleSpecifiers(source: string): string[] {
  const specifiers = [...source.matchAll(/moduleMap\.set\('([^']+)'/g)].map(
    ([, specifier]) => specifier,
  );
  if (!specifiers.length)
    throw new Error(
      `Could not find any 'moduleMap.set(...)' entries in ${WEB_VIEW_MODULE_MAP_PATH}. This guard ` +
        `reads source text, so check whether the map was merely reshaped. ${WIDENING_THE_GRANT}`,
    );
  return specifiers.sort();
}

/**
 * The module specifiers `LICENSE-EXCEPTION.md` names as the Extension Interface.
 *
 * Read from the numbered clause rather than from the whole file, because the document names
 * `crypto` and React elsewhere on purpose - in the paragraph that says they are supplied but NOT
 * granted - and a whole-file scan would read that disclaimer as part of the grant.
 */
function readGrantedModuleSpecifiers(source: string): string[] {
  const start = source.indexOf("of Platform.Bible's own authorship");
  const end = source.indexOf('2. the type declarations', start);
  if (start < 0 || end < 0)
    throw new Error(
      `Could not find the Extension Interface's module clause in ${LICENSE_EXCEPTION_PATH}. This ` +
        `guard reads document text, so check whether the clause was merely reworded. ${WIDENING_THE_GRANT}`,
    );
  return [...source.slice(start, end).matchAll(/`([^`]+)`/g)]
    .map(([, specifier]) => specifier)
    .sort();
}

describe('the Extension Interface the license exception grants', () => {
  it(`names every first-party module the hosts supply, and no module they do not — ${WIDENING_THE_GRANT}`, () => {
    const granted = readGrantedModuleSpecifiers(readFileSync(LICENSE_EXCEPTION_PATH, 'utf8'));

    expect(granted).toEqual([...FIRST_PARTY_SUPPLIED_MODULES].sort());
  });

  it(`is supplied in full by the extension host and the renderer between them — ${WIDENING_THE_GRANT}`, () => {
    // The grant is a promise that these modules are there to be linked against. A name the hosts do
    // not answer is a promise nothing keeps; this is the direction the shim-only guard above cannot
    // see, because it compares the shim against a copy of itself.
    const supplied = new Set([
      ...readPermittedModuleSpecifiers(readFileSync(EXTENSION_SERVICE_PATH, 'utf8')),
      ...readWebViewModuleSpecifiers(readFileSync(WEB_VIEW_MODULE_MAP_PATH, 'utf8')),
    ]);

    expect(FIRST_PARTY_SUPPLIED_MODULES.filter((module) => !supplied.has(module))).toEqual([]);
  });

  it(`carves out nothing the hosts supply from a third party — ${WIDENING_THE_GRANT}`, () => {
    // The other direction: a first-party module added to either host has to reach the grant, or the
    // published carve-out is silently narrower than the interface extensions actually link against.
    const supplied = [
      ...new Set([
        ...readPermittedModuleSpecifiers(readFileSync(EXTENSION_SERVICE_PATH, 'utf8')),
        ...readWebViewModuleSpecifiers(readFileSync(WEB_VIEW_MODULE_MAP_PATH, 'utf8')),
      ]),
    ];
    const ungranted = supplied.filter((module) => !FIRST_PARTY_SUPPLIED_MODULES.includes(module));

    // Everything the hosts supply that the grant does not name must be a module this project does
    // not own - Node built-ins and React. Each is listed so that adding one is a deliberate line.
    expect(ungranted.sort()).toEqual([
      'crypto',
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
    ]);
  });
});
