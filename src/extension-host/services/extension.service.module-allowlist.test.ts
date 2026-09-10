import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { EXTENSION_INTERFACE_MODULE_SPECIFIERS } from '@extension-host/data/extension-interface-modules.data';
import { WEB_VIEW_MODULE_SPECIFIERS } from '@renderer/data/web-view-modules.data';

/*
 * Pins the module specifiers an extension may `require` at runtime.
 *
 * The `Module.prototype.require` shim in `extension.service.ts` is where the Extension Interface is
 * defined in practice, and `LICENSE-EXCEPTION.md` grants an additional permission under section 7
 * of the AGPL to works that reach Platform.Bible only through that interface. The list is therefore
 * the boundary of a published, irrevocable license grant as well as a security control.
 *
 * The shim itself has no seam - `activateExtensions` installs it as a side effect of loading
 * extensions, and the same function deletes `globalThis.eval`/`Function` and replaces
 * `fetch`/`XMLHttpRequest` - and `extension.service.ts` cannot even be imported here, because it
 * creates directories at module scope. So the shim dispatches from
 * `EXTENSION_INTERFACE_MODULE_SPECIFIERS` instead, in a module that imports nothing, and this
 * compares that VALUE. Any admission has to add a specifier there, in any syntax, and fail this.
 *
 * The renderer half is read the same way, and for the same reason: `global-this-web-view.model.ts`
 * pulls in React and `platform-bible-react`, which do not load outside a browser environment, so its
 * map is keyed by `WEB_VIEW_MODULE_SPECIFIERS` in a module that imports nothing and this compares
 * that value.
 */

const REPO = path.join(__dirname, '..', '..', '..');
const LICENSE_EXCEPTION_PATH = path.join(REPO, 'LICENSE-EXCEPTION.md');

/**
 * Module specifiers the shim answers itself instead of refusing.
 *
 * Every entry is a promise this project has already made to extension authors. Adding one widens
 * the AGPL section 7 additional permission in `LICENSE-EXCEPTION.md`; removing one can push an
 * existing extension outside it. Written out here rather than derived, because a guard that derived
 * it from the thing it is guarding would assert nothing.
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

/** The specifiers the extension host supplies, as the shim reads them. */
function readPermittedModuleSpecifiers(): string[] {
  return [...EXTENSION_INTERFACE_MODULE_SPECIFIERS].sort();
}

// The consequence lives in the test name because that is what a failing run prints. Vitest's
// two-argument `expect(value, message)` would say it closer to the assertion, but `vitest/valid-expect`
// refuses that form.
describe('extension host require shim allowlist', () => {
  it(`permits exactly the modules the Extension Interface publishes — ${WIDENING_THE_GRANT}`, () => {
    expect(readPermittedModuleSpecifiers()).toEqual([...PERMITTED_MODULE_SPECIFIERS].sort());
  });

  it(`dispatches from that list rather than comparing names in the shim — ${WIDENING_THE_GRANT}`, () => {
    // The value comparison above is only a guard while the shim is what consumes the value. A shim
    // that compared `moduleName` against string literals could admit a module the list does not
    // name, and every assertion in this file would still pass.
    const source = readFileSync(path.join(__dirname, 'extension.service.ts'), 'utf8');
    expect(source).toContain('EXTENSION_INTERFACE_MODULES[moduleName]');
    expect(source).not.toMatch(/moduleName === /);
  });
});

describe('renderer web view require shim allowlist', () => {
  it(`dispatches from that map rather than comparing names in the shim — ${WIDENING_THE_GRANT}`, () => {
    // The renderer's value is pinned below, under the license exception. That pin is only a guard
    // while the shim is what consumes the value, for the reason the extension host's twin above
    // gives - and web views are the larger of the two surfaces. `global-this-web-view.model.ts`
    // pulls in React and `platform-bible-react`, which do not load outside a browser environment,
    // so its source is read here instead of imported.
    const source = readFileSync(
      path.join(REPO, 'src/renderer/global-this-web-view.model.ts'),
      'utf8',
    );
    expect(source).toContain('moduleMap.get(moduleName)');
    expect(source).not.toMatch(/moduleName === /);
  });
});

/**
 * Modules the two hosts supply that Platform.Bible itself authors.
 *
 * The split is what decides whether a module belongs in the license grant, and it is not derivable
 * from either host's list: both supply first-party and third-party modules side by side. An
 * additional permission can only carve out rights in a work its grantors hold copyright in, so
 * React and Node's built-ins are supplied but ungranted - they carry their own terms, and no
 * permission from this project is needed to use them. `@sillsdev/scripture` is in that same group:
 * SIL's, but separately published under the MIT License and not this project's to relicense, so an
 * additional permission over it would grant an extension author nothing MIT does not already.
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
  'platform-bible-react',
  'platform-bible-utils',
];

/** The specifiers the renderer answers for a web view, as its module map is keyed. */
function readWebViewModuleSpecifiers(): string[] {
  return [...WEB_VIEW_MODULE_SPECIFIERS].sort();
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
      ...readPermittedModuleSpecifiers(),
      ...readWebViewModuleSpecifiers(),
    ]);

    expect(FIRST_PARTY_SUPPLIED_MODULES.filter((module) => !supplied.has(module))).toEqual([]);
  });

  it(`carves out nothing the hosts supply from a third party — ${WIDENING_THE_GRANT}`, () => {
    // The other direction: a first-party module added to either host has to reach the grant, or the
    // published carve-out is silently narrower than the interface extensions actually link against.
    const supplied = [
      ...new Set([...readPermittedModuleSpecifiers(), ...readWebViewModuleSpecifiers()]),
    ];
    const ungranted = supplied.filter((module) => !FIRST_PARTY_SUPPLIED_MODULES.includes(module));

    // Everything the hosts supply that the grant does not name must be a module this project does
    // not own - Node built-ins and React. Each is listed so that adding one is a deliberate line.
    expect(ungranted.sort()).toEqual([
      '@sillsdev/scripture',
      'crypto',
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
    ]);
  });
});
